import { type ToolMetadata } from "xmcp";
import { baseURL } from "@/lib/base-url";
import { getAppsSdkCompatibleHtml } from "@/lib/utils";
import { TOOL_NAMES, TOOL_MESSAGES, WIDGET_PATHS } from "@/lib/constants";

export const metadata: ToolMetadata = {
  name: TOOL_NAMES.ARCADE,
  description:
    "Shows the retro arcade game selection interface",
  annotations: {
    readOnlyHint: true,
  },
  _meta: {
    openai: {
      widgetAccessible: true,
      resultCanProduceWidget: true,
      toolInvocation: {
        invoking: TOOL_MESSAGES.ARCADE.INVOKING,
        invoked: TOOL_MESSAGES.ARCADE.INVOKED,
      },
    },
  },
};

// Tool implementation
export default async function handler() {
  const html = await getAppsSdkCompatibleHtml(baseURL, WIDGET_PATHS.ARCADE);
  return html;
}
