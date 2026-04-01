---
title: 肥羊AllInOne绝配！可视化IPTV直播源格式化神器来了
published: 2026-04-01T06:33:48.804Z
description: 兄弟们，最近是不是总被家里老人吐槽电视直播卡顿？刚找到的源没两天就失效？今天二冰给大家安利一个能彻底解决直播源维护难题的神器——allinone_format！
image: https://img.twoice.fun:666/i/2025/03/16/tmpxsaji7f2-2.png
tags: ["Docker", "流媒体服务", "allinone_format"]
category: 流媒体服务
draft: false
---

兄弟们，看IPTV直播最头疼的就是直播源质量参差不齐，今天能看明天就挂。今天二冰给你们安利一个**IPTV直播源自动整理神器**——allinone-format！这玩意儿能把多个直播源合并、去重、测速、排序，生成一个高质量的综合源！

## 一、项目简介
**allinone-format** 是一个IPTV直播源格式化和整理工具。核心功能：

- 🔗 **多源合并**：合并多个直播源为一个文件
- 🔄 **自动去重**：移除重复的频道
- ⚡ **速度测试**：自动测试每个频道的响应速度
- 📋 **格式转换**：支持TXT/M3U等多种格式互转
- 🏷️ **智能分类**：自动按央视/卫视/地方台分类

## 二、Docker部署教程（Dockge版）
```yaml
version: '3.8'

services:
  allinone:
    image: ghcr.io/nichochar/allinone:latest
    container_name: allinone
    restart: unless-stopped
    ports:
      - "8094:8080"
    volumes:
      - ./data:/app/data
```

### Dockge部署
打开Dockge面板 -> 创建堆栈 -> 设置堆栈名称 -> 粘贴compose代码 -> 30秒启动成功！
![](https://img.twoice.fun:666/i/2025/03/06/202503060937811-2.png)

## 三、使用指南
1. 输入多个直播源URL
2. 点击「合并整理」
3. 系统自动去重、测速、排序
4. 下载整理后的直播源文件

## 四、总结
**推荐指数**：★★★★☆  
**适合人群**：使用IPTV直播、需要维护直播源的用户  
**二冰评价**：配合StreamDock使用效果更佳！一个管理播放，一个整理源，黄金搭档。

最后，奉上我的超级无敌至尊docker库，二冰平时玩过的docker都整理到了这个仓库中了，一直在更新中，希望有github账号的兄弟能去给点个star，不知道玩啥的，都去这里面找，都给你们分好类了
**仓库链接：**
https://github.com/TWO-ICE/Awesome-NAS-Docker

