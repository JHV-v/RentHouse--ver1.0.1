import type { HousingType, RawScoreInput } from './score'

// 输入页通过 sessionStorage 传过来的表单原始数据
export type RentFormData = {
  salary: string
  rent: string
  deposit: string
  agencyFee: string
  paymentCycle: string
  contractTerm: string
  activeOptions: Record<string, string[]>
  commuteTimes: Record<string, string>
}

// 从一组已选标签里挑第一个非空的；没有则返回 undefined 让 score.normalizeInput 兜底
function pickFirstTag(tags: string[] | undefined): string | undefined {
  return tags?.find((t) => t && t.length > 0)
}

// 表单的通勤是一组 {骑行,公共交通,驾车,步行: 分钟}，取最短非零值当代表通勤时间
function pickCommuteTime(commuteTimes: Record<string, string> | undefined): number {
  if (!commuteTimes) return 0
  const times = Object.values(commuteTimes)
    .map((v) => Number(v))
    .filter((n) => Number.isFinite(n) && n > 0)
  return times.length === 0 ? 0 : Math.min(...times)
}

// 把"整租一居/整租二居/合租主卧/合租次卧"标签翻译为 HousingType
function detectHousingType(tags: string[] | undefined): HousingType {
  const tag = pickFirstTag(tags)
  if (!tag) return 'unknown'
  if (tag.startsWith('合租')) return 'shared'
  if (tag.startsWith('整租')) return 'whole'
  return 'unknown'
}

/**
 * 把输入页采集到的 RentFormData 转成 RawScoreInput；
 * 标签到 1-5 分数值的真正翻译交给 score.ts 的 normalizeInput 完成。
 * 这里只做"字段对齐"。
 */
export function mapFormDataToScoreInput(form: RentFormData): RawScoreInput {
  const options = form.activeOptions ?? {}
  // 合租场景下"周边便利度"标签可能挂在不同 section 上，做一次回退
  const convenience = options['周边便利度'] ?? options['配套便利']

  return {
    rent: form.rent,
    income: form.salary,
    commuteTime: pickCommuteTime(form.commuteTimes),
    sunlight: pickFirstTag(options['采光通风']),
    noise: pickFirstTag(options['隔音水平']),
    space: pickFirstTag(options['空间感觉']),
    condition: pickFirstTag(options['家电配置']),
    // TODO: UI 暂未单独提供 subway 勾选项；待补充后从 form.subway 透传
    subway: false,
    food: pickFirstTag(convenience)?.length ? mapConvenience(pickFirstTag(convenience)) : undefined,
    facilities: pickFirstTag(options['家电配置'])?.length
      ? mapAppliance(pickFirstTag(options['家电配置']))
      : undefined,
    housingType: detectHousingType(options['租赁类型']),
  }
}

// 这两个小映射表只在 adapter 内部使用：UI 标签 → 1-5 数值
// （food/facilities 在 score.ts 的 TAG_DICTIONARY 里没有对应字典，所以在 adapter 这一层映射）
const CONVENIENCE_MAP: Record<string, number> = {
  很方便: 5,
  方便: 4,
  一般: 3,
  不方便: 1,
}

const APPLIANCE_MAP: Record<string, number> = {
  齐全且新: 5,
  较新: 4,
  刚好够用: 3,
  破旧老化: 2,
  纯毛坯房: 1,
}

function mapConvenience(tag: string | undefined): number {
  return tag != null && CONVENIENCE_MAP[tag] != null ? CONVENIENCE_MAP[tag] : 3
}

function mapAppliance(tag: string | undefined): number {
  return tag != null && APPLIANCE_MAP[tag] != null ? APPLIANCE_MAP[tag] : 3
}
