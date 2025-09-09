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
  Download, 
  Users, 
  MapPin, 
  Eye,
  Copy,
  ExternalLink
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { QRCodeSVG } from 'qrcode.react'

interface Table {
  id: string
  number: string
  capacity: number
  location?: string
  qrCode: string
  isActive: boolean
  restaurantId: string
}

export default function YonetimTablesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [tables, setTables] = useState<Table[]>([])
  const [loading, setLoading] = useState(true)
  const [isTableDialogOpen, setIsTableDialogOpen] = useState(false)
  const [isQRDialogOpen, setIsQRDialogOpen] = useState(false)
  const [editingTable, setEditingTable] = useState<Table | null>(null)
  const [selectedTable, setSelectedTable] = useState<Table | null>(null)

  // Form state
  const [tableForm, setTableForm] = useState({
    number: '',
    capacity: '',
    location: ''
  })

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      window.location.href = 'https://portal.siparisqr.com/login'
      return
    }

    fetchTables()
  }, [session, status])

  const fetchTables = async () => {
    try {
      const response = await fetch('/api/tables')
      if (response.ok) {
        const data = await response.json()
        setTables(data)
      }
    } catch (error) {
      console.error('Tables fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTableSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingTable ? `/api/tables/${editingTable.id}` : '/api/tables'
      const method = editingTable ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...tableForm,
          capacity: parseInt(tableForm.capacity)
        }),
      })

      if (response.ok) {
        fetchTables()
        setIsTableDialogOpen(false)
        resetTableForm()
      }
    } catch (error) {
      console.error('Table save error:', error)
    }
  }

  const deleteTable = async (tableId: string) => {
    if (!confirm('Bu masayı silmek istediğinizden emin misiniz?')) return
    
    try {
      const response = await fetch(`/api/tables/${tableId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchTables()
      }
    } catch (error) {
      console.error('Table delete error:', error)
    }
  }

  const toggleTableStatus = async (tableId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/tables/${tableId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive }),
      })

      if (response.ok) {
        fetchTables()
      }
    } catch (error) {
      console.error('Table status update error:', error)
    }
  }

  const resetTableForm = () => {
    setTableForm({
      number: '',
      capacity: '',
      location: ''
    })
    setEditingTable(null)
  }

  const openTableDialog = (table?: Table) => {
    if (table) {
      setEditingTable(table)
      setTableForm({
        number: table.number,
        capacity: table.capacity.toString(),
        location: table.location || ''
      })
    } else {
      resetTableForm()
    }
    setIsTableDialogOpen(true)
  }

  const openQRDialog = (table: Table) => {
    setSelectedTable(table)
    setIsQRDialogOpen(true)
  }

  const getMenuUrl = (table: Table) => {
    // Assuming restaurant has a slug - you might need to get this from session or API
    const restaurantSlug = 'demo' // TODO: Get from session when restaurant property is available
    return `https://${restaurantSlug}.siparisqr.com/masa/${table.number}`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You might want to show a toast notification here
  }

  const downloadQR = (table: Table) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const svg = document.querySelector(`#qr-${table.id}`) as any
    
    if (svg && ctx) {
      const svgData = new XMLSerializer().serializeToString(svg)
      const img = new Image()
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        
        const link = document.createElement('a')
        link.download = `masa-${table.number}-qr.png`
        link.href = canvas.toDataURL()
        link.click()
      }
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid gap-4">
            {[...Array(6)].map((_, i) => (
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
          <h1 className="text-3xl font-bold text-gray-900">Masa Yönetimi</h1>
          <p className="text-gray-600">Masalarınızı yönetin ve QR kodlarını oluşturun</p>
        </div>
        <Dialog open={isTableDialogOpen} onOpenChange={setIsTableDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openTableDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Masa Ekle
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Masa</p>
                <p className="text-2xl font-bold">{tables.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aktif Masa</p>
                <p className="text-2xl font-bold">{tables.filter(t => t.isActive).length}</p>
              </div>
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Kapasite</p>
                <p className="text-2xl font-bold">{tables.reduce((sum, t) => sum + t.capacity, 0)}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">QR Kodları</p>
                <p className="text-2xl font-bold">{tables.length}</p>
              </div>
              <QrCode className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tables.map((table) => (
          <Card key={table.id} className={!table.isActive ? 'opacity-60' : ''}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold">Masa {table.number}</h3>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Users className="h-3 w-3 mr-1" />
                    {table.capacity} kişi
                  </div>
                  {table.location && (
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {table.location}
                    </div>
                  )}
                </div>
                <Badge variant={table.isActive ? 'default' : 'secondary'}>
                  {table.isActive ? 'Aktif' : 'Pasif'}
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openQRDialog(table)}
                >
                  <QrCode className="h-3 w-3 mr-1" />
                  QR
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(getMenuUrl(table))}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Link
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(getMenuUrl(table), '_blank')}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Aç
                </Button>
              </div>
              
              <div className="flex justify-between items-center mt-4 pt-3 border-t">
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleTableStatus(table.id, !table.isActive)}
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => openTableDialog(table)}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteTable(table.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table Dialog */}
      <Dialog open={isTableDialogOpen} onOpenChange={setIsTableDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingTable ? 'Masa Düzenle' : 'Yeni Masa Ekle'}</DialogTitle>
            <DialogDescription>
              {editingTable ? 'Masa bilgilerini güncelleyin' : 'Yeni bir masa ekleyin'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleTableSubmit} className="space-y-4">
            <div>
              <Label htmlFor="table-number">Masa Numarası</Label>
              <Input
                id="table-number"
                value={tableForm.number}
                onChange={(e) => setTableForm({...tableForm, number: e.target.value})}
                placeholder="örn: 1, A1, VIP-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="table-capacity">Kapasite (Kişi)</Label>
              <Input
                id="table-capacity"
                type="number"
                min="1"
                value={tableForm.capacity}
                onChange={(e) => setTableForm({...tableForm, capacity: e.target.value})}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="table-location">Konum (Opsiyonel)</Label>
              <Input
                id="table-location"
                value={tableForm.location}
                onChange={(e) => setTableForm({...tableForm, location: e.target.value})}
                placeholder="örn: Pencere kenarı, Balkon, İç salon"
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsTableDialogOpen(false)}>
                İptal
              </Button>
              <Button type="submit">
                {editingTable ? 'Güncelle' : 'Ekle'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* QR Code Dialog */}
      <Dialog open={isQRDialogOpen} onOpenChange={setIsQRDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>QR Kod - Masa {selectedTable?.number}</DialogTitle>
            <DialogDescription>
              Müşteriler bu QR kodu okutarak menüye erişebilir
            </DialogDescription>
          </DialogHeader>
          
          {selectedTable && (
            <div className="space-y-4">
              <div className="flex justify-center p-4 bg-white border rounded">
                <QRCodeSVG
                  id={`qr-${selectedTable.id}`}
                  value={getMenuUrl(selectedTable)}
                  size={200}
                  level="M"
                  includeMargin
                />
              </div>
              
              <div className="space-y-2">
                <Label>Menü URL'si</Label>
                <div className="flex space-x-2">
                  <Input
                    value={getMenuUrl(selectedTable)}
                    readOnly
                    className="text-sm"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(getMenuUrl(selectedTable))}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  className="flex-1"
                  onClick={() => downloadQR(selectedTable)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  QR İndir
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => window.open(getMenuUrl(selectedTable), '_blank')}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Menüyü Aç
                </Button>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setIsQRDialogOpen(false)}>
              Kapat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}