import { NextResponse } from 'next/server';
// import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    // const reputationList = await prisma.reputation.findMany();
    const reputationList = {
      "finalScore": "90",
      "completeReplutions": [
        {
          "isComplete": true,
          "rpputionIdType": "github",
          "scroe": 10,
        },
        {
          "reputionIdType": "x",
          "isComplete": false,
          "scroe": 10,
        },
        {
          "reputionIdType": "email",
          "isComplete": false,
          "scroe": 10,
        },
        {
          "reputionIdType": "uniswap_2_tx",
          "isComplete": false,
          "scroe": 20,
        }
      ]
    }
    return NextResponse.json(reputationList, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
