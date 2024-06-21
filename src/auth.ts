import NextAuth from "next-auth";
import Twitter from "next-auth/providers/twitter";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { SiweMessage } from "siwe";
import { getCsrfToken } from "next-auth/react";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    // strategy: 'database',
  },
  providers: [
    Credentials({
      // name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials, req) {
        console.log("authorize", credentials);
        try {
          const creMessage = JSON.parse(credentials?.message as any) || {};
          const siwe = new SiweMessage(creMessage);
          const nextAuthUrl = new URL(creMessage.uri);

          const result = await siwe.verify({
            signature: credentials?.signature as any,
            domain: nextAuthUrl.host,
            nonce: creMessage.nonce,
          });
          // const csrf = await getCsrfToken();
          // console.log('authorize', csrf)

          console.log("authorize", result);

          if (result.success) {
            const user = await prisma.user.findUnique({
              where: { address: siwe.address },
            });
            if (user) {
              return {
                id: user.id,
                address: siwe.address,

              } as any;
            }
            const newUser = await prisma.user.create({
              data: { address: siwe.address },
            });
            return {
              id: newUser.id,
              address: siwe.address,
            } as any;
          }

          return null;
        } catch (e) {
          return null;
        }
      },
    }),
    Twitter,
  ],
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      session.address = token.sub;
      session.user.name = token.sub;
      session.user.image = "https://www.fillmurray.com/128/128";
      return session;
    },
  },
});
