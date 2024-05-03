import * as dotenv from 'dotenv';
import { createPublicClient, http } from 'viem';
import { lineaSepolia } from 'viem/chains';
dotenv.config();

export const publicClient = createPublicClient({
  chain: {
    ...lineaSepolia,
    rpcUrls: {
      default: {
        http: [process.env.RPC_URL!],
        webSocket: [process.env.WSS_URL!],
      }
    }
  },
  transport: http(),
});

