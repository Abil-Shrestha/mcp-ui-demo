# xmcp Retro Arcade

A retro arcade game launcher built with Next.js and the Model Context Protocol (MCP), allowing you to play classic DOS games like DOOM and Digger directly through ChatGPT.

## Features

- 🎮 **Classic DOS Games** - Play DOOM and Digger with authentic retro styling
- 🕹️ **Interactive Widgets** - Rich, interactive game interface rendered in ChatGPT
- 🎯 **MCP Integration** - Tools that ChatGPT can invoke to launch games
- 💾 **State Persistence** - Widget state survives across display mode changes
- 📱 **Responsive Design** - Adapts to mobile, tablet, and desktop with safe area support
- 🎨 **Retro Aesthetics** - Pixel art styling with authentic arcade vibes

## Architecture

This project consists of two parts:

### 1. Next.js Application (`/application`)
The frontend that renders game widgets with:
- DOS game emulator integration (js-dos)
- OpenAI Apps SDK hooks for ChatGPT integration
- Responsive arcade-style UI components
- Display mode controls (inline, PiP, fullscreen)

### 2. MCP Server (`/xmcp`)
The backend that exposes tools to ChatGPT:
- `arcade` - Shows the game selection interface
- `launch_game` - Launches a specific game (doom, digger)

## Getting Started

### Prerequisites

```bash
pnpm install
```

### Development

Start the Next.js application:

```bash
cd application
pnpm dev
```

The app runs on `http://localhost:3009`.

Start the MCP server:

```bash
cd xmcp
pnpm dev
```

### Building for Production

Build the application:

```bash
cd application
pnpm build
```

Build the MCP server:

```bash
cd xmcp
pnpm build
```

## Project Structure

```
application/
├── app/
│   ├── hooks/           # OpenAI SDK React hooks
│   ├── widgets/         # Game widget pages
│   │   ├── arcade/      # Game selection interface
│   │   └── launch-game/ # Game launcher widget
│   ├── layout.tsx       # Root layout with SDK bootstrap
│   └── page.tsx         # Landing page
├── components/
│   ├── arcade-game-widget.tsx  # Main game component
│   ├── Navigation.tsx          # App navigation
│   └── ui/                     # UI components
├── lib/
│   ├── types.ts         # TypeScript types
│   └── utils.ts         # Utility functions
└── public/
    ├── coin/            # Animated coin sprites
    ├── doom.jpg         # Game thumbnails
    └── digger.jpg

xmcp/
├── src/
│   └── tools/
│       ├── arcade.ts         # Arcade selection tool
│       └── game-launcher.ts  # Game launch tool
└── lib/
    ├── types.ts         # Shared types
    └── utils.ts         # MCP utilities
```

## How It Works

1. **User asks ChatGPT** to show the arcade or launch a game
2. **ChatGPT invokes** the appropriate MCP tool (`arcade` or `launch_game`)
3. **MCP server returns** structured data and widget HTML
4. **ChatGPT renders** the widget in an iframe
5. **Widget displays** the game using js-dos emulator
6. **User interacts** with the game using keyboard controls

## Supported Games

- **DOOM** (1993) - Classic first-person shooter
  - Controls: WASD (movement), Arrow keys (camera), Ctrl (shoot), Space (interact)
  
- **Digger** (1983) - Arcade gem collector
  - Controls: Arrow keys (movement)

## Technology Stack

- **Framework:** Next.js 15.5.4 with Turbopack
- **Runtime:** React 19.1.0
- **MCP:** xmcp framework for tool definitions
- **Emulator:** js-dos 8.3.20
- **UI:** Tailwind CSS 4 + Radix UI components
- **Controls:** keycap library for keyboard display

## Deployment

Deploy the application to Vercel:

```bash
cd application
vercel deploy
```

Deploy the MCP server:

```bash
cd xmcp
pnpm build
pnpm start
```

Configure the MCP server URL in ChatGPT settings to connect the tools.

## Learn More

- [xmcp Documentation](https://xmcp.dev/docs)
- [OpenAI Apps SDK](https://developers.openai.com/apps-sdk)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [js-dos Documentation](https://js-dos.com)
