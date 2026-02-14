import { baseURL } from "@/lib/base-url";
import { getAppsSdkCompatibleHtml } from "@/lib/utils";
import type { GameLauncherStructuredContent } from "@/types/arcade";
import { InferSchema, type ToolMetadata } from "xmcp";
import { z } from "zod";
import {
  SUPPORTED_GAMES,
  WIDGET_PATHS,
  TOOL_NAMES,
  TOOL_MESSAGES,
  type SupportedGame,
} from "@/lib/constants";

// Define tool metadata
export const metadata: ToolMetadata = {
  name: TOOL_NAMES.LAUNCH_GAME,
  description:
    "Launches a classic arcade game in the retro arcade emulator",
  annotations: {
    readOnlyHint: true,
  },
  _meta: {
    openai: {
      widgetAccessible: true,
      resultCanProduceWidget: true,
      toolInvocation: {
        invoking: TOOL_MESSAGES.LAUNCH_GAME.INVOKING,
        invoked: TOOL_MESSAGES.LAUNCH_GAME.INVOKED,
      },
    },
  },
};

export const schema = {
  game: z
    .enum(["doom", "digger"])
    .describe("The name of the arcade game to launch"),
};

const fetchWidgetShell = async (): Promise<string> => {
  return await getAppsSdkCompatibleHtml(baseURL, WIDGET_PATHS.LAUNCH_GAME);
};

export default async function handler({
  game,
}: InferSchema<typeof schema>): Promise<string> {
  if (!game) {
    console.warn("[launch_game] Missing game argument. Returning widget shell only.");
    return await fetchWidgetShell();
  }

  const normalizedGame = game.toLowerCase();

  // We fetch the widget HTML with the game as a query parameter
  // so that the widget knows which game to launch.
  // Note: We return the HTML string directly because returning a JSON object
  // (even with structuredContent) does not trigger the widget rendering in ChatGPT.
  const html = await getAppsSdkCompatibleHtml(
    baseURL,
    `${WIDGET_PATHS.LAUNCH_GAME}?game=${normalizedGame}`
  );

  return html;
}
