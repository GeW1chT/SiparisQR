import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QrCode, Clock, Users, Star, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';

interface RestaurantPageProps {
  params: { slug: string };
}

// Mock data - gerçek uygulamada veritabanından gelecek
async function getRestaurantData(slug: string) {
  const mockData = {
    'kahveduragi': {
      name: 'Kahve Durağı',
      description: 'En taze kahveler ve lezzetli atıştırmalıklar',
      rating: 4.8,
      reviewCount: 127,
      openHours: '07:00 - 22:00',
      categories: [
        {
          id: 1,
          name: 'Sıcak İçecekler',
          description: 'Taze çekilmiş kahveler ve sıcak içecekler',
          itemCount: 12
        },
        {
          id: 2,
          name: 'Soğuk İçecekler', 
          description: 'Buzlu kahveler ve serinletici içecekler',
          itemCount: 8
        },
        {
          id: 3,
          name: 'Tatlılar',
          description: 'Ev yapımı kekler ve tatlılar',
          itemCount: 6
        },
        {
          id: 4,
          name: 'Atıştırmalıklar',
          description: 'Sandviçler ve hafif yemekler', 
          itemCount: 10
        }
      ],
      tables: Array.from({ length: 12 }, (_, i) => ({ id: i + 1, name: `Masa ${i + 1}` }))
    },
    'burgerhouse': {
      name: 'Burger House',
      description: 'Ev yapımı hamburgerler ve patates kızartması',
      rating: 4.6,
      reviewCount: 89,
      openHours: '11:00 - 23:00',
      categories: [
        {
          id: 1,
          name: 'Hamburgerler',
          description: 'Özel soslarla hazırlanmış hamburgerler',
          itemCount: 15
        },
        {
          id: 2,
          name: 'Yan Ürünler',
          description: 'Patates kızartması ve soğan halkaları',
          itemCount: 8
        },
        {
          id: 3,
          name: 'İçecekler',
          description: 'Soğuk içecekler ve milkshake\'ler',
          itemCount: 12
        },
        {
          id: 4,
          name: 'Tatlılar',
          description: 'Dondurma ve tatlı seçenekleri',
          itemCount: 6
        }
      ],
      tables: Array.from({ length: 20 }, (_, i) => ({ id: i + 1, name: `Masa ${i + 1}` }))
    },
    'tatlidukkani': {
      name: 'Tatlı Dükkanı',
      description: 'Geleneksel ve modern tatlılar',
      rating: 4.9,
      reviewCount: 156,
      openHours: '09:00 - 21:00',
      categories: [
        {
          id: 1,
          name: 'Geleneksel Tatlılar',
          description: 'Baklava, künefe ve şerbetli tatlılar',
          itemCount: 18
        },
        {
          id: 2,
          name: 'Modern Tatlılar',
          description: 'Cheesecake, tiramisu ve özel tarifler',
          itemCount: 12
        },
        {
          id: 3,
          name: 'Dondurma',
          description: 'El yapımı dondurma çeşitleri',
          itemCount: 10
        },
        {
          id: 4,
          name: 'İçecekler',
          description: 'Çay, kahve ve soğuk içecekler',
          itemCount: 8
        }
      ],
      tables: Array.from({ length: 8 }, (_, i) => ({ id: i + 1, name: `Masa ${i + 1}` }))
    }
  };

  return mockData[slug as keyof typeof mockData] || null;
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const restaurant = await getRestaurantData(params.slug);
  
  if (!restaurant) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Restaurant Info */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{restaurant.name}</h2>
              <p className="text-gray-600 mb-3">{restaurant.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="font-medium">{restaurant.rating}</span>
                  <span className="ml-1">({restaurant.reviewCount} değerlendirme)</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{restaurant.openHours}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="mb-2">
                <QrCode className="h-3 w-3 mr-1" />
                QR Menü
              </Badge>
              <div className="text-sm text-gray-500">
                <Users className="h-4 w-4 inline mr-1" />
                {restaurant.tables.length} masa
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Table Access */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Masa Seçimi
          </CardTitle>
          <CardDescription>
            Oturduğunuz masayı seçin ve menüye göz atın
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {restaurant.tables.map((table) => (
              <Link key={table.id} href={`/${params.slug}/masa/${table.id}`}>
                <Button 
                  variant="outline" 
                  className="w-full h-12 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                >
                  {table.name}
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Menu Categories */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Menü Kategorileri</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {restaurant.categories.map((category) => (
            <Link key={category.id} href={`/${params.slug}/kategori/${category.id}`}>
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {category.description}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">{category.itemCount} ürün</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400 mt-2" />
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg bg-blue-50">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Hızlı Sipariş
            </h3>
            <p className="text-gray-600 mb-4">
              Masa numaranızı biliyorsanız direkt sipariş verebilirsiniz
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={`/${params.slug}/masa/1`}>
                <Button className="w-full sm:w-auto">
                  <QrCode className="h-4 w-4 mr-2" />
                  Menüyü Görüntüle
                </Button>
              </Link>
              <Button variant="outline" className="w-full sm:w-auto">
                <Users className="h-4 w-4 mr-2" />
                Masa Rezervasyonu
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}