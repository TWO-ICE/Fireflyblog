/**
 * 从飞书多维表格读取文章内容并写入博客文件
 * 使用方式: node scripts/fill-posts-from-bitable.cjs
 * 
 * 需要 OPENCLAW 飞书 API 代理
 */
const fs = require('fs');
const path = require('path');

// 记录ID与文件名的映射
const mapping = [
  { record_id: "recuEKgsgIUXxA", file: "simpledash-docker-仪表板.md" },
  { record_id: "recuEKgsgIWwEJ", file: "reubah-docker-格式转换.md" },
  { record_id: "recuEKgsgIUKhT", file: "deep-research-web-docker-ai报告.md" },
  { record_id: "recuEKgsgIxwyY", file: "docker-rss-容器更新监控.md" },
  { record_id: "recuEKgsgIqrQG", file: "kotaemon-docker-文档聊天.md" },
  { record_id: "recuEKgsgIf6NL", file: "sillytavern-docker-ai角色扮演.md" },
  { record_id: "recuEKgsgINHZY", file: "yt-dlp-web-docker-视频下载.md" },
  { record_id: "recuEKgsgIWEyp", file: "deepseek-r1-docker-私有化部署.md" },
  { record_id: "recuEKgsgIsGqJ", file: "banban-docker-看板管理.md" },
  { record_id: "recuEKgsgI4Nvi", file: "dashly-docker-npm监控.md" },
  { record_id: "recuEKgsgIkesa", file: "deepseek-free-api-docker-零成本ai.md" },
  { record_id: "recuEKgsgIxKMG", file: "joget-docker-零代码平台.md" },
  { record_id: "recuEKgsgIQ7Jp", file: "chibisafe-docker-文件保险库.md" },
  { record_id: "recuEKgsgIpktq", file: "biblioteca-docker-数字图书馆.md" },
  { record_id: "recuEKgsgIZ2vB", file: "open-notebook-docker-ai笔记.md" },
  { record_id: "recuEKgsgI7OJe", file: "fnos-vmware-飞牛私有云.md" },
  { record_id: "recuEKgsgIuF77", file: "noteflow-docker-markdown任务管理.md" },
  { record_id: "recuEKgsgITEys", file: "calmness-docker-呼吸训练.md" },
  { record_id: "recuEKgsgIP4ZY", file: "docker-wechat-多开微信.md" },
  { record_id: "recuEKgsgINEz9", file: "plausible-docker-网站统计.md" },
  { record_id: "recuEKgsgIQoi3", file: "uniboard-docker-全能平台.md" },
  { record_id: "recuEKgsgIjEh6", file: "streamdock-docker-iptv直播.md" },
  { record_id: "recuEKgsgIw5jE", file: "allinone-format-docker-直播源.md" },
  { record_id: "recuEKgsgI0wqX", file: "yyetsbot-docker-私人影视库.md" },
  { record_id: "recuEKgsgIRKFL", file: "pairdrop-docker-文件传输.md" },
];

/**
 * 将飞书富文本数组转换为纯 Markdown 字符串
 */
function richTextToMarkdown(richTextArray) {
  if (!Array.isArray(richTextArray)) return '';
  return richTextArray.map(item => {
    if (item.type === 'url' && item.link) {
      return `[${item.text}](${item.link})`;
    }
    return item.text || '';
  }).join('');
}

const postsDir = path.join(__dirname, '..', 'src', 'content', 'posts');

console.log(`Posts directory: ${postsDir}`);
console.log(`Total articles to process: ${mapping.length}`);

// 检查文件是否存在
let missing = [];
let existing = [];
for (const m of mapping) {
  const fp = path.join(postsDir, m.file);
  if (fs.existsSync(fp)) {
    existing.push(m.file);
  } else {
    missing.push(m.file);
  }
}
console.log(`\nExisting files: ${existing.length}`);
console.log(`Missing files: ${missing.length}`);
if (missing.length) {
  console.log('Missing:', missing);
}

console.log('\nThis script needs to be run with feishu API access.');
console.log('Use the OpenClaw feishu_bitable tools to fetch record content.');
