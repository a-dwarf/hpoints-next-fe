import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { getUserId } from '../../../../lib/auth';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  const task = await prisma.task.findUnique({
    where: { id: Number(id) },
  });
  return NextResponse.json(task);
}

export async function PUT(request: NextRequest) {
  const { address, id, name, description, status, startDate, endDate } = await request.json();

  const userId = await getUserId(address);

  if (!userId) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }

  // ...

  const updatedTask = await prisma.task.update({
    where: { id: Number(id) },
    data: { name, description, status, startDate, endDate },
  });
  return NextResponse.json(updatedTask);
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  await prisma.task.delete({
    where: { id: Number(id) },
  });
  return NextResponse.json({ message: 'Task deleted' }, { status: 204 });
}
