import { createPublicClient, http } from 'viem';
import { lineaSepolia } from 'viem/chains';

const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;
const wssUrl = process.env.NEXT_PUBLIC_WSS_URL;

if (rpcUrl === undefined || wssUrl === undefined) {
  throw new Error('RPC_URL or WSS_URL is not defined in the environment variables');
}

export const publicClient = createPublicClient({
  chain: {
    ...lineaSepolia,
    rpcUrls: {
      default: {
        http: [rpcUrl],
        webSocket: [wssUrl],
      }
    }
  },
  transport: http(),
});

