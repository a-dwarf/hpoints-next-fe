import NextAuth from "next-auth";
import Twitter from "next-auth/providers/twitter";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { SiweMessage } from "siwe";
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

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
          // const creMessage = JSON.parse(credentials?.message as any) || {};
          const siwe = new SiweMessage(credentials?.message as any);
          
          const nextAuthUrl = siwe.domain;

          const result = await siwe.verify({
            signature: credentials?.signature as any,
            domain: nextAuthUrl,
            nonce: siwe.nonce,
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
          console.log("error", e);
          return null;
        }
      },
    }),
    Twitter,
    GitHub,
    Google,
  ],
  callbacks: {
    async signIn({ account, profile }: any) {
      const session: any = await auth();

      if (account?.provider === 'twitter' || account?.provider === 'github') {
        await prisma.account.upsert({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
          update: {
            username: profile?.data?.username || profile?.login,
            image: profile?.data?.profile_image_url || profile?.avatar_url,
          },
          create: {
            userId: session?.user?.id,
            provider: account.provider,
            type: account.type,
            providerAccountId: account.providerAccountId,
            username: profile?.data?.username || profile?.login,
            image: profile?.data?.profile_image_url || profile?.avatar_url,
          },
        });
      }
      if (account?.provider === 'google') {
        await prisma.user.update({
          where: { id: session?.user.id },
          data: {
            email: profile?.email
          },
        });
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token, user }: { session: any; token: any, user: any }) {
      session.user = token.user;
      session.userInfo = user;
      return session;
    },
  },
});
