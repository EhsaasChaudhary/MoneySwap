import ExchangeRatesResponse from "@/types/exchangeRates";
import axios from "axios";

const BASE_URL = "https://data.fixer.io/api";
const ACCESS_KEY = "a08a92c377bc269b9568919d175b2302";

/**
 * Fetches the latest exchange rates for the specified currencies.
 * @param symbols - Comma-separated list of currency codes (e.g., "INR,USD,EUR").
 * @returns A Promise resolving to the latest exchange rates.
 */
export async function getLatestExchangeRates(
  symbols: string
): Promise<ExchangeRatesResponse> {
  try {
    const response = await axios.get<ExchangeRatesResponse>(`${BASE_URL}/latest`, {
      params: {
        access_key: ACCESS_KEY,
        symbols,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching latest exchange rates:", error);
    throw error;
  }
}

/**
 * Fetches historical exchange rates for a specific date and currencies.
 * @param date - The date in YYYY-MM-DD format (e.g., "2024-03-19").
 * @param symbols - Comma-separated list of currency codes (e.g., "INR,USD,EUR").
 * @returns A Promise resolving to the historical exchange rates for the given date.
 */
export async function getHistoricalExchangeRates(
  date: string,
  symbols: string
): Promise<ExchangeRatesResponse> {
  try {
    const response = await axios.get<ExchangeRatesResponse>(`${BASE_URL}/${date}`, {
      params: {
        access_key: ACCESS_KEY,
        symbols,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching exchange rates for ${date}:`, error);
    throw error;
  }
}
