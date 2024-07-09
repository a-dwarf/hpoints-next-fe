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
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { config } from '@/wagmi';
import {SWRConfig, SWRConfiguration} from 'swr';
import axios from 'axios';
import { ConfigProvider } from 'antd';

const queryClient = new QueryClient();

  const { Button } = chakraTheme.components

const theme = extendBaseTheme({
    ...chakraTheme,
  components: {
    ...chakraTheme.components,
    Button,
  },
});


const swrFetcher =  async (url: string) => {
  const res = await axios.get(url);
  return res.data
}



const swrConfig: SWRConfiguration = {
  fetcher: swrFetcher
};



export function Providers({ children }: { children: React.ReactNode }) {
  return <ReduxProvider store={store}>
      <ConfigProvider
        theme={{
        token: {
          // colorBgBase: 'red',
        }
      }}
      >
        <SWRConfig value={swrConfig}>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <RainbowKitSiweNextAuthProvider>
                <RainbowKitProvider theme={darkTheme()}>{children}</RainbowKitProvider>
              </RainbowKitSiweNextAuthProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </SWRConfig>
      </ConfigProvider>
          {/* <PersistGate loading={null} persistor={persistor}>
          </PersistGate> */}
      </ReduxProvider>
}