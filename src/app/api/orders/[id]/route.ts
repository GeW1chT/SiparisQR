import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { db } from '@/lib/db'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 401 }
      )
    }

    const { id } = params
    const { status } = await request.json()

    if (!status) {
      return NextResponse.json(
        { error: 'Durum bilgisi zorunludur' },
        { status: 400 }
      )
    }

    const validStatuses = ['PENDING', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Geçersiz durum' },
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

    // Verify order belongs to user's restaurant
    const existingOrder = await db.order.findFirst({
      where: {
        id,
        table: {
          restaurantId: user.restaurant.id
        }
      }
    })

    if (!existingOrder) {
      return NextResponse.json(
        { error: 'Sipariş bulunamadı' },
        { status: 404 }
      )
    }

    // Update order status
    const updatedOrder = await db.order.update({
      where: { id },
      data: { 
        status,
        updatedAt: new Date()
      },
      include: {
        table: {
          select: {
            id: true,
            number: true
          }
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json(updatedOrder)
  } catch (error) {
    console.error('Update order error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 401 }
      )
    }

    const { id } = params

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

    const order = await db.order.findFirst({
      where: {
        id,
        table: {
          restaurantId: user.restaurant.id
        }
      },
      include: {
        table: {
          select: {
            id: true,
            number: true
          }
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true
              }
            }
          }
        }
      }
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Sipariş bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('Get order error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}