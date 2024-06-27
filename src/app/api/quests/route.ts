import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const user_id = url.searchParams.get('owner_id');
  const start_date = url.searchParams.get('start_date');
  const end_date = url.searchParams.get('end_date');
  const status = url.searchParams.get('status');
  const title = url.searchParams.get('title');

  let where: any = {};
  if (user_id) {
    where.userId = user_id;
  }
  if (start_date && end_date) {
    where.startDate = {
      gte: new Date(start_date),
      lte: new Date(end_date),
    };
  }
  if (status) {
    where.status = status;
  }
  if (title) {
    where.name = {
      contains: title,
      mode: 'insensitive',
    };
  }

  const quests = await prisma.quest.findMany({
    where,
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
