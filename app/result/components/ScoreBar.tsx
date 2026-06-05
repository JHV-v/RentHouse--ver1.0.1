import { clampPct } from '../../lib/resultText'

interface ScoreBarProps {
  icon: string
  iconColor: string
  label: string
  value: number
  barFrom: string
  barTo: string
  displayText?: string
}

export default function ScoreBar({ icon, iconColor, label, value, barFrom, barTo, displayText }: ScoreBarProps) {
  const pct = clampPct(value)
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center px-1">
        <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
          <span className={`material-symbols-outlined ${iconColor} text-[18px]`}>{icon}</span> {label}
        </span>
        <span className="font-label-md text-label-md font-bold text-on-surface">{displayText ?? `${Math.round(pct)}%`}</span>
      </div>
      <div className="h-2 bg-surface-container-low rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${barFrom} ${barTo} rounded-full transition-all duration-1000`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
