import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QR Sipariş Sistemi | 5 Dakikada Kurulum | SiparişQR',
  description: 'Türkiye\'nin en hızlı QR sipariş sistemi. Rakiplerinizden %300 hızlı kurulum, %50 daha ucuz fiyat. 30 gün ücretsiz deneyin. ₺99/ay\'dan başlar.',
  keywords: 'qr sipariş sistemi, restoran sipariş sistemi, qr menü, dijital menü, restoran teknolojisi, sipariş otomasyonu, qr kod menü, restoran çözümleri, mobil sipariş, temassız sipariş, türkiye',
  authors: [{ name: 'SiparişQR Team' }],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://siparisqr.com',
  },
  openGraph: {
    title: 'QR Sipariş Sistemi | 5 Dakikada Kurulum | SiparişQR',
    description: 'Türkiye\'nin en hızlı QR sipariş sistemi. Rakiplerinizden %300 hızlı kurulum, %50 daha ucuz fiyat. 30 gün ücretsiz deneyin.',
    type: 'website',
    locale: 'tr_TR',
    url: 'https://siparisqr.com',
    siteName: 'SiparişQR',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SiparişQR - QR Sipariş Sistemi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Sipariş Sistemi | 5 Dakikada Kurulum | SiparişQR',
    description: 'Türkiye\'nin en hızlı QR sipariş sistemi. Rakiplerinizden %300 hızlı kurulum, %50 daha ucuz fiyat. 30 gün ücretsiz deneyin.',
    images: ['/og-image.jpg'],
    creator: '@siparisqr',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'technology',
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