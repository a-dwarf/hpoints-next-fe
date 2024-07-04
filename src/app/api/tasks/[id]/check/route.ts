import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { auth } from "@/auth"
import { followCheck, retweetCheck } from "@/lib/x"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  const session: any = await auth();
  const userId = session?.user?.id;

  const task = await prisma.task.findUnique({
    where: { id: Number(id) },
    include: {
      quest: false,
      opRecords: {
        where: {
          userId
        }
      }
    }
  });

  console.log(task)

  switch (task?.eventType) {
    case 'FOLLOW':
      // task?.opRecords?.params?.user_x_id
      // followCheck()
      return NextResponse.json({ is_check: true });
    default:
      break;
  }

  return NextResponse.json({ is_check: true });
}
