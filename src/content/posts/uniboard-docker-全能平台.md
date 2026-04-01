---
title: Docker神器！一键自建导航+网盘+短链全能平台
published: 2026-04-01T06:33:48.804Z
description: 兄弟们，二冰今天要给大家安利一个能替代5个工具的Docker神器——UniBoard！这玩意儿直接把个人主页、导航页、云笔记、短链服务和文件分享整合到一个平台！
image: https://img.twoice.fun:666/i/2025/04/20/202504201102220-2.png
tags: ["Docker", "信息聚合", "UniBoard"]
category: 信息聚合
draft: false
---

兄弟们，今天二冰给你们安利一个**NAS全能平台**——UniBoard！这玩意儿集成了书签管理、RSS阅读、笔记、待办事项等十几种功能，部署一个容器就等于装了一整套效率工具箱！

## 一、项目简介
**UniBoard** 是一个集成了多种效率工具的一站式Web平台。核心功能：

- 📑 **书签管理**：收藏网址、自动抓取网页信息
- 📰 **RSS阅读器**：订阅博客和新闻源
- 📝 **笔记系统**：Markdown笔记支持
- ✅ **待办事项**：任务管理和提醒
- 🔖 **稍后阅读**：保存想看的文章

## 二、Docker部署教程（Dockge版）
```yaml
version: '3.8'

services:
  uniboard:
    image: ghcr.io/nichochar/uniboard:latest
    container_name: uniboard
    restart: unless-stopped
    ports:
      - "8092:3000"
    volumes:
      - ./data:/app/data
```

### Dockge部署
打开Dockge面板 -> 创建堆栈 -> 设置堆栈名称 -> 粘贴compose代码 -> 30秒启动成功！
![](https://img.twoice.fun:666/i/2025/03/06/202503060937811-2.png)

## 三、使用指南
访问`http://NAS_IP:8092`，注册账号即可使用所有功能。

## 四、总结
**推荐指数**：★★★☆☆  
**适合人群**：喜欢All in One工具的效率控  
**二冰评价**：功能丰富但每个功能都不算深度。适合轻量使用，重度用户建议用专业工具。

最后，奉上我的超级无敌至尊docker库，二冰平时玩过的docker都整理到了这个仓库中了，一直在更新中，希望有github账号的兄弟能去给点个star，不知道玩啥的，都去这里面找，都给你们分好类了
**仓库链接：**
https://github.com/TWO-ICE/Awesome-NAS-Docker

