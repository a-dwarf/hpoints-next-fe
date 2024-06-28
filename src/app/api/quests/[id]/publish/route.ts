import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { auth } from "@/auth"

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();

  if (!session || !session.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const quest = await prisma.quest.update({
    where: { id: parseInt(params.id) },
    data: {
      status: 'Ongoing',
    },
  });

  return NextResponse.json({ message: 'Quest Ongoing' });
}
