import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  const eventTypes = await prisma.eventType.findMany();
  return NextResponse.json(eventTypes);
}
