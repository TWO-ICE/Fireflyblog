---
title: 开源笔记神器Benotes：Docker一键部署，打造私人知识库
published: 2026-03-01T06:47:00.000Z
description: 兄弟们有没有这种体验？每天收藏的网页散落各处，技术文档、解决方案、好文推荐想用时死活找不到。今天二冰给大家安利个开源神器——Benotes，用Docker十分钟自建知识库，网页自动抓取标题/配图，支持Markdown双编辑器，手机电脑全平台同步！
image: https://img.twoice.fun:666/i/2025/03/16/tmpzxle4qz7-2.png
tags: [Docker, 知识库, 笔记, Markdown]
category: AI应用工具
draft: false
---

# 开源笔记神器Benotes：Docker一键部署，打造私人知识库

兄弟们有没有这种体验？每天收藏的网页散落各处，技术文档、解决方案、好文推荐想用时死活找不到。今天二冰给大家安利个开源神器——**Benotes**，用Docker十分钟自建知识库，网页自动抓取标题/配图，支持Markdown双编辑器，手机电脑全平台同步！

## 项目简介

**Benotes**（项目地址：https://github.com/fr0tt/benotes）是一款开源自托管笔记工具，主打三大核心功能：
- 🚩 智能书签：粘贴链接自动抓取标题/描述/配图
- 📝 双编辑器：Markdown和富文本自由切换
- 🔄 全平台同步：PWA渐进式网页应用，手机电脑即开即用

## 五大必装理由

1. **智能解析黑科技**  
   粘贴CSDN文章链接自动生成带封面的知识卡片，再也不用手动整理书签

2. **军工级数据掌控**  
   支持SQLite/MariaDB双数据库，可对接阿里云OSS存储敏感数据

3. **团队协作利器**  
   通过公开链接分享收藏夹，开发文档/项目资料一键同步组员

4. **零门槛部署**  
   Docker镜像仅123MB，1核1G小服务器流畅运行

5. **隐私安全无忧**  
   自建服务彻底告别第三方数据泄露风险

## 极速部署指南（Dockge方案）

### 1. 准备docker-compose.yml

```yaml
version: "3.6"

services:
  benotes:
    image: fr0tt/benotes
    container_name: benotes
    restart: unless-stopped
    environment:
      APP_PORT: 8347
      DB_CONNECTION: mysql
      DB_HOST: 192.168.1.100 # 修改为数据库IP
      DB_PORT: 3306
      DB_DATABASE: benotes
      DB_USERNAME: root
      DB_PASSWORD: yourpassword
      APP_KEY: 7aGLzKFJTCkTkbLuJ3BoU3kNjkv6t67GWrC2izhrf9yEPTREvgeHJ2cMSptmuGnU
    ports:
      - 8347:80
    volumes:
      - ./data:/var/www/storage
```

### 2. Dockge可视化部署

打开`Dockge`面板 -> `创建堆栈` -> 设置`堆栈`名称 -> 粘贴`compose`代码 -> 30秒`启动`成功！

![](https://img.twoice.fun:666/i/2025/03/06/202503060937811-2.png)

**启动后执行初始化命令**：

```bash
docker exec -it benotes sh
php artisan migrate
php artisan install --only-user
```

## 实战操作演示

### ① 智能收藏CSDN文章

![在这里插入图片描述](https://img.twoice.fun:666/i/2025/03/16/tmpqoae5whb-2.png)

直接粘贴文章链接，自动生成带摘要的卡片式笔记，技术方案整理效率翻倍！

### ② Markdown+富文本双模式

![在这里插入图片描述](https://img.twoice.fun:666/i/2025/03/16/tmpzxle4qz7-2.png)

写技术文档用Markdown，临时记录切富文本，完美适应不同场景

### ③ 多级分类管理

![在这里插入图片描述](https://img.twoice.fun:666/i/2025/03/16/tmpnycgyfzn-2.png)

支持无限层级标签系统，SpringBoot教程/Linux命令/面试题库清晰归类

## 避坑指南

⚠️ 国内用户需注意：
1. 部分CDN图片加载需科学上网
2. 首次启动需执行数据库迁移命令
3. 推荐使用MariaDB避免SQLite锁表

## 总结建议

作为一款测试版应用，Benotes在UI交互上略有粗糙，但其**智能解析+双编辑器**的核心体验已足够惊艳。适合以下人群：

✅ 需要整理技术资料库的开发者
✅ 注重数据隐私的极客用户
✅ 寻找开源替代品的印象笔记难民

兄弟们如果受够了收藏夹杂乱无章，不妨花十分钟部署体验。项目仍在快速迭代中，期待更多惊喜功能！如果觉得教程有用，别忘了点赞收藏，欢迎在评论区交流使用心得！

最后，奉上我的超级无敌至尊docker库，二冰平时玩过的docker都整理到了这个仓库中了，一直在更新中，希望有github账号的兄弟能去给点个star，不知道玩啥的，都去这里面找，都给你们分好类了

**仓库链接：**
https://github.com/TWO-ICE/Awesome-NAS-Docker
