import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  const eventTypes = await prisma.eventType.findMany();
  return NextResponse.json(eventTypes);
}

// export async function POST(request: NextRequest) {
//   const { name, description } = await request.json();
//   const newEventType = await prisma.eventType.create({
//     data: { name, description },
//   });
//   return NextResponse.json(newEventType, { status: 201 });
// }
