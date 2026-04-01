---
title: Docker神器！一键搭建私人文件保险库Chibisafe
published: 2026-04-01T06:33:48.803Z
description: 兄弟们有没有遇到过这样的场景？手机里的照片快撑爆存储空间，想找个私人图床存放；工作文档需要在多设备同步，但总担心网盘泄露隐私...
image: https://img.twoice.fun:666/i/2025/03/16/tmp_tepo3lf-2.png
tags: ["Docker", "存储方案", "Chibisafe"]
category: 存储方案
draft: false
---

兄弟们，今天二冰给你们安利一个**NAS文件分享天花板**——Chibisafe！这玩意儿能把你的NAS变成一个私人文件保险库+分享平台，支持拖拽上传、自动生成分享链接、文件加密、过期时间设置...而且界面颜值拉满！

## 一、项目简介
**Chibisafe**（项目地址：https://github.com/chibisafe/chibisafe）是一个自托管的文件托管和分享平台。核心功能：

- 📤 **拖拽上传**：支持多文件、文件夹拖拽上传
- 🔗 **一键分享**：自动生成短链接，支持密码保护和过期时间
- 🖼️ **图片预览**：在线预览图片、视频、PDF
- 📊 **使用统计**：查看文件下载次数、存储使用量
- 👥 **多用户支持**：可为不同用户设置配额和权限

## 二、Docker部署教程（Dockge版）
```yaml
version: '3.8'

services:
  chibisafe:
    image: ghcr.io/chibisafe/chibisafe:latest
    container_name: chibisafe
    restart: unless-stopped
    ports:
      - "8081:8000"
    volumes:
      - ./uploads:/uploads
      - ./database:/app/database
    environment:
      - DATABASE_URL=file:/app/database/chibisafe.db
```

### Dockge部署
打开Dockge面板 -> 创建堆栈 -> 设置堆栈名称 -> 粘贴compose代码 -> 30秒启动成功！
![](https://img.twoice.fun:666/i/2025/03/06/202503060937811-2.png)

## 三、使用指南
1. 访问`http://NAS_IP:8081`
2. 注册管理员账号
3. 开始上传和分享文件

### 分享功能
- 设置密码保护
- 设置过期时间
- 限制下载次数
- 自定义文件名

## 四、避坑指南
1. **文件大小限制**：Nginx默认限制1MB，大文件需调整配置
2. **存储路径**：确保uploads目录所在磁盘空间充足
3. **反向代理**：建议套Cloudflare或Nginx Proxy Manager

## 五、总结
**推荐指数**：★★★★☆  
**适合人群**：经常分享大文件的NAS用户、团队文件协作  
**二冰评价**：界面好看，功能实用，比蓝奏云、奶牛快传靠谱多了！推荐每个NAS玩家都装一个。

最后，奉上我的超级无敌至尊docker库，二冰平时玩过的docker都整理到了这个仓库中了，一直在更新中，希望有github账号的兄弟能去给点个star，不知道玩啥的，都去这里面找，都给你们分好类了
**仓库链接：**
https://github.com/TWO-ICE/Awesome-NAS-Docker

