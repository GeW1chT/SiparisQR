import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 401 }
      )
    }

    // Get user's restaurant
    const user = await db.user.findUnique({
      where: { email: session.user.email! },
      include: { restaurant: true }
    })

    if (!user || !user.restaurant) {
      return NextResponse.json(
        { error: 'Restoran bulunamadı' },
        { status: 404 }
      )
    }

    const products = await db.product.findMany({
      where: {
        category: {
          restaurantId: user.restaurant.id
        }
      },
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 401 }
      )
    }

    const { name, description, price, categoryId, image, available = true } = await request.json()

    if (!name || !description || !price || !categoryId) {
      return NextResponse.json(
        { error: 'Tüm alanlar zorunludur' },
        { status: 400 }
      )
    }

    if (price <= 0) {
      return NextResponse.json(
        { error: 'Fiyat 0\'dan büyük olmalıdır' },
        { status: 400 }
      )
    }

    // Get user's restaurant
    const user = await db.user.findUnique({
      where: { email: session.user.email! },
      include: { restaurant: true }
    })

    if (!user || !user.restaurant) {
      return NextResponse.json(
        { error: 'Restoran bulunamadı' },
        { status: 404 }
      )
    }

    // Verify category belongs to user's restaurant
    const category = await db.category.findFirst({
      where: {
        id: categoryId,
        restaurantId: user.restaurant.id
      }
    })

    if (!category) {
      return NextResponse.json(
        { error: 'Geçersiz kategori' },
        { status: 400 }
      )
    }

    const product = await db.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        image,
        isAvailable: available,
        categoryId
      },
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Create product error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}