import { Prisma, PrismaClient } from '@prisma/client';
import database from "./database.json";

const prisma = new PrismaClient();

const bookData: Prisma.bookCreateInput[] = database.book;

async function main() {
  console.log(`Start seeding ...`)
  for (const b of bookData) {
    const book = await prisma.book.create({
      data: b,
    })
    console.log(`Created book with id: ${book.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })