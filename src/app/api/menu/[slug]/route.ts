import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    // Find table by slug (table number for now)
    const tableNumber = parseInt(slug)
    if (isNaN(tableNumber)) {
      return NextResponse.json(
        { error: 'Geçersiz masa numarası' },
        { status: 400 }
      )
    }

    const table = await db.table.findFirst({
      where: {
        number: tableNumber.toString()
      },
      include: {
        restaurant: true
      }
    })

    if (!table) {
      return NextResponse.json(
        { error: 'Masa bulunamadı' },
        { status: 404 }
      )
    }

    // Get restaurant's products and categories
    const [products, categories] = await Promise.all([
      db.product.findMany({
        where: {
          category: {
            restaurantId: table.restaurantId
          }
        },
        include: {
          category: true
        },
        orderBy: {
          name: 'asc'
        }
      }),
      db.category.findMany({
        where: {
          restaurantId: table.restaurantId
        },
        orderBy: {
          name: 'asc'
        }
      })
    ])

    return NextResponse.json({
      table,
      products,
      categories
    })
  } catch (error) {
    console.error('Menu API error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}