#!/bin/bash
# Git 推送并自动检测 Vercel 部署状态

# 执行 git push
echo "📤 推送到 GitHub..."
git push origin "$@"

# 检查推送是否成功
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 推送成功！开始检测部署状态..."
    echo ""

    # 执行检测脚本
    bash scripts/check-deployment.sh
else
    echo ""
    echo "❌ 推送失败！"
    exit 1
fi
