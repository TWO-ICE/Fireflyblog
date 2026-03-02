---
title: Docker一键部署！打造你的私人知识库神器
published: 2026-03-02T02:08:00.000Z
description: 兄弟们，还在为碎片化知识管理发愁？今天二冰带来一款本地优先、支持双向链接的知识管理神器——思源笔记！程序员、知识工作者必看，手把手教你用Docker三分钟搭建私有知识库！
image: https://img.twoice.fun:666/i/2025/03/16/tmpiuxbas22-2.png
tags: [Docker, 笔记工具, 知识库, 思源笔记]
category: 笔记知识库
draft: false
---

# Docker一键部署！打造你的私人知识库神器

兄弟们，还在为碎片化知识管理发愁？今天二冰带来一款**本地优先、支持双向链接**的知识管理神器——**思源笔记**！程序员、知识工作者必看，手把手教你用Docker三分钟搭建私有知识库！

## 项目简介
**思源笔记**（GitHub项目地址：https://github.com/siyuan-note/siyuan）是一款专为深度思考设计的本地化知识管理系统。支持Markdown实时渲染、块级引用、跨设备同步，数据完全存储在本地硬盘，彻底摆脱云端隐私焦虑！

---

## 三大核心优势
1. **隐私安全**：数据加密存储本地，杜绝云端泄露风险  
2. **双向链接**：构建知识图谱，轻松实现笔记网状关联  
3. **全平台覆盖**：Web端+桌面客户端+浏览器插件全家桶  

---

## 极简部署流程（Dockge版）

### 1. 准备docker-compose.yml
```yaml
version: '3'
services:
  siyuan:
    image: b3log/siyuan
    container_name: siyuan
    ports:
      - "6806:6806"
    volumes:
      - /your_local_path/siyuan:/root/Documents/SiYuan
    command: 
      - "--servePath=your_domain.com"  # 改成你的域名或IP
      - "--ssl=true"                   # 启用HTTPS需配置反代
    restart: unless-stopped
```

### 2. Dockge一键部署
打开`Dockge`面板 -> `创建堆栈` -> 设置`堆栈`名称 -> 粘贴`compose`代码 -> 30秒`启动`成功！
![](https://img.twoice.fun:666/i/2025/03/06/202503060937811-2.png)


## 实战功能演示
### ① Markdown沉浸写作
![实时渲染效果](https://img.twoice.fun:666/i/2025/03/16/tmpiuxbas22-2.png)  
直接拖拽图片自动上传，代码块支持100+语言高亮

### ② 知识图谱可视化

通过[[ ]]快速创建笔记关联，自动生成知识关系网

### ③ 浏览器速记神器
安装思源Chrome插件（插件地址：https://chrome.google.com/webstore/detail/siyuan/），网页内容一键收藏到知识库：


## 避坑指南
**反向代理配置要点**：  
```nginx
# Nginx示例配置
location / {
    proxy_pass http://localhost:6806;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```
记得开启WebSocket支持，否则会出现连接异常！

---

## 总结推荐
经过实测，思源笔记堪称**程序员的知识管理瑞士军刀**。适合以下场景：  
✅ 需要离线使用的技术文档库  
✅ 搭建个人第二大脑知识体系  
✅ 多设备间安全同步敏感资料  

免费版已足够个人使用，团队协作建议购买订阅解锁云端同步。想打造私有知识库的兄弟，赶紧动手部署吧！

最后，奉上我的超级无敌至尊docker库，二冰平时玩过的docker都整理到了这个仓库中了，一直在更新中，希望有github账号的兄弟能去给点个star，不知道玩啥的，都去这里面找，都给你们分好类了

**仓库链接：**
https://github.com/TWO-ICE/Awesome-NAS-Docker

如果觉得教程有用，记得点赞收藏，评论区交作业的兄弟优先推荐涨粉！
