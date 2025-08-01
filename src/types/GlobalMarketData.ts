export type GlobalCryptoData = {
  data: {
    active_cryptocurrencies: number;
    markets: number;
    ongoing_icos: number;
    ended_icos: number;
    upcoming_icos: number;
    updated_at: number;
    market_cap_change_percentage_24h_usd: number;
    market_cap_percentage: {
      btc: number;
      eth: number;
      usdt: number;
      bnb: number;
      usdc: number;
      xrp: number;
      doge: number;
    };
    total_market_cap: {
      usd: number;
      btc: number;
      eth: number;
      bnb: number;
      usdt: number;
      usdc: number;
      xrp: number;
      doge: number;
      sol: number;
      dot: number;
    };
    total_volume: {
      usd: number;
      btc: number;
      eth: number;
      bnb: number;
      usdt: number;
    };
  };
};
