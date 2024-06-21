// app/providers.tsx
'use client'

import {Provider as ReduxProvider} from 'react-redux';
// import { PersistGate } from 'redux-persist/lib/integration/react';
import { store } from '@/redux/store'
import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';


import {
    ChakraBaseProvider,
    // extendTheme,
    theme as chakraTheme,
    extendBaseTheme,
  } from '@chakra-ui/react';

import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { config } from '@/wagmi';

const queryClient = new QueryClient();

  const { Button } = chakraTheme.components

const theme = extendBaseTheme({
    ...chakraTheme,
  components: {
    ...chakraTheme.components,
    Button,
  },
})



export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraBaseProvider theme={theme} resetCSS={false}>
      <ReduxProvider store={store}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitSiweNextAuthProvider>
              <RainbowKitProvider>{children}</RainbowKitProvider>
            </RainbowKitSiweNextAuthProvider>
          </QueryClientProvider>
        </WagmiProvider>
          {/* <PersistGate loading={null} persistor={persistor}>
          </PersistGate> */}
      </ReduxProvider>
    </ChakraBaseProvider>
}