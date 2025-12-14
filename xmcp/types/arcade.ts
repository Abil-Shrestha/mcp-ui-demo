/**
 * Arcade and game-related type definitions for MCP tools
 */

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
