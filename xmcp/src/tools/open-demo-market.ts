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

  const targetBaseUrl = (
    process.env.BASE_URL ??
    process.env.UI_BASE_URL ??
    baseURL
  ).replace(/\/$/, "");

  const path = `${WIDGET_PATHS.MARKET}?market=${encodeURIComponent(label)}&__ts=${Date.now()}`;

  try {
    const res = await fetch(`${targetBaseUrl}${path}`);
    const html = await res.text();

    if (!res.ok || !html.trim()) {
      return `<!doctype html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Widget fetch failed</title>
        <style>body{font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial;margin:0;padding:16px;background:#0f1623;color:#f3f4f6}code{word-break:break-all}a{color:#7dd3fc}</style>
      </head><body>
        <h2>Widget fetch failed</h2>
        <p>Status: <b>${res.status}</b></p>
        <p>URL: <code>${targetBaseUrl}${path}</code></p>
        <p>This usually means your <b>xmcp</b> Vercel project is missing <code>BASE_URL</code> pointing to your <b>application</b> Vercel URL.</p>
        <p>Set <code>BASE_URL</code> in the xmcp project to something like: <code>https://&lt;your-ui&gt;.vercel.app</code> then redeploy.</p>
        <hr />
        <pre style="white-space:pre-wrap;opacity:.8">${html.slice(0, 1000)}</pre>
      </body></html>`;
    }

    return html;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return `<!doctype html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Widget fetch error</title>
      <style>body{font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial;margin:0;padding:16px;background:#0f1623;color:#f3f4f6}code{word-break:break-all}</style>
    </head><body>
      <h2>Widget fetch error</h2>
      <p>Error: <code>${msg}</code></p>
      <p>BASE_URL used: <code>${targetBaseUrl}</code></p>
      <p>Path: <code>${path}</code></p>
    </body></html>`;
  }
}
