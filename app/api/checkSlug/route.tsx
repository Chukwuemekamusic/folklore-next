import { NextResponse } from "next/server";
import prisma from "@/lib/db"; 

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ exists: false }, { status: 400 });
  }

  const story = await prisma.story.findUnique({
    where: { slug },
  });

  return NextResponse.json({ exists: !!story }, { status: 200 });
}