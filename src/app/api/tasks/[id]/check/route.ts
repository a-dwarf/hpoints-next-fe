import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { auth } from "@/auth"
import { followCheck, getRetweetData } from "@/lib/x"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  const session: any = await auth();
  const userId = session?.user?.id;

  if (!session || !session.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const opRecord: any = await prisma.operationRecord.findUnique({
    where: { taskId: Number(id), userId },
  });

  if (opRecord?.point) {
    return NextResponse.json({ is_check: true });
  }

  let xprovider = session?.user?.accounts.find((ele: any) => ele.provider == "twitter")
  switch (opRecord?.eventType) {
    case 'FOLLOW':
      let isFollow = await followCheck(opRecord?.params?.target_x_name, xprovider?.providerAccountId)
      if (isFollow) await handle(opRecord);
      return NextResponse.json({ is_check: isFollow });
    case 'RETWEET':
      let isRetweet = await getRetweetData(xprovider?.providerAccountId, opRecord?.params?.tweet_id)
      if (isRetweet) await handle(opRecord);
      return NextResponse.json({ is_check: isRetweet });
    default:
      return NextResponse.json({ is_check: false });
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
  const result = await fetch(`${process.env.HSERVICE_URL}/event`, {
    cache: 'no-store',
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "pk_user": opRecord?.userId,
      "pk_owner": opRecord?.taskId,
      "event_meta": [],
      "event_type": opRecord?.event_type
    })
  });
  const data = await result.json();
  return data;
}
