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

    const orders = await db.order.findMany({
      where: {
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Orders API error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { tableId, items, customerName, customerPhone, notes } = await request.json()

    if (!tableId || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Masa ve ürünler zorunludur' },
        { status: 400 }
      )
    }

    // Verify table exists
    const table = await db.table.findUnique({
      where: { id: tableId }
    })

    if (!table) {
      return NextResponse.json(
        { error: 'Masa bulunamadı' },
        { status: 404 }
      )
    }

    // Calculate total
    let total = 0
    const orderItems = []

    for (const item of items) {
      const product = await db.product.findUnique({
        where: { id: item.productId }
      })

      if (!product) {
        return NextResponse.json(
          { error: `Ürün bulunamadı: ${item.productId}` },
          { status: 400 }
        )
      }

      const itemTotal = product.price * item.quantity
      total += itemTotal

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price
      })
    }

    // Create order with items
    const order = await db.order.create({
      data: {
        tableId,
        restaurantId: table.restaurantId,
        total,
        status: 'PENDING',
        notes,
        items: {
          create: orderItems
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

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}