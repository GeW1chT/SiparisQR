import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  QrCode, 
  Check,
  X,
  Star,
  Users,
  Shield,
  Headphones,
  Zap,
  BarChart3,
  Globe,
  CreditCard,
  ArrowRight
} from 'lucide-react'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <QrCode className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900">SiparişQR</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Özellikler
              </Link>
              <Link href="/fiyatlandirma" className="text-blue-600 font-medium">
                Fiyatlar
              </Link>
              <Link href="/hakkimizda" className="text-gray-600 hover:text-gray-900 transition-colors">
                Hakkımızda
              </Link>
              <Link href="/iletisim" className="text-gray-600 hover:text-gray-900 transition-colors">
                İletişim
              </Link>
            </nav>
            <Button asChild>
              <Link href="/portal/register">Ücretsiz Başla</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
            💰 Şeffaf ve Adil Fiyatlandırma
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Rakiplerinizden 
            <span className="text-blue-600">%50 Daha Ucuz</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Gizli ücret yok, kurulum ücreti yok, sözleşme yok. Sadece kullandığın kadar öde.
            İstediğin zaman iptal et, para iade garantisi.
          </p>
          
          {/* Value Proposition */}
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">İlk Ay Tamamen ÜCRETSİZ! 🎉</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-gray-500 line-through">Setup: ₺500</div>
                <div className="text-green-600 font-bold">ÜCRETSİZ</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-500 line-through">Eğitim: ₺300</div>
                <div className="text-green-600 font-bold">ÜCRETSİZ</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-500 line-through">İlk Ay: ₺199</div>
                <div className="text-green-600 font-bold">ÜCRETSİZ</div>
              </div>
            </div>
            <div className="border-t mt-4 pt-4">
              <div className="text-2xl font-bold text-gray-900">Toplam Tasarruf: ₺999</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Size Uygun Planı Seçin</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Her işletme büyüklüğü için özel olarak tasarlanmış planlar
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <Card className="border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl mb-2">Başlangıç</CardTitle>
                <div className="text-5xl font-bold text-gray-900 mb-2">₺99</div>
                <p className="text-gray-600 mb-4">/ ay</p>
                <CardDescription className="text-lg">
                  Küçük kafeler ve restoranlar için mükemmel
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span><strong>5 masaya kadar</strong> QR kod</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span><strong>100 ürün</strong> menüde</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Mobil uyumlu <strong>QR menü</strong></span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Temel <strong>satış raporları</strong></span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span><strong>Email destek</strong> (24 saat)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Ücretsiz <strong>kurulum</strong></span>
                  </li>
                </ul>
                <Button className="w-full text-lg py-6" variant="outline" asChild>
                  <Link href="/portal/register?plan=starter">
                    30 Gün Ücretsiz Başla
                  </Link>
                </Button>
                <p className="text-center text-sm text-gray-500 mt-3">
                  Kredi kartı gerekmez
                </p>
              </CardContent>
            </Card>

            {/* Professional Plan - Most Popular */}
            <Card className="border-2 border-blue-500 relative hover:border-blue-600 transition-all duration-300 hover:shadow-2xl scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white px-4 py-2 text-sm font-semibold">
                  🔥 EN POPÜLER
                </Badge>
              </div>
              <CardHeader className="text-center pb-8 pt-8">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-2">Profesyonel</CardTitle>
                <div className="text-5xl font-bold text-gray-900 mb-2">₺199</div>
                <p className="text-gray-600 mb-4">/ ay</p>
                <CardDescription className="text-lg">
                  Orta ölçekli işletmeler için ideal çözüm
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span><strong>20 masaya kadar</strong> QR kod</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span><strong>Sınırsız ürün</strong> menüde</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span><strong>Özel domain</strong> (ornek.siparisqr.com)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span><strong>Detaylı raporlar</strong> ve analitik</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span><strong>Öncelikli destek</strong> (2 saat)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span><strong>API entegrasyonu</strong></span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span><strong>Özel tasarım</strong> seçenekleri</span>
                  </li>
                </ul>
                <Button className="w-full text-lg py-6" asChild>
                  <Link href="/portal/register?plan=professional">
                    30 Gün Ücretsiz Başla
                  </Link>
                </Button>
                <p className="text-center text-sm text-gray-500 mt-3">
                  En çok tercih edilen plan
                </p>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-2 border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl mb-2">Kurumsal</CardTitle>
                <div className="text-5xl font-bold text-gray-900 mb-2">₺399</div>
                <p className="text-gray-600 mb-4">/ ay</p>
                <CardDescription className="text-lg">
                  Büyük zincir restoranlar için
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span><strong>Sınırsız masa</strong> ve QR kod</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span><strong>Çoklu şube</strong> yönetimi</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span><strong>Tamamen özel tasarım</strong></span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span><strong>Gelişmiş analitik</strong> ve BI</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span><strong>7/24 telefon desteği</strong></span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span><strong>Özel entegrasyonlar</strong></span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span><strong>Özel hesap yöneticisi</strong></span>
                  </li>
                </ul>
                <Button className="w-full text-lg py-6" variant="outline" asChild>
                  <Link href="/iletisim?plan=enterprise">
                    İletişime Geç
                  </Link>
                </Button>
                <p className="text-center text-sm text-gray-500 mt-3">
                  Özel fiyat teklifi
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Trust Indicators */}
          <div className="text-center mt-16">
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600 mb-8">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Kurulum ücreti yok</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>İstediğin zaman iptal et</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Gizli ücret yok</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>30 gün para iade garantisi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Detaylı Özellik Karşılaştırması</h2>
            <p className="text-xl text-gray-600">
              Hangi planın size uygun olduğunu görün
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Özellikler</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Başlangıç</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600 bg-blue-50">Profesyonel</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Kurumsal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Masa Sayısı</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">5 masa</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600 bg-blue-50">20 masa</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Sınırsız</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Ürün Sayısı</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">100 ürün</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600 bg-blue-50">Sınırsız</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Sınırsız</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">QR Kod Menü</td>
                    <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center bg-blue-50"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Mobil Uyumluluk</td>
                    <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center bg-blue-50"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Özel Domain</td>
                    <td className="px-6 py-4 text-center"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center bg-blue-50"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Detaylı Raporlar</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Temel</td>
                    <td className="px-6 py-4 text-center bg-blue-50"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">API Entegrasyonu</td>
                    <td className="px-6 py-4 text-center"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center bg-blue-50"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Çoklu Şube</td>
                    <td className="px-6 py-4 text-center"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center bg-blue-50"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Destek</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Email (24h)</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600 bg-blue-50">Öncelikli (2h)</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">7/24 Telefon</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sıkça Sorulan Sorular</h2>
            <p className="text-xl text-gray-600">
              Fiyatlandırma ile ilgili merak ettikleriniz
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Gerçekten kurulum ücreti yok mu?</h3>
              <p className="text-gray-600">
                Evet! Hiçbir kurulum, aktivasyon veya başlangıç ücreti almıyoruz. Sadece aylık abonelik ücretinizi ödüyorsunuz. 
                Üstelik ilk 30 gün tamamen ücretsiz deneyebilirsiniz.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">İstediğim zaman iptal edebilir miyim?</h3>
              <p className="text-gray-600">
                Tabii ki! Hiçbir sözleşme yok, istediğiniz zaman iptal edebilirsiniz. İptal ettiğinizde bir sonraki 
                faturalama döneminde hizmet durdurulur. Mevcut dönem sonuna kadar kullanmaya devam edebilirsiniz.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Para iade garantisi nasıl çalışır?</h3>
              <p className="text-gray-600">
                İlk 30 gün içinde memnun kalmazsanız, hiçbir soru sormadan paranızı iade ediyoruz. 
                Sadece destek ekibimizle iletişime geçmeniz yeterli.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Plan değişikliği yapabilir miyim?</h3>
              <p className="text-gray-600">
                Evet! İstediğiniz zaman planınızı yükseltebilir veya düşürebilirsiniz. Plan yükseltmeleri anında aktif olur, 
                plan düşürmeleri ise bir sonraki faturalama döneminde geçerli olur.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Hangi ödeme yöntemlerini kabul ediyorsunuz?</h3>
              <p className="text-gray-600">
                Kredi kartı, banka kartı ve havale ile ödeme alabiliyoruz. Tüm ödemeler SSL ile güvence altında. 
                Kart bilgileriniz bizde saklanmaz.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Rakiplerinizden farkınız nedir?</h3>
              <p className="text-gray-600">
                Rakiplerimiz genellikle ₺300-500/ay arası ücret alırken, biz ₺99'dan başlıyoruz. Ayrıca kurulum ücreti, 
                eğitim ücreti gibi gizli maliyetler yok. 5 dakikada kurulum, Türkçe destek ve yerel ödeme seçenekleri sunuyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Hemen Başlayın, İlk 30 Gün Ücretsiz! 🚀
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Kredi kartı gerekmez. 5 dakikada kurulum. İstediğiniz zaman iptal edin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4" asChild>
              <Link href="/portal/register">
                <Zap className="mr-2 h-5 w-5" />
                Ücretsiz Başla
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <Link href="/iletisim">
                <Headphones className="mr-2 h-5 w-5" />
                Destek Al
              </Link>
            </Button>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm opacity-75">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span>500+ Mutlu Müşteri</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-2" />
              <span>4.9/5 Memnuniyet</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              <span>SSL Güvenlik</span>
            </div>
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
                <li><Link href="/#features" className="hover:text-gray-900">Özellikler</Link></li>
                <li><Link href="/fiyatlandirma" className="hover:text-gray-900">Fiyatlandırma</Link></li>
                <li><Link href="/demo" className="hover:text-gray-900">Demo</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Destek</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/yardim" className="hover:text-gray-900">Yardım Merkezi</Link></li>
                <li><Link href="/iletisim" className="hover:text-gray-900">İletişim</Link></li>
                <li><Link href="/dokuman" className="hover:text-gray-900">Dokümantasyon</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Şirket</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/hakkimizda" className="hover:text-gray-900">Hakkımızda</Link></li>
                <li><Link href="/gizlilik" className="hover:text-gray-900">Gizlilik</Link></li>
                <li><Link href="/sartlar" className="hover:text-gray-900">Şartlar</Link></li>
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