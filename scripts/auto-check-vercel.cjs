#!/usr/bin/env node
/**
 * Vercel 部署状态自动检测和通知脚本
 * Firefly 博客助手专用 - 每次推送后自动运行
 */

const https = require('https');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 配置
const REPO = 'TWO-ICE/Fireflyblog';
const VERCEL_URL = 'https://doc.ebeb.fun/';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 获取最新 commit SHA
function getLatestCommit() {
  try {
    return execSync('git log -1 --pretty=format:"%H"', { encoding: 'utf-8' }).trim();
  } catch (err) {
    log('❌ 获取 commit SHA 失败', 'red');
    process.exit(1);
  }
}

// 获取最新 commit short SHA
function getShortCommit(sha) {
  try {
    return execSync(`git log -1 --pretty=format:"%h" ${sha}`, { encoding: 'utf-8' }).trim();
  } catch (err) {
    return sha.substring(0, 7);
  }
}

// 检查部署状态
async function checkDeploymentStatus(commitSha) {
  const shortSha = getShortCommit(commitSha);
  
  log('🔍 开始检测 Vercel 部署状态...', 'cyan');
  log(`📦 Commit: ${shortSha}`, 'blue');
  log('', 'reset');

  const maxAttempts = 72; // 最多检查 72 次 (6 分钟)
  const interval = 5000;  // 每 5 秒检查一次
  let attempts = 0;

  return new Promise((resolve, reject) => {
    const checkStatus = () => {
      attempts++;

      const options = {
        hostname: 'api.github.com',
        path: `/repos/${REPO}/deployments?sha=${commitSha}`,
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'User-Agent': 'Firefly-Bot',
          'Accept': 'application/vnd.github.ant-man-preview+json',
        },
      };

      https.get(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            const deployments = JSON.parse(data);
            const deployment = deployments[0];

            if (!deployment) {
              if (attempts < maxAttempts) {
                if (attempts % 6 === 0) { // 每 30 秒输出一次
                  log(`⏳ 等待部署开始... (${attempts}/${maxAttempts})`, 'yellow');
                }
                setTimeout(checkStatus, interval);
              } else {
                log('⚠️  超时：部署未开始', 'yellow');
                log(`🌐 Vercel: https://vercel.com/two-ice/fireflyblog`, 'blue');
                resolve({ status: 'timeout', message: '部署未在超时时间内开始' });
              }
              return;
            }

            const status = deployment.state;
            
            if (attempts % 6 === 0 || ['success', 'failure', 'error'].includes(status)) {
              const statusEmoji = {
                'success': '✅',
                'failure': '❌',
                'error': '❌',
                'inactive': '⏸️',
                'in_progress': '⏳',
                'pending': '⏳',
                'queued': '⏳',
              };
              log(`📊 状态: ${statusEmoji[status] || '📌'} ${status} (${attempts}/${maxAttempts})`, status === 'success' ? 'green' : (status === 'failure' || status === 'error' ? 'red' : 'yellow'));
            }

            if (status === 'success') {
              log('', 'reset');
              log('✅ 部署成功！', 'green');
              log(`🌐 访问: ${VERCEL_URL}`, 'blue');
              log(`📦 Vercel: https://vercel.com/two-ice/fireflyblog`, 'blue');
              resolve({ status: 'success', message: '部署成功' });
            } else if (status === 'failure' || status === 'error') {
              log('', 'reset');
              log('❌ 部署失败！', 'red');
              log(`🔗 查看日志: ${deployment.url}`, 'blue');
              resolve({ status: 'failure', message: '部署失败', url: deployment.url });
            } else if (attempts < maxAttempts) {
              setTimeout(checkStatus, interval);
            } else {
              log('', 'reset');
              log('⚠️  超时：部署仍在进行中', 'yellow');
              log(`🌐 手动查看: https://vercel.com/two-ice/fireflyblog`, 'blue');
              resolve({ status: 'timeout', message: '部署超时' });
            }
          } catch (err) {
            log(`❌ 解析响应失败: ${err.message}`, 'red');
            reject(err);
          }
        });
      }).on('error', (err) => {
        log(`❌ 请求失败: ${err.message}`, 'red');
        if (attempts < maxAttempts) {
          setTimeout(checkStatus, interval);
        } else {
          reject(err);
        }
      });
    };

    checkStatus();
  });
}

// 主函数
async function main() {
  const commitSha = getLatestCommit();
  
  try {
    const result = await checkDeploymentStatus(commitSha);
    
    // 保存结果到文件，供外部读取
    const resultPath = path.join(__dirname, '.last-deployment-status.json');
    fs.writeFileSync(resultPath, JSON.stringify({
      ...result,
      commit: commitSha,
      timestamp: new Date().toISOString(),
    }, null, 2));
    
    // 根据状态返回不同的退出码
    if (result.status === 'success') {
      process.exit(0);
    } else if (result.status === 'failure') {
      process.exit(1);
    } else {
      process.exit(2);
    }
  } catch (err) {
    log(`❌ 检测失败: ${err.message}`, 'red');
    process.exit(3);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

// 导出函数供其他模块使用
module.exports = { checkDeploymentStatus, getLatestCommit };
