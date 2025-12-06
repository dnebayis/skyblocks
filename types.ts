export interface Floor {
  builder: string;
  message: string;
  twitterHandle: string;
  themeId: number;
  timestamp: number;
}

export enum ThemeId {
  GRASS = 0,
  LAVA = 1,
  ICE = 2,
  LUXURY = 3,
}

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  faceColor: string;
  sideColor: string;
  borderColor: string;
  textColor: string;
}

export interface SkyBlocksContract {
  buildFloor: (message: string, twitter: string, themeId: number, overrides?: any) => Promise<any>;
  getAllFloors: () => Promise<Floor[]>;
  cost: () => Promise<bigint>;
}
