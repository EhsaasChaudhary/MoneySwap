"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

export const AnimatedBackground = ({
  icons,
  quantity,
  size = { min: 10, max: 20 },
  speed = { min: 0.5, max: 2 },
  opacity = { min: 0.5, max: 1 },
  className,
}: {
  icons: { icon: React.ElementType; name: string }[]
  quantity: number
  size?: { min: number; max: number }
  speed?: { min: number; max: number }
  opacity?: { min: number; max: number }
  className?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const isInView = useInView(containerRef)
  const controls = useAnimation()

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      })
    }
  }, [])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const iconElements = Array.from({ length: quantity }, (_, index) => {
    const Icon = icons[index % icons.length].icon
    const iconSize = Math.random() * (size.max - size.min) + size.min
    const xPosition = Math.random() * dimensions.width
    const yPosition = Math.random() * dimensions.height
    const animationDuration = (Math.random() * (speed.max - speed.min) + speed.min) * 10

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: xPosition, y: yPosition, scale: 1 }}
        animate={{
          opacity: [
            Math.random() * (opacity.max - opacity.min) + opacity.min,
            Math.random() * (opacity.max - opacity.min) + opacity.min,
          ],
          x: [xPosition, xPosition + Math.random() * 50 - 10],
          y: [yPosition, yPosition + Math.random() * 50 - 10],
        }}
        transition={{
          duration: animationDuration,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          position: "absolute",
          fontSize: iconSize,
        }}
      >
        <Icon />
      </motion.div>
    )
  })

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      {iconElements}
    </div>
  )
}

