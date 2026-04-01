---
title: 群晖NAS秒变AI工作站！DeepSeek-R1私有化部署实战
published: 2026-04-01T06:33:48.803Z
description: 兄弟们，试想这样一个场景：你的产品文档涉及商业机密，但需要AI辅助撰写；你的客户数据包含隐私信息，却要用大模型分析。这时候还敢用公有云AI服务吗？
image: https://img.twoice.fun:666/i/2025/03/16/tmpv89anyvc-2.png
tags: ["Docker", "部署与优化", "DeepSeek-R1"]
category: 部署与优化
draft: false
---

兄弟们，DeepSeek-R1发布的时候全网炸了锅，685B参数的推理模型直接对标OpenAI的o1系列。但是官方API的价格让不少人望而却步...今天二冰教你们用Docker在NAS上**本地部署DeepSeek-R1**，配合Ollama运行量化版模型，零API成本、数据完全本地化！

## 一、项目简介
本文介绍两种部署方案：

1. **Ollama方案**（推荐新手）：一行命令拉取模型，开箱即用
2. **vLLM方案**（适合高端硬件）：更高效的推理引擎，支持多GPU

核心是利用开源大模型生态，在自己的硬件上跑DeepSeek-R1的量化版本。

## 二、硬件需求
| 模型版本 | 参数量 | 最低内存 | 推荐内存 |
|---------|--------|---------|---------|
| R1 1.5B | 1.5B | 4GB | 8GB |
| R1 7B | 7B | 8GB | 16GB |
| R1 8B | 8B | 8GB | 16GB |
| R1 14B | 14B | 16GB | 32GB |
| R1 32B | 32B | 32GB | 64GB |
| R1 70B | 70B | 64GB | 128GB |

**二冰建议**：8GB内存的NAS跑7B版本，16GB的跑14B，体验已经相当不错了。

## 三、Docker部署教程

### 方案一：Ollama + Open WebUI（推荐）

```yaml
version: '3.8'

services:
  ollama:
    image: ollama/ollama:latest
    container_name: ollama
    restart: unless-stopped
    ports:
      - "11434:11434"
    volumes:
      - ./ollama:/root/.ollama
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]

  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    container_name: open-webui
    restart: unless-stopped
    ports:
      - "3000:8080"
    volumes:
      - ./open-webui:/app/backend/data
    environment:
      - OLLAMA_BASE_URL=http://ollama:11434
    depends_on:
      - ollama
```

### Dockge部署
打开Dockge面板 -> 创建堆栈 -> 设置堆栈名称 -> 粘贴compose代码 -> 30秒启动成功！
![](https://img.twoice.fun:666/i/2025/03/06/202503060937811-2.png)

### 拉取模型
部署完成后，进入Ollama容器拉取模型：
```bash
docker exec -it ollama ollama pull deepseek-r1:7b
```

访问`http://NAS_IP:3000`即可使用Open WebUI和DeepSeek-R1对话！

## 四、性能对比
实测在RTX 3060 12GB上：
- **7B模型**：约15 tokens/s，日常对话流畅
- **14B模型**：约8 tokens/s，可以接受
- **32B模型**：约3 tokens/s，需要等待

建议没有独立显卡的兄弟用CPU跑7B版本，虽然慢一些但完全可用。

## 五、避坑指南
1. **显存不足**：优先使用Q4量化版本，省一半显存
2. **NVIDIA驱动**：确保宿主机已安装NVIDIA Container Toolkit
3. **CPU模式**：没有GPU可以去掉deploy段，用CPU运行
4. **模型存储**：大模型文件很大，注意磁盘空间

## 六、总结
**推荐指数**：★★★★★  
**适合人群**：有NAS或高性能PC、想零成本使用顶级推理模型的AI爱好者  
**二冰评价**：本地部署DeepSeek-R1的体验比调用API强太多了！没有网络延迟、没有Token限制、数据完全本地化。强烈推荐！

最后，奉上我的超级无敌至尊docker库，二冰平时玩过的docker都整理到了这个仓库中了，一直在更新中，希望有github账号的兄弟能去给点个star，不知道玩啥的，都去这里面找，都给你们分好类了
**仓库链接：**
https://github.com/TWO-ICE/Awesome-NAS-Docker

