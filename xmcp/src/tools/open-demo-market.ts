import { baseURL } from "@/lib/base-url";
import { TOOL_MESSAGES, TOOL_NAMES, WIDGET_PATHS } from "@/lib/constants";
import { getAppsSdkCompatibleHtml } from "@/lib/utils";
import { InferSchema, type ToolMetadata } from "xmcp";
import { z } from "zod";

export const metadata: ToolMetadata = {
  name: TOOL_NAMES.OPEN_DEMO_MARKET,
  description: "Opens a fake Polymarket-style trading UI (simulated) inside ChatGPT.",
  annotations: {
    readOnlyHint: true,
  },
  _meta: {
    openai: {
      widgetAccessible: true,
      resultCanProduceWidget: true,
      toolInvocation: {
        invoking: TOOL_MESSAGES.OPEN_DEMO_MARKET.INVOKING,
        invoked: TOOL_MESSAGES.OPEN_DEMO_MARKET.INVOKED,
      },
    },
  },
};

export const schema = {
  market: z.string().optional().describe("Optional market label"),
};

export default async function handler({
  market,
}: InferSchema<typeof schema>): Promise<string> {
  const label = market?.trim() || "Will it rain in NYC tomorrow?";
  const html = await getAppsSdkCompatibleHtml(
    baseURL,
    `${WIDGET_PATHS.MARKET}?market=${encodeURIComponent(label)}`,
  );
  return html;
}
