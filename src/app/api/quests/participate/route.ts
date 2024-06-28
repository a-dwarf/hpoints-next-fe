import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET() {
  const userAddress = "0x1234567890abcdef";
  const quests = await prisma.quest.findMany({
    where: {
      tasks: {
        some: {
          points: {
            some: {
              userAddress: userAddress,
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
