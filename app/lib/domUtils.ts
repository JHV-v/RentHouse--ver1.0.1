// 共享 DOM 工具函数，供 page.tsx 和 restoreFormData.ts 使用

export function findInputByLabel(root: HTMLElement, labelText: string): HTMLInputElement | null {
  const labels = Array.from(root.querySelectorAll('label'))
  const label = labels.find((el) => el.textContent?.trim() === labelText)
  if (!label) return null
  const container = label.parentElement
  return container?.querySelector('input') ?? null
}

export function findSelectByLabel(root: HTMLElement, labelText: string): HTMLSelectElement | null {
  const labels = Array.from(root.querySelectorAll('label'))
  const label = labels.find((el) => el.textContent?.trim() === labelText)
  if (!label) return null
  const container = label.parentElement
  return container?.querySelector('select') ?? null
}
