import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#0058be',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: '这房租得值不值 · 测算版',
  description: '租房性价比精细测算 — 输入房租、通勤、居住条件，AI 多维度评分帮你判断这房值不值',
  keywords: ['租房', '性价比', '租金', '评分', '测算', '通勤', '居住'],
  openGraph: {
    title: '这房租得值不值 · 测算版',
    description: '租房性价比精细测算 — 输入房租、通勤、居住条件，AI 多维度评分帮你判断这房值不值',
    type: 'website',
    locale: 'zh_CN',
    siteName: 'RentScore AI',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className="light" lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
