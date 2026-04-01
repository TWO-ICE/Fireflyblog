---
title: 自己搭个邮件系统！这个Docker神器让你告别付费邮件平台
published: 2026-04-01T02:30:00.000Z
description: 你有没有想过自己发邮件通知？比如NAS硬盘满了自动发邮件提醒、Docker容器挂了自动告警、博客有新评论邮件通知...今天这个Docker工具让你拥有自己的邮件系统，群发 newsletters 也不在话下！
image: https://img.twoice.fun:666/i/2025/03/16/tmp3dgv8o04-2.png
tags: [Docker, 邮件系统, 自动化, 自托管]
category: Docker实战
draft: false
---

# 自己搭个邮件系统！这个Docker神器让你告别付费邮件平台

你有没有想过自己发邮件通知？比如 NAS 硬盘满了自动发邮件提醒、Docker 容器挂了自动告警、博客有新评论邮件通知...今天这个 Docker 工具让你拥有自己的邮件系统，群发 newsletters 也不在话下！

## 项目简介

今天安利的是 **Listmonk**，项目地址：https://github.com/knadh/listmonk。这是一个高性能的开源邮件列表管理系统，用 Go 和 Vue 写的，单二进制文件部署，资源占用极低。它集成了邮件编辑器、订阅管理、列表分组、模板引擎、数据分析等功能，比 Mailchimp 强还免费。

## 五大核心优势

1. **功能媲美 Mailchimp**：可视化邮件编辑器、订阅者管理、列表分组、A/B 测试...付费平台有的它都有
2. **高性能低资源**：Go 编写，内存占用不到 100MB，轻松处理百万级订阅者
3. **API 丰富**：完整的 REST API，可以和 n8n、Home Assistant 等自动化工具无缝对接
4. **完全免费**：没有发送数量限制，没有订阅者数量限制，没有功能限制
5. **现代化界面**：管理后台做得很漂亮，操作流畅，比很多付费工具还好用

## 保姆级部署教程

### 第一步：准备 SMTP 服务

Listmonk 本身不发送邮件，需要一个 SMTP 服务。推荐几个选择：
- **免费方案**：Resend（每月 3000 封免费）、Mailgun（每月 1000 封免费）
- **自建方案**：用 Docker 部署 Postfix + DKIM（适合有固定 IP 的 VPS）
- **国内方案**：阿里云邮件推送、腾讯 SES

### 第二步：Dockge 一键部署

打开 `Dockge` 面板 -> `创建堆栈` -> 设置 `堆栈` 名称 -> 粘贴 `compose` 代码 -> 30秒 `启动` 成功！

新建 `docker-compose.yml` 文件，把下面配置贴进去：

```yaml
version: '3'
services:
  listmonk:
    image: listmonk/listmonk:latest
    container_name: listmonk
    restart: unless-stopped
    ports:
      - 9000:9000
    volumes:
      - ./data:/listmonk/data
```

### 第三步：初始化配置

1. 浏览器访问 `http://你的IP:9000`
2. 默认账号：`listmonk` / `listmonk`
3. **登录后立刻改密码！**
4. 进入 `Settings -> Mail Server`，配置 SMTP：
   - Host：SMTP 服务器地址
   - Port：587
   - Username：SMTP 用户名
   - Password：SMTP 密码
   - From Email：发件人邮箱
5. 点击 `Test` 测试发送，收到测试邮件说明配置成功

## 实战演示

### 创建订阅列表

你可以创建多个列表，比如："NAS 用户"、"博客读者"、"项目更新通知"。每个列表独立管理订阅者，互不干扰。

### 编写邮件

内置了一个超好用的邮件编辑器，支持：
- 可视化拖拽排版
- 插入图片、按钮、分割线
- 自定义 HTML 模板
- 预览手机端和桌面端效果

### 自动化触发

Listmonk 的 API 可以和 n8n 配合使用，实现各种自动化场景：
- 博客发布新文章 -> 自动发邮件通知订阅者
- NAS 硬盘使用率超过 80% -> 自动发告警邮件
- Docker 容器异常重启 -> 自动发邮件给管理员
- 每周一早上 -> 自动发送本周待办清单

### 数据分析

发送完邮件后，可以查看：
- 发送成功率
- 打开率
- 点击率
- 退订人数
- 跳出率

数据看板做得很清晰，比 Mailchimp 的还直观。

## 总结建议

这个工具特别适合：
✅ 有博客/公众号想发邮件通知的人
✅ 需要 NAS 自动告警邮件的用户
✅ 想替代 Mailchimp 省钱的个人/小团队
✅ 自动化爱好者（配合 n8n 简直无敌）

需要注意：
⚠️ 发送邮件需要配置 SMTP 服务，不能直接发
⚠️ 如果自建 SMTP，注意配置 SPF/DKIM/DMARC，否则容易进垃圾箱
⚠️ 建议配合反向代理使用，外网访问更方便

兄弟们，有了 Listmonk 之后，我终于有了自己的邮件通知系统。NAS 出问题了自动告警、博客更新自动通知、还可以给自己的小项目发 newsletters。配合 n8n 用起来简直起飞，自动化玩家的必备神器！

如果觉得有用，记得在评论区扣个 666，收藏点赞走一波！

最后，奉上我的超级无敌至尊 Docker 库，二冰平时玩过的 Docker 都整理到了这个仓库中了，一直在更新中，希望有 GitHub 账号的兄弟能去给点个 star，不知道玩啥的，都去这里面找，都给你们分好类了

**仓库链接：**
https://github.com/TWO-ICE/Awesome-NAS-Docker
