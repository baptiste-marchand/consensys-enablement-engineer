import * as dotenv from 'dotenv';
import { createPublicClient, http } from 'viem';
import { lineaSepolia } from 'viem/chains';
dotenv.config();

export const publicClient = createPublicClient({
  chain: {
    ...lineaSepolia,
    rpcUrls: {
      default: {
        http: [process.env.RPC_URL || 'https://linea-sepolia.infura.io/v3/50a0528fdf85423da75fd7162d4ef18b'],
        webSocket: [process.env.WSS_URL || 'wss://linea-sepolia.infura.io/ws/v3/50a0528fdf85423da75fd7162d4ef18b'],
      }
    }
  },
  transport: http(),
});

