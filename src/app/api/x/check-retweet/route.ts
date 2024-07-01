import { NextRequest, NextResponse } from 'next/server';
import { encode } from 'querystring';

async function getRetweetData(tweetId: string) {
  const variables = JSON.stringify({
    tweetId,
    count: 20,
    includePromotedContent: false,
  });
  const encodedVariables = encode({ variables });
  const url = `https://api.apidance.pro/graphql/Retweeters?variables=${encodedVariables}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'apikey': process.env.X_API_KEY || "",
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    const status = response.status;
    const text = await response.text();
    throw new Error(`Request returned an error: ${status} ${text}`);
  }
}

export async function POST(req: NextRequest) {
  const { tweetId, targetUserId } = await req.json();

  try {
    const response = await getRetweetData(tweetId);
    for (const instruction of response.data.retweeters_timeline.timeline.instructions) {
      for (const entry of instruction.entries) {
        const itemContent = entry.content.itemContent;
        if (itemContent && itemContent.user_results.result.rest_id === targetUserId) {
          console.log(`User ${itemContent.user_results.result.legacy.name} retweeted: ${tweetId}`);
          return NextResponse.json({ retweeted: true });
        }
      }
    }
    console.log(`User ${targetUserId} did not retweet ${tweetId}`);
    return NextResponse.json({ retweeted: false });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
