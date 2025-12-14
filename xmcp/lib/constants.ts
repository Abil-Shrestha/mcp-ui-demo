// Supported games configuration
export const SUPPORTED_GAMES = {
  doom: {
    title: "DOOM",
    dosUrl: "https://v8.js-dos.com/bundles/doom.jsdos",
    description: "Battle the forces of hell in the classic 1993 FPS.",
  },
  digger: {
    title: "Digger",
    dosUrl: "https://v8.js-dos.com/bundles/digger.jsdos",
    description: "Collect gems and dodge monsters in an arcade staple.",
  },
} as const;

export type SupportedGame = keyof typeof SUPPORTED_GAMES;

// Widget paths
export const WIDGET_PATHS = {
  LAUNCH_GAME: "/widgets/launch-game",
  ARCADE: "/widgets/arcade",
  MARKET: "/widgets/market",
} as const;

// Tool names
export const TOOL_NAMES = {
  LAUNCH_GAME: "launch_game",
  ARCADE: "arcade",
  OPEN_DEMO_MARKET: "open_demo_market",
} as const;

// Tool invocation messages
export const TOOL_MESSAGES = {
  LAUNCH_GAME: {
    INVOKING: "Loading game...",
    INVOKED: "Game launched successfully",
  },
  ARCADE: {
    INVOKING: "Loading arcade...",
    INVOKED: "Arcade loaded",
  },
  OPEN_DEMO_MARKET: {
    INVOKING: "Opening market...",
    INVOKED: "Market opened",
  },
} as const;
