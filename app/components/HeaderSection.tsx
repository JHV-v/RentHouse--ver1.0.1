'use client'

import { incrementVisit, incrementVisitRemote, formatCount } from '../lib/visitCounter'
import { useEffect, useState } from 'react'

export default function HeaderSection() {
  const [stats, setStats] = useState<{ today: number; total: number } | null>(null)

  useEffect(() => {
    const local = incrementVisit()
    setStats(local)

    incrementVisitRemote().then((remote) => {
      if (remote.total > 0 || remote.today > 0) {
        setStats(remote)
      }
    })
  }, [])

  return (
    <div className="text-center space-y-4">
      <div>
        <h1 className="text-headline-lg font-headline-lg text-on-surface tracking-tight">
          租房性价比精细测算
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          输入房屋数据，让我们从专业维度分析你的房屋是否合理
        </p>
      </div>
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <span className="bg-stone-100 text-stone-600 text-xs px-2.5 py-1 rounded-full font-medium">v1.0.0</span>
        <a
          className="hover:text-primary transition-colors flex items-center gap-0.5"
          href="https://github.com/JHV-v/RentHouse--ver1.0.1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="material-symbols-outlined text-sm">code</span> GitHub
        </a>
        <a className="hover:text-primary transition-colors flex items-center gap-0.5" href="#">
          <span className="material-symbols-outlined text-sm">explore</span> 小红书
        </a>
        <a className="hover:text-primary transition-colors flex items-center gap-0.5" href="#">
          <span className="material-symbols-outlined text-sm">play_circle</span> 抖音
        </a>
        <a className="hover:text-primary transition-colors flex items-center gap-0.5" href="#">
          <span className="material-symbols-outlined text-sm">movie</span> bilibili
        </a>
      </div>
      <div className="flex items-center justify-center gap-4 text-sm text-on-surface-variant">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          今日访问: <span className="font-semibold text-on-surface">{stats ? formatCount(stats.today) : '--'}</span>
        </span>
        <span className="text-stone-300">|</span>
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">group</span>
          总访问: <span className="font-semibold text-on-surface">{stats ? formatCount(stats.total) : '--'}</span>
        </span>
      </div>
    </div>
  )
}
