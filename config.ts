import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { defineChain } from 'viem';

export const arcTestnet = defineChain({
  id: 5042002,
  name: 'Arc Testnet',
  nativeCurrency: { name: 'USDC', symbol: 'USDC', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.testnet.arc.network'] },
  },
  blockExplorers: {
    default: { name: 'ArcScan', url: 'https://testnet.arcscan.app' },
  },
});

export const config = getDefaultConfig({
  appName: 'SkyBlocks',
  projectId: 'c0f12608eb285b0a8f913c2801097c08',
  chains: [arcTestnet],
  transports: {
    [arcTestnet.id]: http(),
  },
});
