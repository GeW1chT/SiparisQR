import { Inter } from 'next/font/google'
import '../globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SiparişQR Yönetim Paneli',
  description: 'Restoranınızı yönetin, siparişleri takip edin, menünüzü düzenleyin.',
}

export default function YonetimLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b">
              <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">QR</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900">SiparişQR Yönetim</span>
                  </div>
                  <nav className="flex items-center space-x-4">
                    <a href="https://siparisqr.com" className="text-gray-600 hover:text-gray-900">
                      Ana Sayfa
                    </a>
                    <a href="https://portal.siparisqr.com" className="text-gray-600 hover:text-gray-900">
                      Portal
                    </a>
                  </nav>
                </div>
              </div>
            </header>
            <main>
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}