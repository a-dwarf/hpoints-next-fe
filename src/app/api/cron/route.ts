import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getHeServiceEndpoint } from '@/config/hservice';

export async function GET() {
  const hurl = await getHeServiceEndpoint();
  const result = await fetch(`${hurl || process.env.HSERVICE_URL}/range_query`, {
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
      "data_id": ele.id,
      "user_id": ele.pk_user,
      "task_id": parseInt(ele.pk_owner),
      "event_type": ele.event_type,
      "point": ele.point_amount,
    }
  })

  const operationRecord = await prisma.operationRecord.createMany({
    data: res,
    skipDuplicates: true
  })

  return NextResponse.json(operationRecord);
}
