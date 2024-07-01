import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { screenName, targetUserId } = await req.json();

  const url = `https://api.apidance.pro/1.1/followers/ids.json?screen_name=${screenName}&count=5000&stringify_ids=true`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'apikey': process.env.X_API_KEY || "",
    },
  });

  if (response.ok) {
    const data = await response.json();
    console.log(`${screenName}'s Number of followers: ${data.ids.length}`);
    const isFollowing = data.ids.includes(targetUserId);
    return NextResponse.json({ isFollowing });
  } else {
    const status = response.status;
    const text = await response.text();
    return NextResponse.json({ error: `Request returned an error: ${status} ${text}` }, { status });
  }
}
