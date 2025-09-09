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

    const categories = await db.category.findMany({
      where: {
        restaurantId: user.restaurant.id
      },
      include: {
        _count: {
          select: {
            products: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Categories API error:', error)
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

    const { name, description } = await request.json()

    if (!name) {
      return NextResponse.json(
        { error: 'Kategori adı zorunludur' },
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

    const category = await db.category.create({
      data: {
        name,
        restaurantId: user.restaurant.id
      }
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('Create category error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}