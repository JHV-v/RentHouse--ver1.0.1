'use client'

import { useState } from 'react'

interface ShareCTAProps {
  onRestart: () => void
  onBack: () => void
}

export default function ShareCTA({ onRestart, onBack }: ShareCTAProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // fallback: ignore
    }
  }

  return (
    <div className="space-y-stack-md pt-stack-md pb-stack-lg">
      <button
        type="button"
        onClick={onRestart}
        className="w-full premium-btn py-5 rounded-full text-white font-headline-sm shadow-md active:scale-[0.98] flex items-center justify-center gap-stack-md"
      >
        <span className="material-symbols-outlined fill-1">refresh</span>
        重新测评
      </button>
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 bg-white border border-outline-variant/30 py-4 rounded-full text-on-surface font-label-md hover:bg-surface-container-low transition-all soft-shadow"
        >
          <span className="material-symbols-outlined text-primary">link</span>
          {copied ? '已复制!' : '复制链接'}
        </button>
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center gap-2 bg-white border border-outline-variant/30 py-4 rounded-full text-on-surface font-label-md hover:bg-surface-container-low transition-all soft-shadow"
        >
          <span className="material-symbols-outlined text-primary">edit</span>
          重新填写
        </button>
      </div>
    </div>
  )
}
