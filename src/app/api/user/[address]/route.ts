import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(request: NextRequest) {
  const { address } = request.nextUrl.searchParams;
  const user = await prisma.user.findUnique({
    where: { address: String(address) },
    include: {
      spaces: {
        include: {
          tasks: {
            include: {
              points: true,
            },
          },
        },
      },
    },
  });
  return NextResponse.json(user);
}
