import type { ScoreResult, RawScoreInput } from './score'
import { normalizeInput } from './score'

// ============================================================
// Hero 文案
// ============================================================

export function heroTitle(persona: string): string {
  const map: Record<string, string> = {
    天选之房: '这房简直为你量身定做 👑',
    人生赢家: '住得明明白白，日子风生水起 🎉',
    稳定幸福: '住得还行，心态稳住 🌿',
    还不错: '条件凑合，日子也能过 😊',
    勉强OK: '不算好但也能住 🤷',
    有点难受: '将就着住，心里有点苦 😮‍💨',
    忍一忍: '忍忍吧，至少有个遮风挡雨 🏚️',
    打工地狱: '打工人打工魂，住房让人头昏 💀',
    生活崩塌: '这房住着比上班还累 😭',
    人间不值得: '这房不是给人住的 🚫',
  }
  return map[persona] ?? '住得还行，心态稳住 🌿'
}

export function heroSubtitle(persona: string): string {
  if (persona === '天选之房') return '采光、安静、交通全在线，租房界的锦鲤就是你。'
  if (persona === '人生赢家') return '虽然不是梦中情房，但至少下班回来不会崩溃。'
  if (persona === '稳定幸福') return '虽然不是梦中情房，但至少下班回来不会崩溃。'
  if (persona === '还不错') return '条件不算差，偶尔有点小烦，总体能接受。'
  if (persona === '勉强OK') return '短板明显，但也不是不能住，看你心态。'
  if (persona === '有点难受') return '每天回家都有点想叹气，但钱包不允许选更好的。'
  if (persona === '忍一忍') return '通勤、噪音、采光总有一个在折磨你，挺住。'
  if (persona === '打工地狱') return '这房住得比上班还累，建议认真考虑换房。'
  if (persona === '生活崩塌') return '已经不是将就的问题了，真的建议赶紧搬家。'
  return '这房子……不是给人住的吧？'
}

export function heroBody(persona: string): string {
  const tier = ['天选之房', '人生赢家', '稳定幸福'].includes(persona)
    ? '生活感捕捉专家'
    : ['还不错', '勉强OK'].includes(persona)
      ? '性价比权衡达人'
      : '生存意志坚定的租房战士'
  const suffix: Record<string, string> = {
    天选之房: '各方面都相当能打，好好享受吧。',
    人生赢家: '懂得在预算内找平衡，日子越过越有滋味。',
    稳定幸福: '不为虚荣买单，只为自在买心安。',
    还不错: '虽然不是满分，但至少住着不会闹心。',
    勉强OK: '短板能忍，但别忘了给自己改善的机会。',
    有点难受: '忍一忍不是长久之计，该出手时就出手。',
    忍一忍: '挺住是暂时的，搬家才是正事。',
    打工地狱: '住得比上班还累，真的不值得。',
    生活崩塌: '已经不是将就的问题了，请认真考虑搬家。',
    人间不值得: '这种居住条件是对自己的不负责，赶紧跑。',
  }
  return `你属于：${tier}。${suffix[persona] ?? '懂得在预算内找平衡，不为虚荣买单，只为自在买心安。'}`
}

// ============================================================
// 评分条工具
// ============================================================

export function clampPct(value: number): number {
  if (!Number.isFinite(value)) return 0
  return Math.max(0, Math.min(100, value))
}

export function stressTier(stress: number): string {
  if (stress < 25) return '轻松'
  if (stress < 50) return '中等'
  if (stress < 75) return '偏高'
  return '高压'
}

export function beatPercentile(total: number): number {
  return clampPct(Math.round(total * 0.85 + 5))
}

// ============================================================
// 居住优势 / 微小烦恼
// ============================================================

export function generatePros(score: ScoreResult, input: RawScoreInput): string[] {
  const pros: string[] = []
  const norm = normalizeInput(input)

  if (norm.sunlight >= 4) pros.push('☀️ 采光很赞')
  if (norm.noise <= 1) pros.push('🔇 隔音超赞')
  if (score.rentRatio <= 25) pros.push('💰 租金友好')
  if (score.commuteScore >= 70) pros.push('🚇 通勤轻松')
  if (input.subway) pros.push('🚇 离地铁近')
  if (norm.food >= 4) pros.push('🍜 吃喝方便')
  if (norm.space >= 4) pros.push('🏠 空间宽裕')
  if (norm.condition >= 4) pros.push('✨ 房况不错')
  if (score.stress <= 20) pros.push('🧘 压力很小')

  if (pros.length === 0) pros.push('💪 至少有个遮风挡雨的地方')
  return pros.slice(0, 4)
}

export function generateCons(score: ScoreResult, input: RawScoreInput): string[] {
  const cons: string[] = []
  const norm = normalizeInput(input)

  if (norm.noise >= 4) cons.push('🚫 隔音较差')
  else if (norm.noise === 3) cons.push('🚫 隔音一般')
  if (norm.sunlight <= 2) cons.push('🌥️ 采光不足')
  if (score.rentRatio >= 40) cons.push('💸 租金压力大')
  else if (score.rentRatio >= 30) cons.push('💸 租金不轻松')
  if (score.commuteScore <= 30) cons.push('🚌 通勤太远')
  else if (score.commuteScore <= 50) cons.push('🚌 通勤偏远')
  if (norm.food <= 2) cons.push('🥡 外卖选择少')
  if (norm.space <= 2) cons.push('🪑 空间局促')
  if (norm.condition <= 2) cons.push('🏚️ 装修老旧')
  if (score.stress >= 50) cons.push('😰 压力山大')

  if (cons.length === 0) cons.push('🤔 暂时没发现大问题')
  return cons.slice(0, 4)
}

// ============================================================
// AI 辣评
// ============================================================

export function generateRoast(score: ScoreResult, input: RawScoreInput): string {
  const parts: string[] = []
  const norm = normalizeInput(input)

  if (norm.housingType === 'shared') {
    if (norm.noise >= 4) {
      parts.push('合租 + 隔音差，等于和室友"灵魂共振"')
    } else if (norm.space <= 2) {
      parts.push('合租还住成这空间，房东的算计藏不住')
    } else {
      parts.push('合租嘛，和陌生人共享冰箱也是一种修行')
    }
  }

  if (score.rentRatio >= 60) {
    parts.push('工资大半交了房租，你这不是租房，是给房东打工')
  } else if (score.rentRatio >= 40) {
    parts.push('租金占收入四成以上，每个月都在为房东的梦想买单')
  } else if (score.rentRatio >= 30) {
    parts.push('租金不算轻松，但至少还没到吃土的地步')
  } else if (score.rentRatio <= 20) {
    parts.push('租金友好到让人怀疑你是不是有内部关系')
  }

  if (score.commuteScore <= 20) {
    parts.push('通勤远到能在路上把一部电影看完')
  } else if (score.commuteScore <= 40) {
    parts.push('每天上下班的时间够你学会一门手艺了')
  } else if (score.commuteScore >= 80) {
    parts.push('通勤轻松到让人嫉妒')
  }

  if (norm.noise >= 4) {
    parts.push('隔音差到邻居打呼噜你都能跟着节奏拍手')
  } else if (norm.noise <= 1) {
    parts.push('安静到能听见自己的心跳，适合冥想大师')
  }
  if (norm.sunlight <= 2) {
    parts.push('采光堪比地下室，建议多囤点维生素D')
  } else if (norm.sunlight >= 4) {
    parts.push('阳光充足到可以在家晒被子')
  }
  if (norm.space <= 2) {
    parts.push('空间小到转身都得深呼吸')
  }
  if (norm.condition <= 2) {
    parts.push('房况堪忧，住久了容易怀疑人生')
  }

  if (score.stress >= 70) {
    parts.push('综合压力爆表，建议认真考虑换个活法')
  } else if (score.stress >= 50) {
    parts.push('压力不小，但打工人不都这样嘛')
  }

  if (parts.length === 0) {
    if (score.totalScore >= 80) return '这房子怕不是你上辈子修来的福报，各方面都挺能打，别人看了都眼红。'
    if (score.totalScore >= 60) return '说好听叫性价比之选，说难听点就是妥协的艺术。不过嘛，至少不会每天回家想骂人。'
    if (score.totalScore >= 40) return '将将就就，能住。建议买个好点的耳机，再囤点泡面，日子也能过。'
    return '住在这种条件下还能笑出来的人，不是心态好就是已经麻了。认真建议：搬家。'
  }

  return parts.slice(0, 3).join('，') + '。'
}

// ============================================================
// 专家共识
// ============================================================

export function generateRecommendations(score: ScoreResult): string[] {
  if (score.totalScore >= 70) return ['适合长期居住', '综合性价比高', '值得续租']
  if (score.totalScore >= 50) return ['短期过渡可考虑', '建议货比三家', '关注短板改善']
  return ['建议尽快换房', '优先改善通勤', '控制租金占比']
}

// ============================================================
// 综合评价
// ============================================================

export function generateSummary(score: ScoreResult, input: RawScoreInput): string {
  const norm = normalizeInput(input)
  const parts: string[] = []

  if (score.totalScore >= 80) {
    parts.push('这房子的性价比相当能打')
  } else if (score.totalScore >= 60) {
    parts.push('你的租房选择基本在掌控之中')
  } else if (score.totalScore >= 40) {
    parts.push('目前的居住条件有明显的取舍')
  } else {
    parts.push('当前的居住条件需要认真改善')
  }

  if (norm.sunlight >= 4 && norm.noise <= 1) {
    parts.push('采光、安静表现均衡，是下班回家的避风港')
  } else if (norm.sunlight >= 4) {
    parts.push('采光是你这房子的一大亮点')
  } else if (norm.noise <= 1) {
    parts.push('安静的环境是你租房的一大加分项')
  } else if (norm.noise >= 4) {
    parts.push('噪音问题可能会影响你的休息质量')
  } else if (norm.sunlight <= 2) {
    parts.push('采光不足可能会影响居住体验')
  }

  if (score.rentRatio <= 25) {
    parts.push('租金压力不大，经济上比较从容')
  } else if (score.rentRatio >= 40) {
    parts.push('租金占比较高，经济上需要精打细算')
  }

  if (score.commuteScore >= 70) {
    parts.push('通勤轻松，省下的时间可以好好生活')
  } else if (score.commuteScore <= 40) {
    parts.push('通勤耗时较长，每天在路上消耗不少精力')
  }

  if (parts.length === 1) {
    if (score.totalScore >= 60) parts.push('整体来说住着还算舒心')
    else parts.push('建议关注核心短板，尽早改善')
  }

  return parts.join('。') + '。'
}
