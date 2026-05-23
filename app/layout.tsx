import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '这房租得值不值 · 测算版',
  description: '租房性价比精细测算',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className="light" lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
