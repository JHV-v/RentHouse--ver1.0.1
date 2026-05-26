'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { resultHtml } from '../stitch-html'
import { mapFormDataToScoreInput, type RentFormData } from '../lib/adapter'
import { calculateScore, type ScoreResult } from '../lib/score'
import { type RawScoreInput } from '../lib/score'
import { loadRentFormData } from '../lib/storage'
import { patchStitchResult } from '../lib/patchStitchResult'

export default function ResultPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<RentFormData | null>(null)
  const stitchRootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setFormData(loadRentFormData())
  }, [])

  const score: ScoreResult | null = useMemo(() => {
    if (!formData) return null
    return calculateScore(mapFormDataToScoreInput(formData))
  }, [formData])

  const rawInput: RawScoreInput | null = useMemo(() => {
    if (!formData) return null
    return mapFormDataToScoreInput(formData)
  }, [formData])

  // Stitch HTML 渲染完毕 + score 算出后，把写死的占位数据替换为真实数据
  useEffect(() => {
    if (!score || !rawInput || !stitchRootRef.current) return
    patchStitchResult(stitchRootRef.current, score, rawInput)
  }, [score, rawInput])

  return (
    <div className="min-h-screen bg-surface text-on-surface selection:bg-primary-fixed-dim">
      {/* 返回修改按钮：固定在屏幕左上角，z-index 高于 stitch HTML 的 fixed header */}
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
