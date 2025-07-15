export interface Token {
  tokenAddress: string;
  name: string;
  symbol: string;
  logo: string | undefined;
  thumbnail: string | undefined;
  decimals: number;
  chain: string | undefined;
  balanceFormatted: string;
  usdPrice: string;
  usdValue: string;
}
