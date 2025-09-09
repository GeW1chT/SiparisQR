import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Demo restaurant oluştur
  const hashedPassword = await bcrypt.hash('demo123', 12)
  
  // Önce user oluştur
  const user = await prisma.user.create({
    data: {
      email: 'demo@siparisqr.com',
      password: hashedPassword,
      name: 'Demo Kullanıcı',
      role: 'OWNER'
    }
  })

  const restaurant = await prisma.restaurant.create({
    data: {
      name: 'Demo Restaurant',
      slug: 'demo-restaurant',
      ownerId: user.id,
      categories: {
        create: [
          {
            name: 'Ana Yemekler',
            order: 1,
            products: {
              create: [
                {
                  name: 'Izgara Köfte',
                  description: 'Özel baharatlarla hazırlanmış lezzetli köfte',
                  price: 45.00,
                  isAvailable: true
                },
                {
                  name: 'Tavuk Şiş',
                  description: 'Marine edilmiş tavuk göğsü şiş',
                  price: 38.00,
                  isAvailable: true
                },
                {
                  name: 'Karışık Izgara',
                  description: 'Köfte, tavuk, kuzu şiş karışımı',
                  price: 65.00,
                  isAvailable: true
                }
              ]
            }
          },
          {
            name: 'Başlangıçlar',
            order: 2,
            products: {
              create: [
                {
                  name: 'Humus',
                  description: 'Geleneksel humus, zeytinyağı ve baharatlı',
                  price: 18.00,
                  isAvailable: true
                },
                {
                  name: 'Çoban Salata',
                  description: 'Taze domates, salatalık, soğan, maydanoz',
                  price: 22.00,
                  isAvailable: true
                },
                {
                  name: 'Sigara Böreği',
                  description: 'Peynirli sigara böreği (6 adet)',
                  price: 25.00,
                  isAvailable: true
                }
              ]
            }
          },
          {
            name: 'İçecekler',
            order: 3,
            products: {
              create: [
                {
                  name: 'Ayran',
                  description: 'Ev yapımı ayran',
                  price: 8.00,
                  isAvailable: true
                },
                {
                  name: 'Çay',
                  description: 'Geleneksel Türk çayı',
                  price: 5.00,
                  isAvailable: true
                },
                {
                  name: 'Kola',
                  description: 'Soğuk kola (330ml)',
                  price: 12.00,
                  isAvailable: true
                }
              ]
            }
          }
        ]
      },
      tables: {
        create: [
          { number: '1', qrCode: 'demo-restaurant-table-1' },
          { number: '2', qrCode: 'demo-restaurant-table-2' },
          { number: '3', qrCode: 'demo-restaurant-table-3' },
          { number: '4', qrCode: 'demo-restaurant-table-4' },
          { number: '5', qrCode: 'demo-restaurant-table-5' },
          { number: '6', qrCode: 'demo-restaurant-table-6' },
          { number: '7', qrCode: 'demo-restaurant-table-7' },
          { number: '8', qrCode: 'demo-restaurant-table-8' },
        ]
      }
    }
  })

  // User'ı restaurant ile ilişkilendir
  await prisma.user.update({
    where: { id: user.id },
    data: { restaurantId: restaurant.id }
  })

  console.log('✅ Demo restaurant oluşturuldu:', restaurant.name)
  console.log('📧 Giriş bilgileri:')
  console.log('   Email: demo@siparisqr.com')
  console.log('   Şifre: demo123')
  console.log('🔗 Restaurant slug:', restaurant.slug)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })