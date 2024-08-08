export interface Token {
  decimals: number;
  logo: string | null;
  name: string;
  symbol: string;
  address: string;
}

// TODO: Both APIs should have "address" as the key
export interface TokenBalance extends Omit<Token, "address"> {
  contractAddress: string;
  tokenBalance: string;
}
