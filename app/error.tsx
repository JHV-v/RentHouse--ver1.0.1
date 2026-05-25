'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[App Error]', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface p-6 text-center">
      <h2 className="text-headline-md font-semibold text-on-surface">出了点小问题</h2>
      <p className="max-w-md text-body-sm text-on-surface-variant">
        {error.message || '未知错误，请重试或返回首页。'}
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-primary px-5 py-2 text-on-primary shadow-md shadow-primary/30 transition hover:brightness-105"
        >
          重新尝试
        </button>
        <a
          href="/"
          className="rounded-full border border-outline-variant px-5 py-2 text-on-surface transition hover:bg-surface-container-low"
        >
          回到首页
        </a>
      </div>
    </div>
  )
}
