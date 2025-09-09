import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SiparişQR Portal - Restoran Kayıt ve Giriş',
  description: 'Restoranınızı SiparişQR sistemine kaydedin ve yönetmeye başlayın.',
}

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <header className="bg-white shadow-sm border-b">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">QR</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">SiparişQR Portal</span>
                </div>
                <nav className="flex items-center space-x-4">
                  <a href="https://siparisqr.com" className="text-gray-600 hover:text-gray-900">
                    Ana Sayfa
                  </a>
                  <a href="https://yonetim.siparisqr.com" className="text-gray-600 hover:text-gray-900">
                    Yönetim Paneli
                  </a>
                </nav>
              </div>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}