import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { id } = await request.json();
    if (id) {
      const name = await prisma.list.findUnique({
        where: {
          id: id,
        },
      });
      return NextResponse.json({ message: "success", name }, { status: 200 });
    } else {
      return NextResponse.json({ message: "failed" }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
