#!/usr/bin/env node

/**
 * Emotion Dictionary Query Script
 * 查询情绪词典中的情绪信息
 */

const fs = require('fs');
const path = require('path');

// 数据文件路径
const DATA_FILE = path.join(__dirname, '..', 'data', 'emotions.json');

// 加载情绪数据
function loadEmotions() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data).emotions;
  } catch (error) {
    console.error('❌ 无法加载情绪数据:', error.message);
    process.exit(1);
  }
}

// 感受层次名称
const LEVEL_NAMES = {
  1: '原始感受',
  2: '基本情绪',
  3: '情绪',
  4: '情感',
  5: '公情',
  6: '共情性情感',
  7: '超越性情感'
};

// 查询情绪
function queryEmotion(emotionName) {
  const emotions = loadEmotions();
  const emotion = emotions.find(e => 
    e.name === emotionName || 
    e.pinyin.includes(emotionName.toLowerCase().replace(/\s/g, ''))
  );

  if (!emotion) {
    console.log(`❌ 未找到情绪 "${emotionName}"`);
    console.log('💡 提示：使用 "emotion-dictionary list" 查看所有可用情绪');
    return;
  }

  console.log(`\n🎭 情绪：${emotion.name} (${emotion.pinyin})`);
  console.log(`📊 感受层次：第${emotion.level}层 - ${LEVEL_NAMES[emotion.level]}`);
  console.log(`📖 定义：${emotion.definition}`);
  console.log(`💡 心理意义：${emotion.psychological_meaning}`);
  console.log(`🔥 身体反应：${emotion.body_response}`);
  
  console.log('\n✅ 应对策略：');
  emotion.coping_strategies.forEach((strategy, index) => {
    console.log(`   ${index + 1}. ${strategy}`);
  });

  if (emotion.related_emotions && emotion.related_emotions.length > 0) {
    console.log(`\n🔗 相关情绪：${emotion.related_emotions.join('、')}`);
  }

  if (emotion.examples && emotion.examples.length > 0) {
    console.log(`\n📚 示例：${emotion.examples.join('、')}`);
  }

  console.log('');
}

// 列出所有情绪
function listEmotions() {
  const emotions = loadEmotions();
  
  console.log('\n📖 情绪词典 - 全部情绪列表\n');
  console.log('═'.repeat(50));

  // 按分类分组
  const categorized = {};
  emotions.forEach(emotion => {
    if (!categorized[emotion.category]) {
      categorized[emotion.category] = [];
    }
    categorized[emotion.category].push(emotion);
  });

  // 按字母顺序输出
  Object.keys(categorized).sort().forEach(category => {
    console.log(`\n【${category}类】`);
    categorized[category].forEach(emotion => {
      console.log(`   • ${emotion.name} (${emotion.pinyin}) - 第${emotion.level}层`);
    });
  });

  console.log(`\n═`.repeat(50));
  console.log(`总计：${emotions.length} 个情绪`);
  console.log('');
}

// 搜索情绪
function searchEmotions(keyword) {
  const emotions = loadEmotions();
  
  const matches = emotions.filter(e => 
    e.name.includes(keyword) ||
    e.pinyin.toLowerCase().includes(keyword.toLowerCase()) ||
    e.definition.includes(keyword) ||
    e.psychological_meaning.includes(keyword) ||
    (e.related_emotions && e.related_emotions.some(r => r.includes(keyword)))
  );

  if (matches.length === 0) {
    console.log(`❌ 未找到与 "${keyword}" 相关的情绪`);
    return;
  }

  console.log(`\n🔍 搜索 "${keyword}" - 找到 ${matches.length} 个匹配:\n`);
  matches.forEach(emotion => {
    console.log(`   • ${emotion.name} (${emotion.pinyin}) - 第${emotion.level}层`);
    console.log(`     ${emotion.definition.substring(0, 50)}...`);
  });
  console.log('');
}

// 主函数
function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command) {
    console.log(`
╔══════════════════════════════════════════════════╗
║         🎭 Emotion Dictionary 情绪词典            ║
╠══════════════════════════════════════════════════╣
║  用法：                                          ║
║    emotion-dictionary query <情绪名称>           ║
║    emotion-dictionary list                       ║
║    emotion-dictionary search <关键词>            ║
║                                                  ║
║  示例：                                          ║
║    emotion-dictionary query 焦虑                 ║
║    emotion-dictionary list                       ║
║    emotion-dictionary search 不安                ║
╚══════════════════════════════════════════════════╝
`);
    return;
  }

  switch (command) {
    case 'query':
      if (!args[1]) {
        console.log('❌ 请指定要查询的情绪名称');
        console.log('💡 示例：emotion-dictionary query 焦虑');
        return;
      }
      queryEmotion(args[1]);
      break;

    case 'list':
      listEmotions();
      break;

    case 'search':
      if (!args[1]) {
        console.log('❌ 请指定搜索关键词');
        console.log('💡 示例：emotion-dictionary search 不安');
        return;
      }
      searchEmotions(args[1]);
      break;

    default:
      console.log(`❌ 未知命令：${command}`);
      console.log('💡 使用 "emotion-dictionary" 查看帮助');
  }
}

main();
