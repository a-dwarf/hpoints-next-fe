import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  const task = await prisma.task.findUnique({
    where: { id: Number(id) },
    include: {
      quest: true,
    }
  });
  return NextResponse.json(task);
}
