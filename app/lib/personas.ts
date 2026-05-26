// 人格档位：未来要做"按 persona 渲染不同插画 / 文案 / 颜色"时，
// 只需在每条记录上加字段（如 illustration、color、tone），
// 不必改动 score.ts 的核心评分逻辑。

export type Persona = {
  /** 命中此档位的最低总分（含） */
  min: number
  /** 档位标识，可用于 i18n key 或资源命名 */
  id: string
  /** 中文展示文案 */
  label: string
}

export const PERSONAS: ReadonlyArray<Persona> = [
  { min: 90, id: 'blessed', label: '天选之房' },
  { min: 80, id: 'winner', label: '人生赢家' },
  { min: 70, id: 'stable', label: '稳定幸福' },
  { min: 60, id: 'decent', label: '还不错' },
  { min: 50, id: 'okay', label: '勉强OK' },
  { min: 40, id: 'meh', label: '有点难受' },
  { min: 30, id: 'endure', label: '忍一忍' },
  { min: 20, id: 'grind', label: '打工地狱' },
  { min: 10, id: 'collapse', label: '生活崩塌' },
  { min: 0, id: 'doomed', label: '人间不值得' },
]

const FALLBACK = PERSONAS[PERSONAS.length - 1]

/** 根据总分挑选 persona 完整对象 */
export function pickPersona(score: number): Persona {
  return PERSONAS.find((p) => score >= p.min) ?? FALLBACK
}
