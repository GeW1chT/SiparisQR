'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  DollarSign, 
  ShoppingCart, 
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  ChefHat
} from 'lucide-react'

interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  activeOrders: number
  completedOrders: number
  todayRevenue: number
  todayOrders: number
  averageOrderValue: number
  popularProducts: Array<{
    name: string
    count: number
    revenue: number
  }>
}

export default function YonetimDashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      window.location.href = 'https://portal.siparisqr.com/login'
      return
    }

    fetchDashboardStats()
  }, [session, status])

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Dashboard stats fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Restoranınızın genel durumu</p>
        </div>
        <Button onClick={fetchDashboardStats}>
          Yenile
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bugünkü Ciro</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺{stats?.todayRevenue?.toLocaleString() || '0'}</div>
            <p className="text-xs text-muted-foreground">
              +12% geçen güne göre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bugünkü Siparişler</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.todayOrders || 0}</div>
            <p className="text-xs text-muted-foreground">
              +8% geçen güne göre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Siparişler</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.activeOrders || 0}</div>
            <p className="text-xs text-muted-foreground">
              Şu anda hazırlanıyor
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Sipariş</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺{stats?.averageOrderValue?.toFixed(0) || '0'}</div>
            <p className="text-xs text-muted-foreground">
              Sipariş başına ortalama
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Son Siparişler</CardTitle>
            <CardDescription>
              En son gelen siparişlerin durumu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((order) => (
                <div key={order} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {order}
                    </div>
                    <div>
                      <p className="font-medium">Masa {order + 2}</p>
                      <p className="text-sm text-gray-600">₺{(Math.random() * 200 + 50).toFixed(0)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {order <= 2 ? (
                      <>
                        <Clock className="h-4 w-4 text-orange-500" />
                        <span className="text-sm text-orange-600">Hazırlanıyor</span>
                      </>
                    ) : order <= 4 ? (
                      <>
                        <ChefHat className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-blue-600">Mutfakta</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600">Tamamlandı</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Products */}
        <Card>
          <CardHeader>
            <CardTitle>Popüler Ürünler</CardTitle>
            <CardDescription>
              Bu hafta en çok satılan ürünler
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.popularProducts?.slice(0, 5).map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.count} adet</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₺{product.revenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">toplam</p>
                  </div>
                </div>
              )) || [
                { name: 'Türk Kahvesi', count: 45, revenue: 675 },
                { name: 'Cappuccino', count: 38, revenue: 760 },
                { name: 'Cheesecake', count: 22, revenue: 550 },
                { name: 'Americano', count: 31, revenue: 465 },
                { name: 'Tiramisu', count: 18, revenue: 450 }
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.count} adet</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₺{product.revenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">toplam</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}