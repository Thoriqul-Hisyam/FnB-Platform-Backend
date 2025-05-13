import { PrismaClient } from '../generated/prisma';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const restaurant = await prisma.restaurant.create({
    data: {
      name: 'Bakso Enak Jaya',
      address: 'Jl. Kuliner No. 88',
    },
  });

  const categories = await prisma.menuCategory.createMany({
    data: [
      { name: 'Makanan', restaurantId: restaurant.id },
      { name: 'Minuman', restaurantId: restaurant.id },
    ],
  });

  const makanan = await prisma.menuCategory.findFirst({
    where: { name: 'Makanan', restaurantId: restaurant.id },
  });

  const minuman = await prisma.menuCategory.findFirst({
    where: { name: 'Minuman', restaurantId: restaurant.id },
  });

  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Cak To',
      password: await hash('admin123', 10),
      role: 'SUPER_ADMIN',
    },
  });

  await prisma.menuItem.createMany({
    data: [
      {
        name: 'Bakso Spesial',
        description: 'Kolang Kaleng',
        price: 25000,
        restaurantId: restaurant.id,
        categoryId: makanan?.id,
      },
      {
        name: 'Teh Manis Dingin',
        description: 'Tes',
        price: 5000,
        restaurantId: restaurant.id,
        categoryId: minuman?.id,
      },
    ],
  });

  console.log('✅ Seed berhasil!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
