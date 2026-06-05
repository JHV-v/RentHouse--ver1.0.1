'use client'

import { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { mapFormDataToScoreInput, type RentFormData } from '../lib/adapter'
import { calculateScore, type ScoreResult, type RawScoreInput } from '../lib/score'
import { loadRentFormData } from '../lib/storage'
import HeroSection from './components/HeroSection'
import EvaluationSection from './components/EvaluationSection'
import ProsConsSection from './components/ProsConsSection'
import AIRoastSection from './components/AIRoastSection'
import RecommendationsSection from './components/RecommendationsSection'
import ShareCTA from './components/ShareCTA'
import ResultFooter from './components/ResultFooter'

function ResultContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState<RentFormData | null>(null)

  useEffect(() => {
    const t = searchParams.get('t')
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

  if (!formData) {
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

  if (!score || !rawInput) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-on-surface-variant">正在生成你的租房报告...</p>
        </div>
      </div>
    )
  }

  const handleRestart = () => router.push('/')
  const handleBack = () => router.push('/')

  return (
    <div className="min-h-screen bg-surface text-on-surface selection:bg-primary-fixed-dim">
      <button
        type="button"
        onClick={handleBack}
        aria-label="返回输入页修改"
        className="fixed left-4 top-4 z-[100] flex items-center gap-1.5 rounded-full border border-outline-variant/30 bg-primary px-4 py-2 text-sm font-semibold text-on-primary shadow-lg shadow-primary/30 transition-all hover:brightness-110 hover:shadow-xl active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        返回修改
      </button>

      <header className="bg-white/70 backdrop-blur-xl border-b border-outline-variant/30 fixed w-full top-0 z-50">
        <div className="flex justify-between items-center px-margin-desktop h-16 w-full max-w-container-max mx-auto">
          <div className="text-headline-md font-headline-md font-bold text-primary tracking-tight">RentScore AI</div>
          <div className="flex gap-stack-md">
            <span className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container transition-colors p-2 rounded-full cursor-pointer">help</span>
            <span className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container transition-colors p-2 rounded-full cursor-pointer">settings</span>
          </div>
        </div>
      </header>

      <main className="report-gradient pb-stack-lg pt-16">
        <div className="max-w-[800px] mx-auto px-margin-mobile md:px-0 pt-stack-lg space-y-gutter">
          <HeroSection totalScore={score.totalScore} persona={score.persona} />
          <EvaluationSection score={score} input={rawInput} />
          <ProsConsSection score={score} input={rawInput} />
          <AIRoastSection score={score} input={rawInput} />
          <RecommendationsSection score={score} />
          <ShareCTA onRestart={handleRestart} onBack={handleBack} />
        </div>
      </main>

      <ResultFooter />
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
