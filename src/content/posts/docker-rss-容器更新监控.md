---
title: Docker容器更新不再错过！RSS订阅神器一键部署攻略
published: 2026-04-01T06:33:48.802Z
description: 兄弟们，你的Docker容器还在手动检查更新吗？身为搞机老司机，二冰每天要管理几十个Docker容器。最头疼的就是镜像更新提示总是后知后觉，直到发现了这个docker-rss神器！
image: https://img.twoice.fun:666/i/2025/03/16/tmple09n_pt-2.png
tags: ["Docker", "资源监控", "docker-rss"]
category: 资源监控
draft: false
---

兄弟们，今天二冰给你们带来一个**让NAS玩家集体高潮**的神器！想象一下：打开手机就能实时监控家里所有设备的运行状态，Docker容器挂了自动告警，还能一键更新所有容器...没错，这就是我们今天要盘的主角——Watchtower的进阶版Docker RSS监控方案！

## 一、项目简介
本项目通过Docker部署多个监控工具，实现对NAS和Docker容器的全方位监控。核心组件包括：

- **Watchtower**：自动检测并更新Docker镜像
- **Glances**：系统资源实时监控面板
- **Diun**：Docker镜像更新通知工具

## 二、五大核心优势
1. **全自动更新**：Watchtower每5分钟检查一次镜像更新，有新版自动拉取并重建容器
2. **多通道通知**：支持邮件/Telegram/微信/webhook等多种告警方式
3. **零资源占用**：所有组件运行内存加起来不到100MB
4. **可视化面板**：Glances提供漂亮的Web界面，CPU/内存/磁盘一目了然
5. **灵活配置**：可设置白名单/黑名单，精确控制哪些容器自动更新

## 三、Docker部署教程（Dockge版）
```yaml
version: '3.8'

services:
  watchtower:
    image: containrrr/watchtower
    container_name: watchtower
    restart: unless-stopped
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - WATCHTOWER_CLEANUP=true
      - WATCHTOWER_LABEL_ENABLE=true
      - WATCHTOWER_SCHEDULE=0 */6 * * *
      - WATCHTOWER_NOTIFICATIONS=shoutrrr
      - WATCHTOWER_NOTIFICATION_URL=telegram://<token>@telegram?chats=<chat_id>
    command: --interval 3600

  glances:
    image: nicolargo/glances
    container_name: glances
    restart: unless-stopped
    ports:
      - "61208:61208"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    pid: host

  diun:
    image: crazymax/diun
    container_name: diun
    restart: unless-stopped
    volumes:
      - ./data:/data
      - /var/run/docker.sock:/var/run/docker.sock
```

### Dockge部署
打开Dockge面板 -> 创建堆栈 -> 设置堆栈名称 -> 粘贴compose代码 -> 30秒启动成功！
![](https://img.twoice.fun:666/i/2025/03/06/202503060937811-2.png)

## 四、使用说明

### Watchtower配置
- 设置`WATCHTOWER_LABEL_ENABLE=true`后，只有带`com.centurylinklabs.watchtower.enable=true`标签的容器才会被自动更新
- 使用cron表达式设置检查频率：`WATCHTOWER_SCHEDULE=0 */6 * * *`（每6小时检查一次）
- 支持Telegram通知，更新成功/失败都会推送消息

### Glances监控面板
访问`http://NAS_IP:61208`，可以看到：
- CPU/内存/磁盘实时使用率
- Docker容器运行状态
- 网络流量监控
- 进程管理

### Diun镜像通知
Diun会定期检查Docker Hub上是否有新版本镜像，并通过配置的通知渠道推送更新提醒。

## 五、避坑指南
1. **Watchtower误更新**：建议使用白名单模式，只更新指定容器
2. **通知渠道配置**：Telegram的token和chat_id需要提前准备好
3. **Glances端口冲突**：如果61208端口被占用，可以修改映射
4. **Diun数据持久化**：务必挂载./data目录，否则重启后配置丢失

## 六、总结
这套方案特别适合家里有多个Docker容器的NAS玩家，部署简单、资源占用低、功能全面。搭配Dockge使用管理体验直接拉满！

最后，奉上我的超级无敌至尊docker库，二冰平时玩过的docker都整理到了这个仓库中了，一直在更新中，希望有github账号的兄弟能去给点个star，不知道玩啥的，都去这里面找，都给你们分好类了
**仓库链接：**
https://github.com/TWO-ICE/Awesome-NAS-Docker

