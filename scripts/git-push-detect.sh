#!/bin/bash
# Git 推送并自动检测 Vercel 部署状态
# Firefly 博客助手 - 方案2：定时提醒模式

# 获取脚本所在目录
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}🚀 Firefly 博客助手 - Git 推送 + 自动检测${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 执行 git push
echo -e "${BLUE}📤 推送到 GitHub...${NC}"
git push origin "$@"

# 检查推送结果
PUSH_EXIT_CODE=$?

if [ $PUSH_EXIT_CODE -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ 推送成功！${NC}"
    echo ""
    echo -e "${YELLOW}⏳ 等待 10 秒让 Vercel 开始部署...${NC}"
    sleep 10
    echo ""
    
    # 运行部署检测
    bash "$SCRIPT_DIR/check-deployment-simple.sh"
    
    DETECT_EXIT_CODE=$?
    echo ""
    
    if [ $DETECT_EXIT_CODE -eq 0 ]; then
        echo -e "${GREEN}🎉 完美！所有步骤都成功了！${NC}"
        exit 0
    elif [ $DETECT_EXIT_CODE -eq 2 ]; then
        echo -e "${YELLOW}⏳ 检测超时，请手动检查 Vercel 面板${NC}"
        exit 2
    else
        echo -e "${RED}❌ 检测过程出现问题${NC}"
        exit 3
    fi
else
    echo ""
    echo -e "${RED}❌ 推送失败！${NC}"
    echo -e "${YELLOW}💡 可能的原因：${NC}"
    echo "   • 网络连接问题"
    echo "   • GitHub 认证失败"
    echo "   • 仓库权限问题"
    echo ""
    exit 1
fi
