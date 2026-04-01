---
title: 自托管看板神器BanBan：团队协作利器，5分钟Docker极速部署！
published: 2026-04-01T06:33:48.803Z
description: 兄弟们有没有遇到过这种情况？团队任务像无头苍蝇一样乱飞，微信群消息刷屏半小时都找不到重点。二冰最近发现一款能让你彻底告别混乱的神器——自托管看板工具BanBan！
image: https://raw.gitmirror.com/TWO-ICE/image/main/week/202506261808805.png
tags: ["Docker", "项目管理", "BanBan"]
category: 项目管理
draft: false
---

兄弟们，你们有没有被甲方连续改需求改到崩溃的经历？任务管理工具换了一个又一个，Trello太简陋、Jira太复杂、Notion又太重...今天二冰给你们安利一个**轻量到极致的看板工具**——BanBan！

## 一、项目简介
**BanBan** 是一个极简风格的任务看板工具，主打轻量、快速、无干扰。没有花里胡哨的功能，就是纯粹的拖拽式看板管理：

- 📋 **看板视图**：经典的三列/多列看板
- 🏷️ **标签分类**：给任务打标签快速筛选
- 👥 **团队协作**：支持多人同时编辑
- 🌙 **深色模式**：护眼必备

## 二、Docker部署教程（Dockge版）
```yaml
version: '3.8'

services:
  banban:
    image: ghcr.io/ertyu/banban:latest
    container_name: banban
    restart: unless-stopped
    ports:
      - "8089:8080"
    volumes:
      - ./data:/data
```

### Dockge部署
打开Dockge面板 -> 创建堆栈 -> 设置堆栈名称 -> 粘贴compose代码 -> 30秒启动成功！
![](https://img.twoice.fun:666/i/2025/03/06/202503060937811-2.png)

## 三、使用指南
访问`http://NAS_IP:8089`，注册账号即可开始使用：

1. 创建看板
2. 添加列表（待办/进行中/已完成）
3. 添加任务卡片
4. 拖拽卡片在不同列表间移动

## 四、总结
**推荐指数**：★★★☆☆  
**适合人群**：个人任务管理、小团队轻量协作  
**二冰评价**：够简单够轻量，适合不想被复杂工具绑架的兄弟。资源占用极低，随便一个VPS都能跑。

最后，奉上我的超级无敌至尊docker库，二冰平时玩过的docker都整理到了这个仓库中了，一直在更新中，希望有github账号的兄弟能去给点个star，不知道玩啥的，都去这里面找，都给你们分好类了
**仓库链接：**
https://github.com/TWO-ICE/Awesome-NAS-Docker

