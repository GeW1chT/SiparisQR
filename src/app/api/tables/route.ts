import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import QRCode from 'qrcode'

// GET /api/tables - Masaları listele
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 401 }
      )
    }

    const tables = await prisma.table.findMany({
      where: {
        restaurantId: session.user.restaurantId
      },
      include: {
        _count: {
          select: {
            orders: true
          }
        }
      },
      orderBy: {
        number: 'asc'
      }
    })

    return NextResponse.json(tables)
  } catch (error) {
    console.error('Error fetching tables:', error)
    return NextResponse.json(
      { error: 'Masalar yüklenirken hata oluştu' },
      { status: 500 }
    )
  }
}

// POST /api/tables - Yeni masa ekle
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 401 }
      )
    }

    const { number, capacity } = await request.json()

    // Masa numarası kontrolü
    const existingTable = await prisma.table.findFirst({
      where: {
        restaurantId: session.user.restaurantId,
        number: number
      }
    })

    if (existingTable) {
      return NextResponse.json(
        { error: 'Bu masa numarası zaten kullanılıyor' },
        { status: 400 }
      )
    }

    if (!session.user.restaurantId) {
      return NextResponse.json(
        { error: 'Restoran bulunamadı' },
        { status: 400 }
      )
    }

    // QR kod oluştur
    const qrCodeData = `${process.env.NEXTAUTH_URL}/menu/${session.user.restaurantId}?table=${number}`
    const qrCodeUrl = await QRCode.toDataURL(qrCodeData)

    // Yeni masa oluştur
    const table = await prisma.table.create({
      data: {
        number,
        qrCode: qrCodeUrl,
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

    return NextResponse.json(table, { status: 201 })
  } catch (error) {
    console.error('Error creating table:', error)
    return NextResponse.json(
      { error: 'Masa oluşturulurken hata oluştu' },
      { status: 500 }
    )
  }
}