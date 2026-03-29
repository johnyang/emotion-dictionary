#!/usr/bin/env node

/**
 * Emotion Dictionary Analysis Script
 * 分析事件中的情绪并给出建议
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

// 情绪关键词映射（用于识别事件中的情绪）
const EMOTION_KEYWORDS = {
  '焦虑': ['担心', '焦虑', '紧张', '不安', '忐忑', '害怕', '慌', '急'],
  '愤怒': ['生气', '愤怒', '恼火', '火大', '气', '怒', '烦', '不爽'],
  '悲伤': ['难过', '悲伤', '伤心', '哭', '泪', '痛', '失落', '心痛'],
  '恐惧': ['害怕', '恐惧', '恐', '慌', '惊吓', '惊悚'],
  '快乐': ['开心', '快乐', '高兴', '爽', '乐', '喜', '愉悦'],
  '抑郁': ['抑郁', '低落', '消沉', '没劲', '提不起', '不想'],
  '孤独': ['孤独', '孤单', '一个人', '没人', '孤立', '疏离'],
  '空虚': ['空虚', '空洞', '没意义', '虚无', '空白'],
  '无聊': ['无聊', '没意思', '乏味', '腻', '厌倦'],
  '嫉妒': ['嫉妒', '羡慕', '酸', '眼红', '不甘心'],
  '内疚': ['内疚', '愧疚', '抱歉', '对不起', '后悔', '自责'],
  '羞耻': ['羞耻', '丢脸', '丢人', '尴尬', '难堪', '没脸'],
  '自卑': ['自卑', '不如', '不行', '不够好', '配不上'],
  '委屈': ['委屈', '冤枉', '不公平', '被误解', '苦衷'],
  '爱': ['爱', '喜欢', '爱慕', '疼爱', '关爱'],
  '感恩': ['感恩', '感谢', '感激', '谢谢', '感动'],
  '希望': ['希望', '期待', '盼望', '憧憬', '盼望'],
  '信任': ['信任', '相信', '信赖', '放心'],
  '幸福': ['幸福', '美满', '甜蜜', '幸运'],
  '安全感': ['安全', '安心', '踏实', '稳定', '放心'],
  '归属感': ['归属', '属于', '接纳', '融入', '一家'],
  '成就感': ['成就', '成功', '完成', '做到', '骄傲', '自豪'],
  '意义感': ['意义', '价值', '值得', '重要'],
  '失控感': ['失控', '乱', '混乱', '无法控制', '不由'],
  '无力感': ['无力', '累', '疲惫', '撑不住', '扛不住'],
  '无助感': ['无助', '没人帮', '孤立无援', '没办法'],
  '绝望感': ['绝望', '没希望', '完了', '放弃', '不想活'],
  '存在感': ['存在', '活着', '真实', '觉察'],
  '使命感': ['使命', '召唤', '天职', '注定'],
  '责任感': ['责任', '义务', '应该', '必须', '得']
};

// 分析文本中的情绪
function detectEmotions(text) {
  const emotions = loadEmotions();
  const detected = [];

  Object.entries(EMOTION_KEYWORDS).forEach(([emotionName, keywords]) => {
    const matchedKeywords = keywords.filter(kw => text.includes(kw));
    if (matchedKeywords.length > 0) {
      const emotion = emotions.find(e => e.name === emotionName);
      if (emotion) {
        detected.push({
          ...emotion,
          matchedKeywords
        });
      }
    }
  });

  // 按层次排序（层次低的先显示）
  detected.sort((a, b) => a.level - b.level);

  return detected;
}

// 分析事件
function analyzeEvent(eventText) {
  console.log('\n╔══════════════════════════════════════════════════╗');
  console.log('║       🔍 情绪分析 - Emotion Analysis              ║');
  console.log('╚══════════════════════════════════════════════════╝\n');

  console.log(`📝 事件描述：${eventText}\n`);
  console.log('─'.repeat(50));

  // 步骤 1: 识别情绪
  const detectedEmotions = detectEmotions(eventText);

  if (detectedEmotions.length === 0) {
    console.log('\n😐 未检测到明显的情绪关键词');
    console.log('💡 提示：尝试更详细地描述你的感受和事件');
    console.log('');
    return;
  }

  console.log(`\n🎭 步骤 1: 识别到的情绪 (${detectedEmotions.length} 种)\n`);
  detectedEmotions.forEach((emotion, index) => {
    console.log(`   ${index + 1}. ${emotion.name} (${emotion.pinyin})`);
    console.log(`      匹配关键词：${emotion.matchedKeywords.join('、')}`);
    console.log(`      感受层次：第${emotion.level}层 - ${LEVEL_NAMES[emotion.level]}`);
  });

  // 步骤 2: 情绪层次分析
  console.log('\n📊 步骤 2: 情绪层次分析\n');
  const maxLevel = Math.max(...detectedEmotions.map(e => e.level));
  const minLevel = Math.min(...detectedEmotions.map(e => e.level));
  
  console.log(`   最低层次：第${minLevel}层 - ${LEVEL_NAMES[minLevel]}`);
  console.log(`   最高层次：第${maxLevel}层 - ${LEVEL_NAMES[maxLevel]}`);
  
  if (maxLevel <= 3) {
    console.log(`   💡 分析：当前主要是基础情绪反应，建议先接纳和安抚这些情绪`);
  } else if (maxLevel <= 5) {
    console.log(`   💡 分析：涉及较复杂的情感体验，可以深入探索背后的需求和意义`);
  } else {
    console.log(`   💡 分析：包含深层次的存在性感受，适合进行深度自我探索`);
  }

  // 步骤 3: 应对建议
  console.log('\n✅ 步骤 3: 应对建议\n');
  detectedEmotions.forEach((emotion, index) => {
    console.log(`   【${emotion.name}】的应对策略：`);
    emotion.coping_strategies.slice(0, 3).forEach((strategy, sIndex) => {
      console.log(`      ${sIndex + 1}. ${strategy}`);
    });
    console.log('');
  });

  // 步骤 4: 回归疗法视角
  console.log('🔄 步骤 4: 回归疗法视角\n');
  console.log('   六步循环圈建议：\n');
  console.log('   1️⃣ 觉察：停下来，注意你此刻的身体感受和情绪');
  console.log('   2️⃣ 接纳：允许这些情绪存在，不评判好坏');
  console.log('   3️⃣ 探索：问自己"这个感受试图告诉我什么？"');
  console.log('   4️⃣ 理解：找到背后未被满足的需求或欲望');
  console.log('   5️⃣ 行动：采取一个小步骤，检验你的策略');
  console.log('   6️⃣ 调整：根据结果调整信念，建立更合理的认知');
  console.log('');

  // 综合建议
  console.log('💡 综合建议:\n');
  if (detectedEmotions.some(e => e.level >= 5 && ['绝望感', '无助感'].includes(e.name))) {
    console.log('   ⚠️  检测到深度痛苦情绪，建议：');
    console.log('      • 立即寻求专业心理咨询帮助');
    console.log('      • 联系信任的人，不要独处');
    console.log('      • 拨打心理援助热线');
    console.log('      • 记住：感受是暂时的，会变化');
  } else if (detectedEmotions.some(e => e.level <= 3)) {
    console.log('   当前主要是基础情绪反应，建议：');
    console.log('      • 先照顾好自己的身体（休息、饮食、运动）');
    console.log('      • 允许情绪流动，不压抑');
    console.log('      • 与信任的人倾诉');
    console.log('      • 等情绪平复后再做重要决定');
  } else {
    console.log('   当前情绪状态适合自我探索：');
    console.log('      • 花时间反思这些情绪背后的需求');
    console.log('      • 记录情绪日记，追踪模式');
    console.log('      • 尝试正念冥想，增强觉察');
    console.log('      • 考虑与咨询师深入探讨');
  }

  console.log('\n' + '─'.repeat(50));
  console.log('');
}

// 主函数
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] !== 'analyze') {
    console.log(`
╔══════════════════════════════════════════════════╗
║     🔍 Emotion Analysis 情绪分析                  ║
╠══════════════════════════════════════════════════╣
║  用法：                                          ║
║    emotion-dictionary analyze "事件描述"         ║
║                                                  ║
║  示例：                                          ║
║    emotion-dictionary analyze "工作压力大"       ║
║    emotion-dictionary analyze "和朋友吵架了"     ║
║    emotion-dictionary analyze "收到好消息"       ║
╚══════════════════════════════════════════════════╝
`);
    return;
  }

  const eventText = args.slice(1).join(' ');
  
  if (!eventText) {
    console.log('❌ 请提供事件描述');
    console.log('💡 示例：emotion-dictionary analyze "今天工作压力很大"');
    return;
  }

  analyzeEvent(eventText);
}

main();
