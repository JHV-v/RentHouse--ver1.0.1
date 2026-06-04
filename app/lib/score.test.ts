import { describe, expect, it } from 'vitest'
import { TAG_DICTIONARY, calculateScore, normalizeInput } from './score'

describe('normalizeInput', () => {
  it('把中文标签翻译成 1-5 分数', () => {
    const result = normalizeInput({
      rent: 3000,
      income: 10000,
      commuteTime: 30,
      sunlight: '阳光充足',
      noise: '隔音极差',
      space: '宽敞',
      condition: '全新精装',
      subway: true,
      food: 4,
      facilities: 5,
    })
    expect(result.sunlight).toBe(5)
    expect(result.noise).toBe(5)
    expect(result.space).toBe(5)
    expect(result.condition).toBe(5)
    expect(result.subway).toBe(true)
  })

  it('未匹配的标签回落到默认值 3', () => {
    const result = normalizeInput({
      sunlight: '一个根本不存在的标签',
      noise: undefined,
      space: '',
    })
    expect(result.sunlight).toBe(3)
    expect(result.noise).toBe(3)
    expect(result.space).toBe(3)
  })

  it('防止除零：income 至少为 1', () => {
    const result = normalizeInput({ rent: 1000, income: 0 })
    expect(result.income).toBe(1)
  })

  it('对脏数据保持稳定（null / undefined / 非法字符串）', () => {
    const result = normalizeInput({
      rent: 'abc' as unknown as number,
      income: undefined,
      commuteTime: -50,
    })
    expect(result.rent).toBe(0)
    expect(result.income).toBeGreaterThanOrEqual(1)
    expect(result.commuteTime).toBe(0)
  })

  it('已是数字的字段直接裁剪到 1-5', () => {
    const r1 = normalizeInput({ sunlight: 10 })
    const r2 = normalizeInput({ sunlight: -3 })
    expect(r1.sunlight).toBe(5)
    expect(r2.sunlight).toBe(1)
  })
})

describe('calculateScore - 输出结构', () => {
  it('包含全部 7 个字段，且分数都在 0-100', () => {
    const result = calculateScore({
      rent: 3000,
      income: 10000,
      commuteTime: 30,
      sunlight: 4,
      noise: 2,
      space: 4,
      condition: 4,
      subway: true,
      food: 4,
      facilities: 4,
    })
    const fields = [
      'totalScore',
      'rentRatio',
      'commuteScore',
      'liveScore',
      'lifeScore',
      'stress',
      'persona',
    ] as const
    fields.forEach((f) => expect(result).toHaveProperty(f))
    expect(result.totalScore).toBeGreaterThanOrEqual(0)
    expect(result.totalScore).toBeLessThanOrEqual(100)
    expect(typeof result.persona).toBe('string')
  })
})

describe('calculateScore - 极端场景', () => {
  it('极优输入应得高分', () => {
    const result = calculateScore({
      rent: 2000,
      income: 20000,
      commuteTime: 10,
      sunlight: '阳光充足',
      noise: '极其安静',
      space: '宽敞',
      condition: '全新精装',
      subway: true,
      food: 5,
      facilities: 5,
    })
    expect(result.totalScore).toBeGreaterThanOrEqual(80)
    expect(result.rentRatio).toBe(10)
    expect(result.stress).toBe(0)
  })

  it('极差输入应得低分', () => {
    const result = calculateScore({
      rent: 8000,
      income: 6000,
      commuteTime: 120,
      sunlight: '几乎无光',
      noise: '隔音极差',
      space: '拥挤',
      condition: '破败',
      subway: false,
      food: 1,
      facilities: 1,
    })
    expect(result.totalScore).toBeLessThan(30)
    expect(result.rentRatio).toBeGreaterThan(100)
    expect(result.stress).toBeGreaterThan(50)
  })

  it('边界输入（rent=0, income=0, 全部缺失）不应抛错或返回 NaN', () => {
    const result = calculateScore({
      rent: 0,
      income: 0,
      commuteTime: 0,
    })
    expect(Number.isFinite(result.totalScore)).toBe(true)
    expect(Number.isFinite(result.rentRatio)).toBe(true)
    expect(result.rentRatio).toBe(0)
    expect(result.commuteScore).toBe(100) // exp(0) * 100 = 100
  })
})

describe('calculateScore - persona 分档', () => {
  it('极优输入应命中高分 persona', () => {
    const r = calculateScore({
      rent: 1000,
      income: 30000,
      commuteTime: 5,
      commuteWeighted: 5,
      sunlight: '阳光充足',
      noise: '极其安静',
      space: '宽敞',
      condition: '全新精装',
      subway: true,
      food: 5,
      facilities: 5,
      cityType: '一线',
      utility: '民水民电',
      floor: '电梯房',
    })
    expect(r.totalScore).toBeGreaterThanOrEqual(80)
    expect(typeof r.persona).toBe('string')
    expect(r.persona.length).toBeGreaterThan(0)
  })

  it('极差输入应命中低分 persona', () => {
    const r = calculateScore({
      rent: 99999,
      income: 1,
      commuteTime: 999,
      commuteWeighted: 999,
      sunlight: '几乎无光',
      noise: '非常吵',
      space: '拥挤',
      condition: '破败',
      subway: false,
      food: 1,
      facilities: 1,
      cityType: '三线及以下',
      utility: '商水商电',
      floor: '高层步梯',
    })
    expect(r.totalScore).toBeLessThan(20)
    expect(typeof r.persona).toBe('string')
    expect(r.persona.length).toBeGreaterThan(0)
  })
})

describe('TAG_DICTIONARY 完整性', () => {
  it('四类字典都不为空', () => {
    expect(Object.keys(TAG_DICTIONARY.sunlight).length).toBeGreaterThan(0)
    expect(Object.keys(TAG_DICTIONARY.noise).length).toBeGreaterThan(0)
    expect(Object.keys(TAG_DICTIONARY.space).length).toBeGreaterThan(0)
    expect(Object.keys(TAG_DICTIONARY.condition).length).toBeGreaterThan(0)
  })

  it('字典里的所有值都在 1-5 之间', () => {
    Object.values(TAG_DICTIONARY).forEach((dict) => {
      Object.values(dict).forEach((v) => {
        expect(v).toBeGreaterThanOrEqual(1)
        expect(v).toBeLessThanOrEqual(5)
      })
    })
  })
})
