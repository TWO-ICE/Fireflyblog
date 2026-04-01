---
title: 打造私人数字图书馆！Docker部署Biblioteca全攻略
published: 2026-04-01T06:33:48.803Z
description: 兄弟们，你们有没有遇到过这样的痛苦？下载了上千本电子书，却总是找不到想看的；换了设备就要重新整理书库；想用手机看书还要手动传文件...
image: https://img.twoice.fun:666/i/2025/03/16/tmp_ea7y6et-2.png
tags: ["Docker", "存储方案", "Biblioteca"]
category: 存储方案
draft: false
---

兄弟们，你们有没有遇到过这样的痛苦？**下载了上千本电子书，却总是找不到想看的；换了设备就要重新整理书库；想用手机看书还要手动传文件**...今天二冰给大家带来一个神器级解决方案——用Docker三分钟搭建个人电子书库Biblioteca！

## 一、项目简介
**Biblioteca**（GitHub项目地址：https://github.com/biblioverse/biblioteca）是一款对标Calibre的开源电子书管理系统，专为技术宅和藏书狂魔设计。它能自动整理你的电子书库，支持手机/平板/Kobo阅读器多端同步，甚至能用ChatGPT智能生成书籍摘要！

## 二、五大核心优势
1. **智能搜索**：文件名记不全？输入关键词秒搜全书库
2. **跨平台阅读**：网页直接打开电子书，支持EPUB/PDF/MOBI等主流格式
3. **OPDS协议**：手机端用静读天下等APP无线访问书库
4. **书架管理**：自定义分类，打造你的数字书房
5. **AI加持**：自动提取书籍封面，ChatGPT生成内容摘要

## 三、Docker一键部署
用Dockge部署只需三步：

打开`Dockge`面板 -> `创建堆栈` -> 设置`堆栈`名称 -> 粘贴`compose`代码 -> 30秒`启动`成功！
![](https://img.twoice.fun:666/i/2025/03/06/202503060937811-2.png)

```yaml
services:
  biblioteca-web:
    image: ghcr.io/biblioverse/biblioteca:main
    container_name: biblioteca-web
    ports: ["8109:8080"]
    volumes:
      - ./covers:/var/www/html/public/covers
      - ./books:/var/www/html/public/books
      - ./env.txt:/var/www/html/.env

  db:
    image: mariadb:10.10
    environment:
      - MYSQL_ROOT_PASSWORD=db
      - MYSQL_DATABASE=db

  typesense:
    image: typesense/typesense:27.1
    command: '--api-key=xyz --enable-cors'
```

## 四、进阶玩法演示

### 1. 中文汉化
下载汉化包解压到容器：
```bash
wget https://github.com/wbsu2003/synology/raw/main/Biblioteca/translations.zip
unzip translations.zip
docker cp translations biblioteca-web:/var/www/html/
```

切换语言后效果：
![汉化界面](https://img.twoice.fun:666/i/2025/03/16/tmp_ea7y6et-2.png)

### 2. 书籍管理
支持拖拽上传+自动元数据抓取：
![上传界面](https://img.twoice.fun:666/i/2025/03/16/tmpjc95kxza-2.png)

### 3. 移动端访问
OPDS地址：`http://IP:8109/opds`
在「静读天下」添加书源即可：
![手机阅读](https://img.twoice.fun:666/i/2025/03/16/tmp9u7i4_q8-2.png)

## 五、避坑指南
1. **封面提取失败**：部分PDF需要先用Calibre转换
2. **首次登录报错**：务必先执行数据库初始化命令
3. **书籍路径设置**：建议保持`BOOK_FOLDER_NAMING_FORMAT`默认值

## 六、总结点评
**适合人群**：电子书收藏超过100本的技术爱好者  
**推荐指数**：★★★★☆（扣分项：暂未支持中文搜索）  
**二冰实测**：部署简单但功能强大，配合NAS使用体验更佳。虽然目前0.6版本还有些小bug，但作为开源项目潜力十足，值得尝鲜！

需要汉化包和完整配置文件的兄弟，欢迎在评论区留言交流。如果觉得这篇攻略有用，别忘了点赞收藏支持一波~

最后，奉上我的超级无敌至尊docker库，二冰平时玩过的docker都整理到了这个仓库中了，一直在更新中，希望有github账号的兄弟能去给点个star，不知道玩啥的，都去这里面找，都给你们分好类了
**仓库链接：**
https://github.com/TWO-ICE/Awesome-NAS-Docker

