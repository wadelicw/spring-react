import prisma from "@/utils/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    //validate email and password
    const hashedPassword = await hash(password, 10);
    const result = await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    });
    console.log(result);
  } catch (error) {
    console.log({ error });
  }
  return NextResponse.json({ message: "success" });
}