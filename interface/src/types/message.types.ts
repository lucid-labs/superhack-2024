export interface MessageResponse {
  message: string;
  protocolData?: ProtocolData;
  userData?: UserData;
  recommendation: RecommendationData[];
  isExecutable: boolean;
}

export interface UserData {
  protocol: string;
  baseAsset: string;
  userAddress: string;
  borrowCapacity: string;
  totalBorrowed: string;
  totalSupplied: string;
  healthFactor: string;
  ltv: string;
  markets: Market[];
  rewards: any[];
}

export interface Market {
  asset: Asset;
  market: string;
  misc: Misc;
  amountSupplied: string;
  amountBorrowed: string;
  ammountBorrowedInBaseAsset: string;
  amountSuppliedInBaseAsset: string;
  isCollateral: boolean;
  isBorrowEnabled: boolean;
  collateralFactor: string;
  borrowFactor: string;
  liquidationThreeshold: string;
  supplyApy: string;
  borrowApy: string;
  rewardTokens: any[];
  netRewardSupplyApy: number;
  netRewardBorrowApy: number;
  netSupplyApy: number;
  netBorrowApy: number;
  netApy: number;
}

export interface Asset {
  address: string;
  symbol: string;
  decimals: string;
  name: string;
}

export interface Misc {
  aTokenAddress: string;
  stableDebtTokenAddress: string;
  variableDebtTokenAddress: string;
}

interface MarketP {
  market: string;
  entryPoint: string;
  asset: {
    address: string;
    symbol: string;
    decimals: number | string;
    name: string;
  };
  supplyLiquidity: string;
  borrowLiquidity: string;
  supplyLiquidityInBaseAsset: string;
  borrowLiquidityInBaseAsset: string;
  collateralFactor: string;
  isBorrowEnabled: boolean;
  liquidationThreeshold: string;
  supplyApy: string;
  borrowApy: string;
  isCollateralEnabled: boolean;
  underlyingPrice: string;
  misc: {
    liquidationBonus: string;
    reserveFactor: string;
    stableBorrowRateEnabled: boolean;
    totalStableDebt: string;
    stableBorrowRate: string;
    averageStableBorrowRate: string;
    liquidityIndex: string;
    variableBorrowIndex: string;
    aTokenAddress: string;
    stableDebtTokenAddress: string;
    variableDebtTokenAddress: string;
  };
}

export interface ProtocolData {
  protocol: string;
  chainId: number;
  baseAsset: string;
  totalSuppliedInBaseAsset: string;
  totalBorrowedInBaseAsset: string;
  markets: MarketP[];
}


// Define the interface for the data
interface AdditionalInfo {
    chain: string;
    project: string;
    symbol: string;
    tvlUsd: number;
    apyBase: number | null;
    apyReward: number | null;
    apy: number;
    rewardTokens: string[];
    pool: string;
    projectName: string;
    url: string;
    totalSupplyUsd: number;
    totalBorrowUsd: number | null;
  }
  
  export interface RecommendationData {
    chain: string;
    project: string;
    supplyAsset: string;
    borrowAsset: string;
    supplyLiquidity: number;
    netApy: number;
    supplyApy: number;
    borrowApy: number;
    pool: string;
    availableLiquidity: number;
    borrowAssetSuppliedLiquidity: number;
    ltv: number;
    lt: number;
    ut: number;
    borrowAmount: string;
    additionalInfo: AdditionalInfo;
    score: number;
  }
  