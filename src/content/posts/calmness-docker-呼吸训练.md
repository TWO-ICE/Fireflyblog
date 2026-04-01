---
title: 三分钟快速入眠！这款呼吸训练神器必须自托管
published: 2026-04-01T06:33:48.803Z
description: 兄弟们，你是否有过这样的经历？凌晨三点瞪着天花板数羊，工作压力大到呼吸急促，辅导娃作业时心跳飙升......今天二冰给大伙儿安利个硬核解压神器——Calmness呼吸训练器！
image: https://img.twoice.fun:666/i/2025/04/08/20250408234049319-2.png
tags: ["Docker", "健康管理", "Calmness"]
category: 健康管理
draft: false
---

兄弟们，现代人压力大、焦虑多，有没有想过用技术手段来改善心理健康？今天二冰给你们安利一个**呼吸训练Web应用**——Calmness！部署在NAS上，打开浏览器就能跟着动画做呼吸练习，科学减压。

## 一、项目简介
**Calmness** 是一个极简的呼吸训练Web应用，提供：

- 🌊 **多种呼吸模式**：4-7-8呼吸法、箱式呼吸法、等比呼吸法
- 🎨 **精美动画**：跟随呼吸节奏的视觉引导
- ⏱️ **自定义时长**：自由设置训练时长
- 📱 **响应式设计**：手机/平板/电脑都能用

## 二、Docker部署教程（Dockge版）
```yaml
version: '3.8'

services:
  calmness:
    image: ghcr.io/nichochar/calmness:latest
    container_name: calmness
    restart: unless-stopped
    ports:
      - "8091:80"
```

### Dockge部署
打开Dockge面板 -> 创建堆栈 -> 设置堆栈名称 -> 粘贴compose代码 -> 30秒启动成功！
![](https://img.twoice.fun:666/i/2025/03/06/202503060937811-2.png)

## 三、使用指南
访问`http://NAS_IP:8091`，选择呼吸模式开始训练。每天5分钟，科学减压！

## 四、总结
**推荐指数**：★★★☆☆  
**适合人群**：压力大、容易焦虑的打工人  
**二冰评价**：虽然功能简单，但设计精美、用起来很舒服。部署到NAS上随时可用，比冥想APP省事多了。

最后，奉上我的超级无敌至尊docker库，二冰平时玩过的docker都整理到了这个仓库中了，一直在更新中，希望有github账号的兄弟能去给点个star，不知道玩啥的，都去这里面找，都给你们分好类了
**仓库链接：**
https://github.com/TWO-ICE/Awesome-NAS-Docker

