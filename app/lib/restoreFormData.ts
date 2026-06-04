// 把 sessionStorage 里保存的输入数据回填到 stitch HTML 渲染出的 DOM 上。
// 包括：基础数值/下拉、所有标签（tag-active/inactive 切换）、生活小细节、通勤时间。

import type { RentFormData } from './adapter'
import { findInputByLabel, findSelectByLabel } from './domUtils'
import { CITY_TYPE_MIGRATION } from './cityTypeMigration'

function getLabelText(group: Element): string {
  return group.querySelector('label')?.textContent?.trim() ?? ''
}

// 在某个标签分组里，把指定文字的按钮设为激活状态（其他设为 inactive）
function activateTagButtons(group: Element, activeTexts: string[]): void {
  const buttons = Array.from(group.querySelectorAll<HTMLButtonElement>('button'))
  buttons.forEach((btn) => {
    if (!btn.classList.contains('tag-active') && !btn.classList.contains('tag-inactive')) return
    const text = btn.textContent?.trim() ?? ''
    const shouldBeActive = activeTexts.includes(text)
    btn.classList.remove('tag-active', 'tag-inactive')
    btn.classList.add(shouldBeActive ? 'tag-active' : 'tag-inactive')
  })
}

// 迁移旧版城市类型标签
function migrateCityType(activeTexts: string[]): string[] {
  return activeTexts.map((t) => CITY_TYPE_MIGRATION[t] ?? t)
}

export function restoreFormData(root: HTMLElement, data: RentFormData): void {
  // 1. 基础输入框（月薪资 / 月租金）
  const salaryInput = findInputByLabel(root, '月薪资')
  if (salaryInput && data.salary) salaryInput.value = data.salary

  const rentInput = findInputByLabel(root, '月租金')
  if (rentInput && data.rent) rentInput.value = data.rent

  // 2. 下拉选择（押金 / 中介费 / 付款周期 / 合同期限）
  const selectFields: Array<[string, string]> = [
    ['押金', data.deposit],
    ['中介费', data.agencyFee],
    ['付款周期', data.paymentCycle],
    ['合同期限', data.contractTerm],
  ]
  selectFields.forEach(([label, value]) => {
    if (!value) return
    const select = findSelectByLabel(root, label)
    if (select) select.value = value
  })

  // 3. 标签按钮分组（tag-active / tag-inactive 切换）
  root.querySelectorAll('section').forEach((section) => {
    section.querySelectorAll('.space-y-2, .space-y-3').forEach((group) => {
      const label = getLabelText(group)
      if (!label) return
      const activeTexts = data.activeOptions[label]
      if (!activeTexts || activeTexts.length === 0) return
      // 城市类型标签迁移：旧版"三线/四线/县城/乡镇" → "三线及以下"
      const migratedTexts = label === '城市类型' ? migrateCityType(activeTexts) : activeTexts
      activateTagButtons(group, migratedTexts)
    })
  })

  // 4. 生活小细节标签（detail-tag-active / detail-tag-inactive）
  const detailTags = data.activeOptions['生活小细节']
  if (detailTags && detailTags.length > 0) {
    const detailButtons = Array.from(
      root.querySelectorAll<HTMLButtonElement>('button.detail-tag-active, button.detail-tag-inactive'),
    )
    detailButtons.forEach((btn) => {
      const text = btn.textContent?.trim() ?? ''
      const shouldBeActive = detailTags.includes(text)
      btn.classList.remove('detail-tag-active', 'detail-tag-inactive')
      btn.classList.add(shouldBeActive ? 'detail-tag-active' : 'detail-tag-inactive')
    })
  }

  // 5. 通勤时间输入框（只写值，不移动 DOM 顺序，避免触发拖拽脚本冲突）
  root.querySelectorAll('.draggable-item').forEach((item) => {
    const label = Array.from(item.querySelectorAll('span'))
      .map((span) => span.textContent?.trim() ?? '')
      .find((text) => ['骑行', '公共交通', '驾车', '步行'].includes(text))
    if (!label) return
    const input = item.querySelector('input') as HTMLInputElement | null
    const value = data.commuteTimes[label]
    if (input && value !== undefined && value !== '') {
      // 用原生 setter 设值，确保 React/stitch 脚本能感知
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value',
      )?.set
      if (nativeInputValueSetter) {
        nativeInputValueSetter.call(input, value)
      } else {
        input.value = value
      }
    }
  })
}
