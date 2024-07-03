import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { auth } from "@/auth"

export async function GET() {
  const session: any = await auth();
  const userId = session?.user?.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    include: {
      accounts: true,
    }
  })
  return NextResponse.json(user);
}

export async function PUT(request: NextRequest) {
  const session: any = await auth();
  const userId = session?.user?.id;
  try {
    const { address, name, avatar, description } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'user not found' }, { status: 401 });
    }

    const updatedSpace = await prisma.user.update({
      where: { id: userId },
      data: { name, avatar, description },
    });

    return NextResponse.json(updatedSpace, { status: 200 });

  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
