import { motion } from 'framer-motion'
import { Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-muted footer py-6">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <p>&copy; 2024 CurrencyConvert</p>
        <motion.a
          href="https://github.com"
          className="text-primary hover:text-primary/80 flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Github className="inline-block mr-2" size={20} />
          GitHub
        </motion.a>
      </div>
    </footer>
  )
}