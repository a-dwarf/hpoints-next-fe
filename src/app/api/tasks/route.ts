import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  const { spaceId, eventTypeId, name, description, status, startDate, endDate } = await request.json();
  const newTask = await prisma.task.create({
    data: { spaceId, eventTypeId, name, description, status, startDate, endDate },
  });
  return NextResponse.json(newTask, { status: 201 });
}
