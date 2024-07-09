import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {

  const result = await fetch(String(process.env.HSERVICE_URL), {
    cache: 'no-store',
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "startid": 2,
      "lastid": -1
    })
  });
  const data = await result.json();

  const res = data?.message.map((ele: any) => {
    return {
      "dataId": ele.id,
      "userAddress": ele.pk_user,
      "taskId": parseInt(ele.pk_owner),
      "eventType": ele.event_type,
      "points": ele.point_amount,
    }
  })

  // const points = await prisma.OperationRecord.createMany({
  //   data: res,
  //   skipDuplicates: true

  // })

  return NextResponse.json({});
}
