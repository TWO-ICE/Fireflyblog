---
title: Docker网络完全指南：从bridge到macvlan
published: 2026-03-02
description: 深入理解Docker网络模式，掌握bridge、host、macvlan等网络的配置和实战应用
image: api
tags: [Docker, 网络配置, 容器网络, NAS, macvlan]
category: Docker实战
draft: false
pinned: true
---

## 为什么需要理解Docker网络？

Docker容器默认是隔离的，但实际应用中容器之间、容器与外部之间需要通信。理解Docker网络可以帮助你：
- **容器互联** - 让多个服务协同工作
- **端口映射** - 从外部访问容器服务
- **网络隔离** - 不同环境使用不同网络
- **性能优化** - 选择合适的网络模式
- **故障排查** - 快速定位网络问题

## Docker网络模式总览

Docker提供5种网络驱动：

| 模式 | 隔离性 | 性能 | 使用场景 |
|------|--------|------|----------|
| **bridge** | ✅ 隔离 | ⭐⭐⭐ | 默认模式，大多数应用 |
| **host** | ❌ 无隔离 | ⭐⭐⭐⭐⭐ | 高性能需求、网络监控 |
| **none** | ✅ 完全隔离 | ⭐⭐⭐⭐ | 高安全要求、自定义网络 |
| **macvlan** | ✅ 物理网络隔离 | ⭐⭐⭐⭐ | 需要独立IP的场景 |
| **overlay** | ✅ 跨主机通信 | ⭐⭐⭐ | Swarm集群、微服务 |

## 1. Bridge网络（默认模式）

### 工作原理

Bridge是Docker的默认网络模式。每个容器连接到`docker0`虚拟网桥，通过NAT访问外部网络。

```
┌─────────────────────────────────────────┐
│          宿主机                          │
│  ┌──────────────────────────────────┐  │
│  │         docker0 (172.17.0.1)     │  │
│  │        (虚拟网桥)                 │  │
│  └──────┬─────────────────────┬─────┘  │
│         │                     │         │
│    ┌────▼────┐          ┌────▼────┐   │
│    │ 容器1   │          │ 容器2   │   │
│    │172.17.0.2│         │172.17.0.3│  │
│    └─────────┘          └─────────┘   │
└─────────────────────────────────────────┘
```

### 基本操作

```bash
# 查看默认bridge网络
docker network ls

# 查看网络详细信息
docker network inspect bridge

# 创建自定义bridge网络
docker network create my-network

# 使用自定义网络运行容器
docker run -d --name web1 --network my-network nginx

# 连接容器到网络
docker network connect my-network web2

# 断开网络连接
docker network disconnect my-network web2

# 删除网络
docker network rm my-network
```

### 容器间通信

**同一网络内的容器可以通过容器名互相访问：**

```bash
# 创建自定义网络
docker network create app-network

# 启动数据库容器
docker run -d \
  --name db \
  --network app-network \
  -e POSTGRES_PASSWORD=password \
  postgres:14

# 启动应用容器
docker run -d \
  --name app \
  --network app-network \
  -e DB_HOST=db \
  -e DB_PORT=5432 \
  my-app:latest

# 在app容器中可以直接用"db"访问数据库
docker exec app ping -c 3 db
```

**DNS解析：**
Docker内置DNS服务器，容器名会自动解析到对应的IP地址。

### 端口映射

```bash
# 映射单个端口
docker run -d -p 8080:80 nginx

# 映射多个端口
docker run -d \
  -p 80:80 \
  -p 443:443 \
  nginx

# 映射到随机端口
docker run -d -p 80 nginx

# 绑定特定IP
docker run -d -p 127.0.0.1:8080:80 nginx

# 查看端口映射
docker port container_name
```

## 2. Host网络模式

### 工作原理

Host模式让容器直接使用宿主机的网络栈，没有网络隔离。

```
┌─────────────────────────────────────────┐
│          宿主机网络栈                    │
│  ┌──────────────────────────────────┐  │
│  │         容器（共享网络）          │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### 使用场景

✅ **适合：**
- 网络性能敏感应用
- 需要查看真实网络流量
- 监控工具（如Prometheus node exporter）
- 端口范围大的应用（避免映射大量端口）

❌ **不适合：**
- 需要端口隔离的场景
- 多个实例使用相同端口

### 实战示例

```bash
# 运行Prometheus监控
docker run -d \
  --name prometheus \
  --network host \
  -v /path/to/prometheus.yml:/etc/prometheus/prometheus.yml \
  prom/prometheus

# 容器直接使用宿主机端口，无需-p映射
# 访问 http://宿主机IP:9090
```

**性能对比：**
```bash
# Bridge模式（经过NAT转换）
docker run --rm --network bridge alpine wget -O /dev/null http://example.com

# Host模式（直接使用宿主机网络）
docker run --rm --network host alpine wget -O /dev/null http://example.com
```

Host模式通常有更低的延迟和更高的吞吐量。

## 3. None网络模式

### 工作原理

None模式不给容器配置任何网络，只有loopback接口。

### 使用场景

✅ **适合：**
- 高安全要求（完全网络隔离）
- 自定义网络配置
- 批处理任务（不需要网络）

❌ **不适合：**
- 需要访问外部网络的应用

### 实战示例

```bash
# 运行完全隔离的容器
docker run -d \
  --name isolated-container \
  --network none \
  alpine sleep 1000

# 验证网络配置
docker exec isolated-container ip addr
# 只能看到lo接口
```

## 4. Macvlan网络模式

### 工作原理

Macvlan给每个容器分配一个独立的虚拟MAC地址，使其看起来像网络中的独立设备。

```
┌─────────────────────────────────────────┐
│          物理网络 (192.168.1.0/24)      │
│  ┌──────────────────────────────────┐  │
│  │  宿主机 (192.168.1.100)          │  │
│  └──────┬─────────────────────┬─────┘  │
│         │                     │         │
│    ┌────▼────┐          ┌────▼────┐   │
│    │ 容器1   │          │ 容器2   │   │
│    │192.168.1.201│      │192.168.1.202││
│    └─────────┘          └─────────┘   │
└─────────────────────────────────────────┘
```

### 使用场景

✅ **适合：**
- NAS环境（需要独立IP访问服务）
- 网络监控工具
- 需要与物理设备同网的场景
- 家庭实验室环境

❌ **不适合：**
- 资源受限环境（每个容器占用一个虚拟接口）
- 云服务器（通常不支持）

### 实战示例：NAS环境部署

#### 场景：NAS上部署多个服务，每个有独立IP

**网络信息：**
- 物理网络：`192.168.1.0/24`
- 宿主机IP：`192.168.1.100`
- 网关：`192.168.1.1`
- 网络接口：`eth0`

#### 步骤1：创建macvlan网络

```bash
# 查看宿主机网络接口
ip addr show

# 创建macvlan网络
docker network create -d macvlan \
  --subnet=192.168.1.0/24 \
  --gateway=192.168.1.1 \
  -o parent=eth0 \
  -o macvlan_mode=bridge \
  my-macvlan-net
```

**参数说明：**
- `-d macvlan` - 使用macvlan驱动
- `--subnet` - 子网段
- `--gateway` - 网关地址
- `-o parent=eth0` - 物理网络接口
- `-o macvlan_mode=bridge` - macvlan模式（bridge/vepa/private/pass-through）

#### 步骤2：运行容器并指定IP

```bash
# 运行Nginx容器（指定IP）
docker run -d \
  --name nginx1 \
  --network my-macvlan-net \
  --ip 192.168.1.201 \
  nginx:alpine

# 运行另一个Nginx容器
docker run -d \
  --name nginx2 \
  --network my-macvlan-net \
  --ip 192.168.1.202 \
  nginx:alpine

# 验证网络连接
docker exec nginx1 ip addr show eth0
# 应该显示 192.168.1.201
```

现在可以直接通过IP访问容器：
- http://192.168.1.201 → nginx1
- http://192.168.1.202 → nginx2

#### 步骤3：解决宿主机与容器通信问题

**⚠️ 重要提示：** macvlan网络中，宿主机无法直接访问容器IP（除非使用特殊配置）。

**解决方案1：添加辅助IP**
```bash
# 给宿主机添加同网段的辅助IP
sudo ip addr add 192.168.1.100/32 dev eth0
```

**解决方案2：使用IPvlan模式**
```bash
# ipvlan模式下宿主机可以与容器通信
docker network create -d ipvlan \
  --subnet=192.168.1.0/24 \
  --gateway=192.168.1.1 \
  -o parent=eth0 \
  -o ipvlan_mode=l2 \
  my-ipvlan-net
```

### Macvlan实战：家庭服务器

在家庭NAS上部署多个服务，每个服务独立IP：

```yaml
version: '3.8'

services:
  # Web服务器
  web:
    image: nginx:alpine
    container_name: home-web
    networks:
      macvlan_net:
        ipv4_address: 192.168.1.201
    restart: unless-stopped

  # 文件服务器
  fileserver:
    image: filebrowser/filebrowser
    container_name: home-fileserver
    networks:
      macvlan_net:
        ipv4_address: 192.168.1.202
    volumes:
      - /data:/srv
    restart: unless-stopped

  # 代码服务器
  codeserver:
    image: codercom/code-server:latest
    container_name: home-codeserver
    networks:
      macvlan_net:
        ipv4_address: 192.168.1.203
    environment:
      - PASSWORD=your_password
    volumes:
      - /projects:/home/coder/project
    restart: unless-stopped

networks:
  macvlan_net:
    driver: macvlan
    driver_opts:
      parent: eth0
    ipam:
      config:
        - subnet: 192.168.1.0/24
          gateway: 192.168.1.1
```

## 5. Overlay网络（进阶）

### 工作原理

Overlay网络用于跨主机的容器通信，主要用于Docker Swarm集群。

```bash
# 在Swarm模式下创建overlay网络
docker network create -d overlay my-overlay

# 在服务中使用overlay网络
docker service create \
  --network my-overlay \
  --name my-service \
  nginx
```

**使用场景：**
- Swarm集群服务
- 微服务架构
- 跨主机容器通信

## 网络故障排查

### 常用诊断命令

```bash
# 查看容器网络配置
docker exec container_name ip addr

# 测试容器间连通性
docker exec container1 ping -c 3 container2

# 查看容器DNS配置
docker exec container_name cat /etc/resolv.conf

# 抓包分析
docker exec container_name tcpdump -i eth0

# 查看网络接口
docker network inspect bridge | grep Containers
```

### 常见问题

#### Q1: 容器无法访问外网

```bash
# 检查NAT转发
sudo iptables -t nat -L -n -v

# 启用IP转发
echo "net.ipv4.ip_forward=1" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

#### Q2: 容器间无法通信

```bash
# 确认容器在同一网络
docker inspect container1 | grep NetworkMode
docker inspect container2 | grep NetworkMode

# 检查防火墙规则
sudo iptables -L -n
```

#### Q3: 端口映射不生效

```bash
# 检查端口监听
sudo netstat -tulpn | grep :8080

# 查看容器是否监听正确端口
docker exec container_name netstat -tulpn
```

## 网络最佳实践

### 1. 使用自定义网络

```bash
# ✅ 推荐：使用自定义网络
docker network create app-network
docker run --network app-network my-app

# ❌ 不推荐：使用默认bridge网络
docker run my-app
```

### 2. 网络命名规范

```bash
# 项目名-环境-网络类型
docker network create blog-prod-backend
docker network create blog-dev-backend
docker network create monitoring-prometheus
```

### 3. 网络隔离

```bash
# 前端网络（可访问外网）
docker network create frontend-net

# 后端网络（完全隔离）
docker network create backend-net --internal

# 数据库网络（严格隔离）
docker network create db-net --internal
```

### 4. 使用Docker Compose自动管理网络

```yaml
version: '3.8'

services:
  web:
    image: nginx
    networks:
      - frontend

  api:
    image: my-api
    networks:
      - frontend
      - backend

  db:
    image: postgres
    networks:
      - backend

networks:
  frontend:
  backend:
    internal: true  # 隔离网络
```

## 性能优化建议

### 1. 减少网络层

```bash
# 高性能场景使用host模式
docker run --network host high-perf-app
```

### 2. 使用IPv6（如果支持）

```bash
# 创建支持IPv6的网络
docker network create -d bridge \
  --ipv6 \
  --subnet=2001:db8:1::/64 \
  my-ipv6-network
```

### 3. 调整MTU（巨型帧）

```bash
# 创建网络时指定MTU
docker network create \
  -o com.docker.network.driver.mtu=9000 \
  jumbo-frame-net
```

## 总结

Docker网络选择决策树：

```
需要跨主机通信？
├─ 是 → Overlay网络（Swarm集群）
└─ 否 → 需要独立IP？
    ├─ 是 → Macvlan（NAS场景）
    └─ 否 → 需要高性能？
        ├─ 是 → Host网络
        └─ 否 → Bridge网络（默认选择）
```

**关键要点：**
- ✅ Bridge：默认选择，适合大多数场景
- ✅ Host：高性能需求，监控工具
- ✅ Macvlan：NAS环境，需要独立IP
- ✅ None：高安全要求，完全隔离
- ✅ Overlay：Swarm集群，跨主机通信

**下一步学习：**
- Docker数据持久化（Volume vs Bind Mount）
- Docker安全加固
- 容器监控和日志管理

**实战建议：** 在你的NAS上尝试配置macvlan网络，让每个服务都有独立IP，感受一下像物理服务器一样的部署体验！

---

**系列文章：**
1. [Docker快速入门：5分钟搭建你的第一个容器](#)
2. [Docker Compose实战：一键部署n8n工作流平台](#)
3. Docker网络完全指南：从bridge到macvlan（本文）
4. [Docker数据持久化：volume vs bind mount实战](#)
5. [Docker安全加固：给容器加把锁](#)
