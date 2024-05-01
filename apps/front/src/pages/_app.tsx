import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

import { ChakraProvider } from '@chakra-ui/react';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import {
  lineaSepolia,
} from 'wagmi/chains';

const config = getDefaultConfig({
  appName: 'Demo App',
  projectId: 'DEMO_APP',
  chains: [lineaSepolia],
  ssr: true,
});

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
          <RainbowKitProvider>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ChakraProvider>
  );
}

export default MyApp;
