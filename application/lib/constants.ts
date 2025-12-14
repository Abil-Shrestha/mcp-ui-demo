import type { KnownKeyLabel } from "@/types/arcade";

// Game configuration
export const FALLBACK_GAME = "digger";

export const GAMES = [
  { name: "doom", image: "/doom.jpg" },
  { name: "digger", image: "/digger.jpg" },
] as const;

// JS-DOS URLs
export const DOS_BUNDLE_URL_TEMPLATE = "https://v8.js-dos.com/bundles";
export const DOS_CSS_URL = "https://v8.js-dos.com/latest/js-dos.css";
export const DOS_JS_URL = "https://v8.js-dos.com/latest/js-dos.js";

export const getDefaultDosUrl = (game: string): string =>
  `${DOS_BUNDLE_URL_TEMPLATE}/${game}.jsdos`;

// Canvas dimension constants
export const CANVAS_DIMENSIONS: {
  ASPECT_RATIO: number;
  BASE_WIDTH: number;
  BASE_HEIGHT: number;
  MIN_WIDTH: number;
  MIN_HEIGHT: number;
} = {
  ASPECT_RATIO: 2, // width:height = 2:1
  BASE_WIDTH: 600,
  BASE_HEIGHT: 300,
  MIN_WIDTH: 400,
  MIN_HEIGHT: 200,
};

// Scaling factors for different display modes
export const SCALE_FACTORS: {
  FULLSCREEN_HEIGHT: number;
  FULLSCREEN_MAX_HEIGHT: number;
  PIP_SCALE: number;
  MOBILE_SCALE: number;
  TABLET_SCALE: number;
} = {
  FULLSCREEN_HEIGHT: 0.7,
  FULLSCREEN_MAX_HEIGHT: 450,
  PIP_SCALE: 1.2,
  MOBILE_SCALE: 0.8,
  TABLET_SCALE: 0.9,
};

// Layout spacing constants
export const LAYOUT_SPACING: {
  HORIZONTAL_PADDING: number;
  ESTIMATED_CONTROLS_HEIGHT_WITH_KEYS: number;
  ESTIMATED_CONTROLS_HEIGHT_MINIMAL: number;
  BUTTON_PADDING_MOBILE: number;
  BUTTON_PADDING_DESKTOP: number;
  MESSAGE_TOP_OFFSET: number;
  SAFE_AREA_TOP_OFFSET: number;
} = {
  HORIZONTAL_PADDING: 40,
  ESTIMATED_CONTROLS_HEIGHT_WITH_KEYS: 120,
  ESTIMATED_CONTROLS_HEIGHT_MINIMAL: 60,
  BUTTON_PADDING_MOBILE: 12,
  BUTTON_PADDING_DESKTOP: 16,
  MESSAGE_TOP_OFFSET: 16,
  SAFE_AREA_TOP_OFFSET: 4,
};

// Timing constants
export const TIMING: {
  MESSAGE_DISPLAY_DURATION_MS: number;
  MESSAGE_DISPLAY_DURATION_LONG_MS: number;
  STATE_SYNC_INTERVAL_MS: number;
} = {
  MESSAGE_DISPLAY_DURATION_MS: 2000,
  MESSAGE_DISPLAY_DURATION_LONG_MS: 3000,
  STATE_SYNC_INTERVAL_MS: 30000,
};

// Keyboard mapping
export const KEY_LABEL_TO_EVENT_KEY: Record<KnownKeyLabel, string> = {
  "←": "ArrowLeft",
  "→": "ArrowRight",
  "↑": "ArrowUp",
  "↓": "ArrowDown",
  Space: " ",
  Spacebar: " ",
  Ctrl: "Control",
  Control: "Control"
};

// Event types
export const SET_GLOBALS_EVENT_TYPE = "openai:set_globals";
