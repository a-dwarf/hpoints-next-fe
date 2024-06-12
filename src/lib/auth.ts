import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUserId(address: any): Promise<number | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { address: address },
    });

    if (!user) {

      const newUser = await prisma.user.create({
        data: { address },
      })
      return newUser.id
    }

    return user.id;
  } catch (error) {
    return null;
  }
}
