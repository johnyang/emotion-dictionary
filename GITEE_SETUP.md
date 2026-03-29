# 🇨🇳 同步到 Gitee 指南

## 快速配置（3 分钟）

### 1️⃣ 创建 Gitee 账号

访问：https://gitee.com

可以用 GitHub 账号直接登录，或者用邮箱注册。

### 2️⃣ 创建仓库

1. 登录后访问：https://gitee.com/new
2. 填写：
   - 仓库名称：`emotion-dictionary`
   - 仓库路径：自动填充
3. **不要勾选**"初始化仓库"（我们要推送现有代码）
4. 点击`创建`

### 3️⃣ 添加 SSH Key

```bash
# 复制你的 SSH 公钥
cat ~/.ssh/id_ed25519.pub
```

然后：
1. 访问：https://gitee.com/profile/sshkeys
2. 点击 `添加公钥`
3. 粘贴上面的内容，保存

### 4️⃣ 推送代码

```bash
cd ~/.openclaw/workspace/skills/emotion-dictionary

# 添加 Gitee remote
git remote add gitee git@gitee.com:你的用户名/emotion-dictionary.git

# 推送
git push -u gitee main
```

---

## ✅ 完成后

你的 skill 会同时存在于：
- **GitHub**: https://github.com/johnyang/emotion-dictionary（国际用户）
- **Gitee**: https://gitee.com/你的用户名/emotion-dictionary（国内用户）

---

## 🔄 后续同步

修改后同时推送到两个平台：

```bash
cd ~/.openclaw/workspace/skills/emotion-dictionary

git add -A
git commit -m "更新内容"

git push origin main    # GitHub
git push gitee main     # Gitee
```

或者使用同步脚本：
```bash
./scripts/sync.sh
```

---

## 📊 为什么要同步到 Gitee？

| 原因 | 说明 |
|------|------|
| 访问速度 | GitHub 国内经常慢，Gitee 秒开 |
| 稳定性 | 不会被墙，随时可访问 |
| 国内用户 | 更多国内开发者能看到 |
| 备份 | 多一个平台多一份安全 |

---

**需要帮助？** 访问 Gitee 帮助中心：https://help.gitee.com
