'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft,
  Star, 
  Clock, 
  ChefHat,
  Leaf,
  Flame,
  Search,
  Filter
} from 'lucide-react';
import { useParams } from 'next/navigation';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  categoryId: number;
  image?: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isPopular?: boolean;
  preparationTime?: number;
  ingredients?: string[];
  allergens?: string[];
}

// Mock detailed menu data with categories
const mockCategoryData: { [key: string]: { [categoryId: string]: { name: string; description: string; items: MenuItem[] } } } = {
  'kahveduragi': {
    '1': {
      name: 'Sıcak İçecekler',
      description: 'Taze çekilmiş kahveler ve sıcak içecekler',
      items: [
        {
          id: 1,
          name: 'Americano',
          description: 'Taze çekilmiş espresso ile hazırlanan klasik Americano',
          price: 25,
          category: 'Sıcak İçecekler',
          categoryId: 1,
          isPopular: true,
          preparationTime: 3,
          ingredients: ['Espresso', 'Sıcak Su']
        },
        {
          id: 2,
          name: 'Cappuccino',
          description: 'Kremalı süt köpüğü ile servis edilen İtalyan klasiği',
          price: 30,
          category: 'Sıcak İçecekler',
          categoryId: 1,
          preparationTime: 4,
          ingredients: ['Espresso', 'Süt', 'Süt Köpüğü']
        },
        {
          id: 3,
          name: 'Latte',
          description: 'Yumuşak süt ve espresso karışımı',
          price: 32,
          category: 'Sıcak İçecekler',
          categoryId: 1,
          preparationTime: 4,
          ingredients: ['Espresso', 'Süt']
        },
        {
          id: 4,
          name: 'Mocha',
          description: 'Çikolata ve espresso karışımı, krema ile',
          price: 35,
          category: 'Sıcak İçecekler',
          categoryId: 1,
          preparationTime: 5,
          ingredients: ['Espresso', 'Çikolata Sosu', 'Süt', 'Krema']
        },
        {
          id: 5,
          name: 'Turkish Coffee',
          description: 'Geleneksel Türk kahvesi, şekerli/şekersiz',
          price: 20,
          category: 'Sıcak İçecekler',
          categoryId: 1,
          preparationTime: 8,
          ingredients: ['Türk Kahvesi', 'Su', 'Şeker (İsteğe Bağlı)']
        },
        {
          id: 6,
          name: 'Hot Chocolate',
          description: 'Sıcak çikolata, marshmallow ile',
          price: 28,
          category: 'Sıcak İçecekler',
          categoryId: 1,
          preparationTime: 4,
          ingredients: ['Çikolata', 'Süt', 'Marshmallow']
        }
      ]
    },
    '2': {
      name: 'Soğuk İçecekler',
      description: 'Buzlu kahveler ve serinletici içecekler',
      items: [
        {
          id: 7,
          name: 'Iced Latte',
          description: 'Buzlu süt ve espresso karışımı',
          price: 35,
          category: 'Soğuk İçecekler',
          categoryId: 2,
          preparationTime: 3,
          ingredients: ['Espresso', 'Soğuk Süt', 'Buz']
        },
        {
          id: 8,
          name: 'Frappuccino',
          description: 'Blended buzlu kahve, krema ile',
          price: 40,
          category: 'Soğuk İçecekler',
          categoryId: 2,
          isPopular: true,
          preparationTime: 4,
          ingredients: ['Espresso', 'Süt', 'Buz', 'Şeker', 'Krema']
        },
        {
          id: 9,
          name: 'Cold Brew',
          description: 'Soğuk demleme kahve, 12 saat demlenmiş',
          price: 38,
          category: 'Soğuk İçecekler',
          categoryId: 2,
          preparationTime: 2,
          ingredients: ['Cold Brew Kahve', 'Buz']
        },
        {
          id: 10,
          name: 'Limonata',
          description: 'Taze sıkılmış limon, nane ile',
          price: 25,
          category: 'Soğuk İçecekler',
          categoryId: 2,
          isVegetarian: true,
          preparationTime: 3,
          ingredients: ['Limon', 'Su', 'Şeker', 'Nane', 'Buz']
        }
      ]
    }
  },
  'burgerhouse': {
    '1': {
      name: 'Hamburgerler',
      description: 'Özel soslarla hazırlanmış hamburgerler',
      items: [
        {
          id: 1,
          name: 'Classic Burger',
          description: '200gr dana eti, marul, domates, soğan, turşu',
          price: 65,
          category: 'Hamburgerler',
          categoryId: 1,
          isPopular: true,
          preparationTime: 12,
          ingredients: ['Dana Eti', 'Hamburger Ekmeği', 'Marul', 'Domates', 'Soğan', 'Turşu', 'Özel Sos']
        },
        {
          id: 2,
          name: 'Cheeseburger',
          description: '200gr dana eti, cheddar peyniri, marul, domates',
          price: 70,
          category: 'Hamburgerler',
          categoryId: 1,
          preparationTime: 12,
          ingredients: ['Dana Eti', 'Cheddar Peyniri', 'Hamburger Ekmeği', 'Marul', 'Domates', 'Özel Sos']
        },
        {
          id: 3,
          name: 'Spicy Chicken Burger',
          description: 'Baharatlı tavuk göğsü, acı sos, marul',
          price: 60,
          category: 'Hamburgerler',
          categoryId: 1,
          isSpicy: true,
          preparationTime: 10,
          ingredients: ['Tavuk Göğsü', 'Baharatlar', 'Acı Sos', 'Marul', 'Hamburger Ekmeği']
        },
        {
          id: 4,
          name: 'Veggie Burger',
          description: 'Sebze köftesi, avokado, marul, domates',
          price: 55,
          category: 'Hamburgerler',
          categoryId: 1,
          isVegetarian: true,
          preparationTime: 8,
          ingredients: ['Sebze Köftesi', 'Avokado', 'Marul', 'Domates', 'Hamburger Ekmeği']
        },
        {
          id: 5,
          name: 'BBQ Burger',
          description: '200gr dana eti, BBQ sos, soğan halkası, bacon',
          price: 75,
          category: 'Hamburgerler',
          categoryId: 1,
          preparationTime: 14,
          ingredients: ['Dana Eti', 'BBQ Sos', 'Soğan Halkası', 'Bacon', 'Hamburger Ekmeği']
        }
      ]
    }
  },
  'tatlidukkani': {
    '1': {
      name: 'Geleneksel Tatlılar',
      description: 'Baklava, künefe ve şerbetli tatlılar',
      items: [
        {
          id: 1,
          name: 'Baklava',
          description: 'Antep fıstıklı geleneksel baklava (6 adet)',
          price: 80,
          category: 'Geleneksel Tatlılar',
          categoryId: 1,
          isPopular: true,
          preparationTime: 3,
          ingredients: ['Yufka', 'Antep Fıstığı', 'Tereyağı', 'Şerbet']
        },
        {
          id: 2,
          name: 'Künefe',
          description: 'Sıcak künefe, dondurma ile servis',
          price: 65,
          category: 'Geleneksel Tatlılar',
          categoryId: 1,
          preparationTime: 8,
          ingredients: ['Kadayıf', 'Peynir', 'Şerbet', 'Dondurma']
        },
        {
          id: 3,
          name: 'Şekerpare',
          description: 'Geleneksel şekerpare (4 adet)',
          price: 45,
          category: 'Geleneksel Tatlılar',
          categoryId: 1,
          preparationTime: 2,
          ingredients: ['Un', 'Tereyağı', 'Şeker', 'Şerbet', 'Badem']
        },
        {
          id: 4,
          name: 'Revani',
          description: 'Hindistan cevizli revani',
          price: 40,
          category: 'Geleneksel Tatlılar',
          categoryId: 1,
          preparationTime: 3,
          ingredients: ['İrmik', 'Hindistan Cevizi', 'Şerbet', 'Yumurta']
        }
      ]
    }
  }
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const categoryId = params.id as string;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'time'>('name');
  
  const categoryData = mockCategoryData[slug]?.[categoryId];
  
  if (!categoryData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Kategori Bulunamadı</h2>
        <p className="text-gray-600 mb-6">Aradığınız kategori mevcut değil.</p>
        <Link href={`/${slug}`}>
          <Button>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Ana Sayfaya Dön
          </Button>
        </Link>
      </div>
    );
  }
  
  const filteredItems = categoryData.items
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'time':
          return (a.preparationTime || 0) - (b.preparationTime || 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href={`/${slug}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{categoryData.name}</h1>
          <p className="text-gray-600">{categoryData.description}</p>
        </div>
      </div>

      {/* Search and Sort */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Ürün ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'time')}
                className="border rounded-md px-3 py-2 text-sm"
              >
                <option value="name">İsme Göre</option>
                <option value="price">Fiyata Göre</option>
                <option value="time">Hazırlık Süresine Göre</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {filteredItems.length} ürün bulundu
        </p>
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <Leaf className="h-3 w-3 text-green-500" />
          <span>Vejetaryen</span>
          <Flame className="h-3 w-3 text-red-500" />
          <span>Acılı</span>
          <Star className="h-3 w-3 text-yellow-500" />
          <span>Popüler</span>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredItems.map(item => (
          <Card key={item.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    {item.isPopular && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        <Star className="h-3 w-3 mr-1" />
                        Popüler
                      </Badge>
                    )}
                    {item.isVegetarian && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <Leaf className="h-3 w-3 mr-1" />
                        Vejetaryen
                      </Badge>
                    )}
                    {item.isSpicy && (
                      <Badge variant="secondary" className="bg-red-100 text-red-800">
                        <Flame className="h-3 w-3 mr-1" />
                        Acılı
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3">{item.description}</p>
                  
                  {/* Ingredients */}
                  {item.ingredients && (
                    <div className="mb-3">
                      <p className="text-xs font-medium text-gray-700 mb-1">İçindekiler:</p>
                      <p className="text-xs text-gray-600">{item.ingredients.join(', ')}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <ChefHat className="h-3 w-3 mr-1" />
                      <span>{item.preparationTime} dk</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Hazırlık süresi</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right ml-4">
                  <div className="text-2xl font-bold text-gray-900 mb-3">₺{item.price}</div>
                  <Link href={`/${slug}/masa/1`}>
                    <Button size="sm" className="w-full">
                      Sipariş Ver
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Ürün Bulunamadı</h3>
          <p className="text-gray-600">Arama kriterlerinize uygun ürün bulunamadı.</p>
        </div>
      )}

      {/* Quick Order CTA */}
      <Card className="border-0 shadow-lg bg-blue-50">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Hızlı Sipariş
          </h3>
          <p className="text-gray-600 mb-4">
            Masa numaranızı seçerek direkt sipariş verebilirsiniz
          </p>
          <Link href={`/${slug}/masa/1`}>
            <Button>
              Masa Seç ve Sipariş Ver
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}