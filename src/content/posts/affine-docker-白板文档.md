---
title: 无需魔法！开源白板+文档神器AFFiNE部署指南
published: 2026-03-01T06:55:00.000Z
description: 兄弟们，还在为文档管理焦头烂额？今天二冰给大家安利一个王炸级开源神器——AFFiNE！这个集Notion文档管理+Miro白板协作于一身的宝藏工具，官方终于完善了Docker部署方案，现在用NAS就能轻松搭建个人知识库！
image: https://img.twoice.fun:666/i/2025/03/16/tmpmmyukfwt-2.png
tags: [Docker, 知识库, 白板, 协作工具]
category: AI应用工具
draft: false
---

# 无需魔法！开源白板+文档神器AFFiNE部署指南

兄弟们，还在为文档管理焦头烂额？今天二冰给大家安利一个王炸级开源神器——AFFiNE！这个集Notion文档管理+Miro白板协作于一身的宝藏工具，官方终于完善了Docker部署方案，现在用NAS就能轻松搭建个人知识库！

## 一、项目简介

**项目地址**：https://github.com/toeverything/AFFiNE

这个拥有25.7k星的开源项目，完美实现了文档与白板的无缝切换。支持双链笔记、多视图数据库、AI智能助手，还能将思维导图秒变PPT！最骚的是所有数据都存储在本地，彻底摆脱云端服务商的限制。

## 二、五大核心优势

1. **真·画布体验**：文字/表格/网页嵌入随心组合，无限白板支持手写笔迹
2. **AI办公伙伴**：自动生成PPT、思维导图，代码原型一键生成
3. **多端实时同步**：网页/客户端跨平台协作，修改记录随时回溯
4. **隐私安全保障**：本地优先+端到端加密，敏感数据不外流
5. **开源可定制**：自建服务器+插件扩展，打造专属知识中枢

![多视图展示](https://img.twoice.fun:666/i/2025/03/16/tmpmmyukfwt-2.png)

## 三、Dockge极简部署

### 准备compose.yaml
```yaml
services:
  affine:
    image: ghcr.io/toeverything/affine-graphql:stable
    container_name: affine_selfhosted
    command: ['sh', '-c', 'node ./scripts/self-host-predeploy && node ./dist/index.js']
    ports:
      - '3000:3010'  # WEB访问端口
      - '5555:5555'  # 实时协作端口
    volumes:
      - ./config:/root/.affine/config
      - ./storage:/root/.affine/storage
    environment:
      - AFFiNE_ADMIN_EMAIL=admin@yourdomain.com
      - AFFiNE_ADMIN_PASSWORD=YourStrongPassword

  redis:
    image: redis
    volumes:
      - ./redis:/data

  postgres:
    image: postgres
    environment:
      POSTGRES_USER: affine
      POSTGRES_PASSWORD: affine
    volumes:
      - ./postgres:/var/lib/postgresql/data
```

### Dockge可视化部署
打开`Dockge`面板 -> `创建堆栈` -> 设置`堆栈`名称 -> 粘贴`compose`代码 -> 30秒`启动`成功！
![](https://img.twoice.fun:666/i/2025/03/06/202503060937811-2.png)

## 四、功能实测展示

### 文档模式（Notion平替）
- `/`唤醒指令面板，支持Markdown全语法
- 双链文档秒级跳转，数据库六种视图切换
- 一键导出HTML/MD格式，兼容Notion迁移

![文档编辑](https://img.twoice.fun:666/i/2025/03/16/tmpl3saat64-2.png)

### 无限白板（Miro杀手）
- 手写笔迹自动识别，矢量图形自由组合
- 内置项目管理/市场分析等12套模板
- 思维导图拖拽生成，节点联动自动布局

![白板功能](https://img.twoice.fun:666/i/2025/03/16/tmp5iy8g2m6-2.png)

## 五、实战建议

1. **设备选择**：推荐4核8G以上配置，数据库单独挂载SSD
2. **备份策略**：定时备份postgres数据库+storage目录
3. **外网访问**：搭配Nginx Proxy Manager实现HTTPS访问
4. **团队协作**：开启官方账号同步功能，实现跨地域协作

## 六、总结点评

经过半个月深度体验，AFFiNE完美适配以下场景：
✅ 个人知识管理（替代Notion+Obsidian）
✅ 团队敏捷开发（看板+文档二合一）
✅ 在线教学（实时白板+课件制作）

**推荐指数**：★★★★☆  
**适合人群**：知识创作者/产品经理/开发团队  
**避坑指南**：官方客户端暂不支持连接自建实例，建议用浏览器访问

还在等什么？赶紧部署属于你的全能知识库！部署过程中遇到问题，欢迎在评论区call二ice~

最后，奉上我的超级无敌至尊docker库，二冰平时玩过的docker都整理到了这个仓库中了，一直在更新中，希望有github账号的兄弟能去给点个star，不知道玩啥的，都去这里面找，都给你们分好类了  

**仓库链接：**  
https://github.com/TWO-ICE/Awesome-NAS-Docker
