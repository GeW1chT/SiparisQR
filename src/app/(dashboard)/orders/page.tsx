'use client'

import React from 'react'
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
  quantity: number
  price: number
  product: {
    id: string
    name: string
    price: number
  }
}

interface Order {
  id: string
  total: number
  status: 'PENDING' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED'
  createdAt: string
  updatedAt: string
  table: {
    id: string
    number: number
  }
  items: OrderItem[]
  customerName?: string
  customerPhone?: string
  notes?: string
}

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
  COMPLETED: {
    label: 'Tamamlandı',
    color: 'bg-gray-100 text-gray-800',
    icon: CheckCircle
  },
  CANCELLED: {
    label: 'İptal',
    color: 'bg-red-100 text-red-800',
    icon: XCircle
  }
}

export default function OrdersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/portal/login')
      return
    }

    if (session.user.role !== 'ADMIN') {
      router.push('/')
      return
    }

    fetchOrders()
  }, [session, status, router])

  useEffect(() => {
    if (selectedStatus === 'all') {
      setFilteredOrders(orders)
    } else {
      setFilteredOrders(orders.filter(order => order.status === selectedStatus))
    }
  }, [orders, selectedStatus])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
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
        fetchOrders() // Refresh orders
      }
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  const getStatusActions = (order: Order) => {
    const actions = []
    
    switch (order.status) {
      case 'PENDING':
        actions.push(
          <Button
            key="accept"
            size="sm"
            onClick={() => updateOrderStatus(order.id, 'PREPARING')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Onayla
          </Button>
        )
        actions.push(
          <Button
            key="cancel"
            size="sm"
            variant="outline"
            onClick={() => updateOrderStatus(order.id, 'CANCELLED')}
            className="text-red-600 hover:text-red-700"
          >
            İptal Et
          </Button>
        )
        break
      case 'PREPARING':
        actions.push(
          <Button
            key="ready"
            size="sm"
            onClick={() => updateOrderStatus(order.id, 'READY')}
            className="bg-green-600 hover:bg-green-700"
          >
            Hazır
          </Button>
        )
        break
      case 'READY':
        actions.push(
          <Button
            key="complete"
            size="sm"
            onClick={() => updateOrderStatus(order.id, 'COMPLETED')}
            className="bg-gray-600 hover:bg-gray-700"
          >
            Teslim Et
          </Button>
        )
        break
    }
    
    return actions
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('tr-TR')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sipariş Takibi</h1>
          <p className="text-gray-600 mt-2">Gelen siparişleri yönetin ve takip edin</p>
        </div>
        <Button 
          onClick={fetchOrders}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Yenile</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bekleyen</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {orders.filter(o => o.status === 'PENDING').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hazırlanıyor</CardTitle>
            <ChefHat className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {orders.filter(o => o.status === 'PREPARING').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hazır</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {orders.filter(o => o.status === 'READY').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Günlük Gelir</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₺{orders
                .filter(o => o.status === 'COMPLETED' && 
                  new Date(o.createdAt).toDateString() === new Date().toDateString())
                .reduce((sum, o) => sum + o.total, 0)
                .toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex items-center space-x-4 mb-6">
        <Filter className="h-4 w-4 text-gray-500" />
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="all">Tüm Siparişler ({orders.length})</option>
          <option value="PENDING">Bekleyen ({orders.filter(o => o.status === 'PENDING').length})</option>
          <option value="PREPARING">Hazırlanıyor ({orders.filter(o => o.status === 'PREPARING').length})</option>
          <option value="READY">Hazır ({orders.filter(o => o.status === 'READY').length})</option>
          <option value="COMPLETED">Tamamlandı ({orders.filter(o => o.status === 'COMPLETED').length})</option>
          <option value="CANCELLED">İptal ({orders.filter(o => o.status === 'CANCELLED').length})</option>
        </select>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map(order => {
          const StatusIcon = statusConfig[order.status].icon
          return (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-4">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>Masa {order.table.number}</span>
                        <Badge className={statusConfig[order.status].color}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig[order.status].label}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {formatDate(order.createdAt)} - {formatTime(order.createdAt)}
                        {order.customerName && ` • ${order.customerName}`}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <div className="text-lg font-semibold text-orange-600">
                        ₺{order.total.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.items.length} ürün
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 mb-2">
                      <strong>Ürünler:</strong> {order.items.map(item => 
                        `${item.product.name} (${item.quantity}x)`
                      ).join(', ')}
                    </div>
                    {order.notes && (
                      <div className="text-sm text-gray-600">
                        <strong>Not:</strong> {order.notes}
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2 ml-4">
                    {getStatusActions(order)}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
        
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Sipariş bulunamadı</h3>
            <p className="text-gray-600">
              {selectedStatus === 'all' 
                ? 'Henüz sipariş bulunmuyor.' 
                : `${statusConfig[selectedStatus as keyof typeof statusConfig]?.label} durumunda sipariş bulunmuyor.`
              }
            </p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Masa {selectedOrder.table.number} - Sipariş Detayı</span>
                  </CardTitle>
                  <CardDescription>
                    {formatDate(selectedOrder.createdAt)} - {formatTime(selectedOrder.createdAt)}
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedOrder(null)}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Badge className={statusConfig[selectedOrder.status].color}>
                    {(() => {
                      const StatusIcon = statusConfig[selectedOrder.status].icon
                      return <StatusIcon className="h-3 w-3 mr-1" />
                    })()}
                    {statusConfig[selectedOrder.status].label}
                  </Badge>
                  <div className="text-xl font-semibold text-orange-600">
                    ₺{selectedOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                  </div>
                </div>
                
                {selectedOrder.customerName && (
                  <div>
                    <strong>Müşteri:</strong> {selectedOrder.customerName}
                    {selectedOrder.customerPhone && ` - ${selectedOrder.customerPhone}`}
                  </div>
                )}
                
                <div>
                  <h4 className="font-semibold mb-2">Sipariş Detayları:</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map(item => (
                      <div key={item.id} className="flex justify-between items-center py-2 border-b">
                        <div>
                          <div className="font-medium">{item.product.name}</div>
                          <div className="text-sm text-gray-600">₺{item.product.price.toFixed(2)} x {item.quantity}</div>
                        </div>
                        <div className="font-semibold">
                          ₺{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {selectedOrder.notes && (
                  <div>
                    <strong>Özel Not:</strong>
                    <p className="mt-1 p-2 bg-gray-50 rounded">{selectedOrder.notes}</p>
                  </div>
                )}
                
                <div className="flex space-x-2 pt-4">
                  {getStatusActions(selectedOrder)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}