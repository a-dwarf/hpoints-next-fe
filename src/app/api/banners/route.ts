import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(req: NextRequest) {
  const banners = await prisma.banner.findMany({
    select: {
      id: true,
      title: true,
      imageUrl: true,
      redirectUrl: true,
      startDate: true,
      endDate: true,
      position: true,
    },
  });

  return NextResponse.json(banners);
}
