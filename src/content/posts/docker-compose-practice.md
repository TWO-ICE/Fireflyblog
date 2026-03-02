---
title: Docker Compose实战：一键部署n8n工作流平台
published: 2026-03-02
description: 掌握Docker Compose多容器编排，实战部署完整的n8n自动化工作流平台
image: api
tags: [Docker, Docker Compose, n8n, 自动化, 容器编排]
category: Docker实战
draft: false
pinned: true
---

## 为什么需要Docker Compose？

单个容器用`docker run`很方便，但实际应用往往需要多个容器协同工作。比如一个完整的Web应用通常包含：
- **前端** - React/Vue应用
- **后端** - Node.js/Python API
- **数据库** - MySQL/PostgreSQL
- **缓存** - Redis
- **反向代理** - Nginx

如果用`docker run`一个一个启动，命令会非常冗长，而且容易出错。

**Docker Compose** 用一个YAML文件定义多个容器，一条命令启动全部服务，极大简化了多容器应用的部署。

## 核心概念

### docker-compose.yml结构

```yaml
version: '3.8'  # Compose文件版本

services:  # 定义服务（容器）
  service1:
    image: nginx:alpine
    ports:
      - "8080:80"

  service2:
    image: postgres:14
    environment:
      POSTGRES_PASSWORD: example
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:  # 定义数据卷
  db_data:

networks:  # 定义网络
  default:
```

### 核心命令

```bash
# 启动所有服务（后台运行）
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 停止所有服务
docker-compose stop

# 删除所有服务（删除容器）
docker-compose down

# 重启服务
docker-compose restart

# 重新构建镜像
docker-compose build
```

## 实战：部署完整n8n工作流平台

### 场景描述

n8n是一个强大的工作流自动化工具，类似开源版的Zapier。完整部署需要：
- **n8n主服务** - 工作流引擎
- **PostgreSQL** - 数据存储（比默认SQLite更适合生产）
- **Redis** - 队列和缓存
- **Nginx** - 反向代理和SSL

### 项目目录结构

```bash
mkdir -p n8n-docker/{nginx,data}
cd n8n-docker

tree .
.
├── docker-compose.yml
├── .env
└── nginx
    └── nginx.conf
```

### 1. 创建环境变量文件

```bash
cat > .env << 'EOF'
# n8n配置
N8N_HOST=your-domain.com
N8N_PORT=5678
N8N_PROTOCOL=https
N8N_PATH=/

# 时区
GENERIC_TIMEZONE=Asia/Shanghai
TZ=Asia/Shanghai

# 数据库配置
POSTGRES_DB=n8n
POSTGRES_USER=n8n
POSTGRES_PASSWORD=your_strong_password_here

# Redis配置
REDIS_PASSWORD=your_redis_password_here
EOF
```

**⚠️ 安全提示：** 生产环境务必修改密码！

### 2. 创建Nginx配置

```bash
cat > nginx/nginx.conf << 'EOF'
events {
    worker_connections 1024;
}

http {
    upstream n8n {
        server n8n:5678;
    }

    server {
        listen 80;
        server_name _;

        location / {
            proxy_pass http://n8n;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
EOF
```

### 3. 创建docker-compose.yml

```bash
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  # PostgreSQL数据库
  postgres:
    image: postgres:14-alpine
    container_name: n8n-postgres
    restart: unless-stopped
    environment:
      - POSTGRES_DB=${POSTGRES_DB}
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - n8n-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis缓存
  redis:
    image: redis:7-alpine
    container_name: n8n-redis
    restart: unless-stopped
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    networks:
      - n8n-network
    healthcheck:
      test: ["CMD", "redis-cli", "--raw", "incr", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5

  # n8n主服务
  n8n:
    image: n8nio/n8n:latest
    container_name: n8n
    restart: unless-stopped
    ports:
      - "${N8N_PORT}:5678"
    environment:
      - N8N_HOST=${N8N_HOST}
      - N8N_PORT=5678
      - N8N_PROTOCOL=${N8N_PROTOCOL}
      - N8N_PATH=${N8N_PATH}
      - GENERIC_TIMEZONE=${GENERIC_TIMEZONE}
      - TZ=${TZ}

      # 数据库配置
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=${POSTGRES_DB}
      - DB_POSTGRESDB_USER=${POSTGRES_USER}
      - DB_POSTGRESDB_PASSWORD=${POSTGRES_PASSWORD}

      # Redis配置（队列模式）
      - QUEUE_BULL_REDIS_HOST=redis
      - QUEUE_BULL_REDIS_PORT=6379
      - QUEUE_BULL_REDIS_PASSWORD=${REDIS_PASSWORD}

      # 执行模式（队列+web）
      - EXECUTIONS_MODE=queue
      - QUEUE_BULL_REDIS_DB=0

      # Webhook配置
      - WEBHOOK_URL=https://${N8N_HOST}/
    volumes:
      - n8n_data:/home/node/.n8n
      - /var/run/docker.sock:/var/run/docker.sock  # 允许执行Docker命令
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - n8n-network

  # Nginx反向代理
  nginx:
    image: nginx:alpine
    container_name: n8n-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro  # SSL证书（如果有的话）
    depends_on:
      - n8n
    networks:
      - n8n-network

volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local
  n8n_data:
    driver: local

networks:
  n8n-network:
    driver: bridge
EOF
```

### 4. 启动服务

```bash
# 启动所有服务
docker-compose up -d

# 查看启动日志
docker-compose logs -f

# 检查服务状态
docker-compose ps
```

### 5. 验证部署

访问 `http://your-server-ip:5678`，你应该能看到n8n的登录界面。

首次访问会要求创建管理员账户。

### 6. 查看服务状态

```bash
# 查看所有服务
docker-compose ps

# 查看n8n日志
docker-compose logs -f n8n

# 查看数据库日志
docker-compose logs -f postgres

# 进入n8n容器
docker-compose exec n8n sh
```

## 高级技巧

### 1. 扩展功能：添加SSL证书

如果你有域名和SSL证书，修改nginx配置启用HTTPS：

```bash
# 将证书放到nginx目录
mkdir nginx/ssl
cp /path/to/fullchain.pem nginx/ssl/
cp /path/to/privkey.pem nginx/ssl/

# 修改nginx.conf添加SSL配置
# （需要手动编辑nginx配置文件）
```

### 2. 添加备份服务

```yaml
# 在docker-compose.yml中添加
  backup:
    image: postgres:14-alpine
    container_name: n8n-backup
    volumes:
      - ./backups:/backups
    depends_on:
      - postgres
    networks:
      - n8n-network
    command: >
      sh -c "
      while true; do
        pg_dump -h postgres -U ${POSTGRES_USER} ${POSTGRES_DB} > /backups/n8n_backup_$$(date +%Y%m%d_%H%M%S).sql
        echo 'Backup completed at $$(date)'
        sleep 86400
      done
      "
```

### 3. 监控和日志管理

```bash
# 安装Portainer（Docker可视化管理工具）
docker run -d \
  --name portainer \
  -p 9000:9000 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce:latest
```

访问 `http://your-server-ip:9000` 即可看到所有容器的运行状态。

## 故障排查

### 服务无法启动

```bash
# 查看详细日志
docker-compose logs service-name

# 检查端口占用
sudo netstat -tulpn | grep :5678

# 检查磁盘空间
df -h
```

### 数据库连接失败

```bash
# 检查数据库是否就绪
docker-compose exec postgres pg_isready -U n8n

# 进入数据库容器
docker-compose exec postgres psql -U n8n -d n8n
```

### 性能优化

```yaml
# 在docker-compose.yml中添加资源限制
services:
  n8n:
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 2G
        reservations:
          cpus: '1.0'
          memory: 1G
```

## 实战场景扩展

### 场景1：添加监控服务

```yaml
  grafana:
    image: grafana/grafana:latest
    container_name: n8n-grafana
    restart: unless-stopped
    ports:
      - "3001:3000"
    volumes:
      - grafana_data:/var/lib/grafana
    networks:
      - n8n-network
```

### 场景2：添加邮件服务

```yaml
  mailhog:
    image: mailhog/mailhog:latest
    container_name: n8n-mailhog
    restart: unless-stopped
    ports:
      - "1025:1025"  # SMTP
      - "8025:8025"  # Web UI
    networks:
      - n8n-network
```

## 总结

通过Docker Compose，我们用**一个YAML文件**定义了完整的n8n工作流平台，包括：
- ✅ PostgreSQL数据库
- ✅ Redis队列和缓存
- ✅ n8n主服务
- ✅ Nginx反向代理
- ✅ 数据持久化
- ✅ 自动重启
- ✅ 健康检查

**一条命令启动全部服务：**
```bash
docker-compose up -d
```

**一条命令停止全部服务：**
```bash
docker-compose down
```

这就是Docker Compose的威力：**声明式、可重复、易管理**。

**下一步学习：**
- Docker网络深入理解
- 数据备份和恢复策略
- 容器监控和日志管理
- CI/CD集成

**实战建议：** 尝试用Compose部署你的第一个多容器应用，比如WordPress+MySQL+Nginx，感受一下编排带来的便利！

---

**系列文章：**
1. [Docker快速入门：5分钟搭建你的第一个容器](#)
2. Docker Compose实战：一键部署n8n工作流平台（本文）
3. [Docker网络完全指南：从bridge到macvlan](#)
4. [Docker数据持久化：volume vs bind mount实战](#)
5. [Docker安全加固：给容器加把锁](#)
