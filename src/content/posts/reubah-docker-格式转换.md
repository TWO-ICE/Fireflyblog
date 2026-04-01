---
title: 一键搞定多格式转换！Docker神器Reubah实测
published: 2026-04-01T06:33:48.802Z
description: 兄弟们，你们有没有遇到过这样的场景？设计师发来的PSD文件打不开，甲方爸爸的Word文档要转PDF，几十张产品图要批量压缩尺寸...今天二冰给你们安利个神器——Reubah！
image: https://img.twoice.fun:666/i/2025/03/16/tmpk2ucijkp-2.png
tags: ["Docker", "文件处理", "Reubah"]
category: 文件处理
draft: false
---

兄弟们，你们有没有遇到过这样的场景？设计师发来的PSD文件打不开，甲方爸爸的Word文档要转PDF，几十张产品图要批量压缩尺寸...每次遇到这种格式转换的破事，总得翻遍全网找工具。今天二冰给你们安利个神器——**网页端万能格式转换器Reubah**，支持图片转PDF、文档互转、批量处理等骚操作，最关键的是能用Docker一键部署！

## 项目简介
**Reubah**（项目地址：https://github.com/dendianugerah/reubah）是个基于网页的格式转换利器。简单来说就是个在线版的格式工厂，打开浏览器就能用：

- 🖼️ **图片处理**：JPG/PNG/WebP/GIF/BMP互转，还能调整尺寸压缩画质
- 📄 **文档转换**：Word/PDF/RTF/TXT等格式互转（目前暂不支持PDF转其他格式）
- 🚀 **批处理模式**：百张图片合并成PDF、批量调整尺寸只需三步操作

![Image 28](https://img.twoice.fun:666/i/2025/03/16/tmpk2ucijkp-2.png)

## 项目优势
对比市面同类工具，这玩意有三大杀手锏：
1. **零客户端安装**：基于Docker部署，手机/平板/电脑都能用
2. **隐私安全MAX**：转换完自动删除文件，绝不保留用户数据
3. **小白友好设计**：调整图片尺寸自带实时预览，文档转换支持拖拽上传

实测转换速度比某些在线网站快3倍以上，特别是处理百兆级PPT文件时，LibreOffice内核稳如老狗。

## 部署流程（Dockge版）
### 步骤一：准备compose文件
```yaml
version: '3.8'
services:
  reubah:
    image: ghcr.io/dendianugerah/reubah:latest
    container_name: reubah
    restart: unless-stopped
    ports:
      - "8085:8085"
    volumes:
      - ./tmp:/app/tmp
      - ./doc-temp:/tmp
```

### 步骤二：Dockge部署
打开`Dockge`面板 -> `创建堆栈` -> 设置`堆栈`名称 -> 粘贴`compose`代码 -> 30秒`启动`成功！
![](https://img.twoice.fun:666/i/2025/03/06/202503060937811-2.png)

## 使用展示
访问 `http://NAS_IP:5885` 即刻开玩：

### 1. 图片处理
- **基础操作**：格式转换+尺寸调整+画质压缩三连
- **高级功能**：支持WebP无损压缩（实测1MB图片压到300KB画质不变）

![Image 34](https://img.twoice.fun:666/i/2025/03/16/tmpqf0evpvs-2.png)

### 2. 文档转换
- 支持拖拽上传.docx/.odt等文件
- 转PDF时会自动保留排版格式
- 注意：PDF转Word功能还在开发中

### 3. 批处理模式
重点推荐「**合并为PDF**」功能：
1. 批量上传产品图/扫描件
2. 设置A4纸张方向
3. 自动生成带页码的PDF文件

![Image 38](https://img.twoice.fun:666/i/2025/03/16/tmp4nw74kft-2.png)

## 总结
经过一周实测，二冰给兄弟们划重点：
✅ **推荐场景**：
- 经常需要手机/平板处理文档
- 临时转换敏感文件（自动删除机制真香）
- 批量处理产品图/扫描件合并

⚠️ **注意事项**：
- 暂不支持PDF解析（等待后续更新）
- 大文件转换建议走有线网络
- 文档转换依赖LibreOffice，部分特殊排版可能变形

这个项目特别适合不想装臃肿客户端的技术宅，部署简单且资源占用低（实测运行内存不到200MB）。现在点击项目地址https://github.com/dendianugerah/reubah就能开搞，遇到问题记得回来留言讨论！

最后，奉上我的超级无敌至尊docker库，二冰平时玩过的docker都整理到了这个仓库中了，一直在更新中，希望有github账号的兄弟能去给点个star，不知道玩啥的，都去这里面找，都给你们分好类了
**仓库链接：**
https://github.com/TWO-ICE/Awesome-NAS-Docker

