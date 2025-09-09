'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Star, 
  Clock, 
  Users, 
  ChefHat,
  Leaf,
  Flame,
  AlertCircle
} from 'lucide-react';
import { useParams } from 'next/navigation';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isPopular?: boolean;
  preparationTime?: number;
}

interface CartItem extends MenuItem {
  quantity: number;
  notes?: string;
}

// Mock menu data
const mockMenuData: { [key: string]: MenuItem[] } = {
  'kahveduragi': [
    {
      id: 1,
      name: 'Americano',
      description: 'Taze çekilmiş espresso ile hazırlanan klasik Americano',
      price: 25,
      category: 'Sıcak İçecekler',
      isPopular: true,
      preparationTime: 3
    },
    {
      id: 2,
      name: 'Cappuccino',
      description: 'Kremalı süt köpüğü ile servis edilen İtalyan klasiği',
      price: 30,
      category: 'Sıcak İçecekler',
      preparationTime: 4
    },
    {
      id: 3,
      name: 'Iced Latte',
      description: 'Buzlu süt ve espresso karışımı, yaz favorisi',
      price: 35,
      category: 'Soğuk İçecekler',
      preparationTime: 3
    },
    {
      id: 4,
      name: 'Cheesecake',
      description: 'Ev yapımı New York usulü cheesecake',
      price: 45,
      category: 'Tatlılar',
      isPopular: true,
      preparationTime: 2
    },
    {
      id: 5,
      name: 'Club Sandwich',
      description: 'Tavuk, marul, domates ve özel soslu sandwich',
      price: 55,
      category: 'Atıştırmalıklar',
      preparationTime: 8
    }
  ],
  'burgerhouse': [
    {
      id: 1,
      name: 'Classic Burger',
      description: '200gr dana eti, marul, domates, soğan, turşu',
      price: 65,
      category: 'Hamburgerler',
      isPopular: true,
      preparationTime: 12
    },
    {
      id: 2,
      name: 'Spicy Chicken Burger',
      description: 'Baharatlı tavuk göğsü, acı sos, marul',
      price: 60,
      category: 'Hamburgerler',
      isSpicy: true,
      preparationTime: 10
    },
    {
      id: 3,
      name: 'Veggie Burger',
      description: 'Sebze köftesi, avokado, marul, domates',
      price: 55,
      category: 'Hamburgerler',
      isVegetarian: true,
      preparationTime: 8
    },
    {
      id: 4,
      name: 'Patates Kızartması',
      description: 'Çıtır çıtır patates kızartması',
      price: 25,
      category: 'Yan Ürünler',
      isVegetarian: true,
      preparationTime: 5
    }
  ],
  'tatlidukkani': [
    {
      id: 1,
      name: 'Baklava',
      description: 'Antep fıstıklı geleneksel baklava (6 adet)',
      price: 80,
      category: 'Geleneksel Tatlılar',
      isPopular: true,
      preparationTime: 3
    },
    {
      id: 2,
      name: 'Künefe',
      description: 'Sıcak künefe, dondurma ile servis',
      price: 65,
      category: 'Geleneksel Tatlılar',
      preparationTime: 8
    },
    {
      id: 3,
      name: 'Tiramisu',
      description: 'İtalyan usulü tiramisu, özel tarif',
      price: 55,
      category: 'Modern Tatlılar',
      preparationTime: 2
    },
    {
      id: 4,
      name: 'Vanilyalı Dondurma',
      description: 'El yapımı vanilya dondurması (3 top)',
      price: 35,
      category: 'Dondurma',
      isVegetarian: true,
      preparationTime: 1
    }
  ]
};

export default function TableMenuPage() {
  const params = useParams();
  const slug = params.slug as string;
  const tableId = params.id as string;
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const menuItems = mockMenuData[slug] || [];
  const categories = ['all', ...Array.from(new Set(menuItems.map(item => item.category)))];
  
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };
  
  const removeFromCart = (itemId: number) => {
    setCart(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map(cartItem => 
          cartItem.id === itemId 
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      return prev.filter(cartItem => cartItem.id !== itemId);
    });
  };
  
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="space-y-6">
      {/* Table Info */}
      <Card className="border-0 shadow-lg bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Masa {tableId}</h2>
                <p className="text-sm text-gray-600">Sipariş vermeye hazır</p>
              </div>
            </div>
            <div className="text-right">
              <Badge variant="secondary">
                <Clock className="h-3 w-3 mr-1" />
                Açık
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <div className="space-y-4">
        <Input
          placeholder="Menüde ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category === 'all' ? 'Tümü' : category}
            </Button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-4">
        {filteredItems.map(item => {
          const cartItem = cart.find(cartItem => cartItem.id === item.id);
          const quantity = cartItem?.quantity || 0;
          
          return (
            <Card key={item.id} className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
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
                    <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <ChefHat className="h-3 w-3 mr-1" />
                        <span>{item.preparationTime} dk</span>
                      </div>
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                  </div>
                  
                  <div className="text-right ml-4">
                    <div className="text-lg font-bold text-gray-900 mb-2">₺{item.price}</div>
                    
                    {quantity === 0 ? (
                      <Button 
                        size="sm" 
                        onClick={() => addToCart(item)}
                        className="w-20"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Ekle
                      </Button>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{quantity}</span>
                        <Button 
                          size="sm" 
                          onClick={() => addToCart(item)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Cart Summary - Fixed Bottom */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5 text-gray-600" />
                <span className="font-semibold">{getTotalItems()} ürün</span>
              </div>
              <div className="text-xl font-bold">₺{getTotalPrice()}</div>
            </div>
            
            <Button className="w-full" size="lg">
              Siparişi Tamamla
            </Button>
            
            <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
              <AlertCircle className="h-3 w-3 mr-1" />
              <span>Sipariş mutfağa direkt iletilecektir</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Bottom Padding for Fixed Cart */}
      {cart.length > 0 && <div className="h-32"></div>}
    </div>
  );
}