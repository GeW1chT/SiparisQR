import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/kitchen/orders - Mutfak için siparişleri getir
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 401 }
      )
    }

    // Aktif siparişleri getir (teslim edilmiş ve iptal edilmiş hariç)
    const orders = await prisma.order.findMany({
      where: {
        table: {
          restaurantId: session.user.restaurantId
        },
        status: {
          in: ['PENDING', 'PREPARING', 'READY']
        }
      },
      include: {
        table: {
          select: {
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
      orderBy: [
        {
          status: 'asc' // PENDING önce gelsin
        },
        {
          createdAt: 'asc' // Eski siparişler önce
        }
      ]
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error fetching kitchen orders:', error)
    return NextResponse.json(
      { error: 'Siparişler yüklenirken hata oluştu' },
      { status: 500 }
    )
  }
}