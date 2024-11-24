"use client";
import { AnimatedCurrencyBackground } from "./components/animatedcurrencybackground";
import CurrencyConverterCard from "./components/currencyconvertcard";
import Header from "./components/header";
import Footer from "./components/footer";


export default function Home() {
  return (
    <div className="page-container">
      <Header />
      <AnimatedCurrencyBackground />
      <div className="main-content">
        <CurrencyConverterCard />
      </div>
      <Footer />
    </div>
  );
}
