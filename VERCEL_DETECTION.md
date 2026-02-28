# Vercel 部署自动检测系统

## 📋 系统说明

Firefly 博客助手已配置完成**Vercel 部署自动检测**功能！

## 🚀 使用方法

### 方式1：使用自动检测推送（推荐）

```bash
cd /home/node/.openclaw/workspace-agent04/fireflyblog

# 使用自动检测脚本推送
bash scripts/git-push-detect.sh
```

**效果：**
1. ✅ 推送代码到 GitHub
2. ⏳ 等待 10 秒让 Vercel 开始部署
3. 🔍 自动检测网站是否可访问（最多等待 3 分钟）
4. ✅ 成功后通知你，并提供链接

### 方式2：手动检测

```bash
# 只检测当前最新提交的部署状态
bash scripts/check-deployment-simple.sh
```

### 方式3：普通推送（不检测）

```bash
# 普通 git push（不自动检测）
git push origin master
```

## 📊 检测逻辑

**工作原理：**
- 每隔 10 秒检查一次 https://doc.ebeb.fun/
- 如果返回 HTTP 200 或 304，判定为部署成功
- 最多等待 180 秒（3 分钟）
- 成功后会显示彩色输出和访问链接

**检测结果：**

| 结果 | 说明 | 退出码 |
|------|------|--------|
| ✅ 成功 | 网站可访问，部署完成 | 0 |
| ⏱️ 超时 | 3 分钟后仍不可访问 | 2 |
| ❌ 错误 | 检测过程出现异常 | 3 |

## 🎯 推荐工作流

### 完整流程（推荐）

```bash
# 1. 修改文件
vim src/config/siteConfig.ts

# 2. 提交更改
git add .
git commit -m "feat: 你的修改说明"

# 3. 使用自动检测推送
bash scripts/git-push-detect.sh

# 4. 等待自动检测完成，会显示：
# ✅ 部署成功！
# 🌐 访问: https://doc.ebeb.fun/
```

### 快速流程

```bash
# 一条命令搞定
git add . && git commit -m "message" && bash scripts/git-push-detect.sh
```

## 📝 示例输出

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Firefly 博客助手 - Git 推送 + 自动检测
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📤 推送到 GitHub...
...
✅ 推送成功！

⏳ 等待 10 秒让 Vercel 开始部署...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 Firefly 博客助手 - Vercel 部署状态检测
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 Commit: 54e4a8c
🌐 博客: https://doc.ebeb.fun/

⏳ 等待 Vercel 部署完成（最多 180 秒）...

✅ 部署成功！网站已可访问

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ 部署成功！
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 Commit: 54e4a8c
⏱️  耗时: 45 秒
🌐 访问: https://doc.ebeb.fun/
📊 Vercel: https://vercel.com/two-ice/fireflyblog

🎉 完美！所有步骤都成功了！
```

## 🔧 故障排查

### 问题1：网站一直不可访问

**可能原因：**
- Vercel 部署失败
- 网络连接问题
- 部署时间超过 3 分钟

**解决方法：**
```bash
# 手动检查 Vercel 面板
# 访问: https://vercel.com/two-ice/fireflyblog

# 查看部署日志和错误信息
```

### 问题2：检测超时但部署实际成功

**可能原因：**
- 网络延迟
- CDN 缓存问题

**解决方法：**
```bash
# 手动访问网站确认
curl -I https://doc.ebeb.fun/

# 或者直接在浏览器中打开
```

### 问题3：推送失败

**可能原因：**
- Git token 过期
- 网络问题
- 仓库权限变更

**解决方法：**
```bash
# 检查 Git 配置
git remote -v

# 测试连接
git ls-remote origin
```

## 📚 相关链接

- 博客地址: https://doc.ebeb.fun/
- Vercel 面板: https://vercel.com/two-ice/fireflyblog
- GitHub 仓库: https://github.com/TWO-ICE/Fireflyblog
- GitHub 部署: https://github.com/TWO-ICE/Fireflyblog/deployments

---

**Firefly 博客助手 🌟 - 让自动化更简单！**
