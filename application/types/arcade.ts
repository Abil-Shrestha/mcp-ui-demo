/**
 * Arcade and game-related type definitions
 */

// Game widget props and state types
export interface ArcadeGameWidgetProps {
  readonly routeGame?: string;
  readonly queryGame?: string;
}

export interface GameWidgetState extends Record<string, unknown> {
  readonly currentGame: string;
  readonly lastDisplayMode: "pip" | "inline";
  readonly sessionStartTime: number;
  readonly totalPlayTime: number;
}

export interface KeyboardControl {
  readonly action: string;
  readonly keys: readonly string[];
}

export type KnownKeyLabel =
  | "←"
  | "→"
  | "↑"
  | "↓"
  | "Space"
  | "Spacebar"
  | "Ctrl"
  | "Control"
;

// Arcade page component props
export interface SpinningCoinProps {
  readonly size: number;
  readonly speed?: "normal" | "fast";
}

export interface ArcadeGameCardProps {
  readonly name: string;
  readonly image?: string;
}

// MCP tool response types
export type GameInfo = {
  readonly name: string;
  readonly title: string;
  readonly description: string;
  readonly dosUrl: string;
};

export type ArcadeStructuredContent = {
  readonly games: ReadonlyArray<GameInfo>;
  [key: string]: unknown;
};

export type GameLauncherStructuredContent = {
  readonly game: string;
  readonly title: string;
  readonly dosUrl: string;
  [key: string]: unknown;
};
