import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { auth } from "@/auth"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const session: any = await auth();
  const userAddress = session?.user?.address;

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


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session: any = await auth();
  const userId = session.user.id;

  if (!session || !session.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const data = await req.json();
  const { name, avatar, status, rewards, description, startDate, endDate, tasks } = data;

  const existingQuest = await prisma.quest.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (existingQuest?.userId !== userId) {
    return new NextResponse('You are not authorized to update this quest', { status: 403 });
  }

  if (!existingQuest || existingQuest.status !== 'Draft') {
    return new NextResponse('Quest not found or not in Draft status', { status: 404 });
  }

  const quest = await prisma.quest.update({
    where: { id: parseInt(params.id) },
    data: {
      name,
      avatar,
      status,
      rewards,
      description,
      startDate,
      endDate,
      tasks: {
        deleteMany: {}, // Delete existing tasks
        create: tasks.map((task: any) => ({
          name: task.name,
          description: task.description,
          eventType: task.eventType,
          params: task.params,
        })),
      },
    },
    include: {
      tasks: true,
    },
  });

  return NextResponse.json(quest);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();

  if (!session || !session.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const quest = await prisma.quest.update({
    where: { id: parseInt(params.id), userId: session?.user?.id },
    data: {
      status: 'Deleted',
    },
  });

  return NextResponse.json({ message: 'Quest deleted' });
}
