// ============================================================
// 租房性价比评分系统
// 输入 → 标准化 → 评分 → 人格
// ============================================================

import { pickPersona } from './personas'

const DEFAULT_SCORE = 3 as const

// 标签字典：UI 中文标签 → 1-5 数值；未匹配时回落到 DEFAULT_SCORE
export const TAG_DICTIONARY = {
  // 采光（正向）
  sunlight: {
    阳光充足: 5,
    南北通透: 5,
    全天采光: 5,
    南向充足: 4,
    采光良好: 4,
    半天采光: 3,
    一般: 3,
    采光较差: 2,
    几乎无光: 1,
    无窗: 1,
  } as Record<string, number>,

  // 噪音（反向：数值越大越吵）
  noise: {
    极其安静: 1,
    安静: 1,
    偶尔噪音: 2,
    一般: 3,
    略吵: 4,
    隔音较差: 4,
    隔音极差: 5,
    非常吵: 5,
  } as Record<string, number>,

  // 空间感（正向）
  space: {
    宽敞: 5,
    宽敛: 5,
    刚好: 4,
    适中: 4,
    偏小: 2,
    狭小: 2,
    拥挤: 1,
  } as Record<string, number>,

  // 新旧程度（正向）
  condition: {
    全新精装: 5,
    齐全且新: 5,
    较新: 4,
    刚好够用: 3,
    一般: 3,
    略旧: 2,
    破旧老化: 2,
    破败: 1,
    纯毛坯房: 1,
  } as Record<string, number>,

  cityType: {
    一线: 5,
    新一线: 4,
    二线: 3,
    '三线及以下': 2,
  } as Record<string, number>,

  utility: {
    民水民电: 5,
    商水商电: 2,
  } as Record<string, number>,

  floor: {
    电梯房: 5,
    低层步梯: 3,
    高层步梯: 1,
  } as Record<string, number>,

  bathroom: {
    独立卫浴: 5,
    双人共卫: 3,
    多人共卫: 1,
  } as Record<string, number>,

  kitchen: {
    不做饭: 4,
    偶尔排队: 3,
    经常排队: 1,
    开放厨房: 2,
  } as Record<string, number>,
} as const

// ============================================================
// 类型定义
// ============================================================

export type ScoreField = keyof typeof TAG_DICTIONARY

// 户型类型：影响评分中的若干权重
export type HousingType = 'whole' | 'shared' | 'unknown'

// 原始输入：标签可以是中文字符串、1-5 数字，或 undefined
export type RawScoreInput = {
  rent?: number | string
  income?: number | string
  commuteTime?: number | string
  sunlight?: string | number
  noise?: string | number
  space?: string | number
  condition?: string | number
  subway?: boolean
  food?: number | string
  facilities?: number | string
  housingType?: HousingType
  cityType?: string | number
  utility?: string | number
  floor?: string | number
  bathroom?: string | number
  kitchen?: string | number
  commuteWeighted?: number
}

// 标准化后的输入：全部是确定的数值
export type ScoreInput = {
  rent: number
  income: number
  commuteTime: number
  sunlight: number
  noise: number
  space: number
  condition: number
  subway: boolean
  food: number
  facilities: number
  housingType: HousingType
  cityType: number
  utility: number
  floor: number
  bathroom: number
  kitchen: number
  commuteWeighted: number
}

export type ScoreResult = {
  totalScore: number
  rentRatio: number
  commuteScore: number
  liveScore: number
  lifeScore: number
  stress: number
  persona: string
  housingType: HousingType
}

// ============================================================
// 工具函数
// ============================================================

function clamp(value: number, min = 0, max = 100): number {
  if (!Number.isFinite(value)) return min
  return Math.max(min, Math.min(max, value))
}

function toNumber(value: unknown, fallback = 0): number {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

// 把单个标签转成 1-5 分数；数字则裁剪到 1-5
function tagToScore(tag: unknown, dict: Record<string, number>): number {
  if (typeof tag === 'number') {
    return clamp(tag, 1, 5)
  }
  if (typeof tag === 'string' && dict[tag] != null) {
    return dict[tag]
  }
  return DEFAULT_SCORE
}

// 1-5 → 0-100（正向）
function scaleFromFive(value: number): number {
  return clamp(((value - 1) / 4) * 100)
}

// 1-5 → 0-100（反向，给 noise 用）
function reverseFromFive(value: number): number {
  return clamp(((5 - value) / 4) * 100)
}

// ============================================================
// 输入标准化层
// ============================================================

export function normalizeInput(rawInput: RawScoreInput | null | undefined): ScoreInput {
  const safe = rawInput ?? {}
  return {
    rent: Math.max(0, toNumber(safe.rent, 0)),
    income: Math.max(1, toNumber(safe.income, 1)), // 防止除零
    commuteTime: Math.max(0, toNumber(safe.commuteTime, 0)),
    sunlight: tagToScore(safe.sunlight, TAG_DICTIONARY.sunlight),
    noise: tagToScore(safe.noise, TAG_DICTIONARY.noise),
    space: tagToScore(safe.space, TAG_DICTIONARY.space),
    condition: tagToScore(safe.condition, TAG_DICTIONARY.condition),
    subway: Boolean(safe.subway),
    food: clamp(toNumber(safe.food, DEFAULT_SCORE), 1, 5),
    facilities: clamp(toNumber(safe.facilities, DEFAULT_SCORE), 1, 5),
    housingType: safe.housingType ?? 'unknown',
    cityType: tagToScore(safe.cityType, TAG_DICTIONARY.cityType),
    utility: tagToScore(safe.utility, TAG_DICTIONARY.utility),
    floor: tagToScore(safe.floor, TAG_DICTIONARY.floor),
    bathroom: tagToScore(safe.bathroom, TAG_DICTIONARY.bathroom),
    kitchen: tagToScore(safe.kitchen, TAG_DICTIONARY.kitchen),
    commuteWeighted: Math.max(0, toNumber(safe.commuteWeighted, 0)),
  }
}

// ============================================================
// 维度评分（各为 0-100 分）
// ============================================================

// 房租：占比 ≤20% 满分，≥60% 0 分，线性平滑
// 城市等级影响房租容忍度：高线城市租金占比普遍高，给予一定宽容
function calcRentScore(rentRatio: number, cityType: number): number {
  // 一线(5):+8, 新一线(4):+4, 二线(3):0, 三线及以下(2):-4
  const cityTolerance = cityType >= 5 ? 8 : cityType >= 4 ? 4 : cityType >= 3 ? 0 : cityType >= 2 ? -4 : -6
  const adjustedRatio = rentRatio + cityTolerance
  return clamp(100 - ((adjustedRatio - 20) / 40) * 100)
}

// 城市等级对居住体验的直接加成/减成
// 一线城市资源多但拥挤，县城安静但配套少，综合下来各有优劣
// 但在同等条件下，高线城市的居住品质天花板更高
function calcCityBonus(cityType: number): number {
  // 一线(5):+5, 新一线(4):+3, 二线(3):0, 三线及以下(2):-3
  if (cityType >= 5) return 5
  if (cityType >= 4) return 3
  if (cityType >= 3) return 0
  if (cityType >= 2) return -3
  return -3
}

// 通勤：连续指数衰减，30 分钟约 61 分、60 分钟约 37 分、120 分钟约 13 分
function calcCommuteScore(commuteWeighted: number): number {
  if (commuteWeighted <= 0) return 100
  return clamp(100 * Math.exp(-commuteWeighted / 60))
}

// 居住舒适度：采光 25% + 空间 30% + 房况 25% + 噪音反向 20%
// 合租场景下，空间和噪音对体验影响更大，权重重新分配：采光 20% + 空间 35% + 房况 20% + 噪音反向 25%
function calcLiveScore(input: ScoreInput): number {
  if (input.housingType === 'shared') {
    return clamp(
      scaleFromFive(input.sunlight) * 0.15 +
        scaleFromFive(input.space) * 0.2 +
        scaleFromFive(input.condition) * 0.1 +
        reverseFromFive(input.noise) * 0.15 +
        scaleFromFive(input.floor) * 0.05 +
        scaleFromFive(input.utility) * 0.05 +
        scaleFromFive(input.bathroom) * 0.15 +
        scaleFromFive(input.kitchen) * 0.15,
    )
  }
  return clamp(
    scaleFromFive(input.sunlight) * 0.25 +
      scaleFromFive(input.space) * 0.25 +
      scaleFromFive(input.condition) * 0.2 +
      reverseFromFive(input.noise) * 0.15 +
      scaleFromFive(input.floor) * 0.1 +
      scaleFromFive(input.utility) * 0.05,
  )
}

// 生活便利度：地铁 30 + 餐饮 40% + 配套 30%
function calcLifeScore(input: ScoreInput): number {
  return clamp(
    (input.subway ? 30 : 0) +
      scaleFromFive(input.food) * 0.4 +
      scaleFromFive(input.facilities) * 0.3,
  )
}

// 压力指数：房租超 20% 部分 ×1.5 + 通勤超 30 分钟部分 ×0.4 + 低收入惩罚
// 合租场景轻度加压（与陌生人共享空间本身就是隐性压力）：+5 ~ +10
function calcStress(rentRatio: number, commuteTime: number, income: number, housingType: HousingType, cityType: number): number {
  const incomePenalty = income < 5000 ? 15 : income < 10000 ? 8 : 0
  const sharedPenalty = housingType === 'shared' ? 8 : 0
  // 一线(5):+5, 新一线(4):+2, 二线(3):0, 三线及以下(2):-2
  const cityModifier = cityType >= 5 ? 5 : cityType >= 4 ? 2 : cityType >= 3 ? 0 : cityType >= 2 ? -2 : -3
  return clamp(
    Math.max(0, rentRatio - 20) * 1.5 +
      Math.max(0, commuteTime - 30) * 0.4 +
      incomePenalty +
      sharedPenalty +
      cityModifier,
  )
}

// 总分权重：四维加权 − 压力轻度拉低
const WEIGHTS = {
  rent: 0.3,
  commute: 0.2,
  live: 0.3,
  life: 0.2,
  stress: 0.1,
} as const

// ============================================================
// 主函数
// ============================================================

export function calculateScore(rawInput: RawScoreInput | null | undefined): ScoreResult {
  const input = normalizeInput(rawInput)

  const rentRatio = clamp((input.rent / input.income) * 100, 0, 999)
  const rentScore = calcRentScore(rentRatio, input.cityType)
  const commuteScore = calcCommuteScore(input.commuteWeighted)
  const liveScore = calcLiveScore(input)
  const lifeScore = calcLifeScore(input)
  const stress = calcStress(rentRatio, input.commuteWeighted, input.income, input.housingType, input.cityType)

  const cityBonus = calcCityBonus(input.cityType)

  const totalScore = clamp(
    rentScore * WEIGHTS.rent +
      commuteScore * WEIGHTS.commute +
      liveScore * WEIGHTS.live +
      lifeScore * WEIGHTS.life -
      stress * WEIGHTS.stress +
      cityBonus,
  )

  return {
    totalScore: Math.round(totalScore),
    rentRatio: Math.round(rentRatio * 10) / 10,
    commuteScore: Math.round(commuteScore),
    liveScore: Math.round(liveScore),
    lifeScore: Math.round(lifeScore),
    stress: Math.round(stress),
    persona: pickPersona(totalScore).label,
    housingType: input.housingType,
  }
}
