---
title: Docker一键部署！复式记账神器Beancount-GS保姆级教程
published: 2026-03-01T06:59:00.000Z
description: 兄弟们，每个月月底翻着银行卡账单对不上账的痛，你们都懂吧？工资还没捂热就被花呗信用卡掏空，想搞点理财又怕被割韭菜。今天二冰给大家安利一款Docker部署的复式记账神器Beancount-GS，堪称技术宅的理财救星！
image: https://img.twoice.fun:666/i/2025/03/16/tmph5fkb813-2.png
tags: [Docker, 记账, 理财, 复式记账]
category: 记账工具
draft: false
---

# Docker一键部署！复式记账神器Beancount-GS保姆级教程

兄弟们，每个月月底翻着银行卡账单对不上账的痛，你们都懂吧？工资还没捂热就被花呗信用卡掏空，想搞点理财又怕被割韭菜。今天二冰给大家安利一款**Docker部署的复式记账神器Beancount-GS**，堪称技术宅的理财救星！

## 一、项目简介：双账本记账新姿势

项目地址：https://github.com/BaoXuebin/beancount-gs

这个神器基于**复式记账法**核心玩法，每笔交易必须同时记录两个账户（比如消费100元，现金账户减100，餐饮支出账户加100），保证账目绝对零误差。自带中文Web界面和移动端适配，比传统Excel记账爽多了！

## 二、五大核心优势

1️⃣ **纯中文界面**：官方中文文档+全中文界面，小白也能秒上手  
2️⃣ **移动端适配**：手机浏览器直接操作，蹲坑都能记账  
3️⃣ **数据自托管**：账本存在本地NAS，比某记账APP更安全  
4️⃣ **Docker极简部署**：一条命令搞定所有依赖  
5️⃣ **财务报表生成**：自动生成收支趋势图，花钱如流水可视化  

## 三、Dockge一键部署指南

### 1. 准备docker-compose.yml
```yaml
version: "3.9"
services:
  beancount:
    image: xdbin/beancount-gs:latest
    ports:
      - "10000:80"
    volumes:
      - ./bak:/app/bak       # 备份目录
      - ./config:/app/config # 配置文件
      - ./data:/data/beancount # 账本数据
      - ./icons:/app/public/icons # 自定义图标
    command: sh -c "cp -rn /app/public/default_icons/* /app/public/icons && ./beancount-gs -p 80"
```

### 2. Dockge部署步骤
打开`Dockge`面板 -> `创建堆栈` -> 设置`堆栈`名称 -> 粘贴`compose`代码 -> 30秒`启动`成功！
![](https://img.twoice.fun:666/i/2025/03/06/202503060937811-2.png)

## 四、使用实操演示

访问 `http://你的IP:10000` 首次需要初始化：

1. **创建账本**  
- 账本名称建议用年份（如2025_Finance）
- 设置6位数密码（千万别忘！）

2. **开始记账**  
举个栗子：  
- 支出场景：星巴克消费38元  
- 账户操作：  
  现金账户 -38  
  餐饮支出 +38

![在这里插入图片描述](https://img.twoice.fun:666/i/2025/03/16/tmph5fkb813-2.png)

3. **查看报表**  
自动生成月度消费趋势图，一眼看穿奶茶支出占比！

## 五、优缺点总结

👍 **推荐场景**：  
- 想尝试复式记账的技术控  
- 注重数据隐私的极客  
- 有Docker环境的小白  

⚠️ **注意事项**：  
- 没有手机APP（需用浏览器）  
- 建议每周备份/data目录  
- 首次使用建议看官方文档  

如果觉得教程有用，欢迎点赞收藏评论三连～

最后，奉上我的超级无敌至尊docker库，二冰平时玩过的docker都整理到了这个仓库中了，一直在更新中，希望有github账号的兄弟能去给点个star，不知道玩啥的，都去这里面找，都给你们分好类了  

**仓库链接：**  
[https://github.com/TWO-ICE/Awesome-NAS-Docker](https://github.com/TWO-ICE/Awesome-NAS-Docker)
