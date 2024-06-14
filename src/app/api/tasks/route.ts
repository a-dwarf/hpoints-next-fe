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
    const { address, spaceId, eventTypeId, name, description, params, startDate, endDate } = await request.json();

    const userId = await getUserId(address);

    if (!userId) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    // Create task
    const newTask = await prisma.task.create({
      data: { spaceId: Number(spaceId), eventTypeId: Number(eventTypeId), name, description, params, startDate: new Date(startDate), endDate: new Date(endDate) },
    });

    return NextResponse.json(newTask, { status: 201 });

  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


export async function PUT(request: NextRequest) {
  const { address, id, name, description, startDate, endDate } = await request.json();

  const userId = await getUserId(address);

  if (!userId) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }

  // ...

  const updatedTask = await prisma.task.update({
    where: { id: Number(id) },
    data: { name, description, startDate, endDate },
  });
  return NextResponse.json(updatedTask);
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  await prisma.task.delete({
    where: { id: Number(id) },
  });
  return NextResponse.json({ message: 'Task deleted' }, { status: 200 });
}
