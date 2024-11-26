"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Header = ({ className, ...rest }: { className?: string }) => {
  return (
    <header
      className={cn(
        "bg-black-500 text-primary-foreground py-6 relative z-10",
        className
      )}
      {...rest}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.h1
          className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-violet-500 font-bold"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          CurrencyConvert
        </motion.h1>
        <nav>
          {/* Add navigation items here if needed */}
        </nav>
      </div>
    </header>
  );
};

export default React.memo(Header);

