import { NextRequest, NextResponse } from 'next/server';
import { encode } from 'querystring';

async function getRetweetData(target_tweet_id: string) {
  const variables = JSON.stringify({
    target_tweet_id,
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
  const { target_tweet_id, user_x_id } = await req.json();

  try {
    const response = await getRetweetData(target_tweet_id);
    for (const instruction of response.data.retweeters_timeline.timeline.instructions) {
      for (const entry of instruction.entries) {
        const itemContent = entry.content.itemContent;
        if (itemContent && itemContent.user_results.result.rest_id === user_x_id) {
          console.log(`User ${itemContent.user_results.result.legacy.name} retweeted: ${target_tweet_id}`);
          return NextResponse.json({ retweeted: true });
        }
      }
    }
    console.log(`User ${user_x_id} did not retweet ${target_tweet_id}`);
    return NextResponse.json({ retweeted: false });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
