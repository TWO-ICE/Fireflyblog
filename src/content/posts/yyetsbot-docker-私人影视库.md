---
title: 手把手搭建私人影视库！Docker部署人人影视离线版终极指南
published: 2026-04-01T06:33:48.804Z
description: 兄弟们，是不是经常遇到这种情况：想追的美剧全网下架，冷门电影找不到字幕，付费平台片源还不全？今天二冰给大家带来一个硬核解决方案——用Docker搭建人人影视离线库！
image: https://img.twoice.fun:666/i/2025/03/16/tmpobctevmr-2.png
tags: ["Docker", "家庭娱乐", "YYeTsBot"]
category: 家庭娱乐
draft: false
---

兄弟们，是不是经常遇到这种情况：想追的美剧全网下架，冷门电影找不到字幕，付费平台片源还不全？今天二冰给大家带来一个硬核解决方案——用Docker搭建人人影视离线库！二十年影视资源任你调取，还能结合Telegram机器人智能检索，看完这篇教程，你的私人影视库直接原地起飞！

## 一、项目简介
**YYeTsBot**（GitHub地址：https://github.com/tgbot-collection/YYeTsBot）是人人的开源遗产，包含：
- 20年积累的影视资源数据库
- 网页端+Telegram机器人双端访问
- 支持字幕下载、资源检索、在线播放
- 完全离线部署，不受平台限制

## 二、五大核心优势
1. **海量资源**：包含美剧/日剧/纪录片等稀缺资源
2. **智能搜索**：支持中英文模糊匹配，比某度精准10倍
3. **多端同步**：网页端追剧+手机Bot找资源无缝衔接
4. **隐私安全**：数据完全本地化，告别云平台审查
5. **持续更新**：社区维护数据库，新剧资源及时入库

## 三、Docker部署全流程（Dockge版）

### 准备工作
1. 注册Telegram账号并创建Bot（获取TOKEN和chatId）
2. 下载数据库文件：https://yyets.click/database（选择yyets_mongo.gz）

### 部署步骤
打开Dockge面板 -> 创建堆栈 -> 设置堆栈名称 -> 粘贴以下compose代码 -> 30秒启动成功！
![](https://img.twoice.fun:666/i/2025/03/06/202503060937811-2.png)

```yaml
version: '3.1'

services:
  redis:
    image: redis:7-alpine
    container_name: yyets-redis
    restart: always

  mongo:
    image: mongo:6
    container_name: yyets-mongo
    volumes:
      - ./mongo:/data/db
    command: --quiet

  meili:
    image: getmeili/meilisearch:v1.0.2
    environment:
      - MEILI_HTTP_PAYLOAD_SIZE_LIMIT=1073741824
    volumes:
      - ./meilisearch:/meili_data

  mysql:
    image: ubuntu/mysql:8.0-22.04_beta
    volumes:  
      - ./mysql:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: 'root'
    command: "--skip-log-bin --default-authentication-plugin=mysql_native_password"

  bot:
    image: bennythink/yyetsbot
    env_file: yyets.env
    depends_on:
      - redis
      - mongo

  web:
    image: bennythink/yyetsbot
    env_file: yyets.env
    ports:
      - "8877:8888"
    volumes:
      - ./subtitle:/YYeTsBot/yyetsweb/subtitle_data
    command: [ "python3","server.py","-h=0.0.0.0" ]
```

**环境变量配置（yyets.env）**
```ini
TOKEN=你的Telegram_Bot_Token
USERNAME=管理员账号
PASSWORD=管理员密码
BOT_NAME=你的机器人名称
MAINTAINER=维护者ID
```

**数据库导入命令**
```bash
docker cp yyets_mongo.gz yyets-mongo:/tmp
docker exec yyets-mongo mongorestore --gzip --archive=/tmp/yyets_mongo.gz
```

## 四、使用指南

### 网页端（http://IP:8877）
- **资源检索**：支持中英文/导演/演员多维度搜索
- **字幕下载**：自动匹配多版本字幕（简中/繁中/双语）
- **会员系统**：可设置不同用户权限（管理员/普通用户）

![Image 136](https://img.twoice.fun:666/i/2025/03/16/tmpobctevmr-2.png)

### Telegram机器人
- 输入剧名自动返回资源列表
- 点击链接直达播放页面
- 支持磁力链接/电驴/网盘多通道

![Image 142](https://img.twoice.fun:666/i/2025/03/16/tmp2hwdj3jz-2.png)

## 五、避坑指南
1. **数据库超时**：执行 `docker-compose restart` 重启服务
2. **网页登录失败**：检查MONGO环境变量是否为mongo
3. **搜索无结果**：确认数据库文件已正确导入
4. **播放卡顿**：在meili服务中增加内存限制

## 六、总结建议
适合人群：
✅ 技术爱好者
✅ 影视收藏控
✅ 海外追剧党

这个项目堪称影视资源的诺亚方舟，虽然部署过程需要一定技术基础，但搭建成功后就是终身免费的影视VIP！建议搭配NAS使用，打造属于你的私人Netflix。

最后，奉上我的超级无敌至尊docker库，二冰平时玩过的docker都整理到了这个仓库中了，一直在更新中，希望有github账号的兄弟能去给点个star，不知道玩啥的，都去这里面找，都给你们分好类了  
**仓库链接：**  
https://github.com/TWO-ICE/Awesome-NAS-Docker

如果觉得教程有用，别忘了点赞收藏，有问题欢迎评论区交流~

