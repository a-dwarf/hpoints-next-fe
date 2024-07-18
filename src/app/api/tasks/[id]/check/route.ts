import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { auth } from "@/auth"
import { followCheck, getRetweetData } from "@/lib/x"
import { OpCheckStatus } from '@prisma/client';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  const session: any = await auth();
  const userId = session?.user?.id;

  if (!session || !session.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const opRecord: any = await prisma.operationRecord.findUnique({
    where: {
      taskId_userId: {
        taskId: Number(id),
        userId: session.user.id,
      },
    },
  });

  if (opRecord?.point) {
    return NextResponse.json({ is_check: true });
  }

  let xprovider = session?.user?.accounts.find((ele: any) => ele.provider == "twitter")
  console.log(xprovider)
  switch (opRecord?.eventType) {
    case 'FOLLOW':
      let isFollow = await followCheck(opRecord?.params?.target_x_name, xprovider?.providerAccountId)
      if (isFollow) await handle(opRecord);
      return NextResponse.json({ is_check: isFollow });
    case 'RETWEET':
      let isRetweet = await getRetweetData(xprovider?.providerAccountId, opRecord?.params?.tweet_id)
      if (isRetweet) await handle(opRecord);
      return NextResponse.json({ is_check: isRetweet });
    case 'VIEW_URL':
      await handle(opRecord);
      return NextResponse.json({ is_check: true });
    default:
      return NextResponse.json({ is_check: false });
  }
}

async function handle(opRecord: any) {
  console.log(opRecord)
  await prisma.operationRecord.update({
    where: { id: opRecord.id },
    data: {
      point: 1,
      status: OpCheckStatus.FINISH,
    },
  });

  // http => point service
  const result = await fetch(`${process.env.HSERVICE_URL}/event`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "pk_user": opRecord?.userId,
      "pk_owner": opRecord?.taskId + "",
      "event_meta": [],
      "event_type": opRecord?.eventType
    })
  });
  const data = await result.json();
  console.log(`${process.env.HSERVICE_URL}/event`, data)
  return data;
}
