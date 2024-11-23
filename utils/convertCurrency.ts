import { ExchangeRates } from "@/types/exchangeRates";

/**
 * Calculates the conversion rate between two currencies using EUR as the base.
 * @param rates - Object containing exchange rates relative to EUR.
 * @param fromCurrency - The currency you want to convert from (e.g., "USD").
 * @param toCurrency - The currency you want to convert to (e.g., "INR").
 * @returns The conversion rate from `fromCurrency` to `toCurrency`.
 */
export function convertCurrency(
    rates: ExchangeRates,
    fromCurrency: string,
    toCurrency: string
): number {
    if (!rates[fromCurrency] || !rates[toCurrency]) {
        throw new Error(`Exchange rate for ${fromCurrency} or ${toCurrency} is not available.`);
    }
    return rates[toCurrency] / rates[fromCurrency];
}
