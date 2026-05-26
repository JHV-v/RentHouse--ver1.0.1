import { describe, expect, it } from 'vitest'
import { __test__ } from './storage'

const { isRentFormData, isStoredPayload, STORAGE_VERSION } = __test__

const validForm = {
  salary: '12000',
  rent: '3000',
  deposit: '一押一付',
  agencyFee: '无',
  paymentCycle: '月付',
  contractTerm: '一年',
  activeOptions: { 采光通风: ['南北通透'] },
  commuteTimes: { 骑行: '15' },
}

describe('isRentFormData', () => {
  it('合法对象通过校验', () => {
    expect(isRentFormData(validForm)).toBe(true)
  })

  it('缺字段被拒', () => {
    const { salary, ...withoutSalary } = validForm
    void salary
    expect(isRentFormData(withoutSalary)).toBe(false)
  })

  it('字段类型错误被拒（salary 是数字而非字符串）', () => {
    expect(isRentFormData({ ...validForm, salary: 12000 })).toBe(false)
  })

  it('null/undefined/非对象一律拒', () => {
    expect(isRentFormData(null)).toBe(false)
    expect(isRentFormData(undefined)).toBe(false)
    expect(isRentFormData('hello')).toBe(false)
    expect(isRentFormData(42)).toBe(false)
  })

  it('activeOptions/commuteTimes 必须是对象', () => {
    expect(isRentFormData({ ...validForm, activeOptions: null })).toBe(false)
    expect(isRentFormData({ ...validForm, commuteTimes: 'abc' })).toBe(false)
  })
})

describe('isStoredPayload', () => {
  it('版本号 + savedAt + data 三件套齐全才通过', () => {
    expect(
      isStoredPayload({
        version: STORAGE_VERSION,
        savedAt: Date.now(),
        data: validForm,
      }),
    ).toBe(true)
  })

  it('缺 version 被拒', () => {
    expect(isStoredPayload({ savedAt: Date.now(), data: validForm })).toBe(false)
  })

  it('data 不合法被拒', () => {
    expect(isStoredPayload({ version: 1, savedAt: Date.now(), data: { foo: 'bar' } })).toBe(false)
  })
})
