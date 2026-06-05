'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { saveRentFormData, loadRentFormData } from './lib/storage'
import { type RentFormData } from './lib/adapter'
import RentForm from './components/RentForm'

type ValidationResult =
  | { ok: true }
  | { ok: false; message: string }

const validateFormData = (form: RentFormData): ValidationResult => {
  const salary = parseFloat(form.salary)
  const rent = parseFloat(form.rent)

  if (!form.salary.trim() || !Number.isFinite(salary)) {
    return { ok: false, message: '请填写月薪资 💼' }
  }
  if (salary <= 0) {
    return { ok: false, message: '月薪资得是正数吧，老板再小气也不至于倒贴你 😅' }
  }
  if (!form.rent.trim() || !Number.isFinite(rent)) {
    return { ok: false, message: '请填写月租金 🏠' }
  }
  if (rent <= 0) {
    return { ok: false, message: '月租金得大于 0 哦，要是真的免费那就是赚到了 🎉' }
  }
  if (rent >= salary * 5) {
    return {
      ok: false,
      message: '租金是收入的 5 倍以上，确定没填错？要不再核对一下 🤔',
    }
  }

  return { ok: true }
}

export default function HomePage() {
  const router = useRouter()
  const [initialData, setInitialData] = useState<RentFormData | null | undefined>(undefined)

  useEffect(() => {
    const saved = loadRentFormData()
    setInitialData(saved ?? null)
  }, [])

  const handleSubmit = (formData: RentFormData) => {
    const validation = validateFormData(formData)
    if (!validation.ok) {
      window.alert(validation.message)
      return
    }
    saveRentFormData(formData)
    router.push(`/result?t=${Date.now()}`)
  }

  // 等待 sessionStorage 读取完成
  if (initialData === undefined) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-orange-50/20 text-on-surface">
      <RentForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  )
}
