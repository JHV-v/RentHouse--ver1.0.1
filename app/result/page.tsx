'use client'

import { useEffect, useState } from 'react'
import { resultHtml } from '../stitch-html'

type RentFormData = {
  salary: string
  rent: string
  deposit: string
  agencyFee: string
  paymentCycle: string
  contractTerm: string
  activeOptions: Record<string, string[]>
  commuteTimes: Record<string, string>
}

export default function ResultPage() {
  const [formData, setFormData] = useState<RentFormData | null>(null)

  useEffect(() => {
    const storedData = sessionStorage.getItem('rentFormData')

    if (storedData) {
      setFormData(JSON.parse(storedData) as RentFormData)
    }
  }, [])

  return (
    <div className="min-h-screen bg-surface text-on-surface selection:bg-primary-fixed-dim">
      <div dangerouslySetInnerHTML={{ __html: resultHtml }} />

      {formData && (
        <section className="mx-auto mb-10 max-w-[800px] rounded-3xl border border-outline-variant/30 bg-white p-stack-lg soft-shadow">
          <h2 className="mb-stack-md text-headline-sm font-semibold text-on-surface">已接收到的输入数据</h2>
          <div className="grid grid-cols-1 gap-3 text-body-sm text-on-surface-variant md:grid-cols-2">
            <div>月薪资：￥{formData.salary || '未填写'}</div>
            <div>月租金：￥{formData.rent || '未填写'}</div>
            <div>押金：{formData.deposit || '未选择'}</div>
            <div>中介费：{formData.agencyFee || '未选择'}</div>
            <div>付款周期：{formData.paymentCycle || '未选择'}</div>
            <div>合同期限：{formData.contractTerm || '未选择'}</div>
          </div>
          <pre className="mt-stack-md max-h-80 overflow-auto rounded-2xl bg-surface-container-low p-stack-md text-xs leading-relaxed text-on-surface-variant">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </section>
      )}
    </div>
  )
}
