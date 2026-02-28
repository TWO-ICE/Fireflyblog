#!/bin/bash
# 检查 Vercel 部署状态脚本

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 获取最新的 commit SHA
COMMIT_SHA=$(git log -1 --pretty=format:"%H")
COMMIT_SHORT=$(git log -1 --pretty=format:"%h")

echo "🔍 检查部署状态..."
echo "📦 Commit: $COMMIT_SHORT"
echo ""

# Vercel 部署状态 URL（GitHub 仓库格式）
REPO="TWO-ICE/Fireflyblog"
VERCEL_URL="https://vercel.com/two-ice/fireflyblog"

# 方法1: 使用 GitHub API 检查部署状态（如果设置了 GITHUB_TOKEN）
if [ -n "$GITHUB_TOKEN" ]; then
    echo "📊 使用 GitHub API 检查部署状态..."

    # 等待最多 5 分钟（60次 × 5秒）
    for i in {1..60}; do
        STATUS=$(curl -s \
            -H "Authorization: token $GITHUB_TOKEN" \
            -H "Accept: application/vnd.github.ant-man-preview+json" \
            "https://api.github.com/repos/$REPO/deployments?sha=$COMMIT_SHA" | \
            jq -r '.[0].status' 2>/dev/null)

        if [ "$STATUS" = "success" ]; then
            echo -e "${GREEN}✅ 部署成功！${NC}"
            echo "🌐 访问: $VERCEL_URL"
            exit 0
        elif [ "$STATUS" = "failure" ] || [ "$STATUS" = "error" ]; then
            echo -e "${RED}❌ 部署失败！${NC}"
            echo "📊 状态: $STATUS"
            exit 1
        elif [ "$STATUS" = "in_progress" ] || [ "$STATUS" = "pending" ] || [ "$STATUS" = "queued" ]; then
            echo -e "${YELLOW}⏳ 部署中... ($i/60)${NC}"
            sleep 5
        else
            echo -e "${YELLOW}⏳ 等待部署开始... ($i/60)${NC}"
            sleep 5
        fi
    done

    echo -e "${YELLOW}⚠️  超时：部署仍在进行中${NC}"
    echo "🌐 手动查看: $VERCEL_URL"
    exit 2

# 方法2: 无 token 时的简单检测（访问部署页面）
else
    echo "📊 检测模式: 无 GitHub Token"
    echo "💡 提示: 设置 GITHUB_TOKEN 环境变量可获取更精确的状态"
    echo ""
    echo "⏳ Vercel 通常需要 1-3 分钟完成部署"
    echo "🌐 部署页面: $VERCEL_URL"
    echo ""
    echo "✅ 推送成功！部署已触发，请稍后访问网站查看。"
    echo ""
    echo "📌 提示: 你可以设置 GitHub Token 来自动检测部署状态"
    echo "   export GITHUB_TOKEN=your_token_here"
    echo ""
fi
