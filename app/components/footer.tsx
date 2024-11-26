"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { cn } from "@/lib/utils";

const Footer = ({ className, ...rest }: { className?: string }) => {
  return (
    <footer
      className={cn(
        "bg-black-500 text-primary-foreground py-6 relative z-10",
        className
      )}
      {...rest}
    >
      <div className="container bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-violet-500 font-bold mx-auto px-4 flex justify-between items-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          &copy; 2024 Currency Convert
        </motion.p>
        <motion.a
          href="https://github.com/EhsaasChaudhary/currency-exchange-submission"
          className="text-white bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-violet-500 font-bold hover:text-white/80 flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Github className="inline-block mr-2" size={20} />
          GitHub
        </motion.a>
      </div>
    </footer>
  );
};

export default React.memo(Footer);

