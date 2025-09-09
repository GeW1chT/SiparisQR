'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Star,
  Clock,
  Users
} from 'lucide-react'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image?: string
  category: {
    id: string
    name: string
  }
}

interface Restaurant {
  id: string
  name: string
  address: string
  phone: string
}

interface Table {
  id: string
  number: number
  restaurant: Restaurant
}

interface CartItem {
  product: Product
  quantity: number
}

export default function MenuPage() {
  const params = useParams()
  const tableSlug = params.slug as string
  
  const [table, setTable] = useState<Table | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<{id: string, name: string}[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchMenuData()
  }, [tableSlug])

  const fetchMenuData = async () => {
    try {
      const response = await fetch(`/api/menu/${tableSlug}`)
      if (response.ok) {
        const data = await response.json()
        setTable(data.table)
        setProducts(data.products)
        setCategories(data.categories)
      } else {
        setError('Menü bulunamadı')
      }
    } catch (error) {
      setError('Bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.product.id === product.id)
      if (existingItem) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.product.id === productId)
      if (existingItem && existingItem.quantity > 1) {
        return prev.map(item => 
          item.product.id === productId 
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      }
      return prev.filter(item => item.product.id !== productId)
    })
  }

  const getCartItemQuantity = (productId: string) => {
    const item = cart.find(item => item.product.id === productId)
    return item ? item.quantity : 0
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  }

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category.id === selectedCategory)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (error || !table) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Hata</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center">{error || 'Masa bulunamadı'}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{table.restaurant.name}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>Masa {table.number}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>Açık: 09:00 - 23:00</span>
                </div>
              </div>
            </div>
            {cart.length > 0 && (
              <div className="relative">
                <Button className="flex items-center space-x-2">
                  <ShoppingCart className="h-4 w-4" />
                  <span>₺{getTotalPrice().toFixed(2)}</span>
                </Button>
                <Badge className="absolute -top-2 -right-2 bg-red-500">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Categories */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
            className="whitespace-nowrap"
          >
            Tümü
          </Button>
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              className="whitespace-nowrap"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
          {filteredProducts.map(product => {
            const quantity = getCartItemQuantity(product.id)
            return (
              <Card key={product.id} className="overflow-hidden">
                <div className="flex">
                  {product.image && (
                    <div className="w-24 h-24 relative flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                        <p className="text-lg font-bold text-orange-600">₺{product.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{product.category.name}</Badge>
                      <div className="flex items-center space-x-2">
                        {quantity > 0 && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeFromCart(product.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        )}
                        {quantity > 0 && (
                          <span className="w-8 text-center font-semibold">{quantity}</span>
                        )}
                        <Button
                          size="sm"
                          onClick={() => addToCart(product)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Cart Summary - Fixed Bottom */}
        {cart.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-600">
                    {cart.reduce((total, item) => total + item.quantity, 0)} ürün
                  </p>
                  <p className="text-xl font-bold">Toplam: ₺{getTotalPrice().toFixed(2)}</p>
                </div>
                <Button size="lg" className="px-8">
                  Sipariş Ver
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}