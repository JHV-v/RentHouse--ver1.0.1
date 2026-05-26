// 访问计数：基于 localStorage 的本地真实计数（仅当前浏览器/设备）。
// 每次页面加载调用 incrementVisit() 一次，返回最新的 { today, total }。

const TOTAL_KEY = 'rent-visit-total'
const TODAY_KEY = 'rent-visit-today' // 存 { date: 'YYYY-MM-DD', count: number }

type TodayBucket = {
  date: string
  count: number
}

function getTodayKey(): string {
  const now = new Date()
  const yyyy = now.getFullYear()
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

function safeRead<T>(key: string): T | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

function safeWrite(key: string, value: unknown): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore
  }
}

export type VisitStats = {
  today: number
  total: number
}

export function incrementVisit(): VisitStats {
  if (typeof window === 'undefined') return { today: 0, total: 0 }

  // 总访问 +1
  const totalRaw = safeRead<number>(TOTAL_KEY)
  const total = (typeof totalRaw === 'number' && Number.isFinite(totalRaw) ? totalRaw : 0) + 1
  safeWrite(TOTAL_KEY, total)

  // 今日访问：跨日重置
  const todayKey = getTodayKey()
  const todayBucket = safeRead<TodayBucket>(TODAY_KEY)
  const isSameDay = todayBucket?.date === todayKey
  const todayCount = (isSameDay ? todayBucket.count : 0) + 1
  safeWrite(TODAY_KEY, { date: todayKey, count: todayCount } satisfies TodayBucket)

  return { today: todayCount, total }
}

// 千分位格式化：1284 → "1,284"
export function formatCount(n: number): string {
  return n.toLocaleString('en-US')
}
