import { Prisma, PrismaClient } from '@prisma/client';
import { hash } from "bcrypt";
import database from "./database.json";

const prisma = new PrismaClient();

const bookData: Prisma.bookCreateInput[] = database.book;
const userData: Prisma.userCreateInput[] = database.user;

async function seedBooks() {
  for (const b of bookData) {
    const book = await prisma.book.create({
      data: b,
    });
    console.log(`Created book with id: ${book.id}`);
  }
}

async function seedUsers() {
  for (const u of userData) {
    const hashedPassword = await hash(u.password, 10);
    const user = await prisma.user.create({
      data: {
        "email": u.email,
        "password": hashedPassword,
        "role": u.role
      },
    });
    console.log(`Created user with id: ${user.id}`);
  }
}

async function main() {
  console.log(`Start seeding ...`)
  await seedBooks();
  await seedUsers();
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });