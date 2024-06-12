import { PrismaClient } from '@prisma/client';
import { verifyMessage } from 'viem';

const prisma = new PrismaClient();

export async function verifyAndGetUserId(address: any, signature: any): Promise<number | null> {
  try {
    const message = `Verify address: ${address}`;
    const valid = await verifyMessage({ address, message, signature });

    if (!valid) {
      throw new Error('Invalid signature');
    }

    const user = await prisma.user.findUnique({
      where: { address: address },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user.id;
  } catch (error) {
    console.error('Error verifying and getting user ID:', error);
    return null;
  }
}
