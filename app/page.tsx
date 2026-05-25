'use client'

import { useRouter } from 'next/navigation'
import { type MouseEvent } from 'react'
import { inputHtml } from './stitch-html'
import { saveRentFormData } from './lib/storage'

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

// 通过相邻的 <label> 文本定位输入项，避免按顺序取值在 UI 调整后错位
function findInputByLabel(root: HTMLElement, labelText: string): HTMLInputElement | null {
  const labels = Array.from(root.querySelectorAll('label'))
  const label = labels.find((el) => el.textContent?.trim() === labelText)
  if (!label) return null
  // input 与 label 同属一个 .space-y-2 容器
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

const getLabelText = (element: Element) =>
  element.querySelector('label')?.textContent?.trim() ?? ''

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

export default function HomePage() {
  const router = useRouter()

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const button = (event.target as HTMLElement).closest('button')

    if (button?.textContent?.includes('查看我的租房性价比报告')) {
      const formData = collectRentFormData(event.currentTarget)
      saveRentFormData(formData)
      router.push('/result')
    }
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-stone-50 to-orange-50/20 text-on-surface"
      onClick={handleClick}
      dangerouslySetInnerHTML={{ __html: inputHtml }}
    />
  )
}
