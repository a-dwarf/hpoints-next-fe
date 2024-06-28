import NextAuth from "next-auth";
import Twitter from "next-auth/providers/twitter";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { SiweMessage } from "siwe";
import { getCsrfToken } from "next-auth/react";
import GitHub from "next-auth/providers/github"

export const { handlers, signIn, signOut, auth } = NextAuth({
  // debug: true,
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
        console.log("authorize", req);

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
              where: { 
                address: siwe.address,
              },
              include: {
                accounts: true,
              }
            });
            if (user) {
              return {
                id: user.id,
                address: siwe.address,
                accounts: user.accounts,
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
    GitHub,
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) { 
        token.user = user
      }
      return token
    },
    async session({ session, token, user }: { session: any; token: any, user: any }) {
      // session.address = token.sub;
      session.user = token.user;
      // session.user.image = "https://www.fillmurray.com/128/128";
      // session.user.userInfo = user;
      // session.token = token;
      session.userInfo = user;

      return session;
    },
  },
});
