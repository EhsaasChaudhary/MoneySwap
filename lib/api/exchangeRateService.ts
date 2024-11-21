import axios from "axios";

/**
 * Fetches the latest exchange rates for the specified currencies.
 * @param symbols - Comma-separated list of currency codes (e.g., "INR,USD,EUR").
 * @returns A Promise resolving to the latest exchange rates.
 */
export async function getLatestExchangeRates(symbols: string): Promise<any> {
  try {
    const response = await axios.get(`${process.env.API_BASE_URL}/latest`, {
      params: {
        access_key: process.env.ACCESS_KEY,
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
): Promise<any> {
  try {
    const response = await axios.get(`${process.env.API_BASE_URL}/${date}`, {
      params: {
        access_key: process.env.ACCESS_KEY,
        symbols,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching exchange rates for ${date}:`, error);
    throw error;
  }
}
