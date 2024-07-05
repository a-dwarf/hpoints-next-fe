import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./layout.css";
import { Providers } from '@/components/Providers';
import Header from "@/components/Header";
import '@rainbow-me/rainbowkit/styles.css';
import { SessionProvider } from "next-auth/react";
import NextTopLoader from 'nextjs-toploader';



import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { auth } from "@/auth";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ischia",
  description: "Ischia platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <html lang="en">
      <body className={inter.className}>
      <NextTopLoader />
      <SessionProvider session={session}>
        <Providers>
          <main id="app" className="min-h-screen">
            <div className="fixed w-screen z-40">
              <Header />
            </div>
            <div className='pt-20'>
              {children}
            </div>
          </main>
          
        </Providers>
      </SessionProvider>
      </body>
    </html>
  );
}
