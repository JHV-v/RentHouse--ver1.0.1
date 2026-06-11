import type { HousingType, RawScoreInput } from './score'

export type RentFormData = {
  salary: string
  rent: string
  deposit: string
  agencyFee: string
  paymentCycle: string
  contractTerm: string
  activeOptions: Record<string, string[]>
  commuteTimes: Record<string, string>
  commuteOrder: string[]
}

function pickFirstTag(tags: string[] | undefined): string | undefined {
  return tags?.find((t) => t && t.length > 0)
}

function detectHousingType(tags: string[] | undefined): HousingType {
  const tag = pickFirstTag(tags)
  if (!tag) return 'unknown'
  if (tag.startsWith('合租')) return 'shared'
  if (tag.startsWith('整租')) return 'whole'
  return 'unknown'
}

// 按拖拽顺序加权计算等效通勤时间
// 排在第1位的权重最高(×1.0)，第2位(×0.7)，第3位(×0.4)，第4位(×0.2)
// 0min 的出行方式跳过不参与计算
function calcWeightedCommute(
  commuteTimes: Record<string, string> | undefined,
  commuteOrder: string[] | undefined,
): number {
  if (!commuteTimes) return 0
  const weights = [1.0, 0.7, 0.4, 0.2]
  let totalWeighted = 0
  let totalWeight = 0

  const order = commuteOrder && commuteOrder.length > 0
    ? commuteOrder
    : Object.keys(commuteTimes)

  order.forEach((key, idx) => {
    const minutes = Number(commuteTimes[key])
    if (!Number.isFinite(minutes) || minutes <= 0) return
    const w = weights[idx] ?? 0.1
    totalWeighted += minutes * w
    totalWeight += w
  })

  return totalWeight > 0 ? totalWeighted / totalWeight : 0
}

// 兼容旧版：取最短非零通勤
function pickCommuteTime(commuteTimes: Record<string, string> | undefined): number {
  if (!commuteTimes) return 0
  const times = Object.values(commuteTimes)
    .map((v) => Number(v))
    .filter((n) => Number.isFinite(n) && n > 0)
  return times.length === 0 ? 0 : Math.min(...times)
}

const CITY_TYPE_MIGRATION: Record<string, string> = {
  '三线': '三线及以下',
  '四线': '三线及以下',
  '县城': '三线及以下',
  '乡镇': '三线及以下',
}

function migrateCityType(tag: string | undefined): string | undefined {
  if (!tag) return tag
  return CITY_TYPE_MIGRATION[tag] ?? tag
}

function hasSubwayAccess(
  commuteTimes: Record<string, string> | undefined,
  convenienceTags: string[] | undefined,
): boolean {
  if (commuteTimes) {
    const publicTransit = Number(commuteTimes['公共交通'])
    if (Number.isFinite(publicTransit) && publicTransit > 0) return true
  }
  const tag = pickFirstTag(convenienceTags)
  return tag === '很方便'
}

export function mapFormDataToScoreInput(form: RentFormData): RawScoreInput {
  const options = form.activeOptions ?? {}
  const convenience = options['周边便利度'] ?? options['配套便利']

  return {
    rent: form.rent,
    income: form.salary,
    commuteTime: pickCommuteTime(form.commuteTimes),
    commuteWeighted: calcWeightedCommute(form.commuteTimes, form.commuteOrder),
    sunlight: pickFirstTag(options['采光通风']),
    noise: pickFirstTag(options['隔音水平']),
    space: pickFirstTag(options['空间感觉']),
    condition: pickFirstTag(options['家电配置']),
    subway: hasSubwayAccess(form.commuteTimes, convenience),
    food: pickFirstTag(convenience)?.length ? mapConvenience(pickFirstTag(convenience)) : undefined,
    facilities: pickFirstTag(options['家电配置'])?.length
      ? mapAppliance(pickFirstTag(options['家电配置']))
      : undefined,
    housingType: detectHousingType(options['租赁类型']),
    cityType: migrateCityType(pickFirstTag(options['城市类型'])),
    utility: pickFirstTag(options['水电收费']),
    floor: pickFirstTag(options['楼层类型']),
    bathroom: pickFirstTag(options['卫浴体验 (合租)']),
    kitchen: pickFirstTag(options['厨房体验 (合租)']),
  }
}

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
