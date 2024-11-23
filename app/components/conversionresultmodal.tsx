import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, X } from 'lucide-react';
import CurrencyIcon from '../icons/currencycardicons';
import { ConversionResultModalProps } from '@/types/exchangeRates';

export default function ConversionResultModal({ showModal, result, onClose }: ConversionResultModalProps) {
  if (!result) return null; // Return nothing if result is null

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-background rounded-lg shadow-lg overflow-hidden max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <Card>
              <CardHeader className="relative">
                <CardTitle className="text-2xl text-center">Conversion Result</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={onClose}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center space-x-4 mb-4 items-center">
                  {/* Display From Currency */}
                  <CurrencyIcon currency={result.fromCurrency as keyof typeof CurrencyIcon} />
                  
                  <ArrowRightLeft className="text-primary" />
                  
                  {/* Display To Currency */}
                  <CurrencyIcon currency={result.toCurrency as keyof typeof CurrencyIcon} />
                </div>
                {/* Display Conversion Result */}
                <p className="text-center text-2xl font-bold">{result.conversionResult}</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
