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

  switch (opRecord?.eventType) {
    case 'FOLLOW':
      let xprovider = session?.user?.accounts.find((ele: any) => ele.provider == "twitter")
      let isFollow = followCheck(opRecord?.params?.target_x_name, xprovider?.providerAccountId)
      return NextResponse.json({ is_check: isFollow });
    case 'RETWEET':
      let x_provider = session?.user?.accounts.find((ele: any) => ele.provider == "twitter")
      let isRetweet = await getRetweetData(x_provider?.providerAccountId, x_provider?.params?.target_tweet_id)
      return NextResponse.json({ is_check: isRetweet });
    default:
      break;
  }

  return NextResponse.json({ is_check: true });
}
