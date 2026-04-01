---
title: 抛弃谷歌分析！自建1KB超轻量网站统计神器，数据隐私全掌握
published: 2026-04-01T06:33:48.803Z
description: 兄弟们有没有遇到过这种情况？想看看自己博客的访问数据，用谷歌分析总担心用户隐私泄露，国内统计工具又动不动给你塞广告。今天二冰给大家安利个开源神器——Plausible Analytics！
image: https://img.twoice.fun:666/i/2025/09/19/202509191346618-2.png
tags: ["Docker", "分析与可视化", "Plausible Analytics"]
category: 分析与可视化
draft: false
---

兄弟们，做独立博客/网站的肯定都知道Google Analytics，但你不觉得它越来越重了吗？页面加载慢、隐私合规头疼、数据还要存在Google服务器上...今天二冰给你们安利一个**Google Analytics的开源替代品**——Plausible Analytics！轻量、隐私友好、自托管！

## 一、项目简介
**Plausible Analytics**（项目地址：https://github.com/plausible/analytics）是一个轻量级网站分析工具。核心优势：

- 🔒 **隐私友好**：不需要Cookie，符合GDPR/CCPA
- ⚡ **超轻量**：追踪脚本仅1KB，对网站性能零影响
- 🏠 **自托管**：数据完全在你自己的服务器上
- 📊 **简洁仪表盘**：数据直观，无广告无杂乱
- 🔍 **精准分析**：访客来源、页面浏览、转化率一目了然

## 二、Docker部署教程（Dockge版）
```yaml
version: '3.8'

services:
  plausible_db:
    image: postgres:16-alpine
    container_name: plausible-db
    restart: unless-stopped
    volumes:
      - ./postgres-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=postgres

  plausible_events:
    image: clickhouse/clickhouse-server:latest
    container_name: plausible-events
    restart: unless-stopped
    volumes:
      - ./clickhouse-data:/var/lib/clickhouse
      - ./clickhouse-config.xml:/etc/clickhouse-server/config.d/custom.xml

  plausible:
    image: plausible/analytics:latest
    container_name: plausible
    restart: unless-stopped
    ports:
      - "8000:8000"
    depends_on:
      - plausible_db
      - plausible_events
    environment:
      - BASE_URL=http://NAS_IP:8000
      - SECRET_KEY_BASE=your-secret-key-here
      - DATABASE_URL=postgres://postgres:postgres@plausible_db:5432/plausible_db
      - CLICKHOUSE_DATABASE_URL=http://plausible_events:8123/plausible_events_db
```

### Dockge部署
打开Dockge面板 -> 创建堆栈 -> 设置堆栈名称 -> 粘贴compose代码 -> 约1分钟启动成功！
![](https://img.twoice.fun:666/i/2025/03/06/202503060937811-2.png)

## 三、使用指南
1. 访问`http://NAS_IP:8000`注册账号
2. 添加你的网站域名
3. 获取追踪代码并添加到网站`<head>`中
4. 开始查看数据

### 追踪代码示例
```html
<script defer data-domain="yourdomain.com" src="http://NAS_IP:8000/js/script.js"></script>
```

## 四、避坑指南
1. **BASE_URL**：务必设置为你实际访问的地址
2. **SECRET_KEY**：用随机字符串，不要用默认值
3. **SSL证书**：生产环境建议套HTTPS
4. **数据备份**：定期备份PostgreSQL和ClickHouse数据

## 五、总结
**推荐指数**：★★★★★  
**适合人群**：有自托管博客/网站的独立开发者、注重隐私的站长  
**二冰评价**：Google Analytics的最佳替代品！轻量、隐私友好、界面简洁。如果你的博客也在Vercel上，强烈推荐搭配使用！

最后，奉上我的超级无敌至尊docker库，二冰平时玩过的docker都整理到了这个仓库中了，一直在更新中，希望有github账号的兄弟能去给点个star，不知道玩啥的，都去这里面找，都给你们分好类了
**仓库链接：**
https://github.com/TWO-ICE/Awesome-NAS-Docker

