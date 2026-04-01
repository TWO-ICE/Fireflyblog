---
title: 手残党福音！Docker部署网页版YouTube下载神器，支持多平台VIP解析
published: 2026-04-01T06:33:48.803Z
description: 兄弟们，你们有没有遇到过这种情况？看到YouTube上的4K烹饪教学视频想保存，结果折腾半天命令行；想下载B站UP主的付费课程，却发现平台限制下载。
image: https://img.twoice.fun:666/i/2025/03/16/tmpi9y20k1f-2.png
tags: ["Docker", "视频处理", "yt-dlp-web"]
category: 视频处理
draft: false
---

兄弟们，今天二冰给你们带来一个**B站/YouTube视频下载神器**——yt-dlp-web！这玩意儿把命令行工具yt-dlp包装成了漂亮的网页界面，打开浏览器就能下载视频，支持B站、YouTube、推特等1000+网站，还能自动提取音频！

## 一、项目简介
**yt-dlp-web** 是yt-dlp的Web前端，让你不用敲命令行就能下载全网视频。支持：

- 🎬 **1000+网站**：B站、YouTube、Twitter、抖音、Ins等
- 🎵 **音频提取**：一键提取MP3
- 📱 **多种格式**：MP4/MP3/WEBM可选
- 🚀 **批量下载**：支持播放列表批量下载

## 二、Docker部署教程（Dockge版）
```yaml
version: '3.8'

services:
  yt-dlp-web:
    image: nickinv/yt-dlp-web:latest
    container_name: yt-dlp-web
    restart: unless-stopped
    ports:
      - "8088:8080"
    volumes:
      - ./downloads:/app/downloads
      - ./config:/app/config
```

### Dockge部署
打开Dockge面板 -> 创建堆栈 -> 设置堆栈名称 -> 粘贴compose代码 -> 30秒启动成功！
![](https://img.twoice.fun:666/i/2025/03/06/202503060937811-2.png)

## 三、使用指南
访问`http://NAS_IP:8088`，粘贴视频链接即可下载：

1. 复制B站/YouTube视频链接
2. 粘贴到输入框
3. 选择画质和格式
4. 点击下载

下载完成的文件保存在`./downloads`目录中，可以通过NAS的文件管理器直接访问。

## 四、避坑指南
1. **B站下载**：需要配合cookies使用，否则部分视频无法下载
2. **磁盘空间**：4K视频文件很大，注意预留足够空间
3. **下载速度**：取决于你的网络环境和视频源服务器
4. **版权提醒**：仅供个人学习使用，请勿商用

## 五、总结
**推荐指数**：★★★★☆  
**适合人群**：经常下载视频做素材的创作者、离线看视频的网盘玩家  
**二冰评价**：部署简单，网页界面友好，比敲命令行舒服多了。推荐每个NAS都装一个！

最后，奉上我的超级无敌至尊docker库，二冰平时玩过的docker都整理到了这个仓库中了，一直在更新中，希望有github账号的兄弟能去给点个star，不知道玩啥的，都去这里面找，都给你们分好类了
**仓库链接：**
https://github.com/TWO-ICE/Awesome-NAS-Docker

