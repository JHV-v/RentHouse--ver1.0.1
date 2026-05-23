'use client'

import { useRouter } from 'next/navigation'
import { type MouseEvent } from 'react'
import { inputHtml } from './stitch-html'

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

const collectRentFormData = (root: HTMLElement): RentFormData => {
  const numberInputs = Array.from(root.querySelectorAll('input[type="number"]')) as HTMLInputElement[]
  const selects = Array.from(root.querySelectorAll('select')) as HTMLSelectElement[]

  return {
    salary: numberInputs[0]?.value ?? '',
    rent: numberInputs[1]?.value ?? '',
    deposit: selects[0]?.value ?? '',
    agencyFee: selects[1]?.value ?? '',
    paymentCycle: selects[2]?.value ?? '',
    contractTerm: selects[3]?.value ?? '',
    activeOptions: collectActiveOptions(root),
    commuteTimes: collectCommuteTimes(root),
  }
}

export default function HomePage() {
  const router = useRouter()

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const button = (event.target as HTMLElement).closest('button')

    if (button?.textContent?.includes('查看我的租房性价比报告')) {
      const formData = collectRentFormData(event.currentTarget)
      sessionStorage.setItem('rentFormData', JSON.stringify(formData))
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
