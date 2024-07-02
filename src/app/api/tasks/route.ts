import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const eventTypeId = url.searchParams.get('event_type_id');
  const offset = url.searchParams.get('offset') || 0;
  const limit = url.searchParams.get('limit') || 10;

  let whereConditions: any = {};
  if (eventTypeId !== null) {
    whereConditions.eventTypeId = Number(eventTypeId);
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
