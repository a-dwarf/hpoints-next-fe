import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { getUserId } from '../../../../lib/auth';

export async function GET(request: NextRequest, { params }: { params: { address: string } }) {
  const address = params.address
  const user = await prisma.user.findUnique({
    where: { address: String(address) },
    include: {
      spaces: true,
    },
  });
  return NextResponse.json(user);
}

export async function PUT(request: NextRequest) {
  try {
    const { address, name, avatar, description } = await request.json();
    const userId = await getUserId(address);

    if (!userId) {
      return NextResponse.json({ error: 'user not found' }, { status: 401 });
    }

    const updatedSpace = await prisma.user.update({
      where: { address: address },
      data: { name, avatar, description },
    });

    return NextResponse.json(updatedSpace, { status: 200 });

  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
