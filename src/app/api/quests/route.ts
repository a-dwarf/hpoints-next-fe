import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { auth } from "@/auth"

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const user_id = url.searchParams.get('owner_id');
  const start_date = url.searchParams.get('start_date');
  const end_date = url.searchParams.get('end_date');
  const status = url.searchParams.get('status');
  const title = url.searchParams.get('title');

  let where: any = {};
  if (user_id) {
    where.userId = user_id;
  }
  if (start_date && end_date) {
    where.startDate = {
      gte: new Date(start_date),
      lte: new Date(end_date),
    };
  }
  if (status) {
    where.status = status;
  }
  if (title) {
    where.name = {
      contains: title,
      mode: 'insensitive',
    };
  }

  const quests = await prisma.quest.findMany({
    where,
    select: {
      id: true,
      name: true,
      avatar: true,
      status: true,
      rewards: true,
      description: true,
      startDate: true,
      endDate: true,
    },
    orderBy: {
      id: 'desc',
    },
  });

  return NextResponse.json(quests);
}


export async function POST(req: NextRequest) {
  const session: any = await auth();

  if (!session || !session.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const data = await req.json();
  const { name, avatar, rewards, description, startDate, endDate, tasks } = data;

  console.log(data)

  const quest = await prisma.quest.create({
    data: {
      userId: session.user.id,
      name,
      avatar,
      status: 'Draft',
      rewards,
      description,
      startDate,
      endDate,
      tasks: {
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
