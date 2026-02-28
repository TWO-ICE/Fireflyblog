#!/usr/bin/env node
/**
 * Vercel 部署状态检测脚本
 * 用法: node scripts/check-vercel.js [commit-sha]
 */

const https = require('https');

// 配置
const REPO = 'TWO-ICE/Fireflyblog';
const VERCEL_PROJECT = 'fireflyblog';
const VERCEL_USER = 'two-ice';

// 从命令行参数获取 commit SHA，或使用最新的
const commitSha = process.argv[2] || require('child_process')
  .execSync('git log -1 --pretty=format:"%H"')
  .toString()
  .trim();

const commitShort = require('child_process')
  .execSync(`git log -1 --pretty=format:"%h" ${commitSha}`)
  .toString()
  .trim();

console.log('🔍 检查 Vercel 部署状态...');
console.log(`📦 Commit: ${commitShort}`);
console.log('');

// 方法1: 如果有 Vercel Token，使用 Vercel API
if (process.env.VERCEL_TOKEN) {
  checkWithVercelAPI();
}
// 方法2: 如果有 GitHub Token，使用 GitHub API
else if (process.env.GITHUB_TOKEN) {
  checkWithGitHubAPI();
}
// 方法3: 无 token，提供手动检测指南
else {
  showManualGuide();
}

/**
 * 使用 Vercel API 检测部署状态
 */
function checkWithVercelAPI() {
  console.log('📊 使用 Vercel API 检测...');

  const options = {
    hostname: 'api.vercel.app',
    path: `/v6/deployments?projectId=${VERCEL_PROJECT}`,
    headers: {
      'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
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
        const deployment = deployments.deployments?.find(
          d => d.commit === commitSha
        );

        if (deployment) {
          handleDeploymentStatus(deployment);
        } else {
          console.log('⏳ 部署未开始，请稍后再试...');
        }
      } catch (err) {
        console.error('❌ 解析响应失败:', err.message);
      }
    });
  }).on('error', (err) => {
    console.error('❌ 请求失败:', err.message);
  });
}

/**
 * 使用 GitHub API 检测部署状态
 */
function checkWithGitHubAPI() {
  console.log('📊 使用 GitHub API 检测...');
  console.log('💡 开始轮询部署状态...\n');

  const maxAttempts = 60; // 最多检查 60 次
  const interval = 5000;  // 每 5 秒检查一次

  let attempts = 0;

  const checkStatus = () => {
    attempts++;

    const options = {
      hostname: 'api.github.com',
      path: `/repos/${REPO}/deployments?sha=${commitSha}`,
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
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
              console.log(`⏳ 等待部署开始... (${attempts}/${maxAttempts})`);
              setTimeout(checkStatus, interval);
            } else {
              console.log('⚠️  超时：部署未开始');
              console.log(`🌐 Vercel: https://vercel.com/${VERCEL_USER}/${VERCEL_PROJECT}`);
            }
            return;
          }

          const status = deployment.state;
          const statusEmoji = {
            'success': '✅',
            'failure': '❌',
            'error': '❌',
            'inactive': '⏸️',
            'in_progress': '⏳',
            'pending': '⏳',
            'queued': '⏳',
          };

          console.log(`📊 状态: ${statusEmoji[status] || '📌'} ${status}`);

          if (status === 'success') {
            console.log('\n✅ 部署成功！');
            console.log(`🌐 访问: https://doc.ebeb.fun/`);
            console.log(`📦 Vercel: https://vercel.com/${VERCEL_USER}/${VERCEL_PROJECT}`);
            process.exit(0);
          } else if (status === 'failure' || status === 'error') {
            console.log('\n❌ 部署失败！');
            console.log(`🔗 查看日志: ${deployment.url}`);
            process.exit(1);
          } else if (attempts < maxAttempts) {
            console.log(`⏳ 部署中... (${attempts}/${maxAttempts})`);
            setTimeout(checkStatus, interval);
          } else {
            console.log('\n⚠️  超时：部署仍在进行中');
            console.log(`🌐 手动查看: https://vercel.com/${VERCEL_USER}/${VERCEL_PROJECT}`);
            process.exit(2);
          }
        } catch (err) {
          console.error('❌ 解析响应失败:', err.message);
          process.exit(1);
        }
      });
    }).on('error', (err) => {
      console.error('❌ 请求失败:', err.message);
      if (attempts < maxAttempts) {
        setTimeout(checkStatus, interval);
      } else {
        process.exit(1);
      }
    });
  };

  checkStatus();
}

/**
 * 显示手动检测指南
 */
function showManualGuide() {
  console.log('📊 检测模式: 无认证 Token\n');
  console.log('💡 提示: 要自动检测部署状态，请设置以下环境变量之一：\n');
  console.log('   方式1 (推荐): 使用 GitHub Token');
  console.log('   export GITHUB_TOKEN=your_github_token_here\n');
  console.log('   方式2: 使用 Vercel Token');
  console.log('   export VERCEL_TOKEN=your_vercel_token_here\n');
  console.log('⏳ Vercel 通常需要 1-3 分钟完成部署\n');
  console.log('🌐 相关链接:');
  console.log(`   • 博客地址: https://doc.ebeb.fun/`);
  console.log(`   • Vercel 面板: https://vercel.com/${VERCEL_USER}/${VERCEL_PROJECT}`);
  console.log(`   • GitHub: https://github.com/${REPO}/deployments\n`);
  console.log('✅ 代码已推送，部署已自动触发！');
}
