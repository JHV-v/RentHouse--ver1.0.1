import type { RentFormData } from './adapter'

// 当 RentFormData 结构变化时，把 VERSION 升一位，旧数据会被自动丢弃
const STORAGE_VERSION = 1
const STORAGE_KEY = 'rentFormData'

type StoredPayload = {
  version: number
  data: RentFormData
  // 留个时间戳便于调试 / 后续清理
  savedAt: number
}

// 运行时类型守卫：必要字段不存在或类型不对就拒绝
function isRentFormData(value: unknown): value is RentFormData {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  const stringFields = ['salary', 'rent', 'deposit', 'agencyFee', 'paymentCycle', 'contractTerm']
  for (const f of stringFields) {
    if (typeof v[f] !== 'string') return false
  }
  if (typeof v.activeOptions !== 'object' || v.activeOptions === null) return false
  if (typeof v.commuteTimes !== 'object' || v.commuteTimes === null) return false
  return true
}

function isStoredPayload(value: unknown): value is StoredPayload {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return typeof v.version === 'number' && typeof v.savedAt === 'number' && isRentFormData(v.data)
}

export function saveRentFormData(data: RentFormData): void {
  if (typeof window === 'undefined') return
  const payload: StoredPayload = {
    version: STORAGE_VERSION,
    data,
    savedAt: Date.now(),
  }
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch (err) {
    console.warn('[storage] 保存失败：', err)
  }
}

export function loadRentFormData(): RentFormData | null {
  if (typeof window === 'undefined') return null
  const raw = sessionStorage.getItem(STORAGE_KEY)
  if (!raw) return null

  try {
    const parsed: unknown = JSON.parse(raw)

    // 兼容旧版本：以前直接存的是 RentFormData 本体
    if (isRentFormData(parsed)) return parsed

    if (!isStoredPayload(parsed)) {
      console.warn('[storage] 数据 schema 不匹配，已忽略')
      return null
    }
    if (parsed.version !== STORAGE_VERSION) {
      console.warn(
        `[storage] 版本号不一致（存储 v${parsed.version}, 当前 v${STORAGE_VERSION}），已忽略`,
      )
      return null
    }
    return parsed.data
  } catch (err) {
    console.warn('[storage] 解析失败：', err)
    return null
  }
}

export function clearRentFormData(): void {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem(STORAGE_KEY)
}

// 测试 / 调试用导出
export const __test__ = {
  STORAGE_KEY,
  STORAGE_VERSION,
  isRentFormData,
  isStoredPayload,
}
