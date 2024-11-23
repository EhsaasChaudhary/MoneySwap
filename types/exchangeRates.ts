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
  
  export type { ExchangeRatesResponse }; // Named export for ExchangeRatesResponse
  
  interface ConversionResultModalProps {
    showModal: boolean;
    result: {
      conversionResult: string;
      fromCurrency: string;
      toCurrency: string;
    } | null; // Make it nullable if `result` might be null
    onClose: () => void;
  }
  
  export type { ConversionResultModalProps }; // Named export for ConversionResultModalProps
  