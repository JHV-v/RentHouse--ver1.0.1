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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
