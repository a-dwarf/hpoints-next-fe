import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { auth } from "@/auth"

export async function GET() {
  const session: any = await auth();
  const userId = session?.user?.id;

  if (!session || !session.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const quests = await prisma.quest.findMany({
    where: {
      tasks: {
        some: {
          opRecord: {
            some: {
              userId: userId,
            },
          },
        },
      },
    },
    select: {
      id: true,
      name: true,
      avatar: true,
      status: true,
      rewards: true,
      description: true,
      startDate: true,
      endDate: true,
    },
  });

  return NextResponse.json(quests);
}
