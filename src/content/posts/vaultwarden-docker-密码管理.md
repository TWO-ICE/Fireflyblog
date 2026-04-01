---
title: 还在用浏览器记密码？部署这个Docker神器才是正解
published: 2026-04-01T02:20:00.000Z
description: 你的密码是不是还写在便利贴上？或者所有账号都用同一个密码？今天教你们用Docker部署一个自己的密码管理器，比1Password、LastPass还好用，关键是永久免费，数据完全掌握在自己手里！
image: https://img.twoice.fun:666/i/2025/03/16/tmp3dgv8o04-2.png
tags: [Docker, 密码管理, 安全, 自托管]
category: Docker实战
draft: false
---

# 还在用浏览器记密码？部署这个Docker神器才是正解

你的密码是不是还写在便利贴上？或者所有账号都用同一个密码 `123456`？今天教你们用 Docker 部署一个自己的密码管理器，比 1Password、LastPass 还好用，关键是永久免费，数据完全掌握在自己手里！

## 项目简介

今天安利的是 **Vaultwarden**，项目地址：https://github.com/dani-garcia/vaultwarden。这是 Bitwarden 密码管理器的轻量级替代品，Bitwarden 官方服务器版太重了，而 Vaultwarden 用 Rust 写的，内存占用极低，树莓派都能跑。功能上和 Bitwarden 完全兼容，浏览器插件、手机 App 通吃。

## 五大核心优势

1. **全平台覆盖**：Chrome、Firefox、Safari、iOS、Android 全都有客户端，无缝同步
2. **轻量到极致**：Rust 编写，内存占用不到 50MB，NAS 低配机也能流畅运行
3. **自动填充密码**：浏览器插件一键自动填充，再也不用手动输密码了
4. **安全加密**：AES-256 加密存储，零知识架构，连服务器管理员都看不到你的密码
5. **免费功能齐全**：密码生成器、两步验证、安全笔记、TOTP、密码分享...高级功能全免费

## 保姆级部署教程

### 第一步：准备环境

确保你的 NAS 或 VPS 已经装好了 Docker 和 Docker Compose。Vaultwarden 对资源要求极低，1GB RAM 就够了。

### 第二步：Dockge 一键部署

打开 `Dockge` 面板 -> `创建堆栈` -> 设置 `堆栈` 名称 -> 粘贴 `compose` 代码 -> 30秒 `启动` 成功！

新建 `docker-compose.yml` 文件，把下面配置贴进去：

```yaml
version: '3'
services:
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden
    restart: unless-stopped
    ports:
      - 8080:80
    volumes:
      - ./data:/data
    environment:
      - WEBSOCKET_ENABLED=true  # 启用实时同步
```

### 第三步：创建账号

1. 浏览器访问 `http://你的IP:8080`
2. 点击"创建账号"
3. 设置主密码（**这个密码一定要记住！忘了就全完了！**）
4. 建议主密码用 16 位以上，包含大小写字母、数字、特殊字符

### 第四步：安装客户端

- **浏览器**：Chrome/Firefox 应用商店搜索 "Bitwarden"
- **手机**：App Store / Google Play 搜索 "Bitwarden"
- 打开客户端，选择"自托管"，填入你的 Vaultwarden 地址
- 登录后就可以开始使用了

## 实战演示

### 自动生成强密码
注册新网站时，Bitwarden 插件会自动弹出，一键生成 20 位随机密码，再也不用绞尽脑汁想密码了。每个网站用不同密码，安全等级直接拉满。

### 一键自动填充
登录网站时，插件自动识别登录框，点击一下就填充好用户名和密码。手机端也支持自动填充，体验丝滑。

### 安全笔记
除了密码，还可以存储安全笔记：银行卡号、身份证号、WiFi 密码、保险箱密码...全加密存储，随时查看。

### TOTP 两步验证
内置 TOTP 验证器，可以替代 Google Authenticator。密码和验证码在同一个地方管理，登录时自动填充验证码，体验起飞。

### 密码安全报告
Vaultwarden 会检测你的密码安全状态：弱密码、重复密码、泄露密码一目了然。帮你把所有"裸奔"的账号找出来，挨个加强。

## 总结建议

这个工具特别适合：
✅ 所有还在用同一个密码的人（说的就是你）
✅ 密码记不住写在便利贴上的人
✅ 不想给 1Password 每年交 36 刀的人
✅ 注重隐私和数据安全的用户

需要注意：
⚠️ **主密码一定要记住！一定要记住！一定要记住！**（重要的事说三遍）
⚠️ 建议配合反向代理 + HTTPS 使用，外网访问更安全
⚠️ 定期备份 `./data` 目录，这是你的密码数据库

兄弟们，密码管理真的是每个人的刚需。你花几块钱买杯奶茶，却连自己的账号安全都不管，账号被盗了哭都来不及。Vaultwarden 部署一次，终身受益，再也不用担心密码泄露了。

如果觉得有用，记得在评论区扣个 666，收藏点赞走一波！

最后，奉上我的超级无敌至尊 Docker 库，二冰平时玩过的 Docker 都整理到了这个仓库中了，一直在更新中，希望有 GitHub 账号的兄弟能去给点个 star，不知道玩啥的，都去这里面找，都给你们分好类了

**仓库链接：**
https://github.com/TWO-ICE/Awesome-NAS-Docker
