import { prisma } from "@/lib/prisma"

export const dynamic = 'force-dynamic' // defaults to auto
export async function POST(request: Request) {
    const { email, password } = await request.json()
    const user = await prisma.user.create({
        data: {
            email,
            verifyHash: password,
            name: email,
        }
    });
    if(user) {
        delete (user as any).verifyHash;
    }
    return Response.json(user)
}