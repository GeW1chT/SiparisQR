import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  QrCode, 
  Users, 
  Target, 
  Award,
  Heart,
  Zap,
  Shield,
  Globe,
  ArrowLeft
} from 'lucide-react'

export default function AboutPage() {
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
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Ana Sayfa
              </Link>
              <Link href="/#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Özellikler
              </Link>
              <Link href="/#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                Fiyatlar
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                İletişim
              </Link>
            </nav>
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Ana Sayfa
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
            🚀 Türkiye'nin QR Menü Lideri
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Hakkımızda
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            SiparişQR olarak, Türkiye'deki restoranları dijital dönüşümde destekliyoruz. 
            Modern teknoloji ile geleneksel lezzetleri buluşturuyoruz.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-2xl mb-2">Misyonumuz</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center leading-relaxed">
                  Türkiye'deki her restoranın dijital dönüşümünü kolaylaştırmak ve 
                  müşteri deneyimini en üst seviyeye çıkarmak. QR kod teknolojisi ile 
                  temassız, hızlı ve güvenli sipariş deneyimi sunmak.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-2xl mb-2">Vizyonumuz</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center leading-relaxed">
                  Türkiye'nin en güvenilir ve yenilikçi QR menü platformu olmak. 
                  Restoran sahiplerinin işlerini büyütmelerine yardımcı olurken, 
                  müşterilere unutulmaz deneyimler yaşatmak.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Değerlerimiz</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Çalışmalarımızı yönlendiren temel değerlerimiz
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <CardTitle>Müşteri Odaklılık</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Her kararımızda müşterilerimizin ihtiyaçlarını ve memnuniyetini 
                  önceleyerek hareket ediyoruz.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle>İnovasyon</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Sürekli gelişim ve yenilik anlayışıyla sektörde öncü olmaya 
                  devam ediyoruz.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <CardTitle>Güvenilirlik</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Verdiğimiz sözleri tutarak, güvenilir ve istikrarlı hizmet 
                  sunmaya odaklanıyoruz.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Rakamlarla SiparişQR</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Başarımızı gösteren sayılar
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Aktif Restoran</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Aylık Sipariş</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Müşteri Memnuniyeti</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Destek Hizmeti</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ekibimiz</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              SiparişQR'ı hayata geçiren deneyimli ekibimiz
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-blue-600" />
                </div>
                <CardTitle>Teknoloji Ekibi</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Deneyimli yazılım geliştiricileri ve sistem mimarları ile 
                  en güncel teknolojileri kullanıyoruz.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Heart className="h-12 w-12 text-green-600" />
                </div>
                <CardTitle>Müşteri Hizmetleri</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  7/24 müşteri desteği ile her zaman yanınızdayız. 
                  Sorularınızı hızlıca çözüme kavuşturuyoruz.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Globe className="h-12 w-12 text-purple-600" />
                </div>
                <CardTitle>Pazarlama Ekibi</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Restoran sahiplerinin dijital dönüşüm yolculuğunda 
                  rehberlik eden uzman ekibimiz.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <QrCode className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold">SiparişQR</span>
              </div>
              <p className="text-gray-600">
                Türkiye'nin en hızlı QR sipariş sistemi
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Ürün</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/#features">Özellikler</Link></li>
                <li><Link href="/#pricing">Fiyatlandırma</Link></li>
                <li><Link href="/demo">Demo</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Destek</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/help">Yardım Merkezi</Link></li>
                <li><Link href="/contact">İletişim</Link></li>
                <li><Link href="/docs">Dokümantasyon</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Şirket</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/about">Hakkımızda</Link></li>
                <li><Link href="/privacy">Gizlilik</Link></li>
                <li><Link href="/terms">Şartlar</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 SiparişQR. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}