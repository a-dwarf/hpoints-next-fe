import { NextResponse } from 'next/server';
import { auth } from "@/auth"

export async function GET() {

  const session: any = await auth();

  if (!session || !session.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  console.log(JSON.stringify(session))
  try {
    const reputationList = {
      "finalScore": "90",
      "completeReplutions": [
        {
          "isComplete": session?.user?.accounts.find((ele: any) => ele.provider == "github") ? true : false,
          "rpputionIdType": "github",
          "scroe": 10,
        },
        {
          "reputionIdType": "x",
          "isComplete": session?.user?.accounts.find((ele: any) => ele.provider == "twitter") ? true : false,
          "scroe": 10,
        },
        {
          "reputionIdType": "email",
          "isComplete": session?.user?.accounts.find((ele: any) => ele.provider == "google") ? true : false,
          "scroe": 10,
        },
        {
          "reputionIdType": "uniswap_2_tx",
          "isComplete": true,
          "scroe": 20,
        }
      ]
    }
    return NextResponse.json(reputationList, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
