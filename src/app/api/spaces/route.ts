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

export async function PUT(request: NextRequest) {
  try {
    const { address, id, name, avatar, description } = await request.json();
    const userId = await getUserId(address);

    if (!userId) {
      return NextResponse.json({ error: 'user not found' }, { status: 401 });
    }

    const existingSpace = await prisma.space.findUnique({
      where: { id: Number(id), userId: userId },
    });

    if (!existingSpace) {
      return NextResponse.json({ error: 'Space not found' }, { status: 404 });
    }

    const updatedSpace = await prisma.space.update({
      where: { id: Number(id) },
      data: { name, avatar, description },
    });

    return NextResponse.json(updatedSpace, { status: 200 });

  } catch (error) {
    console.error('Error updating space:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
