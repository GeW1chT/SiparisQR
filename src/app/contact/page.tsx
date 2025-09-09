import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  QrCode, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageCircle,
  HeadphonesIcon,
  ArrowLeft,
  CheckCircle
} from 'lucide-react'

export default function ContactPage() {
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
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                Hakkımızda
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
            📞 7/24 Destek
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            İletişim
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Sorularınız mı var? Yardıma mı ihtiyacınız var? 
            Uzman ekibimiz size yardımcı olmak için burada!
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Bize Ulaşın</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Size en uygun iletişim yöntemini seçin
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Telefon</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gray-900 mb-2">0850 123 45 67</p>
                <CardDescription className="text-base mb-4">
                  Pazartesi - Pazar<br />
                  09:00 - 22:00
                </CardDescription>
                <Button className="w-full">
                  <Phone className="mr-2 h-4 w-4" />
                  Hemen Ara
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Mail className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>E-posta</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-gray-900 mb-2">destek@siparisqr.com</p>
                <CardDescription className="text-base mb-4">
                  24 saat içinde<br />
                  yanıt garantisi
                </CardDescription>
                <Button className="w-full" variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  E-posta Gönder
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <MessageCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Canlı Destek</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-gray-900 mb-2">Anlık Yardım</p>
                <CardDescription className="text-base mb-4">
                  Pazartesi - Pazar<br />
                  09:00 - 22:00
                </CardDescription>
                <Button className="w-full" variant="secondary">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Sohbet Başlat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mesaj Gönderin</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Formu doldurun, size en kısa sürede dönüş yapalım
            </p>
          </div>

          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Ad Soyad *
                    </label>
                    <Input 
                      id="name" 
                      placeholder="Adınızı ve soyadınızı girin"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-posta *
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="ornek@email.com"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon
                    </label>
                    <Input 
                      id="phone" 
                      placeholder="0532 123 45 67"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label htmlFor="restaurant" className="block text-sm font-medium text-gray-700 mb-2">
                      Restoran Adı
                    </label>
                    <Input 
                      id="restaurant" 
                      placeholder="Restoran adınız (varsa)"
                      className="h-12"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Konu *
                  </label>
                  <select 
                    id="subject" 
                    className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Konu seçin</option>
                    <option value="demo">Demo Talebi</option>
                    <option value="pricing">Fiyatlandırma</option>
                    <option value="technical">Teknik Destek</option>
                    <option value="partnership">İş Ortaklığı</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mesajınız *
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Mesajınızı buraya yazın..."
                    rows={6}
                    className="resize-none"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="privacy" 
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    <Link href="/privacy" className="text-blue-600 hover:underline">
                      Gizlilik Politikası
                    </Link>'nı okudum ve kabul ediyorum.
                  </label>
                </div>

                <Button type="submit" className="w-full h-12 text-lg">
                  <Send className="mr-2 h-5 w-5" />
                  Mesaj Gönder
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Office Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ofis Bilgileri</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Bizi ziyaret etmek isterseniz
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <MapPin className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle className="text-xl">Adres</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Maslak Mahallesi<br />
                  Büyükdere Caddesi No: 123<br />
                  Sarıyer / İstanbul
                </p>
                <Button variant="outline" className="w-full">
                  <MapPin className="mr-2 h-4 w-4" />
                  Haritada Görüntüle
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Clock className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle className="text-xl">Çalışma Saatleri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pazartesi - Cuma</span>
                  <span className="font-semibold">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cumartesi</span>
                  <span className="font-semibold">10:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pazar</span>
                  <span className="font-semibold">Kapalı</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Telefon desteği 7/24 aktif</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sık Sorulan Sorular</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              En çok merak edilen sorular ve cevapları
            </p>
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">SiparişQR nasıl çalışır?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-600">
                  Müşteriler masadaki QR kodu okutarak menünüze erişir, sipariş verir ve ödeme yapar. 
                  Siz de siparişleri anında görüp hazırlamaya başlarsınız.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Kurulum ne kadar sürer?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-600">
                  Kayıt olduktan sonra 24 saat içinde sisteminiz hazır. Menünüzü yükleyip 
                  QR kodlarınızı masalarınıza yerleştirmeniz yeterli.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Aylık ücret var mı?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-600">
                  Evet, farklı paketlerimiz bulunuyor. Temel paket 99₺/ay'dan başlıyor. 
                  İlk ay ücretsiz deneme imkanı sunuyoruz.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Teknik destek alabilir miyim?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-600">
                  Tabii ki! 7/24 telefon ve canlı destek hizmeti veriyoruz. 
                  Ayrıca kurulum ve eğitim desteği de sağlıyoruz.
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