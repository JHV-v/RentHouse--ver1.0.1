'use client'

import { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { mapFormDataToScoreInput, type RentFormData } from '../lib/adapter'
import { calculateScore, type ScoreResult } from '../lib/score'
import { type RawScoreInput } from '../lib/score'
import { loadRentFormData } from '../lib/storage'
import { patchStitchResult } from '../lib/patchStitchResult'

function ResultContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState<RentFormData | null>(null)
  const [resultHtml, setResultHtml] = useState<string>('')
  const stitchRootRef = useRef<HTMLDivElement | null>(null)
  const [submitTs, setSubmitTs] = useState<number>(0)

  useEffect(() => {
    import('../stitch-result-html').then((mod) => setResultHtml(mod.resultHtml))
  }, [])

  useEffect(() => {
    const t = searchParams.get('t')
    if (t) {
      setSubmitTs(Number(t))
    }
    const data = loadRentFormData()
    if (data) {
      setFormData(data)
    } else if (!t) {
      router.replace('/')
    }
  }, [searchParams, router])

  const score: ScoreResult | null = useMemo(() => {
    if (!formData) return null
    return calculateScore(mapFormDataToScoreInput(formData))
  }, [formData])

  const rawInput: RawScoreInput | null = useMemo(() => {
    if (!formData) return null
    return mapFormDataToScoreInput(formData)
  }, [formData])

  useEffect(() => {
    if (!score || !rawInput || !resultHtml || !stitchRootRef.current || !submitTs) return
    patchStitchResult(stitchRootRef.current, score, rawInput)
  }, [score, rawInput, resultHtml, submitTs])

  if (!resultHtml || !formData) {
    if (!formData && resultHtml) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-surface">
          <div className="flex flex-col items-center gap-4 text-center px-6">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant/40">sentiment_dissatisfied</span>
            <p className="text-on-surface-variant">暂无评测数据，请先填写租房信息</p>
            <button
              type="button"
              onClick={() => router.replace('/')}
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-on-primary shadow-lg shadow-primary/30 transition-all hover:brightness-110 active:scale-95"
            >
              去填写
            </button>
          </div>
        </div>
      )
    }
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-on-surface-variant">正在生成你的租房报告...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface selection:bg-primary-fixed-dim">
      <button
        type="button"
        onClick={() => router.push('/')}
        aria-label="返回输入页修改"
        className="fixed left-4 top-4 z-[100] flex items-center gap-1.5 rounded-full border border-outline-variant/30 bg-primary px-4 py-2 text-sm font-semibold text-on-primary shadow-lg shadow-primary/30 transition-all hover:brightness-110 hover:shadow-xl active:scale-95"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        返回修改
      </button>

      <div ref={stitchRootRef} dangerouslySetInnerHTML={{ __html: resultHtml }} />
    </div>
  )
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-surface">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-sm text-on-surface-variant">正在生成你的租房报告...</p>
          </div>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  )
}
