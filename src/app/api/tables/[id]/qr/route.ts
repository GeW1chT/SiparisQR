import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import QRCode from 'qrcode'

// POST /api/tables/[id]/qr - QR kod oluştur
export async function POST(
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
    const table = await prisma.table.findFirst({
      where: {
        id: params.id,
        restaurantId: session.user.restaurantId
      }
    })

    if (!table) {
      return NextResponse.json(
        { error: 'Masa bulunamadı' },
        { status: 404 }
      )
    }

    // QR kod URL'ini oluştur
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const menuUrl = `${baseUrl}/menu/${table.number}`

    // QR kod oluştur
    const qrCodeDataUrl = await QRCode.toDataURL(menuUrl, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    })

    // Masayı QR kod ile güncelle
    const updatedTable = await prisma.table.update({
      where: {
        id: params.id
      },
      data: {
        qrCode: qrCodeDataUrl
      },
      include: {
        _count: {
          select: {
            orders: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'QR kod başarıyla oluşturuldu',
      table: updatedTable,
      qrCode: qrCodeDataUrl,
      menuUrl
    })
  } catch (error) {
    console.error('Error generating QR code:', error)
    return NextResponse.json(
      { error: 'QR kod oluşturulurken hata oluştu' },
      { status: 500 }
    )
  }
}

// DELETE /api/tables/[id]/qr - QR kod sil
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
    const table = await prisma.table.findFirst({
      where: {
        id: params.id,
        restaurantId: session.user.restaurantId
      }
    })

    if (!table) {
      return NextResponse.json(
        { error: 'Masa bulunamadı' },
        { status: 404 }
      )
    }

    // QR kodu sil
    const updatedTable = await prisma.table.update({
      where: {
        id: params.id
      },
      data: {
        qrCode: ''
      },
      include: {
        _count: {
          select: {
            orders: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'QR kod başarıyla silindi',
      table: updatedTable
    })
  } catch (error) {
    console.error('Error deleting QR code:', error)
    return NextResponse.json(
      { error: 'QR kod silinirken hata oluştu' },
      { status: 500 }
    )
  }
}