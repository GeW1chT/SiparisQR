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

    const restaurantId = user.restaurant.id
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    // Get statistics
    const [totalOrders, totalRevenue, activeOrders, totalTables] = await Promise.all([
      // Total orders this month
      db.order.count({
        where: {
          table: {
            restaurantId
          },
          createdAt: {
            gte: startOfMonth
          }
        }
      }),
      
      // Total revenue this month
      db.order.aggregate({
        where: {
          table: {
            restaurantId
          },
          createdAt: {
            gte: startOfMonth
          },
          status: 'COMPLETED'
        },
        _sum: {
          total: true
        }
      }),
      
      // Active orders (PENDING, PREPARING, READY)
      db.order.count({
        where: {
          table: {
            restaurantId
          },
          status: {
            in: ['PENDING', 'PREPARING', 'READY']
          }
        }
      }),
      
      // Total tables
      db.table.count({
        where: {
          restaurantId
        }
      })
    ])

    return NextResponse.json({
      totalOrders,
      totalRevenue: totalRevenue._sum.total || 0,
      activeOrders,
      totalTables
    })
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}