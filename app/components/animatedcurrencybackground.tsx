"use client"

import { AnimatedBackground } from '@/components/ui/animatedbackground'
import { currencyIcons } from '../icons/currencyicons'

export function AnimatedCurrencyBackground() {
  return (
    <div className="h-screen w-full animated-background bg-black relative overflow-hidden">
      <AnimatedBackground
        icons={currencyIcons}
        quantity={50}
        size={{ min: 20, max: 40 }}
        speed={{ min: 0.5, max: 1 }}
        opacity={{ min: 0.5, max: 0.8 }}
        className="text-white"
      />
    </div>
  )
}

