"use client";

import CurrencyConverterCard from "./components/currencyconvertcard";
import Header from "./components/header";
import Footer from "./components/footer";
import { Boxes } from "@/components/ui/background-boxes";
import { AnimatedCurrencyBackground } from "./components/animatedcurrencybackground";


export default function Home() {
  return (
    <div className="page-container bg-slate-900 ">
      <Header />
      <AnimatedCurrencyBackground />
      <Boxes/>
      <div className="main-content">
        <CurrencyConverterCard />
      </div>
      <Footer />
    </div>
  );
}
