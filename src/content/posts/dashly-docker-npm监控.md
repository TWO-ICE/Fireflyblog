---
title: 五分钟搞定NPM监控！这款实时仪表盘堪称运维神器
published: 2026-04-01T06:33:48.803Z
description: 兄弟们是不是经常为了监控Nginx Proxy Manager的服务状态抓耳挠腮？今天二冰给大家安利个开箱即用的好东西——Dashly实时仪表盘！
image: https://img.twoice.fun:666/i/2025/03/16/tmppvzot1gt-2.png
tags: ["Docker", "资源监控", "Dashly"]
category: 资源监控
draft: false
---

兄弟们，作为开发者，你是不是经常担心自己发布的npm包被恶意下载、供应链攻击、或者突然多了几万个奇怪的下载量？今天二冰给你们安利一个**npm包监控神器**——Dashly！实时监控你的npm包下载量、版本分布、依赖关系，让你对自己的包了如指掌。

## 一、项目简介
**Dashly** 是一个自托管的npm包监控面板，帮你追踪：

- 📊 **实时下载量**：按天/周/月统计
- 🌍 **地域分布**：看看你的包在哪些国家最受欢迎
- 📦 **版本分析**：各版本的使用占比
- 🔗 **依赖追踪**：谁在用你的包

## 二、Docker部署教程（Dockge版）
```yaml
version: '3.8'

services:
  dashly:
    image: ghcr.io/nichochar/dashly:latest
    container_name: dashly
    restart: unless-stopped
    ports:
      - "8090:3000"
    environment:
      - NEXTAUTH_SECRET=your-secret-here
      - NEXTAUTH_URL=http://localhost:8090
```

### Dockge部署
打开Dockge面板 -> 创建堆栈 -> 设置堆栈名称 -> 粘贴compose代码 -> 30秒启动成功！
![](https://img.twoice.fun:666/i/2025/03/06/202503060937811-2.png)

## 三、使用指南
1. 访问`http://NAS_IP:8090`
2. 注册/登录账号
3. 添加你要监控的npm包名
4. 查看实时数据面板

## 四、总结
**推荐指数**：★★★☆☆  
**适合人群**：发布过npm包的前端/Node.js开发者  
**二冰评价**：如果你是开源作者，这个工具能帮你更好地了解用户分布和使用情况。部署简单，功能聚焦。

最后，奉上我的超级无敌至尊docker库，二冰平时玩过的docker都整理到了这个仓库中了，一直在更新中，希望有github账号的兄弟能去给点个star，不知道玩啥的，都去这里面找，都给你们分好类了
**仓库链接：**
https://github.com/TWO-ICE/Awesome-NAS-Docker

