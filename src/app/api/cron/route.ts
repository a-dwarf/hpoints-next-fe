import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {

  const result = await fetch(String(process.env.HSERVICE_URL), { cache: 'no-store' });
  const data = await result.json();

  const res = data?.message.map((ele: any) => {
    return {
      "dataId": ele.id,
      "userId": ele.pk_user,
      "taskId": ele.pk_owner,
      "eventTypeId": ele.event_type,
      "points": ele.point_amount,
    }
  })

  const points = await prisma.point.createMany({
    data: res
  })

  return NextResponse.json(points);
}
