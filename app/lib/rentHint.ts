// 根据"户型"标签（整租/合租）动态在月租金 label 后面显示填写提示。
// 注意：hint 必须作为 label 的兄弟节点插入，不能 appendChild 到 label 内部，
// 否则会改变 label.textContent，导致其他按 label 文字查找的函数失效。

const HINT_ID = 'rent-hint-text'

function detectHousingType(root: HTMLElement): 'shared' | 'whole' | null {
  const activeButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('button.tag-active'))
  const housingButton = activeButtons.find((btn) => {
    const text = btn.textContent?.trim() ?? ''
    return text.startsWith('整租') || text.startsWith('合租')
  })
  if (!housingButton) return null
  const text = housingButton.textContent?.trim() ?? ''
  if (text.startsWith('合租')) return 'shared'
  if (text.startsWith('整租')) return 'whole'
  return null
}

function findRentLabel(root: HTMLElement): HTMLLabelElement | null {
  const labels = Array.from(root.querySelectorAll('label'))
  return (labels.find((el) => el.textContent?.trim() === '月租金') as HTMLLabelElement | null) ?? null
}

export function updateRentHint(root: HTMLElement): void {
  const label = findRentLabel(root)
  if (!label) return

  const type = detectHousingType(root)

  // 找已存在的提示元素
  let hint = label.parentElement?.querySelector<HTMLElement>(`#${HINT_ID}`) ?? null

  if (!type) {
    if (hint) hint.style.display = 'none'
    return
  }

  // 没有就创建一个 span，插入到 label 后面（兄弟节点，不修改 label 内容）
  if (!hint) {
    hint = document.createElement('span')
    hint.id = HINT_ID
    hint.className = 'ml-2 text-xs font-normal'
    label.after(hint)
  }

  hint.style.display = ''
  if (type === 'shared') {
    hint.textContent = '（请填你自己承担的那份，例：总租6000，你住主卧承担3000就填3000）'
    hint.style.color = 'rgb(217 119 6)' // amber-600
  } else {
    hint.textContent = '（整租请填写总月租金）'
    hint.style.color = 'rgb(115 115 115)' // stone-500
  }
}
