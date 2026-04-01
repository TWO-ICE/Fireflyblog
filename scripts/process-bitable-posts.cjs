/**
 * 批量将飞书多维表格的"待发布"字段内容写入博客 Markdown 文件
 * 
 * 用法: node scripts/process-bitable-posts.cjs
 * 
 * 前提: 需要通过 OpenClaw 飞书 API 获取数据并保存为 JSON
 * 
 * 数据格式: 从 feishu_bitable_app_table_record 获取的 records 数组
 * 每条记录包含 record_id 和 fields.待发布 (rich text array)
 */
const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '..', 'src', 'content', 'posts');

// record_id -> filename 映射
const recordToFile = {
  "recuEKgsgIUXxA": "simpledash-docker-仪表板.md",
  "recuEKgsgIWwEJ": "reubah-docker-格式转换.md",
  "recuEKgsgIUKhT": "deep-research-web-docker-ai报告.md",
  "recuEKgsgIxwyY": "docker-rss-容器更新监控.md",
  "recuEKgsgIqrQG": "kotaemon-docker-文档聊天.md",
  "recuEKgsgIf6NL": "sillytavern-docker-ai角色扮演.md",
  "recuEKgsgINHZY": "yt-dlp-web-docker-视频下载.md",
  "recuEKgsgIWEyp": "deepseek-r1-docker-私有化部署.md",
  "recuEKgsgIsGqJ": "banban-docker-看板管理.md",
  "recuEKgsgI4Nvi": "dashly-docker-npm监控.md",
  "recuEKgsgIkesa": "deepseek-free-api-docker-零成本ai.md",
  "recuEKgsgIxKMG": "joget-docker-零代码平台.md",
  "recuEKgsgIQ7Jp": "chibisafe-docker-文件保险库.md",
  "recuEKgsgIpktq": "biblioteca-docker-数字图书馆.md",
  "recuEKgsgIZ2vB": "open-notebook-docker-ai笔记.md",
  "recuEKgsgI7OJe": "fnos-vmware-飞牛私有云.md",
  "recuEKgsgIuF77": "noteflow-docker-markdown任务管理.md",
  "recuEKgsgITEys": "calmness-docker-呼吸训练.md",
  "recuEKgsgIP4ZY": "docker-wechat-多开微信.md",
  "recuEKgsgINEz9": "plausible-docker-网站统计.md",
  "recuEKgsgIQoi3": "uniboard-docker-全能平台.md",
  "recuEKgsgIjEh6": "streamdock-docker-iptv直播.md",
  "recuEKgsgIw5jE": "allinone-format-docker-直播源.md",
  "recuEKgsgI0wqX": "yyetsbot-docker-私人影视库.md",
  "recuEKgsgIRKFL": "pairdrop-docker-文件传输.md",
  "recuEKgsgI5Dxp": "pairdrop-docker-文件传输.md", // 备用 record_id
};

/**
 * 将飞书富文本数组转换为纯 Markdown 字符串
 * @param {Array} richTextArray - 飞书富文本元素数组
 * @returns {string} Markdown 文本
 */
function richTextToMarkdown(richTextArray) {
  if (!Array.isArray(richTextArray)) return '';
  return richTextArray.map(item => {
    if (item.link && item.text !== item.link) {
      return `[${item.text}](${item.link})`;
    }
    return item.text || '';
  }).join('');
}

/**
 * 从 .md 文件中提取 front matter
 * @param {string} content - 文件完整内容
 * @returns {string} front matter (包含 --- 分隔符)
 */
function extractFrontMatter(content) {
  const match = content.match(/^---[\s\S]*?---/);
  return match ? match[0] : '';
}

// 读取 JSON 数据文件
const dataFile = path.join(__dirname, 'bitable-data.json');
if (!fs.existsSync(dataFile)) {
  console.error('ERROR: bitable-data.json not found!');
  console.error('Please save the bitable API response to this file first.');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
const records = data.records || data;

let processed = 0;
let skipped = 0;
let notFound = 0;

for (const record of records) {
  const recordId = record.record_id;
  const fileName = recordToFile[recordId];
  
  if (!fileName) {
    console.log(`SKIP (no mapping): ${recordId}`);
    notFound++;
    continue;
  }
  
  const filePath = path.join(postsDir, fileName);
  
  if (!fs.existsSync(filePath)) {
    console.log(`MISSING: ${fileName}`);
    notFound++;
    continue;
  }
  
  const richText = record.fields?.待发布;
  if (!richText || richText.length === 0) {
    console.log(`EMPTY: ${fileName}`);
    skipped++;
    continue;
  }
  
  const markdown = richTextToMarkdown(richText);
  if (!markdown.trim()) {
    console.log(`BLANK: ${fileName}`);
    skipped++;
    continue;
  }
  
  // Check if already has real content (not placeholder)
  const existingContent = fs.readFileSync(filePath, 'utf-8');
  if (!existingContent.includes('飞书多维表格同步中')) {
    console.log(`ALREADY DONE: ${fileName}`);
    skipped++;
    continue;
  }
  
  // Extract front matter and replace body
  const frontMatter = extractFrontMatter(existingContent);
  const newContent = frontMatter + '\n' + markdown.trim();
  
  fs.writeFileSync(filePath, newContent, 'utf-8');
  processed++;
  console.log(`OK: ${fileName} (${markdown.length} chars)`);
}

console.log(`\n=== Done ===`);
console.log(`Processed: ${processed}`);
console.log(`Skipped: ${skipped}`);
console.log(`Not found: ${notFound}`);
