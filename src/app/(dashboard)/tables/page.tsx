'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Edit, 
  Trash2, 
  QrCode,
  Users,
  Download,
  Eye,
  Copy,
  ExternalLink
} from 'lucide-react'

interface Table {
  id: string
  number: number
  capacity: number
  isActive: boolean
  qrCode?: string
  _count: {
    orders: number
  }
}

export default function TablesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [tables, setTables] = useState<Table[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddTable, setShowAddTable] = useState(false)
  const [editingTable, setEditingTable] = useState<Table | null>(null)
  const [selectedTable, setSelectedTable] = useState<Table | null>(null)
  const [newTable, setNewTable] = useState({
    number: '',
    capacity: '4'
  })

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

    fetchTables()
  }, [session, status, router])

  const fetchTables = async () => {
    try {
      const response = await fetch('/api/tables')
      if (response.ok) {
        const data = await response.json()
        setTables(data)
      }
    } catch (error) {
      console.error('Error fetching tables:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTable = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/tables', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          number: parseInt(newTable.number),
          capacity: parseInt(newTable.capacity)
        })
      })

      if (response.ok) {
        setNewTable({ number: '', capacity: '4' })
        setShowAddTable(false)
        fetchTables()
      }
    } catch (error) {
      console.error('Error adding table:', error)
    }
  }

  const handleUpdateTable = async (tableId: string, updates: Partial<Table>) => {
    try {
      const response = await fetch(`/api/tables/${tableId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      })

      if (response.ok) {
        setEditingTable(null)
        fetchTables()
      }
    } catch (error) {
      console.error('Error updating table:', error)
    }
  }

  const handleDeleteTable = async (tableId: string) => {
    if (!confirm('Bu masayı silmek istediğinizden emin misiniz?')) return
    
    try {
      const response = await fetch(`/api/tables/${tableId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchTables()
      }
    } catch (error) {
      console.error('Error deleting table:', error)
    }
  }

  const generateQRCode = async (tableId: string) => {
    try {
      const response = await fetch(`/api/tables/${tableId}/qr`, {
        method: 'POST'
      })

      if (response.ok) {
        fetchTables()
      }
    } catch (error) {
      console.error('Error generating QR code:', error)
    }
  }

  const getMenuUrl = (tableNumber: number) => {
    return `${window.location.origin}/menu/${tableNumber}`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
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
          <h1 className="text-3xl font-bold text-gray-900">Masa Yönetimi</h1>
          <p className="text-gray-600 mt-2">Masalarınızı yönetin ve QR kodları oluşturun</p>
        </div>
        <Button 
          onClick={() => setShowAddTable(true)}
          className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700"
        >
          <Plus className="h-4 w-4" />
          <span>Masa Ekle</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Masa</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tables.length}</div>
            <p className="text-xs text-muted-foreground">
              {tables.filter(t => t.isActive).length} aktif masa
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Kapasite</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tables.reduce((sum, t) => sum + t.capacity, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Kişi kapasitesi
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">QR Kodlu</CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tables.filter(t => t.qrCode).length}
            </div>
            <p className="text-xs text-muted-foreground">
              QR kodu olan masa
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Sipariş</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tables.reduce((sum, t) => sum + t._count.orders, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Tüm masalardan
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tables.map(table => (
          <Card key={table.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Masa {table.number}</span>
                    <Badge variant={table.isActive ? "default" : "secondary"}>
                      {table.isActive ? "Aktif" : "Pasif"}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {table.capacity} kişilik • {table._count.orders} sipariş
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setEditingTable(table)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteTable(table.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Menü URL:</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(getMenuUrl(table.number))}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(getMenuUrl(table.number), '_blank')}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                {table.qrCode ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">QR Kod:</span>
                      <Badge variant="outline" className="text-green-600">
                        Mevcut
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setSelectedTable(table)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Görüntüle
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        İndir
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    onClick={() => generateQRCode(table.id)}
                  >
                    <QrCode className="h-3 w-3 mr-1" />
                    QR Kod Oluştur
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        
        {tables.length === 0 && (
          <div className="col-span-full text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz masa eklenmemiş</h3>
            <p className="text-gray-600 mb-4">İlk masanızı ekleyerek başlayın.</p>
            <Button onClick={() => setShowAddTable(true)} className="bg-orange-600 hover:bg-orange-700">
              <Plus className="h-4 w-4 mr-2" />
              İlk Masanızı Ekleyin
            </Button>
          </div>
        )}
      </div>

      {/* Add Table Modal */}
      {showAddTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Yeni Masa Ekle</CardTitle>
              <CardDescription>
                Restoranınıza yeni masa ekleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddTable} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="number">Masa Numarası</Label>
                  <Input
                    id="number"
                    type="number"
                    placeholder="1"
                    value={newTable.number}
                    onChange={(e) => setNewTable({...newTable, number: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Kapasite</Label>
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="4"
                    value={newTable.capacity}
                    onChange={(e) => setNewTable({...newTable, capacity: e.target.value})}
                    required
                  />
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700">
                    Masa Ekle
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowAddTable(false)}
                  >
                    İptal
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Table Modal */}
      {editingTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Masa Düzenle</CardTitle>
              <CardDescription>
                Masa {editingTable.number} bilgilerini düzenleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-number">Masa Numarası</Label>
                  <Input
                    id="edit-number"
                    type="number"
                    value={editingTable.number}
                    onChange={(e) => setEditingTable({...editingTable, number: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-capacity">Kapasite</Label>
                  <Input
                    id="edit-capacity"
                    type="number"
                    value={editingTable.capacity}
                    onChange={(e) => setEditingTable({...editingTable, capacity: parseInt(e.target.value)})}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit-active"
                    checked={editingTable.isActive}
                    onChange={(e) => setEditingTable({...editingTable, isActive: e.target.checked})}
                  />
                  <Label htmlFor="edit-active">Aktif</Label>
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button 
                    className="flex-1 bg-orange-600 hover:bg-orange-700"
                    onClick={() => handleUpdateTable(editingTable.id, {
                      number: editingTable.number,
                      capacity: editingTable.capacity,
                      isActive: editingTable.isActive
                    })}
                  >
                    Güncelle
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setEditingTable(null)}
                  >
                    İptal
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* QR Code Modal */}
      {selectedTable && selectedTable.qrCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Masa {selectedTable.number} QR Kodu</CardTitle>
                  <CardDescription>
                    Müşteriler bu QR kodu tarayarak menüye erişebilir
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTable(null)}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <img 
                    src={selectedTable.qrCode} 
                    alt={`Masa ${selectedTable.number} QR Kodu`}
                    className="mx-auto max-w-full h-auto"
                  />
                </div>
                <div className="text-sm text-gray-600">
                  <p>Menü URL:</p>
                  <p className="font-mono bg-gray-100 p-2 rounded text-xs break-all">
                    {getMenuUrl(selectedTable.number)}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => copyToClipboard(getMenuUrl(selectedTable.number))}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    URL Kopyala
                  </Button>
                  <Button 
                    className="flex-1 bg-orange-600 hover:bg-orange-700"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    QR İndir
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}