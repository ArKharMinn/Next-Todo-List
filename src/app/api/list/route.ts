import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const list = await prisma.list.findMany();
    if (list.length > 0) {
      return NextResponse.json({ message: "success", list }, { status: 200 });
    }else{
        return NextResponse.json({message:"there is no list"},{status:404})
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json({message:"Internal server error",error:error.message},{status:500})
  }finally{
    await prisma.$disconnect()
  }
}
