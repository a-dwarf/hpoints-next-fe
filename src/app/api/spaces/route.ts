import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  const spaces = await prisma.space.findMany({
    include: {
      tasks: {
        include: {
          points: true,
        },
      },
    },
  });
  return NextResponse.json(spaces);
}

export async function POST(request: NextRequest) {
  const { userId, name, avatar, description } = await request.json();
  const newSpace = await prisma.space.create({
    data: { userId, name, avatar, description },
  });
  return NextResponse.json(newSpace, { status: 201 });
}
