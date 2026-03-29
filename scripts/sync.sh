#!/bin/bash
# Emotion Dictionary 同步脚本
# 同步到 GitHub 和 Gitee

set -e

REPO_DIR="$HOME/.openclaw/workspace/skills/emotion-dictionary"
cd "$REPO_DIR"

echo "🔄 同步 emotion-dictionary 到代码托管平台..."

# 同步到 GitHub
echo "📤 推送到 GitHub..."
git push origin main

# 同步到 Gitee (如果配置了)
if git remote | grep -q gitee; then
    echo "📤 推送到 Gitee..."
    git push gitee main
else
    echo "⚠️  Gitee remote 未配置"
    echo ""
    echo "请按以下步骤配置 Gitee:"
    echo "1. 访问 https://gitee.com/new 创建仓库 johnyang/emotion-dictionary"
    echo "2. 添加 SSH key: https://gitee.com/profile/sshkeys"
    echo "3. 运行：git remote add gitee git@gitee.com:johnyang/emotion-dictionary.git"
    echo "4. 运行：git push -u gitee main"
fi

echo ""
echo "✅ 同步完成!"
echo ""
echo "📍 仓库地址:"
echo "   GitHub: https://github.com/johnyang/emotion-dictionary"
echo "   Gitee:  https://gitee.com/johnyang/emotion-dictionary"
