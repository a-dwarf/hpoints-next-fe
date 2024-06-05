// app/providers.tsx
'use client'

import {Provider as ReduxProvider} from 'react-redux';
// import { PersistGate } from 'redux-persist/lib/integration/react';
import { store } from '@/redux/store'


import {
    ChakraBaseProvider,
    // extendTheme,
    theme as chakraTheme,
    extendBaseTheme,
  } from '@chakra-ui/react'

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
          {children}
          {/* <PersistGate loading={null} persistor={persistor}>
          </PersistGate> */}
      </ReduxProvider>
    </ChakraBaseProvider>
}