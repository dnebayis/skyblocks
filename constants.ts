import { ThemeConfig, ThemeId } from "./types";

export const CONTRACT_ADDRESS = "0x92c49128C4a8F379CA22777e1342a2e335444d27" as const;
export const ARC_CHAIN_ID = 5042002;

export const ARC_NETWORK_CONFIG = {
  chainId: `0x${ARC_CHAIN_ID.toString(16)}`,
  chainName: "Arc Testnet",
  nativeCurrency: {
    name: "USDC",
    symbol: "USDC",
    decimals: 18,
  },
  rpcUrls: ["https://rpc.testnet.arc.network"],
  blockExplorerUrls: ["https://testnet.arcscan.app"],
};

export const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "_message", "type": "string" },
      { "internalType": "string", "name": "_twitter", "type": "string" },
      { "internalType": "uint256", "name": "_themeId", "type": "uint256" }
    ],
    "name": "buildFloor",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllFloors",
    "outputs": [
      {
        "components": [
          { "internalType": "address", "name": "builder", "type": "address" },
          { "internalType": "string", "name": "message", "type": "string" },
          { "internalType": "string", "name": "twitterHandle", "type": "string" },
          { "internalType": "uint256", "name": "themeId", "type": "uint256" },
          { "internalType": "uint256", "name": "timestamp", "type": "uint256" }
        ],
        "internalType": "struct SkyBlocks.Floor[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "cost",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const THEMES: { [key: number]: ThemeConfig } = {
  [ThemeId.GRASS]: {
    id: ThemeId.GRASS,
    name: "Grass",
    faceColor: "bg-green-500",
    sideColor: "bg-green-600",
    borderColor: "border-green-800",
    textColor: "text-green-50"
  },
  [ThemeId.LAVA]: {
    id: ThemeId.LAVA,
    name: "Lava",
    faceColor: "bg-orange-600",
    sideColor: "bg-orange-700",
    borderColor: "border-red-900",
    textColor: "text-orange-100"
  },
  [ThemeId.ICE]: {
    id: ThemeId.ICE,
    name: "Ice",
    faceColor: "bg-cyan-400",
    sideColor: "bg-cyan-500",
    borderColor: "border-cyan-700",
    textColor: "text-cyan-900"
  },
  [ThemeId.LUXURY]: {
    id: ThemeId.LUXURY,
    name: "Luxury",
    faceColor: "bg-yellow-400",
    sideColor: "bg-yellow-500",
    borderColor: "border-yellow-700",
    textColor: "text-yellow-900"
  }
};