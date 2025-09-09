'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { 
  Save, 
  Upload, 
  Eye, 
  EyeOff, 
  Globe, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Palette, 
  Bell, 
  Shield, 
  CreditCard,
  ExternalLink
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

interface RestaurantSettings {
  id: string
  name: string
  slug: string
  description?: string
  logo?: string
  coverImage?: string
  phone?: string
  email?: string
  address?: string
  website?: string
  openingHours?: string
  isActive: boolean
  allowOnlineOrders: boolean
  requireTableSelection: boolean
  autoAcceptOrders: boolean
  notificationEmail: boolean
  notificationSms: boolean
  theme: string
  primaryColor: string
  currency: string
  language: string
  timezone: string
}

export default function YonetimSettingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [settings, setSettings] = useState<RestaurantSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('general')

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      window.location.href = 'https://portal.siparisqr.com/login'
      return
    }

    fetchSettings()
  }, [session, status])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/restaurant/settings')
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      }
    } catch (error) {
      console.error('Settings fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!settings) return
    
    setSaving(true)
    try {
      const response = await fetch('/api/restaurant/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        // Show success message
        console.log('Settings saved successfully')
      }
    } catch (error) {
      console.error('Settings save error:', error)
    } finally {
      setSaving(false)
    }
  }

  const updateSetting = (key: keyof RestaurantSettings, value: any) => {
    if (!settings) return
    setSettings({ ...settings, [key]: value })
  }

  const getMenuUrl = () => {
    if (!settings?.slug) return ''
    return `https://${settings.slug}.siparisqr.com`
  }

  if (status === 'loading' || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!session || !settings) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ayarlar</h1>
          <p className="text-gray-600">Restoran bilgilerinizi ve tercihlerinizi yönetin</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => window.open(getMenuUrl(), '_blank')}
            disabled={!settings.slug}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Menüyü Görüntüle
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">Genel</TabsTrigger>
          <TabsTrigger value="contact">İletişim</TabsTrigger>
          <TabsTrigger value="orders">Siparişler</TabsTrigger>
          <TabsTrigger value="notifications">Bildirimler</TabsTrigger>
          <TabsTrigger value="appearance">Görünüm</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Restoran Bilgileri</CardTitle>
              <CardDescription>
                Temel restoran bilgilerinizi güncelleyin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Restoran Adı</Label>
                  <Input
                    id="name"
                    value={settings.name}
                    onChange={(e) => updateSetting('name', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="slug">URL Kısa Adı</Label>
                  <div className="flex">
                    <Input
                      id="slug"
                      value={settings.slug}
                      onChange={(e) => updateSetting('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                      className="rounded-r-none"
                    />
                    <div className="bg-gray-100 border border-l-0 rounded-r px-3 py-2 text-sm text-gray-600">
                      .siparisqr.com
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Menü URL'niz: {getMenuUrl()}
                  </p>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Açıklama</Label>
                <Textarea
                  id="description"
                  value={settings.description || ''}
                  onChange={(e) => updateSetting('description', e.target.value)}
                  placeholder="Restoranınız hakkında kısa bir açıklama..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="logo">Logo URL</Label>
                  <Input
                    id="logo"
                    type="url"
                    value={settings.logo || ''}
                    onChange={(e) => updateSetting('logo', e.target.value)}
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                
                <div>
                  <Label htmlFor="coverImage">Kapak Görseli URL</Label>
                  <Input
                    id="coverImage"
                    type="url"
                    value={settings.coverImage || ''}
                    onChange={(e) => updateSetting('coverImage', e.target.value)}
                    placeholder="https://example.com/cover.jpg"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={settings.isActive}
                  onCheckedChange={(checked: boolean) => updateSetting('isActive', checked)}
                />
                <Label htmlFor="isActive">Restoran aktif</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>İletişim Bilgileri</CardTitle>
              <CardDescription>
                Müşterilerinizin size ulaşabileceği bilgileri girin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Telefon</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="phone"
                      value={settings.phone || ''}
                      onChange={(e) => updateSetting('phone', e.target.value)}
                      placeholder="+90 555 123 45 67"
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">E-posta</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      value={settings.email || ''}
                      onChange={(e) => updateSetting('email', e.target.value)}
                      placeholder="info@restoran.com"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">Adres</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                  <Textarea
                    id="address"
                    value={settings.address || ''}
                    onChange={(e) => updateSetting('address', e.target.value)}
                    placeholder="Tam adresinizi girin..."
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="website"
                      type="url"
                      value={settings.website || ''}
                      onChange={(e) => updateSetting('website', e.target.value)}
                      placeholder="https://www.restoran.com"
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="openingHours">Çalışma Saatleri</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="openingHours"
                      value={settings.openingHours || ''}
                      onChange={(e) => updateSetting('openingHours', e.target.value)}
                      placeholder="09:00 - 23:00"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sipariş Ayarları</CardTitle>
              <CardDescription>
                Sipariş alma ve yönetim tercihlerinizi belirleyin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Online Sipariş</Label>
                  <p className="text-sm text-gray-600">
                    Müşteriler online sipariş verebilsin
                  </p>
                </div>
                <Switch
                  checked={settings.allowOnlineOrders}
                  onCheckedChange={(checked: boolean) => updateSetting('allowOnlineOrders', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Masa Seçimi Zorunlu</Label>
                  <p className="text-sm text-gray-600">
                    Sipariş vermek için masa seçimi gerekli olsun
                  </p>
                </div>
                <Switch
                  checked={settings.requireTableSelection}
                  onCheckedChange={(checked: boolean) => updateSetting('requireTableSelection', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Otomatik Sipariş Onayı</Label>
                  <p className="text-sm text-gray-600">
                    Gelen siparişler otomatik olarak onaylansın
                  </p>
                </div>
                <Switch
                  checked={settings.autoAcceptOrders}
                  onCheckedChange={(checked: boolean) => updateSetting('autoAcceptOrders', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bildirim Tercihleri</CardTitle>
              <CardDescription>
                Hangi durumlarda bildirim almak istediğinizi seçin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>E-posta Bildirimleri</Label>
                  <p className="text-sm text-gray-600">
                    Yeni siparişler için e-posta bildirimi al
                  </p>
                </div>
                <Switch
                  checked={settings.notificationEmail}
                  onCheckedChange={(checked: boolean) => updateSetting('notificationEmail', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Bildirimleri</Label>
                  <p className="text-sm text-gray-600">
                    Yeni siparişler için SMS bildirimi al
                  </p>
                </div>
                <Switch
                  checked={settings.notificationSms}
                  onCheckedChange={(checked: boolean) => updateSetting('notificationSms', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Görünüm Ayarları</CardTitle>
              <CardDescription>
                Menü sayfanızın görünümünü özelleştirin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="theme">Tema</Label>
                  <Select value={settings.theme} onValueChange={(value: string) => updateSetting('theme', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Açık</SelectItem>
                      <SelectItem value="dark">Koyu</SelectItem>
                      <SelectItem value="auto">Otomatik</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="primaryColor">Ana Renk</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => updateSetting('primaryColor', e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={settings.primaryColor}
                      onChange={(e) => updateSetting('primaryColor', e.target.value)}
                      placeholder="#000000"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currency">Para Birimi</Label>
                  <Select value={settings.currency} onValueChange={(value: string) => updateSetting('currency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TRY">₺ Türk Lirası</SelectItem>
                      <SelectItem value="USD">$ Amerikan Doları</SelectItem>
                      <SelectItem value="EUR">€ Euro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="language">Dil</Label>
                  <Select value={settings.language} onValueChange={(value: string) => updateSetting('language', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tr">Türkçe</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}