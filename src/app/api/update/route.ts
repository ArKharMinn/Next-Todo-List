import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { id, name } = await request.json();
    const data = await prisma.list.findUnique({
      where: {
        id: id,
      },
    });
    if (data) {
      await prisma.list.update({
        where: { id: id },
        data: { name: name },
      });
      const list = await prisma.list.findMany();
      return NextResponse.json({ message: "success", list }, { status: 200 });
    } else {
      return NextResponse.json({ message: "fail" }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
