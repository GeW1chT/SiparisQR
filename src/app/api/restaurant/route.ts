import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/restaurant - Restoran bilgilerini getir
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 401 }
      )
    }

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id: session.user.restaurantId
      }
    })

    if (!restaurant) {
      return NextResponse.json(
        { error: 'Restoran bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json(restaurant)
  } catch (error) {
    console.error('Error fetching restaurant:', error)
    return NextResponse.json(
      { error: 'Restoran bilgileri yüklenirken hata oluştu' },
      { status: 500 }
    )
  }
}

// PATCH /api/restaurant - Restoran bilgilerini güncelle
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 401 }
      )
    }

    const { name, description, address, phone, email, logo, isActive } = await request.json()

    // Restoran varlığını kontrol et
    const existingRestaurant = await prisma.restaurant.findUnique({
      where: {
        id: session.user.restaurantId
      }
    })

    if (!existingRestaurant) {
      return NextResponse.json(
        { error: 'Restoran bulunamadı' },
        { status: 404 }
      )
    }

    // Restoran bilgilerini güncelle
    const updatedRestaurant = await prisma.restaurant.update({
      where: {
        id: session.user.restaurantId
      },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(address !== undefined && { address }),
        ...(phone !== undefined && { phone }),
        ...(email !== undefined && { email }),
        ...(logo !== undefined && { logo }),
        ...(typeof isActive === 'boolean' && { isActive })
      }
    })

    return NextResponse.json(updatedRestaurant)
  } catch (error) {
    console.error('Error updating restaurant:', error)
    return NextResponse.json(
      { error: 'Restoran bilgileri güncellenirken hata oluştu' },
      { status: 500 }
    )
  }
}