"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import type { SpinningCoinProps } from "@/types/arcade"

export const SpinningCoin = ({ size, speed = "normal" }: SpinningCoinProps) => {
  const [currentFrame, setCurrentFrame] = useState(1)

  useEffect(() => {
    const intervalDuration = speed === "fast" ? 80 : 160
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev % 5) + 1)
    }, intervalDuration)

    return () => clearInterval(interval)
  }, [speed])

  return (
    <div className="relative transition-all duration-300">
      <Image
        src={`/coin/coin-${currentFrame}.png`}
        alt="Spinning coin"
        width={size}
        height={size}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  )
}
