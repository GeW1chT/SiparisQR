'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  BarChart3, 
  Users, 
  ShoppingCart, 
  Settings,
  QrCode,
  Menu,
  Clock,
  ArrowRight
} from 'lucide-react'

export default function YonetimPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading
    
    if (!session) {
      // Redirect to portal login
      router.push('/portal')
      return
    }
  }, [session, status])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Hoş geldiniz, {session.user?.name}!
        </h1>
        <p className="text-gray-600">
          Restoranınızı yönetmek için aşağıdaki menülerden birini seçin.
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Link href="/yonetim/dashboard">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Dashboard</CardTitle>
                  <CardDescription>Genel bakış ve istatistikler</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Satış raporları, günlük özet ve performans metrikleri
              </p>
              <ArrowRight className="h-4 w-4 mt-2 text-primary" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/yonetim/orders">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Siparişler</CardTitle>
                  <CardDescription>Aktif siparişleri yönetin</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Gelen siparişleri görüntüleyin ve durumlarını güncelleyin
              </p>
              <ArrowRight className="h-4 w-4 mt-2 text-primary" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/yonetim/menu">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Menu className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Menü Yönetimi</CardTitle>
                  <CardDescription>Ürünleri düzenleyin</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Menü kategorileri ve ürünleri ekleyin, düzenleyin
              </p>
              <ArrowRight className="h-4 w-4 mt-2 text-primary" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/yonetim/tables">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <QrCode className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Masa Yönetimi</CardTitle>
                  <CardDescription>QR kodları ve masalar</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Masa QR kodlarını oluşturun ve yazdırın
              </p>
              <ArrowRight className="h-4 w-4 mt-2 text-primary" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/yonetim/settings">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Settings className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Ayarlar</CardTitle>
                  <CardDescription>Restoran bilgileri</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Restoran bilgilerini ve sistem ayarlarını düzenleyin
              </p>
              <ArrowRight className="h-4 w-4 mt-2 text-primary" />
            </CardContent>
          </Card>
        </Link>

        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Mutfak Paneli</CardTitle>
                <CardDescription>Sipariş takip ekranı</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">
              Mutfak için özel sipariş takip ekranı
            </p>
            <Button size="sm" className="w-full">
              Mutfak Panelini Aç
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bugünkü Siparişler</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bugünkü Ciro</p>
                <p className="text-2xl font-bold">₺1,240</p>
              </div>
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aktif Masalar</p>
                <p className="text-2xl font-bold">8/12</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bekleyen Siparişler</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}