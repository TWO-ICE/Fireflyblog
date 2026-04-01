const fs = require('fs');
const path = require('path');

const posts = [
  { name: "SimpleDash", title: "极简仪表板神器！Docker三分钟搭建攻略", category: "信息聚合", level1: "效率工具集合", file: "simpledash-docker-仪表板.md",
    desc: "兄弟们是不是经常遇到这种尴尬场景？浏览器收藏夹堆了800个书签根本找不到，Docker服务散落在不同端口，日程管理还要单独开个APP...今天二冰实测这款SimpleDash，让你用Docker三分钟搭建专属控制台！",
    image: "https://img.twoice.fun:666/i/2025/03/16/tmp_d4fxyba-2.png" },
  { name: "Reubah", title: "一键搞定多格式转换！Docker神器Reubah实测", category: "文件处理", level1: "效率工具集合", file: "reubah-docker-格式转换.md",
    desc: "兄弟们，你们有没有遇到过这样的场景？设计师发来的PSD文件打不开，甲方爸爸的Word文档要转PDF，几十张产品图要批量压缩尺寸...今天二冰给你们安利个神器——Reubah！",
    image: "https://img.twoice.fun:666/i/2025/03/16/tmpk2ucijkp-2.png" },
  { name: "Deep Research Web UI", title: "一键生成万字报告！这个Docker神器让论文党彻底解放", category: "AI应用工具", level1: "AI应用生态", file: "deep-research-web-docker-ai报告.md",
    desc: "兄弟们，最近我在GitHub上挖到一个能让学术狗集体起立鼓掌的神器！试想一下：你导师凌晨三点发微信催开题报告，而你连文献综述的目录都没憋出来——这时候一个能自动爬全网资料、用大模型写万字深度报告的AI工具，是不是比亲妈还亲？",
    image: "https://img.twoice.fun:666/i/2025/03/16/tmp3dgv8o04-2.png" },
  { name: "docker-rss", title: "Docker容器更新不再错过！RSS订阅神器一键部署攻略", category: "资源监控", level1: "运维监控体系", file: "docker-rss-容器更新监控.md",
    desc: "兄弟们，你的Docker容器还在手动检查更新吗？身为搞机老司机，二冰每天要管理几十个Docker容器。最头疼的就是镜像更新提示总是后知后觉，直到发现了这个docker-rss神器！",
    image: "https://img.twoice.fun:666/i/2025/03/16/tmple09n_pt-2.png" },
  { name: "Kotaemon", title: "手把手教你用Docker部署文档聊天神器Kotaemon！从此告别PDF焦虑", category: "AI应用工具", level1: "AI应用生态", file: "kotaemon-docker-文档聊天.md",
    desc: "兄弟们，最近二冰在折腾一个黑科技神器——Kotaemon！这玩意儿能让你的PDF文档开口说话，论文党、产品经理、法务小哥们有福了！只需上传文档，就能像跟真人聊天一样提问！",
    image: "https://img.twoice.fun:666/i/2025/03/16/tmp4py8zr6l-2.png" },
  { name: "SillyTavern", title: "沉浸式AI角色扮演神器SillyTavern一键部署指南", category: "AI应用工具", level1: "AI应用生态", file: "sillytavern-docker-ai角色扮演.md",
    desc: "兄弟们有没有想过用AI玩《赛博朋克2077》？今天二冰给你们安利个黑科技——只要部署好这个开源神器，就能让AI小姐姐陪你玩角色扮演，还能生成专属剧情对白！",
    image: "https://img.twoice.fun:666/i/2025/03/16/tmpuktn6fhh-2.png" },
  { name: "yt-dlp-web", title: "手残党福音！Docker部署网页版YouTube下载神器，支持多平台VIP解析", category: "视频处理", level1: "多媒体处理中心", file: "yt-dlp-web-docker-视频下载.md",
    desc: "兄弟们，你们有没有遇到过这种情况？看到YouTube上的4K烹饪教学视频想保存，结果折腾半天命令行；想下载B站UP主的付费课程，却发现平台限制下载。",
    image: "https://img.twoice.fun:666/i/2025/03/16/tmpi9y20k1f-2.png" },
  { name: "DeepSeek-R1", title: "群晖NAS秒变AI工作站！DeepSeek-R1私有化部署实战", category: "部署与优化", level1: "AI应用生态", file: "deepseek-r1-docker-私有化部署.md",
    desc: "兄弟们，试想这样一个场景：你的产品文档涉及商业机密，但需要AI辅助撰写；你的客户数据包含隐私信息，却要用大模型分析。这时候还敢用公有云AI服务吗？",
    image: "https://img.twoice.fun:666/i/2025/03/16/tmpv89anyvc-2.png" },
  { name: "BanBan", title: "自托管看板神器BanBan：团队协作利器，5分钟Docker极速部署！", category: "项目管理", level1: "企业协作平台", file: "banban-docker-看板管理.md",
    desc: "兄弟们有没有遇到过这种情况？团队任务像无头苍蝇一样乱飞，微信群消息刷屏半小时都找不到重点。二冰最近发现一款能让你彻底告别混乱的神器——自托管看板工具BanBan！",
    image: "https://raw.gitmirror.com/TWO-ICE/image/main/week/202506261808805.png" },
  { name: "Dashly", title: "五分钟搞定NPM监控！这款实时仪表盘堪称运维神器", category: "资源监控", level1: "运维监控体系", file: "dashly-docker-npm监控.md",
    desc: "兄弟们是不是经常为了监控Nginx Proxy Manager的服务状态抓耳挠腮？今天二冰给大家安利个开箱即用的好东西——Dashly实时仪表盘！",
    image: "https://img.twoice.fun:666/i/2025/03/16/tmppvzot1gt-2.png" },
  { name: "deepseek-free-api", title: "零成本调用DeepSeek大模型！Docker极速部署指南", category: "部署与优化", level1: "AI应用生态", file: "deepseek-free-api-docker-零成本ai.md",
    desc: "兄弟们，最近发现个宝藏项目！现在不用买显卡不用租服务器，用Docker十分钟就能部署自己的大模型API服务。直接逆向DeepSeek官方接口，关键是兼容ChatGPT接口！",
    image: "https://img.twoice.fun:666/i/2025/03/16/tmpzaq2on_t-2.png" },
  { name: "Joget", title: "零代码神器Joget：3分钟部署企业级应用平台", category: "辅助开发工具", level1: "AI应用生态", file: "joget-docker-零代码平台.md",
    desc: "兄弟们，还在为开发企业级应用发愁？今天二冰给大家安利一个真正的零代码神器——Joget！无需写一行代码，小白也能快速搭建CRM、OA、HR系统！",
    image: "https://img.twoice.fun:666/i/2025/03/26/20250326001540179-2.png" },
  { name: "Chibisafe", title: "Docker神器！一键搭建私人文件保险库Chibisafe", category: "存储方案", level1: "基础服务架构", file: "chibisafe-docker-文件保险库.md",
    desc: "兄弟们有没有遇到过这样的场景？手机里的照片快撑爆存储空间，想找个私人图床存放；工作文档需要在多设备同步，但总担心网盘泄露隐私...",
    image: "https://img.twoice.fun:666/i/2025/03/16/tmp_tepo3lf-2.png" },
  { name: "Biblioteca", title: "打造私人数字图书馆！Docker部署Biblioteca全攻略", category: "存储方案", level1: "基础服务架构", file: "biblioteca-docker-数字图书馆.md",
    desc: "兄弟们，你们有没有遇到过这样的痛苦？下载了上千本电子书，却总是找不到想看的；换了设备就要重新整理书库；想用手机看书还要手动传文件...",
    image: "https://img.twoice.fun:666/i/2025/03/16/tmp_ea7y6et-2.png" },
  { name: "Open Notebook", title: "开源AI笔记神器！隐私至上还能自动生成播客，这个工具要火", category: "AI应用工具", level1: "AI应用生态", file: "open-notebook-docker-ai笔记.md",
    desc: "兄弟们，今天二冰要给你们安利一个颠覆传统笔记方式的黑科技！当你熬夜整理文献时，AI自动帮你生成思维导图；当你在通勤路上想复习知识，笔记能自动转成播客播放！",
    image: "https://img.twoice.fun:666/i/2025/03/16/tmpukhqh_dg-2.png" },
  { name: "飞牛私有云fnOS", title: "手把手教你在VMware虚拟机部署飞牛私有云fnOS", category: "存储方案", level1: "基础服务架构", file: "fnos-vmware-飞牛私有云.md",
    desc: "兄弟们！今天给大家带来一个超实用的家庭数据管理方案——在VMware虚拟机里搭建飞牛私有云fnOS系统！家里有吃灰旧电脑的千万别扔，分分钟给你整成专业级家庭数据中心！",
    image: "https://img.twoice.fun:666/i/2025/04/05/20250405014956345-2.png" },
  { name: "NoteFlow", title: "Docker实战：三分钟部署你的Markdown任务管理神器", category: "部署与优化", level1: "AI应用生态", file: "noteflow-docker-markdown任务管理.md",
    desc: "兄弟们注意了！今天要给你们安利一个程序员看了直呼内行的神器——用Docker部署的NoteFlow！这玩意儿把Markdown笔记和任务管理揉在一起！",
    image: "https://img.twoice.fun:666/i/2025/03/16/tmpbo5xu_u7-2.png" },
  { name: "Calmness", title: "三分钟快速入眠！这款呼吸训练神器必须自托管", category: "健康管理", level1: "家庭与物联网", file: "calmness-docker-呼吸训练.md",
    desc: "兄弟们，你是否有过这样的经历？凌晨三点瞪着天花板数羊，工作压力大到呼吸急促，辅导娃作业时心跳飙升......今天二冰给大伙儿安利个硬核解压神器——Calmness呼吸训练器！",
    image: "https://img.twoice.fun:666/i/2025/04/08/20250408234049319-2.png" },
  { name: "docker-wechat", title: "Docker容器秒开多个微信！群晖玩家私藏神器实测", category: "部署与优化", level1: "AI应用生态", file: "docker-wechat-多开微信.md",
    desc: "兄弟们有没有遇到过这样的尴尬场景？想同时登录工作和生活微信，结果PC端只能单开；想在Linux系统用微信，官方根本不提供客户端。",
    image: "https://img.twoice.fun:666/i/2025/03/06/202503060937811-2.png" },
  { name: "Plausible Analytics", title: "抛弃谷歌分析！自建1KB超轻量网站统计神器，数据隐私全掌握", category: "分析与可视化", level1: "数据与知识管理", file: "plausible-docker-网站统计.md",
    desc: "兄弟们有没有遇到过这种情况？想看看自己博客的访问数据，用谷歌分析总担心用户隐私泄露，国内统计工具又动不动给你塞广告。今天二冰给大家安利个开源神器——Plausible Analytics！",
    image: "https://img.twoice.fun:666/i/2025/09/19/202509191346618-2.png" },
  { name: "UniBoard", title: "Docker神器！一键自建导航+网盘+短链全能平台", category: "信息聚合", level1: "效率工具集合", file: "uniboard-docker-全能平台.md",
    desc: "兄弟们，二冰今天要给大家安利一个能替代5个工具的Docker神器——UniBoard！这玩意儿直接把个人主页、导航页、云笔记、短链服务和文件分享整合到一个平台！",
    image: "https://img.twoice.fun:666/i/2025/04/20/202504201102220-2.png" },
  { name: "StreamDock", title: "浏览器秒变电视！这款开源Web-IPTV神器让你扔掉机顶盒", category: "流媒体服务", level1: "多媒体处理中心", file: "streamdock-docker-iptv直播.md",
    desc: "兄弟们，最近发现一款能把浏览器变成网络电视的神器！只需一个Docker容器，就能在电脑、平板甚至智能电视上畅看全球直播频道！",
    image: "https://img.twoice.fun:666/i/2025/05/11/202505111716781-2.png" },
  { name: "allinone_format", title: "肥羊AllInOne绝配！可视化IPTV直播源格式化神器来了", category: "流媒体服务", level1: "多媒体处理中心", file: "allinone-format-docker-直播源.md",
    desc: "兄弟们，最近是不是总被家里老人吐槽电视直播卡顿？刚找到的源没两天就失效？今天二冰给大家安利一个能彻底解决直播源维护难题的神器——allinone_format！",
    image: "https://img.twoice.fun:666/i/2025/03/16/tmpxsaji7f2-2.png" },
  { name: "YYeTsBot", title: "手把手搭建私人影视库！Docker部署人人影视离线版终极指南", category: "家庭娱乐", level1: "家庭与物联网", file: "yyetsbot-docker-私人影视库.md",
    desc: "兄弟们，是不是经常遇到这种情况：想追的美剧全网下架，冷门电影找不到字幕，付费平台片源还不全？今天二冰给大家带来一个硬核解决方案——用Docker搭建人人影视离线库！",
    image: "https://img.twoice.fun:666/i/2025/03/16/tmpobctevmr-2.png" },
  { name: "PairDrop", title: "扔掉数据线！这个开源神器让你秒传文件到任何设备", category: "协作与共享", level1: "数据与知识管理", file: "pairdrop-docker-文件传输.md",
    desc: "兄弟们，有没有遇到过这样的场景？手机拍完照片想传到电脑修图，结果数据线死活找不到；在咖啡馆想给同事传个文档，微信文件助手却卡成PPT...",
    image: "https://img.twoice.fun:666/i/2025/08/26/202508261825971-2.png" },
];

// Map record_id to the rich text content index (order from API response)
// We'll just check if files already exist and skip them
const postsDir = path.join(__dirname, '..', 'src', 'content', 'posts');

// These files already exist from previous AI generation - they should be overwritten with real content
// Actually, some of these files may already exist with the same name. Let's check.
const existingFiles = new Set(fs.readdirSync(postsDir));

// Generate front matter only - the content will need to be fetched from the bitable separately
// For now, create placeholder files with just the front matter
let created = 0;
let skipped = 0;

for (const post of posts) {
  const filePath = path.join(postsDir, post.file);
  if (existingFiles.has(post.file)) {
    skipped++;
    console.log(`SKIP (exists): ${post.file}`);
    continue;
  }
  
  const tags = [`Docker`, post.category, post.name];
  const frontmatter = `---
title: ${post.title}
published: ${new Date().toISOString()}
description: ${post.desc.replace(/\n/g, ' ').substring(0, 200)}
image: ${post.image}
tags: [${tags.map(t => `"${t}"`).join(', ')}]
category: ${post.category}
draft: false
---

> 📝 文章内容正在从飞书多维表格同步中，请稍后更新...

`;

  fs.writeFileSync(filePath, frontmatter, 'utf-8');
  created++;
  console.log(`CREATED: ${post.file}`);
}

console.log(`\nDone! Created: ${created}, Skipped (exists): ${skipped}`);
