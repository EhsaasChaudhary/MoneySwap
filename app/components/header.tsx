import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className="bg-primary header text-primary-foreground py-6">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-3xl font-bold"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 120 }}
        >
          CurrencyConvert
        </motion.h1>
      </div>
    </header>
  )
}