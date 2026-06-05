'use client'

interface TagSelectGroupProps {
  label: string
  options: string[]
  value: string | undefined
  onChange: (value: string) => void
  variant?: 'segmented' | 'single' | 'grid'
  icons?: Array<{ icon: string; color: string }>
}

export default function TagSelectGroup({
  label,
  options,
  value,
  onChange,
  variant = 'single',
  icons,
}: TagSelectGroupProps) {
  const isGrid = variant === 'grid'

  return (
    <div className={isGrid ? 'space-y-2' : 'space-y-2'}>
      <label className="font-label-md text-label-md text-on-surface-variant">{label}</label>
      {isGrid ? (
        <div className="grid grid-cols-3 gap-2">
          {options.map((opt, i) => {
            const isActive = value === opt
            const iconInfo = icons?.[i]
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onChange(opt)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'tag-active'
                    : 'tag-inactive'
                }`}
              >
                {iconInfo && (
                  <span className={`material-symbols-outlined text-xl ${iconInfo.color}`}>{iconInfo.icon}</span>
                )}
                <span className="text-xs font-medium">{opt}</span>
              </button>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {options.map((opt) => {
            const isActive = value === opt
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onChange(opt)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  isActive ? 'tag-active' : 'tag-inactive'
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
