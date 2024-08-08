export interface BaseRequest {
  actionType: 'recommendation' | 'protocolAction' | 'userData' | 'protocolData';
}

export interface RecommendationRequest extends BaseRequest {
  chainIds: string[];
  supplyAsset: string;
  borrowAsset?: string;
  borrowAmount?: string;
  isOnlySupply: boolean;
  riskRating?: string;
  parameters: string[];
}

export interface ProtocolActionRequest extends BaseRequest {
  type: 'supply' | 'borrow' | 'withdraw' | 'repay';
  protocol: string;
  assetSymbol: string;
  assetAddress: string;
  chainId: number;
  amount: string;
  userAddress: string;
  misc?: Record<string, any>;
}

export interface ProtocolDataRequest extends BaseRequest {
  chainId: string;
  protocol: string;
}

export interface UserDataRequest extends BaseRequest {
  userAddress: string;
  chainId: string;
  protocol: string;
}

export type RequestObject =
  | RecommendationRequest
  | ProtocolActionRequest
  | ProtocolDataRequest
  | UserDataRequest;
