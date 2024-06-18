import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./layout.css";
import { Providers } from '@/components/Providers';
import Header from "@/components/Header";
import '@rainbow-me/rainbowkit/styles.css';

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



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HPoint",
  description: "HPoint platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
      </body>
    </html>
  );
}
