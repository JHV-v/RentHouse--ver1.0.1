'use client'

interface ContractSelectGroupProps {
  deposit: string
  agencyFee: string
  paymentCycle: string
  contractTerm: string
  onChange: (field: string, value: string) => void
}

const SELECT_OPTIONS: Record<string, { label: string; options: string[] }> = {
  deposit: { label: '押金', options: ['押一', '押二'] },
  agencyFee: { label: '中介费', options: ['无', '半个月', '一个月'] },
  paymentCycle: { label: '付款周期', options: ['月付', '季付', '半年付', '年付'] },
  contractTerm: { label: '合同期限', options: ['半年', '1年', '2年+'] },
}

export default function ContractSelectGroup({
  deposit,
  agencyFee,
  paymentCycle,
  contractTerm,
  onChange,
}: ContractSelectGroupProps) {
  const values: Record<string, string> = { deposit, agencyFee, paymentCycle, contractTerm }

  return (
    <div className="grid grid-cols-2 gap-4">
      {Object.entries(SELECT_OPTIONS).map(([key, { label, options }]) => (
        <div key={key} className="space-y-1.5">
          <label className="font-label-md text-label-md text-on-surface-variant">{label}</label>
          <select
            value={values[key]}
            onChange={(e) => onChange(key, e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-outline-variant/50 bg-surface text-on-surface font-body-md focus:outline-none"
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  )
}
