#!/bin/bash
# 简化的 Vercel 部署状态检测
# Firefly 博客助手专用 - 方案2：定时提醒模式

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# 配置
BLOG_URL="https://doc.ebeb.fun/"
VERCEL_URL="https://vercel.com/two-ice/fireflyblog"
MAX_WAIT=180  # 最多等待 3 分钟
CHECK_INTERVAL=10  # 每 10 秒检查一次

# 获取最新 commit
COMMIT_SHA=$(git log -1 --pretty=format:"%H")
COMMIT_SHORT=$(git log -1 --pretty=format:"%h")

echo -e "${CYAN}🔍 Firefly 博客助手 - Vercel 部署状态检测${NC}"
echo ""
echo -e "${BLUE}📦 Commit: ${COMMIT_SHORT}${NC}"
echo -e "${BLUE}🌐 博客: ${BLOG_URL}${NC}"
echo ""

# 等待函数
wait_for_deployment() {
    local elapsed=0
    local last_status=""
    
    echo -e "${YELLOW}⏳ 等待 Vercel 部署完成（最多 ${MAX_WAIT} 秒）...${NC}"
    echo ""
    
    while [ $elapsed -lt $MAX_WAIT ]; do
        # 检查网站是否可访问
        HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "${BLOG_URL}" 2>/dev/null)
        
        # 检查是否返回成功状态码
        if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "304" ]; then
            if [ "$last_status" != "success" ]; then
                echo -e "\r${GREEN}✅ 部署成功！网站已可访问${NC}                                                "
                echo ""
                echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
                echo -e "${GREEN}✨ 部署成功！${NC}"
                echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
                echo ""
                echo -e "${BLUE}📦 Commit: ${COMMIT_SHORT}${NC}"
                echo -e "${BLUE}⏱️  耗时: ${elapsed} 秒${NC}"
                echo -e "${BLUE}🌐 访问: ${BLOG_URL}${NC}"
                echo -e "${BLUE}📊 Vercel: ${VERCEL_URL}${NC}"
                echo ""
                return 0
            fi
        elif [ "$HTTP_CODE" = "000" ]; then
            # 连接失败，可能还在部署
            if [ $((elapsed % 20)) -eq 0 ] && [ $elapsed -gt 0 ]; then
                echo -e "\r${YELLOW}⏳ 部署中... (${elapsed}/${MAX_WAIT}秒) ${NC}                                                "
            fi
        else
            # 其他状态码
            if [ "$last_status" != "error_$HTTP_CODE" ]; then
                echo -e "\r${YELLOW}⏳ 检测到 HTTP ${HTTP_CODE}，继续等待... ${NC}                                        "
                last_status="error_$HTTP_CODE"
            fi
        fi
        
        sleep $CHECK_INTERVAL
        elapsed=$((elapsed + CHECK_INTERVAL))
        
        # 更新进度提示
        if [ $((elapsed % 20)) -eq 0 ] && [ "$last_status" != "success" ]; then
            echo -e "\r${YELLOW}⏳ 部署中... (${elapsed}/${MAX_WAIT}秒) ${NC}                                                "
        fi
    done
    
    # 超时
    echo ""
    echo -e "${YELLOW}⚠️  超时：${MAX_WAIT}秒后仍未检测到网站可访问${NC}"
    echo ""
    echo -e "${BLUE}💡 可能的原因：${NC}"
    echo "   • 部署仍在进行中（需要更长时间）"
    echo "   • 部署失败"
    echo "   • 网络连接问题"
    echo ""
    echo -e "${BLUE}🔗 相关链接：${NC}"
    echo -e "   • 博客: ${BLOG_URL}"
    echo -e "   • Vercel: ${VERCEL_URL}"
    echo -e "   • GitHub: https://github.com/TWO-ICE/Fireflyblog/deployments"
    echo ""
    return 2
}

# 主流程
main() {
    # 检查是否有参数（commit SHA）
    if [ -n "$1" ]; then
        COMMIT_SHORT=$1
    fi
    
    # 执行等待检测
    wait_for_deployment
}

# 运行主函数
main "$@"
