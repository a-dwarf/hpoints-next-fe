import { NextRequest, NextResponse } from "next/server";
import { verifyMessage } from 'viem';

export { auth as middleware } from "@/auth"
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}


// export async function middleware(request: NextRequest) {
//   if (request.method == "POST") {
//     const { address, signature } = await request.json();

//     const message = `Verify address: ${address}`;
//     const valid = await verifyMessage({ address, message, signature });

//     if (!valid) {
//       return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/api/:path*"],
// };
