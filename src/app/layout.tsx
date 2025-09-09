import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SiparisQR - Turkiye\'nin En Hizli QR Siparis Sistemi',
  description: '5 dakikada kurulum, 99TL/ay\'dan baslar. QR taradiniz, siparis verdiniz, mutfaga gitsin!',
  keywords: 'qr siparis, restaurant, menu, siparis sistemi, qr kod, turkiye',
  authors: [{ name: 'SiparisQR Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'SiparisQR - Turkiye\'nin En Hizli QR Siparis Sistemi',
    description: '5 dakikada kurulum, 99TL/ay\'dan baslar. QR taradiniz, siparis verdiniz, mutfaga gitsin!',
    type: 'website',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SiparisQR - Turkiye\'nin En Hizli QR Siparis Sistemi',
    description: '5 dakikada kurulum, 99TL/ay\'dan baslar. QR taradiniz, siparis verdiniz, mutfaga gitsin!',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}