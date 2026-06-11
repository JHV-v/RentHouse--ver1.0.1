'use client'

interface TagSelectGroupProps {
  label: string
  options: string[]
  value: string | undefined
  onChange: (value: string) => void
  variant?: 'segmented' | 'single' | 'grid'
  icons?: Array<{ icon: string; color: string }>
  labelIcon?: string
}

export default function TagSelectGroup({
  label,
  options,
  value,
  onChange,
  variant = 'segmented',
  icons,
  labelIcon,
}: TagSelectGroupProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-on-surface-variant flex items-center gap-1.5">
        {labelIcon && <span className="material-symbols-outlined text-primary text-lg">{labelIcon}</span>}
        {label}
      </label>

      {variant === 'grid' ? (
        <div className="grid grid-cols-3 gap-3">
          {options.map((opt, i) => {
            const isActive = value === opt
            const iconInfo = icons?.[i]
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onChange(opt)}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'tag-active border-primary/20'
                    : 'tag-inactive border-transparent'
                }`}
              >
                {iconInfo && (
                  <span className={`material-symbols-outlined text-3xl ${iconInfo.color}`}>{iconInfo.icon}</span>
                )}
                <span className="text-xs font-medium">{opt}</span>
              </button>
            )
          })}
        </div>
      ) : variant === 'segmented' ? (
        <div className="flex p-1 bg-stone-100 rounded-2xl w-full hover:bg-stone-200/50 transition-colors duration-300 border border-stone-200/40">
          {options.map((opt) => {
            const isActive = value === opt
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onChange(opt)}
                className={`flex-1 min-w-[60px] py-2.5 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer text-center ${
                  isActive ? 'tag-active' : 'tag-inactive'
                }`}
              >
                {opt}
              </button>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {options.map((opt) => {
            const isActive = value === opt
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onChange(opt)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  isActive ? 'detail-tag-active' : 'detail-tag-inactive'
                }`}
              >
                {opt}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
