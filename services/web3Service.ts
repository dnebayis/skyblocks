import { ethers, BrowserProvider, Contract, JsonRpcProvider } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI, ARC_NETWORK_CONFIG, ARC_CHAIN_ID } from '../constants';
import { Floor } from '../types';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const fetchFloors = async (): Promise<Floor[]> => {
  const provider = new JsonRpcProvider(ARC_NETWORK_CONFIG.rpcUrls[0]);

  try {
    const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    const data = await contract.getAllFloors();
    
    return data.map((f: any) => ({
      builder: f.builder,
      message: f.message,
      twitterHandle: f.twitterHandle,
      themeId: Number(f.themeId),
      timestamp: Number(f.timestamp)
    })).reverse(); 
  } catch (err) {
    console.error("Error fetching floors:", err);
    return [];
  }
};

export const getBuildCost = async (): Promise<string> => {
  try {
    const provider = new JsonRpcProvider(ARC_NETWORK_CONFIG.rpcUrls[0]);
    const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    const cost = await contract.cost();
    return ethers.formatEther(cost);
  } catch (e) {
    return "0.01";
  }
};

export const buildFloorTransaction = async (message: string, twitter: string, themeId: number, costEth: string) => {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("No wallet found.");
  }

  const provider = new BrowserProvider(window.ethereum);
  const network = await provider.getNetwork();
  
  if (network.chainId !== BigInt(ARC_CHAIN_ID)) {
    throw new Error(`Wrong network. Expected ${ARC_CHAIN_ID}, got ${network.chainId}`);
  }

  const signer = await provider.getSigner();
  const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  
  const tx = await contract.buildFloor(message, twitter, themeId, {
    value: ethers.parseEther(costEth),
    gasLimit: 300000
  });
  
  return await tx.wait();
};