"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { useCallTool } from "@/app/hooks/use-call-tool"
import type { ArcadeGameCardProps } from "@/types/arcade"
import { cn } from "@/lib/utils"
import { SpinningCoin } from "@/components/spinning-coin"

export const ArcadeGameCard = ({ name, image }: ArcadeGameCardProps) => {
  const callTool = useCallTool()
  const [imageError, setImageError] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isInvokingTool, setIsInvokingTool] = useState(false)
  const [errorText, setErrorText] = useState<string | null>(null)

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      if (isInvokingTool) return

      setIsAnimating(true)
      setIsInvokingTool(true)
      setErrorText(null)

      try {
        const response = await callTool("launch_game", { game: name })
        if (!response) {
          setErrorText("Unable to launch game in this context.")
        }
      } catch (error) {
        console.error("[Arcade] Failed to call launch_game", error)
        setErrorText("Failed to launch game. Please try again.")
      } finally {
        setIsInvokingTool(false)
      }
    },
    [callTool, isInvokingTool, name]
  )

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-disabled={isInvokingTool}
    >
      <div
        className={cn(
          "group relative bg-black border-2 border-green-500 overflow-hidden transition-all duration-300 hover:border-orange-500 hover:shadow-[0_0_15px_rgba(255,165,0,0.6)] cursor-pointer rounded-md",
          "h-[150px] touch-manipulation",
          isAnimating ? "pointer-events-none" : "pointer-events-auto"
        )}
      >
        {image && !imageError ? (
          <>
            <Image
              src={image}
              alt={name}
              width={100}
              height={100}
              className="absolute inset-0 w-full h-full object-cover rounded-md"
              onError={() => setImageError(true)}
            />

            {/* CRT scanline effect overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,0,0.03)_2px,rgba(0,255,0,0.03)_4px)] z-10" />

            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/50 z-20" />


            <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-center gap-2 pb-3">
              {/* Spinning coin sprite animation */}
              <div className={`w-5 h-5 ${isAnimating ? "coin-bounce" : ""}`}>
                <SpinningCoin size={20} speed={isAnimating ? "fast" : "normal"} />
              </div>

              <span
                className={cn(
                  "font-sans uppercase tracking-wider text-xs font-black transition-all duration-300",
                  "text-green-500 drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]",
                  "group-hover:text-orange-500 group-hover:drop-shadow-[0_0_15px_rgba(255,165,0,1)]",
                  isAnimating && "insert-coin-animate"
                )}
              >
                Insert Coin
              </span>
            </div>
          </>
        ) : (
          <div className="relative z-10 p-3 flex flex-col justify-center h-full">
            <h3 className="font-sans font-black text-lg mb-2 text-green-500 uppercase tracking-wider drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]">
              {name}
            </h3>

            <div className="flex items-center justify-center">
              <div className={`w-8 h-8 ${isAnimating ? "coin-bounce" : ""}`}>
                <SpinningCoin size={32} speed={isAnimating ? "fast" : "normal"} />
              </div>
            </div>

            <p
              className={cn(
                "font-sans uppercase tracking-wider text-center mt-2 text-xs font-black transition-all duration-300",
                "text-green-500 drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]",
                "group-hover:text-orange-500 group-hover:drop-shadow-[0_0_15px_rgba(255,165,0,1)]",
                isAnimating && "insert-coin-animate"
              )}
            >
              Insert Coin
            </p>
          </div>
        )}
        {errorText && (
          <p className="mt-1 text-center text-xs text-red-400" role="alert">
            {errorText}
          </p>
        )}
      </div>
    </button>
  )
}
