---
title: 浏览器秒变电视！这款开源Web-IPTV神器让你扔掉机顶盒
published: 2026-04-01T06:33:48.804Z
description: 兄弟们，最近发现一款能把浏览器变成网络电视的神器！只需一个Docker容器，就能在电脑、平板甚至智能电视上畅看全球直播频道！
image: https://img.twoice.fun:666/i/2025/05/11/202505111716781-2.png
tags: ["Docker", "流媒体服务", "StreamDock"]
category: 流媒体服务
draft: false
---

兄弟们，家里有电视盒子的注意了！今天二冰给你们安利一个**IPTV直播源管理神器**——StreamDock！这玩意儿能自动抓取、测试、整理全网IPTV直播源，部署到NAS上，手机/电视/电脑随时看直播！

## 一、项目简介
**StreamDock** 是一个IPTV直播源管理和播放平台。核心功能：

- 📺 **直播源管理**：自动抓取和更新直播源
- 🔍 **源质量检测**：自动测试源的可用性和速度
- 📋 **频道分类**：央视、卫视、地方台自动分类
- 🎬 **在线播放**：内置播放器，打开浏览器就能看
- 📱 **多端支持**：生成M3U文件，支持各种播放器

## 二、Docker部署教程（Dockge版）
```yaml
version: '3.8'

services:
  streamdock:
    image: ghcr.io/nichochar/streamdock:latest
    container_name: streamdock
    restart: unless-stopped
    ports:
      - "8093:8080"
    volumes:
      - ./data:/app/data
```

### Dockge部署
打开Dockge面板 -> 创建堆栈 -> 设置堆栈名称 -> 粘贴compose代码 -> 30秒启动成功！
![](https://img.twoice.fun:666/i/2025/03/06/202503060937811-2.png)

## 三、使用指南
1. 订阅直播源地址
2. 系统自动解析和分类频道
3. 点击频道即可在线观看
4. 导出M3U文件给其他播放器使用

## 四、避坑指南
1. **直播源质量**：免费源不稳定，建议多订阅几个源
2. **网络要求**：直播需要较好的上行带宽
3. **播放器兼容**：推荐用VLC或PotPlayer播放

## 五、总结
**推荐指数**：★★★★☆  
**适合人群**：家里有电视盒子、喜欢看直播的兄弟  
**二冰评价**：直播源管理的最佳方案！自动更新+质量检测+分类整理，省去了手动维护的烦恼。

最后，奉上我的超级无敌至尊docker库，二冰平时玩过的docker都整理到了这个仓库中了，一直在更新中，希望有github账号的兄弟能去给点个star，不知道玩啥的，都去这里面找，都给你们分好类了
**仓库链接：**
https://github.com/TWO-ICE/Awesome-NAS-Docker

