'use client'

import { useRouter } from 'next/navigation'
import { type MouseEvent, useEffect, useRef } from 'react'
import { inputHtml } from './stitch-html'
import { saveRentFormData, loadRentFormData } from './lib/storage'
import { incrementVisit, formatCount } from './lib/visitCounter'
import { restoreFormData } from './lib/restoreFormData'
import { updateRentHint } from './lib/rentHint'
import { type RentFormData } from './lib/adapter'
import { findInputByLabel, findSelectByLabel } from './lib/domUtils'

const valueOf = (el: HTMLInputElement | HTMLSelectElement | null) => el?.value ?? ''

const getLabelText = (element: Element) => element.querySelector('label')?.textContent?.trim() ?? ''

const collectActiveOptions = (root: HTMLElement) => {
  const activeOptions: Record<string, string[]> = {}

  root.querySelectorAll('section').forEach((section) => {
    section.querySelectorAll('.space-y-2, .space-y-3').forEach((group) => {
      const label = getLabelText(group)
      const activeButtons = Array.from(group.querySelectorAll('button.tag-active'))
        .map((button) => button.textContent?.trim() ?? '')
        .filter(Boolean)

      if (label && activeButtons.length > 0) {
        activeOptions[label] = activeButtons
      }
    })
  })

  const detailTags = Array.from(root.querySelectorAll('button.detail-tag-active'))
    .map((button) => button.textContent?.trim() ?? '')
    .filter(Boolean)

  if (detailTags.length > 0) {
    activeOptions['生活小细节'] = detailTags
  }

  return activeOptions
}

const COMMUTE_LABELS = ['骑行', '公共交通', '驾车', '步行']

const collectCommuteTimes = (root: HTMLElement) => {
  const commuteTimes: Record<string, string> = {}
  const commuteOrder: string[] = []

  root.querySelectorAll('.draggable-item').forEach((item) => {
    const label = Array.from(item.querySelectorAll('span'))
      .map((span) => span.textContent?.trim() ?? '')
      .find((text) => COMMUTE_LABELS.includes(text))
    const input = item.querySelector('input') as HTMLInputElement | null

    if (label) {
      commuteTimes[label] = input?.value ?? ''
      commuteOrder.push(label)
    }
  })

  return { commuteTimes, commuteOrder }
}

const collectRentFormData = (root: HTMLElement): RentFormData => {
  const { commuteTimes, commuteOrder } = collectCommuteTimes(root)
  return {
    salary: valueOf(findInputByLabel(root, '月薪资')),
    rent: valueOf(findInputByLabel(root, '月租金')),
    deposit: valueOf(findSelectByLabel(root, '押金')),
    agencyFee: valueOf(findSelectByLabel(root, '中介费')),
    paymentCycle: valueOf(findSelectByLabel(root, '付款周期')),
    contractTerm: valueOf(findSelectByLabel(root, '合同期限')),
    activeOptions: collectActiveOptions(root),
    commuteTimes,
    commuteOrder,
  }
}

type ValidationResult =
  | { ok: true }
  | { ok: false; message: string }

const validateFormData = (form: RentFormData): ValidationResult => {
  const salary = parseFloat(form.salary)
  const rent = parseFloat(form.rent)

  if (!form.salary.trim() || !Number.isFinite(salary)) {
    return { ok: false, message: '请填写月薪资 💼' }
  }
  if (salary <= 0) {
    return { ok: false, message: '月薪资得是正数吧，老板再小气也不至于倒贴你 😅' }
  }
  if (!form.rent.trim() || !Number.isFinite(rent)) {
    return { ok: false, message: '请填写月租金 🏠' }
  }
  if (rent <= 0) {
    return { ok: false, message: '月租金得大于 0 哦，要是真的免费那就是赚到了 🎉' }
  }
  if (rent >= salary * 5) {
    return {
      ok: false,
      message: '租金是收入的 5 倍以上，确定没填错？要不再核对一下 🤔',
    }
  }

  return { ok: true }
}

export default function HomePage() {
  const router = useRouter()
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!rootRef.current) return
    const stats = incrementVisit()

    const allSpans = Array.from(rootRef.current.querySelectorAll<HTMLSpanElement>('span'))

    const todayParent = allSpans.find((el) => el.textContent?.startsWith('今日访问:'))
    const todayValue = todayParent?.querySelector<HTMLSpanElement>('.font-semibold')
    if (todayValue) todayValue.textContent = formatCount(stats.today)

    const totalParent = allSpans.find((el) => el.textContent?.startsWith('总访问:'))
    const totalValue = totalParent?.querySelector<HTMLSpanElement>('.font-semibold')
    if (totalValue) totalValue.textContent = formatCount(stats.total)

    // 回填：延迟一帧确保 stitch 内联脚本初始化完成后再写入
    const saved = loadRentFormData()
    if (saved) {
      const root = rootRef.current
      window.requestAnimationFrame(() => {
        restoreFormData(root, saved)
        updateRentHint(root)
      })
    } else {
      updateRentHint(rootRef.current)
    }
  }, [])

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const button = (event.target as HTMLElement).closest('button')

    if (button?.textContent?.includes('查看我的租房性价比报告')) {
      const formData = collectRentFormData(event.currentTarget)
      const validation = validateFormData(formData)
      if (!validation.ok) {
        window.alert(validation.message)
        return
      }
      saveRentFormData(formData)
      router.push(`/result?t=${Date.now()}`)
      return
    }

    if (button && rootRef.current) {
      const root = rootRef.current
      // 双重 rAF：第一帧等 stitch inline onclick 执行完，第二帧再读 class
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => updateRentHint(root))
      })
    }
  }

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-gradient-to-b from-stone-50 to-orange-50/20 text-on-surface"
      onClick={handleClick}
      dangerouslySetInnerHTML={{ __html: inputHtml }}
    />
  )
}
