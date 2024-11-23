"use client";
import { AnimatedCurrencyBackground } from "./components/animatedcurrencybackground";
import CurrencyConverterCard from "./components/currencyconvertcard";

export default function Home() {
  
  return (
    <div>
      <AnimatedCurrencyBackground />
      <CurrencyConverterCard />
    </div>
  );
}
