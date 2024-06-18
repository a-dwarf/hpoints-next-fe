import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  const space = await prisma.space.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      userId: true,
      name: true,
      avatar: true,
      description: true,
      tasks: {
        select: {
          id: true,
          spaceId: true,
          eventTypeId: true,
          name: true,
          description: true,
          params: true,
          startDate: true,
          endDate: true,
          points: {
            select: {
              eventType: true,
              points: true
            }
          }
        }
      }
    }
  });

  const totalPoints = space?.tasks.reduce((acc, task) => {
    return acc + task.points.reduce((acc, point) => acc + point.points, 0);
  }, 0);
  
  const userWithTotalPoints = {
    ...space,
    totalPoints: totalPoints
  };
  return NextResponse.json(userWithTotalPoints);
}
