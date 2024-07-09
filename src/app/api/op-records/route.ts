import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { auth } from "@/auth"
import { followCheck, getRetweetData } from "@/lib/x"

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const user_id = url.searchParams.get('user_id');
  const quest_id = url.searchParams.get('quest_id');

  let where: any = {};
  if (user_id) {
    where.userId = user_id;
  }

  if (quest_id) {
    where.questId = Number(quest_id);
  }

  try {
    const operationRecords = await prisma.operationRecord.findMany({ where });
    return NextResponse.json(operationRecords, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching operation records' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { eventType, taskId, questId, params } = await req.json();
  const session: any = await auth();

  if (!session || !session.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const opRecord: any = await prisma.operationRecord.upsert({
      where: {
        taskId_userId: {
          taskId: taskId,
          userId: session.user.id,
        },
      },
      update: {
        eventType,
        questId,
        params,
      },
      create: {
        userId: session.user.id,
        questId: questId,
        eventType,
        taskId,
        params,
      },
    });

    if (!opRecord?.point) {
      let xprovider = session?.user?.accounts.find((ele: any) => ele.provider == "twitter")
      switch (opRecord?.eventType) {
        case 'FOLLOW':
          let isFollow = await followCheck(opRecord?.params?.target_x_name, xprovider?.providerAccountId)
          if (isFollow) await handle(opRecord);
          return NextResponse.json({ is_check: isFollow });
        case 'RETWEET':
          let isRetweet = await getRetweetData(xprovider?.providerAccountId, xprovider?.params?.target_tweet_id)
          return NextResponse.json({ is_check: isRetweet });
        default:
          return NextResponse.json({ is_check: false });
      }
    }

    return NextResponse.json(opRecord, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating operation record' }, { status: 500 });
  }
}

async function handle(opRecord: any) {
  await prisma.operationRecord.update({
    where: { id: opRecord.id },
    data: {
      point: 1,
    },
  });

  // http => point service
}
