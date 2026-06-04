import { describe, expect, it } from 'vitest'
import { calculateScore } from './score'

// 单调性 / 平滑性 / 单点契约的补充测试，与 score.test.ts 互补

const baseInput = {
  rent: 3000,
  income: 10000,
  commuteTime: 30,
  commuteWeighted: 30,
  sunlight: 3,
  noise: 3,
  space: 3,
  condition: 3,
  subway: false,
  food: 3,
  facilities: 3,
  cityType: 3,
  utility: 3,
  floor: 3,
  bathroom: 3,
  kitchen: 3,
  housingType: 'whole' as const,
} as const

describe('calculateScore - 单调性', () => {
  it('通勤时间越短，commuteScore 越高（exp 衰减）', () => {
    const r5 = calculateScore({ ...baseInput, commuteTime: 5, commuteWeighted: 5 })
    const r30 = calculateScore({ ...baseInput, commuteTime: 30, commuteWeighted: 30 })
    const r60 = calculateScore({ ...baseInput, commuteTime: 60, commuteWeighted: 60 })
    const r120 = calculateScore({ ...baseInput, commuteTime: 120, commuteWeighted: 120 })
    expect(r5.commuteScore).toBeGreaterThan(r30.commuteScore)
    expect(r30.commuteScore).toBeGreaterThan(r60.commuteScore)
    expect(r60.commuteScore).toBeGreaterThan(r120.commuteScore)
  })

  it('房租占比越高，rentRatio 越大', () => {
    const r1 = calculateScore({ ...baseInput, rent: 1000, income: 10000 })
    const r2 = calculateScore({ ...baseInput, rent: 5000, income: 10000 })
    expect(r2.rentRatio).toBeGreaterThan(r1.rentRatio)
  })

  it('其他不变，subway=true 比 subway=false 的 lifeScore 高', () => {
    const off = calculateScore({ ...baseInput, subway: false })
    const on = calculateScore({ ...baseInput, subway: true })
    expect(on.lifeScore).toBeGreaterThan(off.lifeScore)
  })

  it('空间感觉越好，liveScore 越高', () => {
    const small = calculateScore({ ...baseInput, space: 1 })
    const big = calculateScore({ ...baseInput, space: 5 })
    expect(big.liveScore).toBeGreaterThan(small.liveScore)
  })

  it('噪音越大（越吵），liveScore 越低（反向）', () => {
    const quiet = calculateScore({ ...baseInput, noise: 1 })
    const loud = calculateScore({ ...baseInput, noise: 5 })
    expect(quiet.liveScore).toBeGreaterThan(loud.liveScore)
  })
})

describe('calculateScore - 边界值与契约', () => {
  it('commuteTime=0 时 commuteScore 应等于 100（exp(0)=1）', () => {
    const r = calculateScore({ ...baseInput, commuteTime: 0, commuteWeighted: 0 })
    expect(r.commuteScore).toBe(100)
  })

  it('rentRatio ≤20% 时 rentScore 已达上限，再降租也不会让 totalScore 暴涨', () => {
    const r1 = calculateScore({ ...baseInput, rent: 2000, income: 10000 }) // 20%
    const r2 = calculateScore({ ...baseInput, rent: 500, income: 10000 }) // 5%
    // rentScore 都是 100，但 totalScore 可能因 stress 不同小幅波动
    expect(Math.abs(r1.totalScore - r2.totalScore)).toBeLessThanOrEqual(2)
  })

  it('极大 commuteTime（999 分钟）也不会产生 NaN / 负数', () => {
    const r = calculateScore({ ...baseInput, commuteTime: 999 })
    expect(Number.isFinite(r.commuteScore)).toBe(true)
    expect(r.commuteScore).toBeGreaterThanOrEqual(0)
  })

  it('极大 rent / income=1 时 rentRatio 不会超过 999 上限', () => {
    const r = calculateScore({ ...baseInput, rent: 1_000_000, income: 1 })
    expect(r.rentRatio).toBeLessThanOrEqual(999)
  })

  it('totalScore 永远在 0-100 闭区间内', () => {
    const inputs = [
      { ...baseInput, rent: 0, income: 100000, commuteTime: 0 },
      { ...baseInput, rent: 100000, income: 1, commuteTime: 999 },
      { ...baseInput, sunlight: 5, noise: 1, space: 5, condition: 5 },
      { ...baseInput, sunlight: 1, noise: 5, space: 1, condition: 1 },
    ]
    inputs.forEach((i) => {
      const r = calculateScore(i)
      expect(r.totalScore).toBeGreaterThanOrEqual(0)
      expect(r.totalScore).toBeLessThanOrEqual(100)
    })
  })

  it('persona 始终是非空字符串', () => {
    for (let total = 0; total <= 100; total += 7) {
      const r = calculateScore({
        ...baseInput,
        rent: 5000 - total * 30, // 粗略变动让 totalScore 覆盖大部分区间
      })
      expect(typeof r.persona).toBe('string')
      expect(r.persona.length).toBeGreaterThan(0)
    }
  })
})

describe('calculateScore - 邻近值平滑', () => {
  it('commuteTime 相差 1 分钟时 commuteScore 变化 < 3 分（连续）', () => {
    for (let t = 0; t < 120; t += 10) {
      const a = calculateScore({ ...baseInput, commuteTime: t })
      const b = calculateScore({ ...baseInput, commuteTime: t + 1 })
      expect(Math.abs(a.commuteScore - b.commuteScore)).toBeLessThan(3)
    }
  })

  it('rent 相差 100 元时 totalScore 变化 ≤ 5 分（避免跳变）', () => {
    for (let r = 1000; r <= 8000; r += 1000) {
      const a = calculateScore({ ...baseInput, rent: r })
      const b = calculateScore({ ...baseInput, rent: r + 100 })
      expect(Math.abs(a.totalScore - b.totalScore)).toBeLessThanOrEqual(5)
    }
  })
})
