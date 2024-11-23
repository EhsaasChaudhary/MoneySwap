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

  const [rates, setRates] = useState<{ [key: string]: number }>({});
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [showModal, setShowModal] = useState<boolean>(false); // State to handle modal visibility

  const fetchRates = async () => {
    try {
      setError(null);
      const data = await getLatestExchangeRates(`${fromCurrency},${toCurrency}`);
      setRates(data.rates);
      console.log("Fetched rates:", data);
    } catch (err) {
      setError("Failed to fetch exchange rates. Please try again later.");
      console.error("Error fetching rates:", err);
    }
  };

  const handleConvert = () => {
    if (!amount || !fromCurrency || !toCurrency) {
      setResult("Please fill in all fields.");
      return;
    }

    if (!rates[fromCurrency] || !rates[toCurrency]) {
      setResult("Conversion rate unavailable. Please try again.");
      return;
    }

    const conversionRate = convertCurrency(rates, fromCurrency, toCurrency);
    const convertedAmount = parseFloat(amount) * conversionRate;
    const conversionResult = `${convertedAmount.toFixed(2)} ${toCurrency}`;
    console.log("Conversion result:", conversionResult);
    setResult(conversionResult);
    setShowModal(true); // Open the modal with the result
  };

  const handleFetchAndConvert = async () => {
    setLoading(true);
    try {
      await fetchRates();
      handleConvert();
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
    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
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
                    {["USD", "EUR", "INR", "JPY"].map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        <div className="flex items-center">
                          <CurrencyIcon currency={currency as keyof typeof CurrencyIcon} />
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
                    {["USD", "EUR", "INR", "JPY"].map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        <div className="flex items-center">
                          <CurrencyIcon currency={currency as keyof typeof CurrencyIcon} />
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
            {error && <div className="text-red-500 text-center">{error}</div>}
          </div>
        </CardContent>
      </Card>

      {/* Include the modal component */}
      <ConversionResultModal
        showModal={showModal}
        result={result || ""}
        onClose={() => setShowModal(false)} // Close the modal
      />
    </motion.div>
  );
}

