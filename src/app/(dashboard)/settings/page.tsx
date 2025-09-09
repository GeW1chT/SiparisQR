'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  Settings, 
  User, 
  Store, 
  Bell, 
  Shield,
  Save,
  Upload,
  Eye,
  EyeOff
} from 'lucide-react'

interface Restaurant {
  id: string
  name: string
  description?: string
  address?: string
  phone?: string
  email?: string
  logo?: string
  isActive: boolean
}

interface UserProfile {
  id: string
  name: string
  email: string
  role: string
}

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('restaurant')
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
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

    fetchData()
  }, [session, status, router])

  const fetchData = async () => {
    try {
      // Restoran bilgilerini getir
      const restaurantResponse = await fetch('/api/restaurant')
      if (restaurantResponse.ok) {
        const restaurantData = await restaurantResponse.json()
        setRestaurant(restaurantData)
      }

      // Kullanıcı profil bilgilerini getir
      const profileResponse = await fetch('/api/profile')
      if (profileResponse.ok) {
        const profileData = await profileResponse.json()
        setUserProfile(profileData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRestaurantUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!restaurant) return

    setIsSaving(true)
    try {
      const response = await fetch('/api/restaurant', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(restaurant)
      })

      if (response.ok) {
        // Success feedback could be added here
        console.log('Restaurant updated successfully')
      }
    } catch (error) {
      console.error('Error updating restaurant:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userProfile) return

    setIsSaving(true)
    try {
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: userProfile.name,
          email: userProfile.email
        })
      })

      if (response.ok) {
        console.log('Profile updated successfully')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Yeni şifreler eşleşmiyor')
      return
    }

    setIsSaving(true)
    try {
      const response = await fetch('/api/profile/password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      })

      if (response.ok) {
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
        setShowPasswordChange(false)
        console.log('Password updated successfully')
      } else {
        const error = await response.json()
        alert(error.error || 'Şifre güncellenirken hata oluştu')
      }
    } catch (error) {
      console.error('Error updating password:', error)
      alert('Şifre güncellenirken hata oluştu')
    } finally {
      setIsSaving(false)
    }
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
          <h1 className="text-3xl font-bold text-gray-900">Ayarlar</h1>
          <p className="text-gray-600 mt-2">Restoran ve hesap ayarlarınızı yönetin</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('restaurant')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'restaurant'
              ? 'bg-white text-orange-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Store className="h-4 w-4 inline mr-2" />
          Restoran
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'profile'
              ? 'bg-white text-orange-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <User className="h-4 w-4 inline mr-2" />
          Profil
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'security'
              ? 'bg-white text-orange-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Shield className="h-4 w-4 inline mr-2" />
          Güvenlik
        </button>
      </div>

      {/* Restaurant Settings */}
      {activeTab === 'restaurant' && restaurant && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Store className="h-5 w-5" />
              <span>Restoran Bilgileri</span>
              <Badge variant={restaurant.isActive ? "default" : "secondary"}>
                {restaurant.isActive ? "Aktif" : "Pasif"}
              </Badge>
            </CardTitle>
            <CardDescription>
              Restoranınızın genel bilgilerini düzenleyin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRestaurantUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="restaurant-name">Restoran Adı</Label>
                  <Input
                    id="restaurant-name"
                    value={restaurant.name}
                    onChange={(e) => setRestaurant({...restaurant, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="restaurant-phone">Telefon</Label>
                  <Input
                    id="restaurant-phone"
                    value={restaurant.phone || ''}
                    onChange={(e) => setRestaurant({...restaurant, phone: e.target.value})}
                    placeholder="+90 555 123 45 67"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="restaurant-email">E-posta</Label>
                <Input
                  id="restaurant-email"
                  type="email"
                  value={restaurant.email || ''}
                  onChange={(e) => setRestaurant({...restaurant, email: e.target.value})}
                  placeholder="info@restoran.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="restaurant-address">Adres</Label>
                <Textarea
                  id="restaurant-address"
                  value={restaurant.address || ''}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setRestaurant({...restaurant, address: e.target.value})}
                  placeholder="Restoran adresinizi girin"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="restaurant-description">Açıklama</Label>
                <Textarea
                  id="restaurant-description"
                  value={restaurant.description || ''}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setRestaurant({...restaurant, description: e.target.value})}
                  placeholder="Restoranınız hakkında kısa bir açıklama"
                  rows={4}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="restaurant-active"
                  checked={restaurant.isActive}
                  onChange={(e) => setRestaurant({...restaurant, isActive: e.target.checked})}
                />
                <Label htmlFor="restaurant-active">Restoran aktif</Label>
              </div>
              
              <Button 
                type="submit" 
                disabled={isSaving}
                className="bg-orange-600 hover:bg-orange-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Profile Settings */}
      {activeTab === 'profile' && userProfile && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Profil Bilgileri</span>
              <Badge variant="outline">{userProfile.role}</Badge>
            </CardTitle>
            <CardDescription>
              Kişisel bilgilerinizi düzenleyin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="profile-name">Ad Soyad</Label>
                  <Input
                    id="profile-name"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-email">E-posta</Label>
                  <Input
                    id="profile-email"
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                disabled={isSaving}
                className="bg-orange-600 hover:bg-orange-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Kaydediliyor...' : 'Profili Güncelle'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Security Settings */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Güvenlik Ayarları</span>
              </CardTitle>
              <CardDescription>
                Hesap güvenliğinizi yönetin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Şifre Değiştir</h3>
                    <p className="text-sm text-gray-600">Hesap şifrenizi güncelleyin</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowPasswordChange(!showPasswordChange)}
                  >
                    {showPasswordChange ? 'İptal' : 'Değiştir'}
                  </Button>
                </div>
                
                {showPasswordChange && (
                  <Card>
                    <CardContent className="pt-6">
                      <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Mevcut Şifre</Label>
                          <Input
                            id="current-password"
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">Yeni Şifre</Label>
                          <Input
                            id="new-password"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                            required
                            minLength={6}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Yeni Şifre (Tekrar)</Label>
                          <Input
                            id="confirm-password"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                            required
                            minLength={6}
                          />
                        </div>
                        <Button 
                          type="submit" 
                          disabled={isSaving}
                          className="bg-orange-600 hover:bg-orange-700"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          {isSaving ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}