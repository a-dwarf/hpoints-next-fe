import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { verifyAndGetUserId } from '../../../lib/auth';

export async function GET() {
  const spaces = await prisma.space.findMany({
    include: {
      tasks: true
    },
  });
  return NextResponse.json(spaces);
}

export async function POST(request: NextRequest) {

  const { address, signature, name, avatar, description } = await request.json();

  // 验证地址并获取用户ID / Verify address and get user ID
  const userId = await verifyAndGetUserId(address, signature);

  if (!userId) {
    return NextResponse.json({ error: 'Invalid signature or user not found' }, { status: 401 });
  }

  const newSpace = await prisma.space.create({
    data: { userId, name, avatar, description },
  });
  return NextResponse.json(newSpace, { status: 201 });
}
