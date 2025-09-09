'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  ChefHat, 
  Users, 
  DollarSign, 
  RefreshCw, 
  Eye, 
  Filter
} from 'lucide-react'

interface OrderItem {
  id: string
  product: {
    name: string
    price: number
  }
  quantity: number
  price: number
}

interface Order {
  id: string
  tableId: string
  table: {
    number: string
  }
  status: string
  total: number
  notes?: string
  createdAt: string
  items: OrderItem[]
}

export default function YonetimOrdersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [filter, setFilter] = useState<string>('all')

  const statusConfig = {
    PENDING: {
      label: 'Bekliyor',
      color: 'bg-yellow-100 text-yellow-800',
      icon: Clock
    },
    PREPARING: {
      label: 'Hazırlanıyor',
      color: 'bg-blue-100 text-blue-800',
      icon: ChefHat
    },
    READY: {
      label: 'Hazır',
      color: 'bg-green-100 text-green-800',
      icon: CheckCircle
    },
    DELIVERED: {
      label: 'Teslim Edildi',
      color: 'bg-gray-100 text-gray-800',
      icon: CheckCircle
    },
    CANCELLED: {
      label: 'İptal',
      color: 'bg-red-100 text-red-800',
      icon: XCircle
    }
  }

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      window.location.href = 'https://portal.siparisqr.com/login'
      return
    }

    fetchOrders()
  }, [session, status])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      if (response.ok) {
        const data = await response.json()
        setOrders(data)
      }
    } catch (error) {
      console.error('Orders fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        fetchOrders()
        if (selectedOrder?.id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus })
        }
      }
    } catch (error) {
      console.error('Order update error:', error)
    }
  }

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true
    return order.status === filter
  })

  if (status === 'loading' || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
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
          <h1 className="text-3xl font-bold text-gray-900">Siparişler</h1>
          <p className="text-gray-600">Gelen siparişleri yönetin ve durumlarını güncelleyin</p>
        </div>
        <Button onClick={fetchOrders}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Yenile
        </Button>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          Tümü ({orders.length})
        </Button>
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = orders.filter(order => order.status === status).length
          return (
            <Button
              key={status}
              variant={filter === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(status)}
            >
              {config.label} ({count})
            </Button>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="h-12 w-12 text-gray-400 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Sipariş bulunamadı</h3>
                <p className="text-gray-600">
                  {filter === 'all' ? 'Henüz sipariş gelmemiş.' : `${statusConfig[filter as keyof typeof statusConfig]?.label} durumunda sipariş yok.`}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => {
              const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon
              return (
                <Card key={order.id} className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedOrder?.id === order.id ? 'ring-2 ring-primary' : ''
                }`} onClick={() => setSelectedOrder(order)}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                          {order.table.number}
                        </div>
                        <div>
                          <h3 className="font-medium">Masa {order.table.number}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleTimeString('tr-TR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={statusConfig[order.status as keyof typeof statusConfig].color}>
                          {(() => {
                            const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon
                            return <StatusIcon className="w-3 h-3 mr-1" />
                          })()} 
                          {statusConfig[order.status as keyof typeof statusConfig].label}
                        </Badge>
                        <span className="font-bold text-lg">₺{order.total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      {order.items.slice(0, 2).map((item, index) => (
                        <span key={index}>
                          {item.quantity}x {item.product.name}
                          {index < Math.min(order.items.length, 2) - 1 && ', '}
                        </span>
                      ))}
                      {order.items.length > 2 && (
                        <span> ve {order.items.length - 2} ürün daha</span>
                      )}
                    </div>
                    
                    {order.notes && (
                      <div className="mt-2 p-2 bg-yellow-50 rounded text-sm text-yellow-800">
                        <strong>Not:</strong> {order.notes}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>

        {/* Order Details */}
        <div className="lg:col-span-1">
          {selectedOrder ? (
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Sipariş Detayı</span>
                  <Badge className={statusConfig[selectedOrder.status as keyof typeof statusConfig].color}>
                    {(() => {
                      const StatusIcon = statusConfig[selectedOrder.status as keyof typeof statusConfig].icon
                      return <StatusIcon className="w-3 h-3 mr-1" />
                    })()}
                    {statusConfig[selectedOrder.status as keyof typeof statusConfig].label}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Masa {selectedOrder.table.number} • {new Date(selectedOrder.createdAt).toLocaleString('tr-TR')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div>
                  <h4 className="font-medium mb-2">Sipariş İçeriği</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div>
                          <span className="font-medium">{item.product.name}</span>
                          <span className="text-gray-600 ml-2">x{item.quantity}</span>
                        </div>
                        <span className="font-medium">₺{item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center font-bold">
                      <span>Toplam</span>
                      <span>₺{selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {selectedOrder.notes && (
                  <div>
                    <h4 className="font-medium mb-2">Notlar</h4>
                    <div className="p-3 bg-yellow-50 rounded text-sm">
                      {selectedOrder.notes}
                    </div>
                  </div>
                )}

                {/* Status Actions */}
                <div>
                  <h4 className="font-medium mb-2">Durum Güncelle</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedOrder.status === 'PENDING' && (
                      <Button
                        size="sm"
                        onClick={() => updateOrderStatus(selectedOrder.id, 'PREPARING')}
                      >
                        Hazırlamaya Başla
                      </Button>
                    )}
                    {selectedOrder.status === 'PREPARING' && (
                      <Button
                        size="sm"
                        onClick={() => updateOrderStatus(selectedOrder.id, 'READY')}
                      >
                        Hazır
                      </Button>
                    )}
                    {selectedOrder.status === 'READY' && (
                      <Button
                        size="sm"
                        onClick={() => updateOrderStatus(selectedOrder.id, 'DELIVERED')}
                      >
                        Teslim Edildi
                      </Button>
                    )}
                    {['PENDING', 'PREPARING'].includes(selectedOrder.status) && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => updateOrderStatus(selectedOrder.id, 'CANCELLED')}
                      >
                        İptal Et
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Sipariş Seçin</h3>
                <p className="text-gray-600">
                  Detaylarını görmek için bir sipariş seçin
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}