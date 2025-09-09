'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Clock, 
  ChefHat, 
  CheckCircle, 
  AlertCircle,
  Users,
  Timer,
  RefreshCw,
  Bell
} from 'lucide-react'

interface OrderItem {
  id: string
  quantity: number
  notes?: string
  product: {
    id: string
    name: string
    price: number
  }
}

interface Order {
  id: string
  status: 'PENDING' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED'
  total: number
  createdAt: string
  updatedAt: string
  customerName?: string
  customerPhone?: string
  table: {
    number: number
  }
  items: OrderItem[]
}

const statusConfig = {
  PENDING: {
    label: 'Bekliyor',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: Clock,
    priority: 1
  },
  PREPARING: {
    label: 'Hazırlanıyor',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: ChefHat,
    priority: 2
  },
  READY: {
    label: 'Hazır',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: CheckCircle,
    priority: 3
  },
  DELIVERED: {
    label: 'Teslim Edildi',
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: CheckCircle,
    priority: 4
  },
  CANCELLED: {
    label: 'İptal',
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: AlertCircle,
    priority: 5
  }
}

export default function KitchenPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [autoRefresh, setAutoRefresh] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/portal/login')
      return
    }

    fetchOrders()
  }, [session, status, router])

  // Auto refresh every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      fetchOrders()
    }, 30000)

    return () => clearInterval(interval)
  }, [autoRefresh])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/kitchen/orders')
      if (response.ok) {
        const data = await response.json()
        setOrders(data)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        fetchOrders()
      }
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  const getFilteredOrders = () => {
    let filtered = orders
    
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(order => order.status === selectedStatus)
    }
    
    // Sort by priority and creation time
    return filtered.sort((a, b) => {
      const priorityA = statusConfig[a.status].priority
      const priorityB = statusConfig[b.status].priority
      
      if (priorityA !== priorityB) {
        return priorityA - priorityB
      }
      
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })
  }

  const getOrderAge = (createdAt: string) => {
    const now = new Date()
    const created = new Date(createdAt)
    const diffInMinutes = Math.floor((now.getTime() - created.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Az önce'
    if (diffInMinutes < 60) return `${diffInMinutes} dk önce`
    
    const hours = Math.floor(diffInMinutes / 60)
    const minutes = diffInMinutes % 60
    return `${hours}s ${minutes}dk önce`
  }

  const getNextStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case 'PENDING':
        return 'PREPARING'
      case 'PREPARING':
        return 'READY'
      case 'READY':
        return 'DELIVERED'
      default:
        return null
    }
  }

  const getNextStatusLabel = (currentStatus: string) => {
    const nextStatus = getNextStatus(currentStatus)
    return nextStatus ? statusConfig[nextStatus as keyof typeof statusConfig].label : null
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  const filteredOrders = getFilteredOrders()
  const stats = {
    pending: orders.filter(o => o.status === 'PENDING').length,
    preparing: orders.filter(o => o.status === 'PREPARING').length,
    ready: orders.filter(o => o.status === 'READY').length,
    total: orders.length
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-orange-600" />
            <span>Mutfak Paneli</span>
          </h1>
          <p className="text-gray-600 mt-2">Siparişleri takip edin ve durumlarını güncelleyin</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="auto-refresh"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="auto-refresh" className="text-sm text-gray-600">
              Otomatik yenile
            </label>
          </div>
          <Button 
            onClick={fetchOrders}
            variant="outline"
            size="sm"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Yenile
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bekleyen</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Yeni siparişler</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hazırlanıyor</CardTitle>
            <ChefHat className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.preparing}</div>
            <p className="text-xs text-muted-foreground">Mutfakta</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hazır</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.ready}</div>
            <p className="text-xs text-muted-foreground">Teslim bekliyor</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Aktif siparişler</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setSelectedStatus('all')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedStatus === 'all'
              ? 'bg-white text-orange-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Tümü ({orders.length})
        </button>
        <button
          onClick={() => setSelectedStatus('PENDING')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedStatus === 'PENDING'
              ? 'bg-white text-orange-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Bekleyen ({stats.pending})
        </button>
        <button
          onClick={() => setSelectedStatus('PREPARING')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedStatus === 'PREPARING'
              ? 'bg-white text-orange-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Hazırlanıyor ({stats.preparing})
        </button>
        <button
          onClick={() => setSelectedStatus('READY')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedStatus === 'READY'
              ? 'bg-white text-orange-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Hazır ({stats.ready})
        </button>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.map(order => {
          const config = statusConfig[order.status]
          const Icon = config.icon
          const nextStatusLabel = getNextStatusLabel(order.status)
          const orderAge = getOrderAge(order.createdAt)
          const isUrgent = new Date().getTime() - new Date(order.createdAt).getTime() > 20 * 60 * 1000 // 20+ minutes
          
          return (
            <Card key={order.id} className={`hover:shadow-md transition-shadow ${
              isUrgent && order.status !== 'DELIVERED' ? 'ring-2 ring-red-200' : ''
            }`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>Masa {order.table.number}</span>
                      {isUrgent && order.status !== 'DELIVERED' && (
                        <Bell className="h-4 w-4 text-red-500 animate-pulse" />
                      )}
                    </CardTitle>
                    <CardDescription className="flex items-center space-x-2 mt-1">
                      <Timer className="h-3 w-3" />
                      <span>{orderAge}</span>
                      {order.customerName && (
                        <span>• {order.customerName}</span>
                      )}
                    </CardDescription>
                  </div>
                  <Badge className={`${config.color} border`}>
                    <Icon className="h-3 w-3 mr-1" />
                    {config.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-2">
                    {order.items.map(item => (
                      <div key={item.id} className="flex justify-between items-start text-sm">
                        <div className="flex-1">
                          <div className="font-medium">
                            {item.quantity}x {item.product.name}
                          </div>
                          {item.notes && (
                            <div className="text-gray-600 text-xs mt-1">
                              Not: {item.notes}
                            </div>
                          )}
                        </div>
                        <div className="text-gray-600">
                          ₺{(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-2">
                    <div className="flex justify-between items-center font-medium">
                      <span>Toplam:</span>
                      <span>₺{order.total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    {nextStatusLabel && (
                      <Button
                        size="sm"
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                        onClick={() => updateOrderStatus(order.id, getNextStatus(order.status)!)}
                      >
                        {nextStatusLabel}
                      </Button>
                    )}
                    
                    {order.status !== 'CANCELLED' && order.status !== 'DELIVERED' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                        onClick={() => updateOrderStatus(order.id, 'CANCELLED')}
                      >
                        İptal
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
        
        {filteredOrders.length === 0 && (
          <div className="col-span-full text-center py-12">
            <ChefHat className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {selectedStatus === 'all' ? 'Henüz sipariş yok' : `${statusConfig[selectedStatus as keyof typeof statusConfig]?.label || 'Seçili durumda'} sipariş yok`}
            </h3>
            <p className="text-gray-600">
              {selectedStatus === 'all' 
                ? 'Yeni siparişler geldiğinde burada görünecek.' 
                : 'Bu durumda sipariş bulunmuyor.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}