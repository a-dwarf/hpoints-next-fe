import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { auth } from "@/auth"

export async function GET() {
  try {
    const operationRecords = await prisma.operationRecord.findMany();
    return NextResponse.json(operationRecords, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching operation records' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { userId, eventType, taskId, params } = await req.json();
  const session: any = await auth();

  try {
    const operationRecord = await prisma.operationRecord.create({
      data: {
        userId,
        eventType,
        taskId,
        params,
      },
    });
    return NextResponse.json(operationRecord, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating operation record' }, { status: 500 });
  }
}
