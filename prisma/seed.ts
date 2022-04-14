import { Locale, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log("start seeding....")
  console.log("creating restaurant...")
  const restaurant = await prisma.restaurant.create({
    data: {
      slug: "jenia",
      identifier: "jenia",
      logo: 'logo.png',
      content: {
        createMany: {
          data: [{
            name: 'Jenia', locale: Locale.en
          }, {
            name: 'ג׳ניה', locale: Locale.he
          }]
        }
      }
    }
  })
  console.log("creating menu...")
  const menu = await prisma.menu.create({
    data: {
      identifier: 'jenia-menu-default',
      restaurant: { connect: { identifier: restaurant.identifier } }
    }
  })
  console.log("creating category...")
  const category = await prisma.category.create({
    data: {
      identifier: 'jenia-category-drinks',
      restaurant: { connect: { identifier: restaurant.identifier } },
      menu: { connect: { identifier: menu.identifier } },
      content: {
        createMany: {
          data: [{
            name: 'Drinks🥤',
            locale: Locale.en
          }, {
            name: 'משקאות🥤',
            locale: Locale.he
          }]
        }
      }
    }
  })
  console.log("creating items...")
  await prisma.item.create({
    data: {
      identifier: 'jenia-inventory-coka-cola',
      restaurant: { connect: { identifier: restaurant.identifier } },
      category: { connect: { identifier: category.identifier } },
      image: 'coke.png',
      price: 13,
      content: {
        createMany: {
          data: [
            { name: "Coca-Cola", description: "The original taste", locale: Locale.en },
            { name: "קוקה קולה", description: "יאמי יאמי קוקה קולה", locale: Locale.he }
          ]
        }
      }
    }
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
