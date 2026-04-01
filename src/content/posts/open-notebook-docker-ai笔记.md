---
title: 开源AI笔记神器！隐私至上还能自动生成播客，这个工具要火
published: 2026-04-01T06:33:48.803Z
description: 兄弟们，今天二冰要给你们安利一个颠覆传统笔记方式的黑科技！当你熬夜整理文献时，AI自动帮你生成思维导图；当你在通勤路上想复习知识，笔记能自动转成播客播放！
image: https://img.twoice.fun:666/i/2025/03/16/tmpukhqh_dg-2.png
tags: ["Docker", "AI应用工具", "Open Notebook"]
category: AI应用工具
draft: false
---

兄弟们，今天二冰要给你们安利一个**颠覆传统笔记方式**的黑科技！想象一下：当你熬夜整理文献时，AI自动帮你生成思维导图；当你在通勤路上想复习知识，笔记能自动转成播客播放；更绝的是所有数据都**完全掌握在自己手里**，彻底告别大厂数据监控。这就是我们今天要盘的神器——Open Notebook！


## 一、项目简介
**项目地址**：https://github.com/lfnovo/open-notebook

这是一个专为**深度学习者**打造的AI笔记系统，支持PDF/视频/网页等20+格式的智能解析。最骚的是它内置了OpenAI、Gemini、Ollama等八大AI模型，能像私人助理一样帮你提炼重点、解答疑问，甚至还能把笔记转成播客！


## 二、五大核心优势
![Image 29](https://img.twoice.fun:666/i/2025/03/16/tmpukhqh_dg-2.png)

1. **隐私堡垒模式**：所有数据存在本地服务器，AI调用权限由你掌控
2. **学术神器套装**：文献自动摘要、知识点关联分析、考试重点预测
3. **播客一键生成**：通勤时听自己整理的笔记，学习效率直接拉满
4. **全格式通吃**：PDF/EPUB/Office/音视频文件统统能解析
5. **模型超市**：内置OpenAI/Gemini/Ollama等主流大模型，想用哪个点哪个


## 三、手把手部署教程
**部署工具**：Docker + Dockge（可视化容器管理神器）

### 1. 准备compose文件
新建`open-notebook`目录，创建`compose.yaml`：
```yaml
version: '3'

services:
  surrealdb:
    image: surrealdb/surrealdb:v2
    container_name: open_notebook_db
    restart: unless-stopped
    volumes:
      - ./surreal_data/:/mydata
    command: start --user root --pass root rocksdb:/mydata/mydatabase.db

  open_notebook:
    image: lfnovo/open_notebook:latest
    container_name: open_notebook_app
    restart: unless-stopped
    ports:
      - "8502:8502"
    volumes:
      - ./notebook_data:/app/data
    environment:
        - OLLAMA_API_BASE=http://[你的Ollama服务器IP]:11434
        - SURREAL_ADDRESS=surrealdb
        - SURREAL_PORT=8000
        - SURREAL_USER=root
        - SURREAL_PASS=root
    depends_on:
      - surrealdb
```

### 2. Dockge可视化部署
打开`Dockge`面板 -> `创建堆栈` -> 设置`堆栈`名称 -> 粘贴`compose`代码 -> 30秒`启动`成功！
![](https://img.twoice.fun:666/i/2025/03/06/202503060937811-2.png)


## 四、实战效果展示
### 1. 知识中枢创建
点击"New Notebook"创建专属知识库，建议按领域分类（比如「机器学习」「产品设计」）

![Image 34](https://img.twoice.fun:666/i/2025/03/16/tmpu55eftu_-2.png)

### 2. 多模态资料入库
实测支持这些骚操作：
- 直接拖拽PDF自动解析
- 粘贴Youtube链接获取字幕
- 上传会议录音转文字
- 导入本地Markdown笔记

![Image 37](https://img.twoice.fun:666/i/2025/03/16/tmp6_fkcvio-2.png)

### 3. AI协作三连击
- **深度问答**：针对上传的论文提问，AI结合上下文解答
- **观点碰撞**：让不同模型对同一问题给出多角度分析
- **播客生成**：睡前选择笔记内容，自动生成睡前学习音频

![Image 38](https://img.twoice.fun:666/i/2025/03/16/tmpqh1xite8-2.png)


## 五、适合哪些兄弟？
✅ 科研党：管理海量文献的神器  
✅ 备考族：自动生成复习重点  
✅ 自媒体人：把读书笔记转成播客素材  
✅ 隐私控：完全自托管的数据安全方案  


## 六、二冰锐评
经过一周深度体验，这绝对是**2024年最值得部署的开源项目**！相比Notion等在线工具，它的**隐私保护+多模型协作**设计直击痛点。部署简单，小白也能10分钟搞定，配合Ollama本地大模型使用效果更佳。

**缺点提醒**：播客生成依赖ElevenLabs API（需自备密钥），中文资料处理建议搭配GLM模型。想要打造个人知识库的兄弟，赶紧上车！

如果觉得这个教程有用，别忘了点赞收藏，欢迎在评论区交流部署心得！

最后，奉上我的超级无敌至尊docker库，二冰平时玩过的docker都整理到了这个仓库中了，一直在更新中，希望有github账号的兄弟能去给点个star，不知道玩啥的，都去这里面找，都给你们分好类了
**仓库链接**：
https://github.com/TWO-ICE/Awesome-NAS-Docker

