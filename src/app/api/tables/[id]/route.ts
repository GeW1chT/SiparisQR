import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/tables/[id] - Masa detayını getir
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 401 }
      )
    }

    const table = await prisma.table.findFirst({
      where: {
        id: params.id,
        restaurantId: session.user.restaurantId
      },
      include: {
        _count: {
          select: {
            orders: true
          }
        }
      }
    })

    if (!table) {
      return NextResponse.json(
        { error: 'Masa bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json(table)
  } catch (error) {
    console.error('Error fetching table:', error)
    return NextResponse.json(
      { error: 'Masa yüklenirken hata oluştu' },
      { status: 500 }
    )
  }
}

// PATCH /api/tables/[id] - Masa güncelle
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 401 }
      )
    }

    const { number, capacity, isActive } = await request.json()

    // Masa varlığını kontrol et
    const existingTable = await prisma.table.findFirst({
      where: {
        id: params.id,
        restaurantId: session.user.restaurantId
      }
    })

    if (!existingTable) {
      return NextResponse.json(
        { error: 'Masa bulunamadı' },
        { status: 404 }
      )
    }

    // Masa numarası değişiyorsa, çakışma kontrolü
    if (number && number !== existingTable.number) {
      const duplicateTable = await prisma.table.findFirst({
        where: {
          restaurantId: session.user.restaurantId,
          number: number,
          id: { not: params.id }
        }
      })

      if (duplicateTable) {
        return NextResponse.json(
          { error: 'Bu masa numarası zaten kullanılıyor' },
          { status: 400 }
        )
      }
    }

    // Masayı güncelle
    const updatedTable = await prisma.table.update({
      where: {
        id: params.id
      },
      data: {
        ...(number && { number }),
        ...(capacity && { capacity }),
        ...(typeof isActive === 'boolean' && { isActive })
      },
      include: {
        _count: {
          select: {
            orders: true
          }
        }
      }
    })

    return NextResponse.json(updatedTable)
  } catch (error) {
    console.error('Error updating table:', error)
    return NextResponse.json(
      { error: 'Masa güncellenirken hata oluştu' },
      { status: 500 }
    )
  }
}

// DELETE /api/tables/[id] - Masa sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 401 }
      )
    }

    // Masa varlığını kontrol et
    const existingTable = await prisma.table.findFirst({
      where: {
        id: params.id,
        restaurantId: session.user.restaurantId
      }
    })

    if (!existingTable) {
      return NextResponse.json(
        { error: 'Masa bulunamadı' },
        { status: 404 }
      )
    }

    // Aktif siparişleri kontrol et
    const activeOrders = await prisma.order.findMany({
      where: {
        tableId: params.id,
        status: {
          in: ['PENDING', 'PREPARING', 'READY']
        }
      }
    })

    if (activeOrders.length > 0) {
      return NextResponse.json(
        { error: 'Bu masada aktif siparişler var. Önce siparişleri tamamlayın.' },
        { status: 400 }
      )
    }

    // Masayı sil
    await prisma.table.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json(
      { message: 'Masa başarıyla silindi' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting table:', error)
    return NextResponse.json(
      { error: 'Masa silinirken hata oluştu' },
      { status: 500 }
    )
  }
}