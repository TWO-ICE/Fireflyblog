---
title: Docker快速入门：5分钟搭建你的第一个容器
published: 2026-03-02
description: 从零开始学习Docker，掌握容器化技术的核心概念，实战演练首个容器部署
image: api
tags: [Docker, 容器技术, 入门教程]
category: Docker实战
draft: false
pinned: true
---

## 为什么选择Docker？

在接触Docker之前，你是否遇到过这些问题：
- 安装软件时依赖冲突，系统环境被搞乱
- 在开发环境能跑，到生产环境就挂了
- 想尝试新工具，但不想污染系统环境
- 每次重装系统都要花半天时间配置环境

Docker用**容器**技术解决了这些痛点。它像是一个轻量级的虚拟机，但启动只需秒级，资源占用极低，而且可以保证"一次构建，到处运行"。

## 核心概念速览

### 镜像（Image）
应用的"模板"，包含了运行应用所需的一切：代码、运行时、库、配置文件。

**类比**：就像一个"模具"，可以用它生产出无数个相同的"产品"（容器）。

### 容器（Container）
镜像运行时的实例，相互隔离的运行环境。

**类比**：用模具生产出来的实际"产品"，每个产品都是独立的。

### 仓库（Registry）
存储和分发镜像的服务，比如Docker Hub。

**类比**：就像GitHub，但是用来存放镜像的。

## 5分钟实战：运行你的第一个容器

### 1. 安装Docker

**Ubuntu/Debian：**
```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker
```

**CentOS/RHEL：**
```bash
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
```

**群晖DSM：**
套件中心搜索"Docker"，一键安装

**验证安装：**
```bash
docker --version
docker run hello-world
```

如果看到"Hello from Docker!"的欢迎信息，说明安装成功！

### 2. 运行第一个实用容器

让我们运行一个**轻量级HTTP服务器**：

```bash
docker run -d -p 8080:80 --name my-web nginx:alpine
```

**命令解读：**
- `docker run` - 运行容器
- `-d` - 后台运行（detached mode）
- `-p 8080:80` - 端口映射：主机8080 → 容器80
- `--name my-web` - 给容器命名
- `nginx:alpine` - 使用nginx的alpine版本（只有5MB！）

**访问测试：**
打开浏览器访问 `http://localhost:8080`，你会看到nginx的欢迎页面。

### 3. 常用管理命令

```bash
# 查看运行中的容器
docker ps

# 查看所有容器（包括已停止的）
docker ps -a

# 停止容器
docker stop my-web

# 启动已停止的容器
docker start my-web

# 删除容器
docker rm my-web

# 查看容器日志
docker logs my-web

# 进入容器内部（调试用）
docker exec -it my-web sh
```

### 4. 构建你自己的镜像

创建一个简单的Web应用：

```bash
# 创建项目目录
mkdir my-docker-app
cd my-docker-app

# 创建HTML文件
cat > index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>我的Docker应用</title>
    <meta charset="utf-8">
</head>
<body>
    <h1>🎉 恭喜！你的Docker应用运行成功！</h1>
    <p>这是你用Docker部署的第一个应用</p>
</body>
</html>
EOF

# 创建Dockerfile
cat > Dockerfile << 'EOF'
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/
EOF

# 构建镜像
docker build -t my-first-app .

# 运行容器
docker run -d -p 8081:80 --name my-app my-first-app
```

访问 `http://localhost:8081` 查看你的应用！

## 实战场景：Docker在NAS中的应用

在NAS上使用Docker，可以轻松部署各种服务，而不需要手动配置复杂的环境：

**一键部署n8n工作流平台：**
```bash
docker run -d \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

**一键部署Nextcloud网盘：**
```bash
docker run -d \
  --name nextcloud \
  -p 8080:80 \
  -v nextcloud_data:/var/www/html \
  nextcloud
```

**一键部署Home Assistant智能家居：**
```bash
docker run -d \
  --name homeassistant \
  --privileged \
  -p 8123:8123 \
  -v homeassistant_config:/config \
  homeassistant/home-assistant:latest
```

## 常见问题

### Q1: Docker和虚拟机有什么区别？
**A:** Docker共享宿主机内核，启动快（秒级），资源占用少；虚拟机有完整操作系统，启动慢（分钟级），资源占用大。

### Q2: 容器内能访问宿主机文件吗？
**A:** 可以，通过挂载卷（volume）或绑定挂载（bind mount）：
```bash
docker run -v /host/path:/container/path ...
```

### Q3: 如何清理无用镜像和容器？
**A:** 使用清理命令：
```bash
# 删除所有已停止的容器
docker container prune

# 删除所有未使用的镜像
docker image prune -a

# 一键清理所有未使用的资源
docker system prune -a
```

## 下一步

现在你已经掌握了Docker的基础操作：
- ✅ 安装和运行Docker
- ✅ 管理容器生命周期
- ✅ 构建自定义镜像
- ✅ 数据持久化（通过卷）

接下来可以学习：
- **Docker Compose** - 用YAML文件管理多容器应用
- **Docker网络** - 理解容器间通信
- **Docker数据管理** - 深入掌握volume和bind mount
- **Docker安全** - 加固容器环境

**实战建议：** 在你的NAS上尝试用Docker部署3个新服务，感受一下"一条命令部署一个应用"的便利性！

---

**系列文章：**
1. Docker快速入门：5分钟搭建你的第一个容器（本文）
2. [Docker Compose实战：一键部署n8n工作流平台](#)
3. [Docker网络完全指南：从bridge到macvlan](#)
4. [Docker数据持久化：volume vs bind mount实战](#)
5. [Docker安全加固：给容器加把锁](#)
