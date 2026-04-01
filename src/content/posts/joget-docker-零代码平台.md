---
title: 零代码神器Joget：3分钟部署企业级应用平台
published: 2026-04-01T06:33:48.803Z
description: 兄弟们，还在为开发企业级应用发愁？今天二冰给大家安利一个真正的零代码神器——Joget！无需写一行代码，小白也能快速搭建CRM、OA、HR系统！
image: https://img.twoice.fun:666/i/2025/03/26/20250326001540179-2.png
tags: ["Docker", "辅助开发工具", "Joget"]
category: 辅助开发工具
draft: false
---

兄弟们，今天二冰给你们安利一个**企业级零代码开发平台**——Joget！这玩意儿能让你不用写一行代码就搭建出完整的企业应用：审批流程、数据管理、报表统计...统统拖拽搞定！而且用Docker部署到NAS上，就是你的私有低代码平台。

## 一、项目简介
**Joget DX**（项目地址：https://github.com/jogetworkflow/joget-enterprise）是一个开源的低代码/无代码应用开发平台。核心能力：

- 📱 **可视化应用构建**：拖拽表单、列表、图表
- 🔀 **流程自动化**：可视化设计审批流程、业务流程
- 📊 **报表仪表盘**：实时数据分析和可视化
- 🔌 **丰富集成**：支持REST API、数据库、第三方服务

## 二、Docker部署教程（Dockge版）
```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: joget-mysql
    restart: unless-stopped
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=joget
    volumes:
      - ./mysql_data:/var/lib/mysql

  joget:
    image: joget/joget-enterprise:latest
    container_name: joget
    restart: unless-stopped
    ports:
      - "8080:8080"
    environment:
      - MYSQL_HOST=mysql
      - MYSQL_PORT=3306
      - MYSQL_DATABASE=joget
      - MYSQL_USER=root
      - MYSQL_PASSWORD=root
    depends_on:
      - mysql
```

### Dockge部署
打开Dockge面板 -> 创建堆栈 -> 设置堆栈名称 -> 粘贴compose代码 -> 约2分钟启动成功（Joget启动较慢）！
![](https://img.twoice.fun:666/i/2025/03/06/202503060937811-2.png)

## 三、使用指南
1. 访问`http://NAS_IP:8080/jw`
2. 默认管理员账号：`admin` / `admin`
3. 进入「应用构建器」开始创建你的第一个应用

### 快速创建应用
1. 新建应用 → 选择模板或空白应用
2. 设计表单（拖拽字段组件）
3. 设计列表页（配置数据展示）
4. 设计流程（拖拽流程节点）
5. 发布应用

## 四、适用场景
- 🏢 **企业审批**：请假、报销、采购审批流程
- 📋 **数据管理**：客户管理、资产管理、项目管理
- 📊 **数据报表**：销售数据看板、KPI仪表盘
- 🔧 **IT管理**：工单系统、变更管理

## 五、避坑指南
1. **启动时间**：首次启动需要2-3分钟，耐心等待
2. **内存需求**：建议至少4GB内存
3. **数据备份**：定期备份MySQL数据目录
4. **Java环境**：容器内已包含，无需额外安装

## 六、总结
**推荐指数**：★★★☆☆  
**适合人群**：有企业级应用搭建需求、不想写代码的团队  
**二冰评价**：功能强大但学习曲线较陡，适合有一定IT基础的用户。如果你只是想做个简单的表单收集，用n8n或Google Forms可能更合适。

最后，奉上我的超级无敌至尊docker库，二冰平时玩过的docker都整理到了这个仓库中了，一直在更新中，希望有github账号的兄弟能去给点个star，不知道玩啥的，都去这里面找，都给你们分好类了
**仓库链接：**
https://github.com/TWO-ICE/Awesome-NAS-Docker

