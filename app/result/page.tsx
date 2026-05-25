'use client'

import { useEffect, useMemo, useState } from 'react'
import { resultHtml } from '../stitch-html'
import { mapFormDataToScoreInput, type RentFormData } from '../lib/adapter'
import { calculateScore, type ScoreResult } from '../lib/score'
import { loadRentFormData } from '../lib/storage'

export default function ResultPage() {
  const [formData, setFormData] = useState<RentFormData | null>(null)

  useEffect(() => {
    setFormData(loadRentFormData())
  }, [])

  const score: ScoreResult | null = useMemo(() => {
    if (!formData) return null
    return calculateScore(mapFormDataToScoreInput(formData))
  }, [formData])

  return (
    <div className="min-h-screen bg-surface text-on-surface selection:bg-primary-fixed-dim">
      <div dangerouslySetInnerHTML={{ __html: resultHtml }} />

      {score && (
        <section className="mx-auto mb-6 max-w-[800px] rounded-3xl border border-outline-variant/30 bg-white p-stack-lg soft-shadow">
          <div className="flex items-center justify-between gap-stack-md">
            <div>
              <p className="text-body-sm text-on-surface-variant">综合性价比评分</p>
              <p className="mt-1 text-5xl font-bold text-primary">{score.totalScore}</p>
              <p className="mt-2 text-body-md font-medium text-on-surface">{score.persona}</p>
            </div>
            <div className="text-right text-body-sm text-on-surface-variant">
              <div>房租占比：<span className="font-semibold text-on-surface">{score.rentRatio}%</span></div>
              <div>压力指数：<span className="font-semibold text-on-surface">{score.stress}</span></div>
            </div>
          </div>

          <div className="mt-stack-md grid grid-cols-1 gap-3 text-body-sm md:grid-cols-3">
            <ScoreBar label="通勤评分" value={score.commuteScore} />
            <ScoreBar label="居住舒适度" value={score.liveScore} />
            <ScoreBar label="生活便利度" value={score.lifeScore} />
          </div>
        </section>
      )}

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

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-surface-container-low p-3">
      <div className="flex items-center justify-between text-on-surface-variant">
        <span>{label}</span>
        <span className="font-semibold text-on-surface">{value}</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-stone-200/70">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
