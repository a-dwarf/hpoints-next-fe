import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(request: NextRequest) {
  const { id } = request.nextUrl.searchParams;
  const task = await prisma.task.findUnique({
    where: { id: Number(id) },
  });
  return NextResponse.json(task);
}

export async function PUT(request: NextRequest) {
  const { id } = request.nextUrl.searchParams;
  const { name, description, status, startDate, endDate } = await request.json();
  const updatedTask = await prisma.task.update({
    where: { id: Number(id) },
    data: { name, description, status, startDate, endDate },
  });
  return NextResponse.json(updatedTask);
}

export async function DELETE(request: NextRequest) {
  const { id } = request.nextUrl.searchParams;
  await prisma.task.delete({
    where: { id: Number(id) },
  });
  return NextResponse.json({ message: 'Task deleted' }, { status: 204 });
}
