---
title: 扔掉数据线！这个开源神器让你秒传文件到任何设备
published: 2026-04-01T06:33:48.804Z
description: 兄弟们，有没有遇到过这样的场景？手机拍完照片想传到电脑修图，结果数据线死活找不到；在咖啡馆想给同事传个文档，微信文件助手却卡成PPT...
image: https://img.twoice.fun:666/i/2025/08/26/202508261825971-2.png
tags: ["Docker", "协作与共享", "PairDrop"]
category: 协作与共享
draft: false
---

兄弟们，AirDrop（隔空投送）好用是好用，但只能在苹果设备之间用。想从手机传文件到电脑、从电脑传到平板...每次都要开微信发文件助手？今天二冰给你们安利一个**跨平台文件传输神器**——PairDrop！打开浏览器就能互传文件，不需要安装任何APP！

## 一、项目简介
**PairDrop**（项目地址：https://github.com/schlagmichdoch/PairDrop）是Snapdrop的增强版，一个基于WebRTC的跨平台文件传输工具。核心特点：

- 📱 **跨平台**：手机/电脑/平板，只要有浏览器就能用
- 🔒 **点对点传输**：文件不经过任何服务器，直连传输
- 🚫 **无需安装**：打开网页就能用
- 📂 **多文件传输**：支持文件夹批量传输
- 🔗 **同一网络**：同一WiFi下的设备自动发现

## 二、Docker部署教程（Dockge版）
```yaml
version: '3.8'

services:
  pairdrop:
    image: lscr.io/linuxserver/pairdrop:latest
    container_name: pairdrop
    restart: unless-stopped
    ports:
      - "8095:3000"
    environment:
      - PUID=1000
      - PGID=1000
```

### Dockge部署
打开Dockge面板 -> 创建堆栈 -> 设置堆栈名称 -> 粘贴compose代码 -> 30秒启动成功！
![](https://img.twoice.fun:666/i/2025/03/06/202503060937811-2.png)

## 三、使用指南
1. 所有设备连接同一WiFi
2. 访问`http://NAS_IP:8095`
3. 设备会自动发现彼此
4. 点击对方头像，拖拽文件即可传输

### 公网访问（可选）
如果你想在外面也能用，可以：
1. 套Cloudflare Tunnel
2. 或者配置TURN服务器实现跨网络传输

## 四、避坑指南
1. **网络要求**：局域网内使用体验最佳
2. **文件大小**：大文件传输可能较慢，取决于网络速度
3. **浏览器兼容**：推荐Chrome/Edge/Safari

## 五、总结
**推荐指数**：★★★★★  
**适合人群**：所有需要跨设备传文件的用户  
**二冰评价**：AirDrop的最佳替代品！不需要安装APP、不需要注册、不经过服务器，打开网页就能传。部署到NAS上全家共用，强烈推荐！

最后，奉上我的超级无敌至尊docker库，二冰平时玩过的docker都整理到了这个仓库中了，一直在更新中，希望有github账号的兄弟能去给点个star，不知道玩啥的，都去这里面找，都给你们分好类了
**仓库链接：**
https://github.com/TWO-ICE/Awesome-NAS-Docker

