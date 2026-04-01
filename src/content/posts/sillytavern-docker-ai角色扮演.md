---
title: 沉浸式AI角色扮演神器SillyTavern一键部署指南
published: 2026-04-01T06:33:48.802Z
description: 兄弟们有没有想过用AI玩《赛博朋克2077》？今天二冰给你们安利个黑科技——只要部署好这个开源神器，就能让AI小姐姐陪你玩角色扮演，还能生成专属剧情对白！
image: https://img.twoice.fun:666/i/2025/03/16/tmpuktn6fhh-2.png
tags: ["Docker", "AI应用工具", "SillyTavern"]
category: AI应用工具
draft: false
---

兄弟们，今天二冰要给你们安利一个**AI角色扮演天花板**级别的神器！不管你是想跟动漫角色聊天、创建自己的AI女友/男友、还是让AI帮你跑桌游团——SillyTavern统统都能搞定，而且还支持几十种大模型后端，部署到NAS上就是你的专属AI游乐场！

## 一、项目简介
**SillyTavern**（项目地址：https://github.com/SillyTavern/SillyTavern）是目前最强大的开源AI角色扮演前端。它本身不包含AI模型，但支持连接几乎所有的主流AI后端：

- **本地模型**：Ollama、KoboldAI、TabbyAPI
- **云端API**：OpenAI、Claude、Gemini、Cohere
- **反代/免费API**：各种逆向中转方案

## 二、核心功能
### 🎭 角色扮演
- 创建自定义角色卡（包括性格、背景、对话风格）
- 支持角色卡导入/导出（兼容Chub.ai等平台）
- 多角色群聊模式

### 🎲 桌游辅助
- 内置骰子系统
- 世界信息（Lorebook）设定
- DM模式让AI当游戏主持

### 🖼️ 多模态支持
- 图片生成（集成Stable Diffusion/DALL-E）
- TTS语音合成（让角色"说话"）
- 语音识别输入

### 🔧 高级功能
- 扩展插件系统
- 正则表达式脚本
- 嵌入向量检索（让AI记住长对话）

## 三、Docker部署教程（Dockge版）
```yaml
version: '3.8'

services:
  sillytavern:
    image: ghcr.io/sillytavernapp/sillytavern:latest
    container_name: sillytavern
    restart: unless-stopped
    ports:
      - "8000:8000"
    volumes:
      - ./data:/home/app/data
```

### Dockge部署
打开Dockge面板 -> 创建堆栈 -> 设置堆栈名称 -> 粘贴compose代码 -> 30秒启动成功！
![](https://img.twoice.fun:666/i/2025/03/06/202503060937811-2.png)

## 四、使用指南

### 1. 连接AI后端
首次打开后进入设置页面，配置你的AI后端。推荐搭配Ollama使用：
```
API类型：Ollama
连接地址：http://你的Ollama地址:11434
模型：qwen2.5:14b（推荐14B以上效果更好）
```

### 2. 创建角色
- 点击「角色编辑器」创建新角色
- 填写名称、描述、性格、对话示例
- 还可以上传角色头像

### 3. 开始聊天
进入聊天界面，选择角色开始对话：

## 五、避坑指南
1. **模型选择**：角色扮演建议用14B以上的模型，7B效果一般
2. **内存需求**：跑本地大模型需要至少16GB内存
3. **中文支持**：推荐Qwen系列或GLM系列模型
4. **角色卡质量**：角色设定越详细，AI表现越好

## 六、总结
**推荐指数**：★★★★☆  
**适合人群**：AI爱好者、桌游玩家、二次元宅、创意写作者  
**二冰评价**：这玩意儿简直是AI玩具箱，可玩性拉满！搭配本地Ollama使用零成本，推荐每个NAS玩家都试试。注意角色扮演对模型能力要求较高，建议用14B以上的模型效果才好。

最后，奉上我的超级无敌至尊docker库，二冰平时玩过的docker都整理到了这个仓库中了，一直在更新中，希望有github账号的兄弟能去给点个star，不知道玩啥的，都去这里面找，都给你们分好类了
**仓库链接：**
https://github.com/TWO-ICE/Awesome-NAS-Docker

