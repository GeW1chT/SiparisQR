import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

interface RestaurantLayoutProps {
  children: React.ReactNode;
  params: { slug: string };
}

// Bu fonksiyon restoranın var olup olmadığını kontrol eder
async function getRestaurant(slug: string) {
  // TODO: Veritabanından restoran bilgilerini çek
  // Şimdilik mock data kullanıyoruz
  const mockRestaurants = {
    'kahveduragi': {
      name: 'Kahve Durağı',
      logo: '/logos/kahveduragi.png',
      theme: 'brown',
      description: 'En taze kahveler ve lezzetli atıştırmalıklar'
    },
    'burgerhouse': {
      name: 'Burger House',
      logo: '/logos/burgerhouse.png', 
      theme: 'red',
      description: 'Ev yapımı hamburgerler ve patates kızartması'
    },
    'tatlidukkani': {
      name: 'Tatlı Dükkanı',
      logo: '/logos/tatlidukkani.png',
      theme: 'pink', 
      description: 'Geleneksel ve modern tatlılar'
    }
  };

  return mockRestaurants[slug as keyof typeof mockRestaurants] || null;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const restaurant = await getRestaurant(params.slug);
  
  if (!restaurant) {
    return {
      title: 'Restoran Bulunamadı | SiparişQR',
      description: 'Aradığınız restoran bulunamadı.'
    };
  }

  return {
    title: `${restaurant.name} - Menü | SiparişQR`,
    description: restaurant.description,
    openGraph: {
      title: `${restaurant.name} - Menü`,
      description: restaurant.description,
      images: [restaurant.logo]
    }
  };
}

export default async function RestaurantLayout({ children, params }: RestaurantLayoutProps) {
  const restaurant = await getRestaurant(params.slug);
  
  if (!restaurant) {
    notFound();
  }

  return (
    <html lang="tr">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {/* Restaurant Header */}
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-4xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-600">
                      {restaurant.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">{restaurant.name}</h1>
                    <p className="text-sm text-gray-600">{restaurant.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Powered by</div>
                  <div className="text-sm font-semibold text-blue-600">SiparişQR</div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-4xl mx-auto px-4 py-6">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t mt-12">
            <div className="max-w-4xl mx-auto px-4 py-6 text-center">
              <p className="text-sm text-gray-600">
                Bu menü <span className="font-semibold text-blue-600">SiparişQR</span> ile oluşturulmuştur.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Restoranınız için QR menü sistemi: siparisqr.com
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}