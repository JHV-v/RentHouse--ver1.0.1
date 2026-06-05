'use client'

interface BasicInfoFieldsProps {
  salary: string
  rent: string
  housingType: string | undefined
  onSalaryChange: (v: string) => void
  onRentChange: (v: string) => void
}

export default function BasicInfoFields({
  salary,
  rent,
  housingType,
  onSalaryChange,
  onRentChange,
}: BasicInfoFieldsProps) {
  const rentHint =
    housingType?.startsWith('合租')
      ? '（请填你自己承担的那份，例：总租6000，你住主卧承担3000就填3000）'
      : housingType?.startsWith('整租')
        ? '（整租请填写总月租金）'
        : null

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="font-label-md text-label-md text-on-surface-variant">月薪资</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant font-medium">￥</span>
          <input
            type="number"
            value={salary}
            onChange={(e) => onSalaryChange(e.target.value)}
            placeholder="请输入金额"
            className="w-full pl-8 pr-4 py-3 rounded-xl border border-outline-variant/50 bg-surface text-on-surface font-body-md focus:outline-none"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="font-label-md text-label-md text-on-surface-variant">
          月租金
          {rentHint && (
            <span
              className={`ml-2 text-xs font-normal ${
                housingType?.startsWith('合租') ? 'text-amber-600' : 'text-stone-500'
              }`}
            >
              {rentHint}
            </span>
          )}
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant font-medium">￥</span>
          <input
            type="number"
            value={rent}
            onChange={(e) => onRentChange(e.target.value)}
            placeholder="请输入金额"
            className="w-full pl-8 pr-4 py-3 rounded-xl border border-outline-variant/50 bg-surface text-on-surface font-body-md focus:outline-none"
          />
        </div>
      </div>
    </div>
  )
}
