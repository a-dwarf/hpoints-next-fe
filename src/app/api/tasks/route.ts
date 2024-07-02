import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const eventTypeParam = url.searchParams.get('event_types');
  const offset = url.searchParams.get('offset') || 0;
  const limit = url.searchParams.get('limit') || 10;

  let whereConditions: any = {};
  if (eventTypeParam !== null) {
    const eventTypes = eventTypeParam.split(',');
    whereConditions.eventType = { in: eventTypes };
  }

  const tasks = await prisma.task.findMany({
    skip: Number(offset),
    take: Number(limit),
    where: whereConditions,
    include: {
      quest: false,
    }
  });
  return NextResponse.json(tasks);
}
