---
title: 极简仪表板神器！Docker三分钟搭建攻略
published: 2026-04-01T06:33:48.796Z
description: 兄弟们是不是经常遇到这种尴尬场景？浏览器收藏夹堆了800个书签根本找不到，Docker服务散落在不同端口，日程管理还要单独开个APP...今天二冰实测这款SimpleDash，让你用Docker三分钟搭建专属控制台！
image: https://img.twoice.fun:666/i/2025/03/16/tmp_d4fxyba-2.png
tags: ["Docker", "信息聚合", "SimpleDash"]
category: 信息聚合
draft: false
---

兄弟们是不是经常遇到这种尴尬场景？浏览器收藏夹堆了800个书签根本找不到，Docker服务散落在不同端口，日程管理还要单独开个APP...今天二冰实测这款**SimpleDash**，让你用Docker三分钟搭建专属控制台，所有高频操作一个页面全搞定！

## 一、项目速览
**项目名称**：SimpleDash
**项目地址**：[https://github.com/securemindorg/SimpleDash](https://github.com/securemindorg/SimpleDash)
**核心定位**：极简主义风格的个人信息聚合中心，完美整合高频链接、Docker服务、Google日历三大模块。

![Image 28](https://img.twoice.fun:666/i/2025/03/16/tmp_d4fxyba-2.png)

## 二、五大核心优势
1. **动态欢迎界面**：根据访问时间智能显示晨间/午间/深夜问候语
2. **智能分类管理**：YAML文件轻松配置工作/娱乐/运维等场景分组
3. **Docker直通车**：一键直达Portainer、NPM等容器管理界面
4. **深度日历集成**：实时同步Google日历重要日程（需科学上网）
5. **暗黑主题美学**：半透明磨砂质感+MaterialDesign图标库

## 三、Dockge极速部署
**完整docker-compose.yml配置**（已实测优化）：
```yaml
version: '3'

services:
  simpledash:
    image: securemindorg/simpledash:latest
    container_name: simpledash
    restart: unless-stopped
    ports:
      - "5076:5000"
    volumes:
      - ./data:/app/data
      - /var/run/docker.sock:/var/run/docker.sock
```

**部署四步走**：

打开`Dockge`面板 -> `创建堆栈` -> 设置`堆栈`名称 -> 粘贴`compose`代码 -> 30秒`启动`成功！
![](https://img.twoice.fun:666/i/2025/03/06/202503060937811-2.png)

http://你的服务器IP:5076

![Image 32](https://img.twoice.fun:666/i/2025/03/16/tmpgpi5e7ev-2.png)

## 四、高阶玩法指南
### 1. 链接管理中心
编辑`data/static/links.yaml`文件：
```yaml
- category: "运维面板"
  items:
    - name: "Portainer"
      icon: "docker"
      url: "http://192.168.1.10:9000"
    - name: "NPM"
      icon: "link-variant"
      url: "http://192.168.1.10:81"

- category: "常用网站"
  items:
    - name: "CSDN"
      icon: "school"
      url: "https://blog.csdn.net"
```

### 2. 日历深度整合
1. 获取Google日历嵌入代码
2. 在links.yaml添加：
```yaml
- name: "日程表"
  url: "https://calendar.google.com/embed?src=你的日历ID"
```

### 3. 主题定制技巧
修改`data/static/style.css`：
```css
/* 暗紫色主题 */
body:before {
  background: rgba(46, 12, 80, 0.9);
}

.mdi-icon {
  color: #BA55D3;
}
```

![Image 36: 在这里插入图片描述](https://img.twoice.fun:666/i/2025/03/16/tmppv3n12v5-2.png)

## 五、实战总结
经过一周深度体验，二冰认为SimpleDash特别适合以下三类兄弟：
✅ **Docker全家桶玩家**：集中管理所有容器服务入口
✅ **效率控极客**：高频操作免去浏览器翻找
✅ **双屏打工人**：副屏常驻工作看板提升专注度

需要注意两个小门槛：
1. Google日历需自行解决网络问题
2. 首次配置YAML建议用VSCode避免格式错误

最后，奉上我的超级无敌至尊docker库，二冰平时玩过的docker都整理到了这个仓库中了，一直在更新中，希望有github账号的兄弟能去给点个star，不知道玩啥的，都去这里面找，都给你们分好类
**仓库链接：**
[https://github.com/TWO-ICE/Awesome-NAS-Docker](https://github.com/TWO-ICE/Awesome-NAS-Docker)

如果觉得这篇攻略对你有帮助，记得点赞收藏，评论区欢迎交流部署心得！

