---
title: Docker实战：手把手教你打造私人数字收藏馆
published: 2026-03-02T02:10:00.000Z
description: 兄弟们有没有这样的烦恼？连环画堆满书柜找不到想看的、游戏光碟散落各处、邮票收藏混杂难寻...今天二冰给大家安利一款能让你所有实体收藏数字化的神器——Koillection，三分钟教会你如何用Docker搭建专属收藏管理系统！
image: https://img.twoice.fun:666/i/2025/03/16/tmp5n_4r22n-2.png
tags: [Docker, 收藏管理, 效率工具, Koillection]
category: 效率工具
draft: false
---

# Docker实战：手把手教你打造私人数字收藏馆

兄弟们有没有这样的烦恼？连环画堆满书柜找不到想看的、游戏光碟散落各处、邮票收藏混杂难寻...今天二冰给大家安利一款能让你所有实体收藏数字化的神器——**Koillection**，三分钟教会你如何用Docker搭建专属收藏管理系统！

## 一、项目简介
**Koillection**（项目地址：https://github.com/koillection/koillection）是一款开源的自托管收藏管理器，支持书籍、DVD、邮票、游戏卡带等任意实体物品管理。虽然界面朴素但功能硬核，特别适合技术宅打造个性化藏品数据库。

## 二、四大核心优势
1. **百变字段自定义**：自由添加书名、ISBN、品相等专属字段
2. **跨平台图片存储**：上传藏品实物图，云端永久保存
3. **多级分类体系**：支持Collection→Item两级分类管理
4. **零元购开源方案**：无需订阅费，部署在自家NAS更安全

## 三、Dockge极简部署
打开`Dockge`面板 -> `创建堆栈` -> 设置`堆栈`名称 -> 粘贴`compose`代码 -> 30秒`启动`成功！
![](https://img.twoice.fun:666/i/2025/03/06/202503060937811-2.png)

```yaml
version: '3'
services:
  web:
    image: koillection/koillection:latest
    ports:
      - "4081:80"
    volumes:
      - ./uploads:/var/www/koillection/public/uploads
    environment:
      - DB_DRIVER=pdo_pgsql
      - DB_NAME=koillection
      - DB_HOST=db
      - DB_USER=postgres
      - DB_PASSWORD=yourpassword
    depends_on:
      - db

  db:
    image: postgres:15
    volumes:
      - ./data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=koillection
      - POSTGRES_PASSWORD=yourpassword
```

## 四、实战操作演示

### 1. 创建收藏大类
点击【+Collection】创建"连环画"分类，支持自定义图标和说明：

![创建分类](https://img.twoice.fun:666/i/2025/03/16/tmp5n_4r22n-2.png)

### 2. 添加藏品详情
在分类下新建《三国演义》条目：
- 上传封面图
- 填写出版年份、品相、库存位置
- 添加自定义备注字段

![添加藏品](https://img.twoice.fun:666/i/2025/03/16/tmpqeh4ng0p-2.png)

### 3. 高级玩法
- 批量导入CSV数据
- 设置借出/归还状态
- 生成藏品统计报表

## 五、避坑指南
1. 上传目录需设置777权限
2. 中文界面需手动汉化（官方暂不支持）
3. 建议配合Nginx反代开启HTTPS

## 六、总结点评
**适合人群**：实体收藏爱好者/游戏宅/小型图书馆  
**推荐指数**：⭐⭐⭐（扣分项：界面复古、无自动元数据抓取）  
**替代方案**：Calibre（专精书籍）、GameEye（专注游戏）

虽然颜值不够惊艳，但胜在自由度高。二冰已经用它管理了500+连环画，再也不用担心找不到藏品啦！想打造私人数字博物馆的兄弟，赶紧动手试试吧~

最后，奉上我的超级无敌至尊docker库，二冰平时玩过的docker都整理到了这个仓库中了，一直在更新中，希望有github账号的兄弟能去给点个star，不知道玩啥的，都去这里面找，都给你们分好类了

**仓库链接：**
https://github.com/TWO-ICE/Awesome-NAS-Docker

觉得有用的话记得点赞收藏，欢迎在评论区交流使用心得！
