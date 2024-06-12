import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { verifyAndGetUserId } from '../../../lib/auth';

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
    const { address, signature, spaceId, eventTypeId, name, description, status, startDate, endDate } = await request.json();

    // Verify address and get user ID
    const userId = await verifyAndGetUserId(address, signature);

    if (!userId) {
      return NextResponse.json({ error: 'Invalid signature or user not found' }, { status: 401 });
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
