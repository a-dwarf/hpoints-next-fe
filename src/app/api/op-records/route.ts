import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { auth } from "@/auth"

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const user_id = url.searchParams.get('user_id');
  const quest_id = url.searchParams.get('quest_id');

  let where: any = {};
  if (user_id) {
    where.userId = user_id;
  }

  if (quest_id) {
    where.questId = quest_id;
  }

  try {
    const operationRecords = await prisma.operationRecord.findMany({ where });
    return NextResponse.json(operationRecords, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching operation records' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { eventType, taskId, params } = await req.json();
  const session: any = await auth();

  if (!session || !session.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const operationRecord = await prisma.operationRecord.create({
      data: {
        userId: session.user.id,
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
