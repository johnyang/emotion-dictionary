# 同步到国内平台指南

## 推荐平台：Gitee (码云)

**网址**: https://gitee.com

**优势**:
- 国内访问速度快
- 功能与 GitHub 基本一致
- 支持私有仓库（免费 5 人协作）
- 用户多，社区活跃

---

## 📝 配置步骤

### 1. 注册/登录 Gitee

访问 https://gitee.com 注册账号（可用 GitHub 账号登录）

### 2. 创建仓库

1. 点击右上角 `+` → `新建仓库`
2. 仓库名称：`emotion-dictionary`
3. 仓库路径：`johnyang/emotion-dictionary`
4. visibility：公开
5. **不要**初始化 README（我们要推送现有代码）
6. 点击`创建`

### 3. 添加 SSH Key（如未添加）

```bash
# 查看现有 SSH key
cat ~/.ssh/id_ed25519.pub

# 如果没有，生成新的
ssh-keygen -t ed25519 -C "your_email@example.com"
```

复制输出的内容，然后：
1. 访问 https://gitee.com/profile/sshkeys
2. 点击 `添加 SSH 公钥`
3. 粘贴公钥内容，保存

### 4. 添加 Gitee remote

```bash
cd ~/.openclaw/workspace/skills/emotion-dictionary
git remote add gitee git@gitee.com:johnyang/emotion-dictionary.git
```

### 5. 推送到 Gitee

```bash
git push -u gitee main
```

---

## 🔄 后续同步

### 方法一：使用同步脚本

```bash
cd ~/.openclaw/workspace/skills/emotion-dictionary
chmod +x scripts/sync.sh
./scripts/sync.sh
```

### 方法二：手动推送

```bash
cd ~/.openclaw/workspace/skills/emotion-dictionary
git push origin main    # GitHub
git push gitee main     # Gitee
```

---

## 📦 其他国内平台

### GitCode (CSDN)

- 网址：https://gitcode.com
- 优势：与 CSDN 集成，适合技术分享
- 配置方式类似 Gitee

### 阿里云 Code

- 网址：https://code.aliyun.com
- 优势：与企业阿里云集成
- 适合：企业团队使用

### 腾讯云 Coding

- 网址：https://coding.net
- 优势：集成 DevOps 工具链
- 适合：需要 CI/CD 的团队

---

## 💡 建议

**双平台策略**:
- **GitHub**: 面向国际用户，建立影响力
- **Gitee**: 面向国内用户，保证访问速度

在 README 中同时标注两个地址，让用户自行选择。

---

## 📊 对比

| 功能 | GitHub | Gitee |
|------|--------|-------|
| 国内访问速度 | 慢 | 快 ⭐ |
| 国际影响力 | 高 ⭐ | 中 |
| 免费私有仓库 | 无限 | 5 人 |
| Actions/CI | 强大 | 基础 |
| 社区生态 | 全球 | 国内 |

**推荐**: 两个都同步，互不冲突！
