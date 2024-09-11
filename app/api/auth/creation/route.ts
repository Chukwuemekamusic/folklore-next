import { NextRequest } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: NextRequest) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  
  if (!user || user === null || user === undefined || !user.email || !user.id) {
    // throw new Error("User not found");
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  let dbUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({  
      data: {
        id: user.id,
        email: user.email,
        firstName: user.given_name ?? '',
        lastName: user.family_name ?? '',
        name: `${user.given_name ?? ''} ${user.family_name ?? ''}`.trim(),
        profileImage: user.picture ?? `https://avatar.vercel.sh/${user.given_name ?? ''}`,

      },
    });
  }

//   return NextResponse.redirect(new URL('/dashboard', request.url));
  return NextResponse.redirect(`${process.env.BASE_URL}/dashboard`);

  
  
}