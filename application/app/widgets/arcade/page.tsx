"use client"

import { useToolOutput } from "@/app/hooks/use-tool-output"
import { ArcadeGameWidget } from "@/components/arcade-game-widget"
import { ArcadeGameCard } from "@/components/arcade-game-card"
import type { GameLauncherStructuredContent } from "@/types/arcade"
import { GAMES } from "@/lib/constants"

export default function ArcadePage() {
  const toolOutput = useToolOutput<GameLauncherStructuredContent>()

  // If a game has been launched, show the game widget
  if (toolOutput?.game) {
    return <ArcadeGameWidget />
  }

  // Otherwise, show the game selection interface
  return (
    <div
      className="bg-black p-3 mx-auto my-2 w-[600px] h-[450px] min-w-[600px] min-h-[450px] max-w-[600px] max-h-[450px] box-border"
    >
      <div className="h-full overflow-y-auto flex flex-col items-center justify-center">
        <div className="grid grid-cols-2 gap-3 w-full">
          {GAMES.map((game) => (
            <ArcadeGameCard
              key={game.name}
              name={game.name}
              image={game.image}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
