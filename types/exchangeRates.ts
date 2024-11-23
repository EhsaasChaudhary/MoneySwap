export type ExchangeRates = {
    [currency: string]: number;
};

interface ExchangeRatesResponse {
    success: boolean;
    timestamp: number;
    base: string;
    date: string;
    rates: Record<string, number>;
  }
  
  export default ExchangeRatesResponse;