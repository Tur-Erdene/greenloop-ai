import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'GreenLoop AI — Дахин боловсруулалтын ирээдүй',
  description: 'Монголын анхны AI-driven дахин боловсруулалтын систем. CO₂ тооцоолуур, pickup tracking, eco rewards, мод тарих.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="mn">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
