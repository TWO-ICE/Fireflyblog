#!/bin/bash
# Git 推送并自动检测 Vercel 部署状态
# Firefly 博客助手专用

# 获取当前脚本所在目录
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# 执行 git push，传递所有参数
echo "📤 推送到 GitHub..."
git push origin "$@"

# 检查推送是否成功
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 推送成功！开始自动检测部署状态..."
    echo ""
    
    # 等待 10 秒让 Vercel 开始部署
    echo "⏳ 等待 Vercel 开始部署..."
    sleep 10
    
    # 运行自动检测脚本
    node "$SCRIPT_DIR/auto-check-vercel.cjs"
    
    # 根据检测结果输出不同信息
    EXIT_CODE=$?
    echo ""
    
    if [ $EXIT_CODE -eq 0 ]; then
        echo "🎉 完美！部署已成功完成！"
    elif [ $EXIT_CODE -eq 1 ]; then
        echo "⚠️  注意：部署失败，请检查错误日志"
    elif [ $EXIT_CODE -eq 2 ]; then
        echo "⏳ 部署超时，请手动检查 Vercel 面板"
    else
        echo "❌ 检测过程出现错误"
    fi
    
    exit $EXIT_CODE
else
    echo ""
    echo "❌ 推送失败！请检查网络或仓库权限"
    exit 1
fi
