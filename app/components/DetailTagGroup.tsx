'use client'

interface DetailTagGroupProps {
  label: string
  options: string[]
  values: string[]
  onChange: (values: string[]) => void
}

export default function DetailTagGroup({ label, options, values, onChange }: DetailTagGroupProps) {
  const toggle = (opt: string) => {
    if (values.includes(opt)) {
      onChange(values.filter((v) => v !== opt))
    } else {
      onChange([...values, opt])
    }
  }

  return (
    <div className="space-y-3">
      <label className="font-label-md text-label-md text-on-surface-variant">{label}</label>
      <div className="flex flex-wrap gap-2.5">
        {options.map((opt) => {
          const isActive = values.includes(opt)
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 cursor-pointer ${
                isActive ? 'detail-tag-active' : 'detail-tag-inactive'
              }`}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}
