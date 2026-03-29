# Emotion Dictionary 情绪词典

基于《情绪词典：你的感受试图告诉你什么》的情绪分析工具。

## 快速开始

```bash
# 查询情绪
node scripts/query.js query 焦虑

# 列出所有情绪
node scripts/query.js list

# 搜索情绪
node scripts/query.js search 不安

# 分析事件
node scripts/analyze.js analyze "今天工作压力很大"
```

## 功能

- **32 个核心情绪**：覆盖基本情绪、常见情绪和复杂感受
- **感受七层次**：从原始感受到超越性情感的完整框架
- **回归疗法六步循环**：觉察→接纳→探索→理解→行动→调整
- **实用应对策略**：每个情绪都有具体的应对建议

## 文件结构

```
emotion-dictionary/
├── SKILL.md              # 技能说明
├── package.json          # 项目配置
├── data/
│   └── emotions.json     # 情绪数据库（32 个情绪）
└── scripts/
    ├── query.js          # 查询脚本
    └── analyze.js        # 分析脚本
```

## 情绪层次

1. 原始感受 - 身体最直接的感受
2. 基本情绪 - 喜、怒、哀、惧、惊、厌恶
3. 情绪 - 焦虑、抑郁、孤独等
4. 情感 - 爱、感恩、信任、希望等
5. 公情 - 安全感、归属感、成就感等
6. 共情性情感 - 同理心、怜悯等
7. 超越性情感 - 意义感、使命感、存在感等

## License

MIT
