'use client'

import { useRouter } from 'next/navigation'
import { type MouseEvent, useEffect, useRef } from 'react'
import { inputHtml } from './stitch-html'
import { saveRentFormData, loadRentFormData } from './lib/storage'
import { incrementVisit, formatCount } from './lib/visitCounter'
import { restoreFormData } from './lib/restoreFormData'
import { updateRentHint } from './lib/rentHint'

type RentFormData = {
  salary: string
  rent: string
  deposit: string
  agencyFee: string
  paymentCycle: string
  contractTerm: string
  activeOptions: Record<string, string[]>
  commuteTimes: Record<string, string>
}

function findInputByLabel(root: HTMLElement, labelText: string): HTMLInputElement | null {
  const labels = Array.from(root.querySelectorAll('label'))
  const label = labels.find((el) => el.textContent?.trim() === labelText)
  if (!label) return null
  const container = label.parentElement
  return container?.querySelector('input') ?? null
}

function findSelectByLabel(root: HTMLElement, labelText: string): HTMLSelectElement | null {
  const labels = Array.from(root.querySelectorAll('label'))
  const label = labels.find((el) => el.textContent?.trim() === labelText)
  if (!label) return null
  const container = label.parentElement
  return container?.querySelector('select') ?? null
}

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

const collectCommuteTimes = (root: HTMLElement) => {
  const commuteTimes: Record<string, string> = {}

  root.querySelectorAll('.draggable-item').forEach((item) => {
    const label = Array.from(item.querySelectorAll('span'))
      .map((span) => span.textContent?.trim() ?? '')
      .find((text) => ['骑行', '公共交通', '驾车', '步行'].includes(text))
    const input = item.querySelector('input') as HTMLInputElement | null

    if (label) {
      commuteTimes[label] = input?.value ?? ''
    }
  })

  return commuteTimes
}

const collectRentFormData = (root: HTMLElement): RentFormData => ({
  salary: valueOf(findInputByLabel(root, '月薪资')),
  rent: valueOf(findInputByLabel(root, '月租金')),
  deposit: valueOf(findSelectByLabel(root, '押金')),
  agencyFee: valueOf(findSelectByLabel(root, '中介费')),
  paymentCycle: valueOf(findSelectByLabel(root, '付款周期')),
  contractTerm: valueOf(findSelectByLabel(root, '合同期限')),
  activeOptions: collectActiveOptions(root),
  commuteTimes: collectCommuteTimes(root),
})

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

  // mount 后增加访问计数，并把"今日访问 / 总访问"写死的占位值替换成真实值
  useEffect(() => {
    if (!rootRef.current) return
    const stats = incrementVisit()

    // 找到包含"今日访问"和"总访问"标签的两个父 span，再替换其内部 .font-semibold span
    const allSpans = Array.from(rootRef.current.querySelectorAll<HTMLSpanElement>('span'))

    const todayParent = allSpans.find((el) => el.textContent?.startsWith('今日访问:'))
    const todayValue = todayParent?.querySelector<HTMLSpanElement>('.font-semibold')
    if (todayValue) todayValue.textContent = formatCount(stats.today)

    const totalParent = allSpans.find((el) => el.textContent?.startsWith('总访问:'))
    const totalValue = totalParent?.querySelector<HTMLSpanElement>('.font-semibold')
    if (totalValue) totalValue.textContent = formatCount(stats.total)

    // 回填上一次保存的输入数据（从结果页返回时使用）
    const saved = loadRentFormData()
    if (saved) {
      restoreFormData(rootRef.current, saved as RentFormData)
    }

    // 根据户型显示月租金填写提示
    updateRentHint(rootRef.current)
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
      router.push('/result')
      return
    }

    // 标签按钮被点击后（如切换户型），等 stitch 内置脚本处理完 class 再刷新提示
    if (button && rootRef.current) {
      const root = rootRef.current
      window.requestAnimationFrame(() => updateRentHint(root))
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
