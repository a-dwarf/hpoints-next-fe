import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getUserId } from '../../../lib/auth';

export async function GET() {
  const tasks = await prisma.task.findMany({
    include: {
      space: true,
    }
  });
  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  try {
    const { address, spaceId, eventTypeId, name, description, status, startDate, endDate } = await request.json();

    const userId = await getUserId(address);

    if (!userId) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    // Create task
    const newTask = await prisma.task.create({
      data: { spaceId: Number(spaceId), eventTypeId: Number(eventTypeId), name, description, status, startDate: new Date(startDate), endDate: new Date(endDate) },
    });

    return NextResponse.json(newTask, { status: 201 });

  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
