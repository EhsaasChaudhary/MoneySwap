import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft } from "lucide-react";
import { motion } from "framer-motion";
import CurrencyIcon from "../icons/currencycardicons";
import { getLatestExchangeRates } from "@/lib/api/exchangeRateService";
import { convertCurrency } from "@/utils/convertCurrency";
import ConversionResultModal from "./conversionresultmodal";

export default function CurrencyConverterCard() {
  const [amount, setAmount] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("INR");
  const [result, setResult] = useState<{
    conversionResult: string;
    fromCurrency: string;
    toCurrency: string;
  } | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);

  const [showModal, setShowModal] = useState<boolean>(false); // State to handle modal visibility

  const allCurrencies = [
    "AED",
    "AFN",
    "ALL",
    "AMD",
    "ANG",
    "AOA",
    "ARS",
    "AUD",
    "AWG",
    "AZN",
    "BAM",
    "BBD",
    "BDT",
    "BGN",
    "BHD",
    "BIF",
    "BMD",
    "BND",
    "BOB",
    "BRL",
    "BSD",
    "BTN",
    "BWP",
    "BYN",
    "BZD",
    "CAD",
    "CDF",
    "CHF",
    "CLP",
    "CNY",
    "COP",
    "CRC",
    "CUC",
    "CUP",
    "CVE",
    "CZK",
    "DJF",
    "DKK",
    "DOP",
    "DZD",
    "EGP",
    "ERN",
    "ETB",
    "EUR",
    "FJD",
    "FKP",
    "GBP",
    "GEL",
    "GGP",
    "GHS",
    "GIP",
    "GMD",
    "GNF",
    "GTQ",
    "GYD",
    "HKD",
    "HNL",
    "HRK",
    "HTG",
    "HUF",
    "IDR",
    "ILS",
    "IMP",
    "INR",
    "IQD",
    "IRR",
    "ISK",
    "JEP",
    "JMD",
    "JOD",
    "JPY",
    "KES",
    "KGS",
    "KHR",
    "KMF",
    "KPW",
    "KRW",
    "KWD",
    "KYD",
    "KZT",
    "LAK",
    "LBP",
    "LKR",
    "LRD",
    "LSL",
    "LYD",
    "MAD",
    "MDL",
    "MGA",
    "MKD",
    "MMK",
    "MNT",
    "MOP",
    "MRU",
    "MUR",
    "MWK",
    "MXN",
    "MYR",
    "MZN",
    "NAD",
    "NGN",
    "NIO",
    "NOK",
    "NPR",
    "NZD",
    "OMR",
    "PAB",
    "PEN",
    "PGK",
    "PHP",
    "PKR",
    "PLN",
    "PYG",
    "QAR",
    "RON",
    "RSD",
    "RUB",
    "RWF",
    "SAR",
    "SBD",
    "SCR",
    "SDG",
    "SEK",
    "SGD",
    "SHP",
    "SLL",
    "SOS",
    "SRD",
    "SYP",
    "SZL",
    "THB",
    "TJS",
    "TMT",
    "TND",
    "TOP",
    "TRY",
    "TTD",
    "TWD",
    "TZS",
    "UAH",
    "UGX",
    "USD",
    "UYU",
    "UZS",
    "VES",
    "VND",
    "VUV",
    "WST",
    "XAF",
    "XCD",
    "XOF",
    "XPF",
    "YER",
    "ZAR",
    "ZMW",
  ];


  const fetchRates = async () => {
    try {
      // setError(null); // Clear any previous error
      const data = await getLatestExchangeRates(); // Fetch all currency rates
  
      console.log("Fetched data:", data);
      console.log("Fetched data rates:", data.rates);
  
      // Ensure `fromCurrency` and `toCurrency` are present in the response
      if (data.rates && data.rates[fromCurrency] && data.rates[toCurrency]) {
        const filteredRates = {
          [fromCurrency]: data.rates[fromCurrency],
          [toCurrency]: data.rates[toCurrency],
        };
  
        console.log("Filtered rates:", filteredRates);
        return filteredRates; // Return the filtered rates
      } else {
        throw new Error(
          `One or both currencies (${fromCurrency}, ${toCurrency}) not found in rates.`
        );
      }
    } catch (err) {
      // setError("Failed to fetch exchange rates. Please try again later.");
      console.error("Error fetching rates:", err);
      return null;
    }
  };
  

  const handleFetchAndConvert = async () => {
    setLoading(true);
    try {
      const ratesData = await fetchRates(); // Fetch the rates
      if (ratesData) {
        // Perform conversion only if rates are successfully fetched
        if (!amount || !fromCurrency || !toCurrency) {
          setResult({
            conversionResult: "Please fill in all fields.",
            fromCurrency: "",
            toCurrency: "",
          });
          return;
        }

        if (!ratesData[fromCurrency] || !ratesData[toCurrency]) {
          setResult({
            conversionResult: "Conversion rate unavailable. Please try again.",
            fromCurrency: "",
            toCurrency: "",
          });
          return;
        }

        const conversionRate = convertCurrency(
          ratesData,
          fromCurrency,
          toCurrency
        );
        const convertedAmount = parseFloat(amount) * conversionRate;
        const conversionResult = `${convertedAmount.toFixed(2)} ${toCurrency}`;
        console.log("Conversion result:", conversionResult);

        setResult({
          conversionResult,
          fromCurrency,
          toCurrency,
        });
        setShowModal(true); // Open the modal with the result
      }
    } finally {
      setLoading(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
  };


  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="max-w-md mx-auto backdrop-blur-sm bg-white/80">
        <CardHeader>
          <CardTitle className="text-2xl">Currency Converter</CardTitle>
          <CardDescription>
            Convert between different currencies with ease
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder="From" />
                  </SelectTrigger>
                  <SelectContent>
                    {allCurrencies.map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        <div className="flex items-center">
                          <CurrencyIcon
                            currency={currency as keyof typeof CurrencyIcon}
                          />
                          <span className="ml-2">{currency}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <motion.div
                whileHover={{ scale: 1.2, rotate: 180 }}
                whileTap={{ scale: 0.8 }}
                onClick={swapCurrencies}
                className="cursor-pointer"
              >
                <ArrowRightLeft className="text-primary" />
              </motion.div>
              <div className="flex-1">
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder="To" />
                  </SelectTrigger>
                  <SelectContent>
                    {allCurrencies.map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        <div className="flex items-center">
                          <CurrencyIcon
                            currency={currency as keyof typeof CurrencyIcon}
                          />
                          <span className="ml-2">{currency}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg"
            />
            <Button
              onClick={handleFetchAndConvert}
              className="w-full text-lg"
              disabled={loading}
            >
              {loading ? "Converting..." : "Convert"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Include the modal component */}
      <ConversionResultModal
        showModal={showModal}
        result={result}
        onClose={() => setShowModal(false)} // Close the modal
      />
    </motion.div>
  );
}
