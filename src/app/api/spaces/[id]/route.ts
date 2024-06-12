import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(request: NextRequest) {
  const { id } = request.nextUrl.searchParams;
  const space = await prisma.space.findUnique({
    where: { id: Number(id) },
    include: {
      tasks: {
        include: {
          points: true,
        },
      },
    },
  });
  return NextResponse.json(space);
}

export async function PUT(request: NextRequest) {
  const { id } = request.nextUrl.searchParams;
  const { name, avatar, description } = await request.json();
  const updatedSpace = await prisma.space.update({
    where: { id: Number(id) },
    data: { name, avatar, description },
  });
  return NextResponse.json(updatedSpace);
}

export async function DELETE(request: NextRequest) {
  const { id } = request.nextUrl.searchParams;
  await prisma.space.delete({
    where: { id: Number(id) },
  });
  return NextResponse.json({ message: 'Space deleted' }, { status: 204 });
}
