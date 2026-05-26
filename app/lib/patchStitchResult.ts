import type { ScoreResult } from './score'
import type { RawScoreInput } from './score'
import { normalizeInput, TAG_DICTIONARY } from './score'

type PatchContext = {
  score: ScoreResult
  input: RawScoreInput
}

export function patchStitchResult(
  root: HTMLElement,
  score: ScoreResult,
  input: RawScoreInput,
): void {
  const ctx: PatchContext = { score, input }

  patchHero(root, ctx)
  patchBars(root, ctx)
  patchBeatPercentile(root, ctx)
  patchProsCons(root, ctx)
  patchAIRoast(root, ctx)
  patchRecommendations(root, ctx)
}

// ============================================================
// 1. Hero 区：总分 + persona + 描述
// ============================================================

function patchHero(root: HTMLElement, ctx: PatchContext): void {
  const { score } = ctx

  const heroNumber = root.querySelector<HTMLElement>('.font-display-lg.text-display-lg')
  if (heroNumber) heroNumber.textContent = String(score.totalScore)

  const heroTag = heroNumber?.parentElement?.querySelector<HTMLElement>('.font-label-md')
  if (heroTag) heroTag.textContent = score.persona

  // h1 标题："住得还行，心态稳住 🌿" → 根据 persona 替换
  const h1 = root.querySelector<HTMLHeadingElement>('h1')
  if (h1) h1.textContent = heroTitle(score.persona)

  // h1 下方第一段 p：副标题
  const subtitles = h1?.parentElement?.querySelectorAll<HTMLParagraphElement>('p')
  if (subtitles && subtitles[0]) subtitles[0].textContent = heroSubtitle(score.persona)
  if (subtitles && subtitles[1]) subtitles[1].textContent = heroBody(score.persona)
}

const heroTitle = (persona: string): string => {
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

const heroSubtitle = (persona: string): string => {
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

const heroBody = (persona: string): string => {
  const tier = ['天选之房', '人生赢家', '稳定幸福'].includes(persona)
    ? '生活感捕捉专家'
    : ['还不错', '勉强OK'].includes(persona)
      ? '性价比权衡达人'
      : '生存意志坚定的租房战士'
  return `你属于：${tier}。懂得在预算内找平衡，不为虚荣买单，只为自在买心安。`
}

// ============================================================
// 2. 进度条
// ============================================================

function patchBars(root: HTMLElement, ctx: PatchContext): void {
  const { score } = ctx
  const barConfig: Array<{ label: string; value: number }> = [
    { label: '房租占收入', value: clampPct(score.rentRatio) },
    { label: '通勤效率', value: score.commuteScore },
    { label: '居住舒适度', value: score.liveScore },
    { label: '生活便利度', value: score.lifeScore },
  ]

  for (const bar of barConfig) {
    const barRow = findBarRow(root, bar.label)
    if (barRow) setBarValue(barRow, bar.value)
  }

  const stressRow = findBarRow(root, '压力指数')
  if (stressRow) {
    const tier = stressTier(score.stress)
    setBarValue(stressRow, score.stress, `${tier} (${score.stress}%)`)
  }
}

// ============================================================
// 3. 击败百分比
// ============================================================

function patchBeatPercentile(root: HTMLElement, ctx: PatchContext): void {
  const { score } = ctx
  const beatTag = Array.from(root.querySelectorAll<HTMLElement>('span')).find((el) =>
    /击败了\s*\d+%/.test(el.textContent ?? ''),
  )
  if (beatTag) {
    beatTag.textContent = `你已经击败了 ${beatPercentile(score.totalScore)}% 的租房打工人`
  }
}

// ============================================================
// 4. 居住优势 / 微小的烦恼
// ============================================================

function patchProsCons(root: HTMLElement, ctx: PatchContext): void {
  const { score, input } = ctx
  const pros = generatePros(score, input)
  const cons = generateCons(score, input)

  replaceTagGroup(
    root,
    '居住优势',
    pros,
    'bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-body-sm font-semibold',
  )
  replaceTagGroup(
    root,
    '微小的烦恼',
    cons,
    'bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-body-sm font-semibold',
  )
}

function generatePros(score: ScoreResult, input: RawScoreInput): string[] {
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

function generateCons(score: ScoreResult, input: RawScoreInput): string[] {
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

function replaceTagGroup(
  root: HTMLElement,
  sectionTitle: string,
  tags: string[],
  tagClass: string,
): void {
  // 找到 h3 标题包含 sectionTitle 的 section
  const h3s = Array.from(root.querySelectorAll<HTMLHeadingElement>('h3'))
  const targetH3 = h3s.find((el) => el.textContent?.includes(sectionTitle))
  if (!targetH3) return

  const tagContainer = targetH3.parentElement?.querySelector<HTMLElement>('.flex.flex-wrap')
  if (!tagContainer) return

  tagContainer.innerHTML = tags.map((tag) => `<span class="${tagClass}">${tag}</span>`).join('')
}

// ============================================================
// 5. AI 辣评
// ============================================================

function patchAIRoast(root: HTMLElement, ctx: PatchContext): void {
  const { score, input } = ctx

  // 精确定位：找到包含"AI 辣评"文本的 span，往上找所在的 section，再找 .italic
  const allSpans = Array.from(root.querySelectorAll<HTMLElement>('span'))
  const titleSpan = allSpans.find((el) => el.textContent?.trim() === 'AI 辣评')
  const roastSection = titleSpan?.closest<HTMLElement>('section')
  const roastEl = roastSection?.querySelector<HTMLElement>('.italic')
  if (!roastEl) return

  roastEl.textContent = `"${generateRoast(score, input)}"`
}

function generateRoast(score: ScoreResult, input: RawScoreInput): string {
  const parts: string[] = []
  const norm = normalizeInput(input) // 把中文标签转成 1-5 数值

  // 户型相关吐槽
  if (norm.housingType === 'shared') {
    if (norm.noise >= 4) {
      parts.push('合租 + 隔音差，等于和室友"灵魂共振"')
    } else if (norm.space <= 2) {
      parts.push('合租还住成这空间，房东的算计藏不住')
    } else {
      parts.push('合租嘛，和陌生人共享冰箱也是一种修行')
    }
  }

  // 根据房租占比开喷
  if (score.rentRatio >= 60) {
    parts.push('工资大半交了房租，你这不是租房，是给房东打工')
  } else if (score.rentRatio >= 40) {
    parts.push('租金占收入四成以上，每个月都在为房东的梦想买单')
  } else if (score.rentRatio >= 30) {
    parts.push('租金不算轻松，但至少还没到吃土的地步')
  } else if (score.rentRatio <= 20) {
    parts.push('租金友好到让人怀疑你是不是有内部关系')
  }

  // 根据通勤开喷
  if (score.commuteScore <= 20) {
    parts.push('通勤远到能在路上把一部电影看完')
  } else if (score.commuteScore <= 40) {
    parts.push('每天上下班的时间够你学会一门手艺了')
  } else if (score.commuteScore >= 80) {
    parts.push('通勤轻松到让人嫉妒')
  }

  // 根据居住条件开喷（用标准化后的数值：noise 1=安静 5=吵）
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

  // 根据压力指数收尾
  if (score.stress >= 70) {
    parts.push('综合压力爆表，建议认真考虑换个活法')
  } else if (score.stress >= 50) {
    parts.push('压力不小，但打工人不都这样嘛')
  }

  // 如果没收集到任何槽点，用总分兜底
  if (parts.length === 0) {
    if (score.totalScore >= 80) return '这房子怕不是你上辈子修来的福报，各方面都挺能打，别人看了都眼红。'
    if (score.totalScore >= 60) return '说好听叫性价比之选，说难听点就是妥协的艺术。不过嘛，至少不会每天回家想骂人。'
    if (score.totalScore >= 40) return '将将就就，能住。建议买个好点的耳机，再囤点泡面，日子也能过。'
    return '住在这种条件下还能笑出来的人，不是心态好就是已经麻了。认真建议：搬家。'
  }

  // 拼接：前几句用逗号，最后一句用句号
  return parts.slice(0, 3).join('，') + '。'
}

// ============================================================
// 6. 专家共识
// ============================================================

function patchRecommendations(root: HTMLElement, ctx: PatchContext): void {
  const { score } = ctx
  const h3s = Array.from(root.querySelectorAll<HTMLHeadingElement>('h3'))
  const recH3 = h3s.find((el) => el.textContent?.includes('专家共识'))
  if (!recH3) return

  const items = recH3.parentElement?.querySelectorAll<HTMLElement>(
    '.flex.items-center.gap-stack-md',
  )
  if (!items || items.length === 0) return

  const recs = generateRecommendations(score)
  recs.forEach((rec, i) => {
    if (items[i]) {
      const span = items[i].querySelector<HTMLElement>('span:last-child')
      if (span) span.textContent = rec
    }
  })
}

function generateRecommendations(score: ScoreResult): string[] {
  const recs: string[] = []

  if (score.totalScore >= 70) {
    recs.push('适合长期居住', '综合性价比高', '值得续租')
  } else if (score.totalScore >= 50) {
    recs.push('短期过渡可考虑', '建议货比三家', '关注短板改善')
  } else {
    recs.push('建议尽快换房', '优先改善通勤', '控制租金占比')
  }

  return recs
}

// ============================================================
// 工具函数
// ============================================================

function clampPct(value: number): number {
  if (!Number.isFinite(value)) return 0
  return Math.max(0, Math.min(100, value))
}

function findBarRow(root: HTMLElement, labelText: string): HTMLElement | null {
  const labelSpans = Array.from(root.querySelectorAll<HTMLElement>('span'))
  const labelSpan = labelSpans.find((el) => el.textContent?.trim().endsWith(labelText))
  return labelSpan?.closest<HTMLElement>('.space-y-2') ?? null
}

function setBarValue(row: HTMLElement, value: number, customText?: string): void {
  const headerRow = row.querySelector<HTMLElement>('.flex.justify-between')
  const valueSpan = headerRow?.querySelector<HTMLElement>('.font-bold')
  if (valueSpan) valueSpan.textContent = customText ?? `${value}%`

  const progressBar = row.querySelector<HTMLElement>('.h-full')
  if (progressBar) progressBar.style.width = `${clampPct(value)}%`
}

function stressTier(stress: number): string {
  if (stress < 25) return '轻松'
  if (stress < 50) return '中等'
  if (stress < 75) return '偏高'
  return '高压'
}

function beatPercentile(total: number): number {
  return clampPct(Math.round(total * 0.85 + 5))
}
