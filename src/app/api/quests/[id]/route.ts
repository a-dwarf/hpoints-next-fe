import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
// import { auth } from "@/auth"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  // const session = await auth();
  // console.log(session)

  // const userId = session.user.id;
  // const userId = "clxwxox8r0000l62itb8oope6";
  // const userAddress = session.user.address;
  const userAddress = "0x1234567890abcdef";

  const quest = await prisma.quest.findUnique({
    where: { id: parseInt(id) },
    include: {
      tasks: {
        include: {
          points: true,
        },
      },
    },
  });

  if (!quest) {
    return new NextResponse('Quest not found', { status: 404 });
  }

  const total_points = quest.tasks.reduce((sum, task) => {
    return sum + task.points.reduce((taskSum, point) => taskSum + point.points, 0);
  }, 0);

  const user_points = quest.tasks.reduce((userSum, task) => {
    return userSum + task.points.reduce((taskUserSum, point) => {
      return point.userAddress === userAddress ? taskUserSum + point.points : taskUserSum;
    }, 0);
  }, 0);

  const questWithTotalPoints = {
    ...quest,
    total_points,
    user_points
  };

  return NextResponse.json(questWithTotalPoints);
}
