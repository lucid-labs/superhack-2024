export interface MessageResponse {
    message: string;
    userData?: UserData;
    isExecutable: boolean;
}


export interface UserData {
    protocol:       string;
    baseAsset:      string;
    userAddress:    string;
    borrowCapacity: string;
    totalBorrowed:  string;
    totalSupplied:  string;
    healthFactor:   string;
    ltv:            string;
    markets:        Market[];
    rewards:        any[];
}

export interface Market {
    asset:                      Asset;
    market:                     string;
    misc:                       Misc;
    amountSupplied:             string;
    amountBorrowed:             string;
    ammountBorrowedInBaseAsset: string;
    amountSuppliedInBaseAsset:  string;
    isCollateral:               boolean;
    isBorrowEnabled:            boolean;
    collateralFactor:           string;
    borrowFactor:               string;
    liquidationThreeshold:      string;
    supplyApy:                  string;
    borrowApy:                  string;
    rewardTokens:               any[];
    netRewardSupplyApy:         number;
    netRewardBorrowApy:         number;
    netSupplyApy:               number;
    netBorrowApy:               number;
    netApy:                     number;
}

export interface Asset {
    address:  string;
    symbol:   string;
    decimals: string;
    name:     string;
}

export interface Misc {
    aTokenAddress:            string;
    stableDebtTokenAddress:   string;
    variableDebtTokenAddress: string;
}