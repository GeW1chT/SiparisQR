import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  QrCode, 
  Smartphone, 
  TrendingUp, 
  Users, 
  Clock, 
  Star,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Zap,
  Shield,
  BarChart3,
  Headphones,
  Globe,
  Palette,
  CreditCard,
  Check
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <QrCode className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900">SiparişQR</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Özellikler
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                Fiyatlar
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                Hakkımızda
              </Link>
              <Link href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                İletişim
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              {/* Portal butonları kaldırıldı - portal ve yönetim sayfaları bu işlevleri görecek */}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
            🚀 Türkiye'nin En Gelişmiş QR Menü Sistemi
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            QR Kod ile 
            <span className="text-blue-600">Dijital Menü</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Restoranınız için modern, temassız menü deneyimi. QR kod okutun, sipariş alın, 
            işletmenizi dijitalleştirin. Kurulum sadece 5 dakika!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {/* Portal butonları kaldırıldı - portal ve yönetim sayfaları bu işlevleri görecek */}
            <Button size="lg" variant="outline" className="text-lg px-8 py-4">
              <Globe className="mr-2 h-5 w-5" />
              Demo Görün
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              <span>500+ Mutlu Restoran</span>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-500" />
              <span>4.9/5 Müşteri Memnuniyeti</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              <span>%99.9 Uptime Garantisi</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Neden SiparişQR?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Restoran işletmeciliğini kolaylaştıran, modern ve güvenilir özellikler
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">QR Kod Menü</CardTitle>
                <CardDescription className="text-gray-600">
                  Müşteriler QR kodu okutarak anında menüye erişir. Temassız, hijyenik, modern.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Anlık Sipariş</CardTitle>
                <CardDescription className="text-gray-600">
                  Siparişler anında mutfağa ve kasaya iletilir. Bekleme süresi minimum.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Mobil Uyumlu</CardTitle>
                <CardDescription className="text-gray-600">
                  Tüm cihazlarda mükemmel görünüm. iPhone, Android, tablet - hepsinde çalışır.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Masa Yönetimi</CardTitle>
                <CardDescription className="text-gray-600">
                  Her masa için ayrı QR kod ve sipariş takibi. Karışıklık yok, düzen var.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-xl">5 Dakika Kurulum</CardTitle>
                <CardDescription className="text-gray-600">
                  Kayıt ol, menünü ekle, QR kodunu bas. Bu kadar basit!
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle className="text-xl">Detaylı Raporlar</CardTitle>
                <CardDescription className="text-gray-600">
                  Satış analizleri, popüler ürünler, gelir raporları. Veriye dayalı kararlar.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Nasıl Çalışır?</h2>
            <p className="text-muted-foreground text-lg">
              3 basit adımda siparişlerinizi dijitalleştirin
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">QR Kod Tarama</h3>
              <p className="text-muted-foreground">
                Müşteri masadaki QR kodu tarar, menüye anında erişir
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Sipariş Verme</h3>
              <p className="text-muted-foreground">
                İstediği ürünleri seçer, sepete ekler ve siparişini tamamlar
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Mutfağa İletim</h3>
              <p className="text-muted-foreground">
                Sipariş anında mutfak paneline düşer, hazırlık başlar
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Basit ve Şeffaf Fiyatlandırma</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Gizli ücret yok, kurulum ücreti yok. Sadece kullandığın kadar öde.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <Card className="border-2 border-gray-200 hover:border-blue-300 transition-colors">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-2">Başlangıç</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mb-2">₺99</div>
                <p className="text-gray-600">/ ay</p>
                <CardDescription className="mt-4">
                  Küçük kafeler ve restoranlar için
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>5 masaya kadar</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>100 ürün</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>QR kod menü</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Temel raporlar</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Email destek</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Başla
                </Button>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="border-2 border-blue-500 relative hover:border-blue-600 transition-colors">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white px-3 py-1">En Popüler</Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-2">Profesyonel</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mb-2">₺199</div>
                <p className="text-gray-600">/ ay</p>
                <CardDescription className="mt-4">
                  Orta ölçekli işletmeler için
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>20 masaya kadar</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Sınırsız ürün</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Özel domain</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Detaylı raporlar</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Öncelikli destek</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Entegrasyon API</span>
                  </li>
                </ul>
                <Button className="w-full mt-6">
                  Başla
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-2 border-gray-200 hover:border-purple-300 transition-colors">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-2">Kurumsal</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mb-2">₺399</div>
                <p className="text-gray-600">/ ay</p>
                <CardDescription className="mt-4">
                  Büyük zincir restoranlar için
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Sınırsız masa</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Çoklu şube</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Özel tasarım</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Gelişmiş analitik</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>7/24 destek</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Özel entegrasyonlar</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  İletişime Geç
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Profesyonel restoran yönetim sistemi</p>
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Kurulum ücreti yok</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>İstediğin zaman iptal et</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Gizli ücret yok</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Profesyonel QR Sipariş Sistemi</h2>
          <p className="text-xl mb-8 opacity-90">
            Restoranınız için modern dijital menü çözümü
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <QrCode className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">SiparişQR</span>
              </div>
              <p className="text-muted-foreground">
                Türkiye'nin en hızlı QR sipariş sistemi
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Ürün</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/features">Özellikler</Link></li>
                <li><Link href="/pricing">Fiyatlandırma</Link></li>
                <li><Link href="/demo">Demo</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Destek</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/help">Yardım Merkezi</Link></li>
                <li><Link href="/contact">İletişim</Link></li>
                <li><Link href="/docs">Dokümantasyon</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Şirket</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/about">Hakkımızda</Link></li>
                <li><Link href="/privacy">Gizlilik</Link></li>
                <li><Link href="/terms">Şartlar</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 SiparişQR. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}