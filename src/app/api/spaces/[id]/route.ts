import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  const user = await prisma.space.findUnique({
    where: { id: Number(id) },
    include: {
      tasks: true
    },
  });
  return NextResponse.json(user);
}
