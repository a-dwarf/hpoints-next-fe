import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getUserId } from '../../../lib/auth';

export async function GET() {
  const spaces = await prisma.space.findMany({
    include: {
      tasks: true
    },
  });
  return NextResponse.json(spaces);
}

export async function POST(request: NextRequest) {

  const { address, name, avatar, description } = await request.json();

  const userId = await getUserId(address);

  if (!userId) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }

  const newSpace = await prisma.space.create({
    data: { userId, name, avatar, description },
  });
  return NextResponse.json(newSpace, { status: 201 });
}
