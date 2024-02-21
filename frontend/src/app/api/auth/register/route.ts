import prisma from '@/utils/prisma';
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const hashedPassword = await hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'USER',
      },
    });
  } catch (error) {
    console.error({ error });
  }
  return NextResponse.json({ message: 'success' });
}
