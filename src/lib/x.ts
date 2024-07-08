import { NextRequest, NextResponse } from 'next/server';
import { encode } from 'querystring';

export async function followCheck(user_x_id: any, target_x_username: any) {
  console.log(user_x_id, target_x_username)
  const url = `https://api.apidance.pro/1.1/followers/ids.json?screen_name=${user_x_id}&count=5000&stringify_ids=true`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'apikey': process.env.X_API_KEY || "",
    },
  });

  if (response.ok) {
    const data = await response.json();
    console.log(`${user_x_id}'s Number of followers: ${data.ids.length}`);
    return data?.ids?.includes(target_x_username);
  } else {
    return false;
  }
}

export async function getRetweetData(user_x_id: string, target_tweet_id: string) {
  const variables = {
    tweetId: target_tweet_id,
    count: 20,
    includePromotedContent: false,
  };
  const encodedVariables = encodeURIComponent(JSON.stringify(variables));
  const url = `https://api.apidance.pro/graphql/Retweeters?variables=${encodedVariables}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'apikey': process.env.X_API_KEY || "",
    },
  });

  if (response.ok) {
    const res = await response.json();
    return JSON.stringify(res).includes(user_x_id)
  } else {
    const status = response.status;
    const text = await response.text();
    throw new Error(`Request returned an error: ${status} ${text}`);
  }
}
