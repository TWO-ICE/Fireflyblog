---
title: 摸鱼神器！一键部署最"忙"Docker项目
published: 2026-03-01T06:51:00.000Z
description: 兄弟们有没有这样的经历？老板走过工位时手忙脚乱切窗口，茶水间遇到领导查岗疯狂敲键盘，同事聚餐时假装在debug...今天二冰给大伙儿安利一款装忙神器genact，让你的电脑永远处在"看起来很忙"状态！
image: https://img.twoice.fun:666/i/2025/03/16/tmpttgnmi39-2.png
tags: [Docker, 趣味工具, 摸鱼神器]
category: AI应用工具
draft: false
---

# 摸鱼神器！一键部署最"忙"Docker项目

兄弟们有没有这样的经历？老板走过工位时手忙脚乱切窗口，茶水间遇到领导查岗疯狂敲键盘，同事聚餐时假装在debug...今天二冰给大伙儿安利一款装忙神器genact，让你的电脑永远处在"看起来很忙"状态！

## 项目简介

**项目名称**：Genact（GitHub地址：https://github.com/svenstaro/genact）

这款由德国开发者Sven开发的趣味工具，能在屏幕上模拟代码编译、系统更新、网络攻击等十余种逼真场景。支持Web/Windows/macOS/Linux全平台，最绝的是Docker版即开即用不留痕！

## 三大核心优势

1. **全平台通吃**：从网页端到各系统客户端，连Docker都能跑
2. **零残留运行**：Docker模式用完即焚，不占存储空间
3. **影帝级表演**：支持8种高仿场景自由切换，包括：
   - 黑客入侵模拟
   - Linux内核编译
   - 区块链挖矿
   - 网络攻击监测
   - 大数据处理进度条

## Docker极简部署

使用Dockge可视化部署更便捷：

打开Dockge面板 -> 创建堆栈 -> 设置堆栈名称 -> 粘贴compose代码 -> 30秒启动成功！

```yaml
version: '3.8'
services:
  genact:
    image: svenstaro/genact
    stdin_open: true
    tty: true
    command: ["-s", "5"]
    restart: "no"
```

![](https://img.twoice.fun:666/i/2025/03/06/202503060937811-2.png)

## 高阶玩法指南

- **场景切换**：按`Ctrl+数字键`快速切换8种模式
- **速度调节**：运行参数`-s 5`让代码飞起来（默认1倍速）
- **组合技**：同时开启"内核编译+挖矿监测"，瞬间化身全栈大佬
- **网页版救急**：https://svenstaro.github.io/genact/ 应急使用

## 实战场景推荐

- **领导巡查**：开启"内核编译"模式，满屏滚代码
- **同事摸鱼**：调出"区块链挖矿"界面，假装在搞Web3
- **会议装X**：启动"网络攻击监测"，瞬间提升技术含量

![部署界面](https://img.twoice.fun:666/i/2025/03/16/tmpttgnmi39-2.png)

## 总结建议

作为摸鱼界奥斯卡级选手，genact堪称职场生存必备良药。不过二冰提醒各位：装忙虽好，可不要贪杯哦！建议搭配真实工作量使用，毕竟老板们也不是吃素的~

最后奉上我的超级无敌至尊docker库，二冰平时玩过的docker都整理到了这个仓库中了，一直在更新中，希望有github账号的兄弟能去给点个star，不知道玩啥的，都去这里面找，都给你们分好类

**仓库链接：**
https://github.com/TWO-ICE/Awesome-NAS-Docker

如果觉得有用请点赞收藏，评论区等你来秀操作！
