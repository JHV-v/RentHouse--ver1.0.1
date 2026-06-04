import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

const TOTAL_KEY = 'visit:total'
const TODAY_KEY = 'visit:today'

function getTodayDate(): string {
  const now = new Date()
  const yyyy = now.getFullYear()
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

function isKvConfigured(): boolean {
  // If @vercel/kv is not configured, kv operations will throw.
  // We check lazily on first use.
  return true
}

export async function GET() {
  try {
    const todayDate = getTodayDate()

    const [total, todayCount] = await Promise.all([
      kv.get<number>(TOTAL_KEY),
      kv.hget<number>(TODAY_KEY, todayDate),
    ])

    return NextResponse.json({
      today: typeof todayCount === 'number' ? todayCount : 0,
      total: typeof total === 'number' ? total : 0,
    })
  } catch {
    // Vercel KV not configured or unavailable
    return NextResponse.json({ today: 0, total: 0 })
  }
}

export async function POST() {
  try {
    const todayDate = getTodayDate()

    // Increment total count (atomic)
    const total = await kv.incr(TOTAL_KEY)

    // Increment today's count in hash (atomic)
    const todayCount = await kv.hincrby(TODAY_KEY, todayDate, 1)

    return NextResponse.json({ today: todayCount, total })
  } catch {
    // Vercel KV not configured or unavailable
    return NextResponse.json({ today: 0, total: 0, fallback: true })
  }
}
