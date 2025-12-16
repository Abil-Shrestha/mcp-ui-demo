"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Button } from "@/components/ui/button";
import { PictureInPicture2 } from "lucide-react";
import Script from "next/script";
import { Keycap } from "keycap";
import { useRequestDisplayMode } from "@/app/hooks/use-request-display-mode";
import { useWidgetState } from "@/app/hooks/use-widget-state";
import { useToolOutput } from "@/app/hooks/use-tool-output";
import { useMaxHeight } from "@/app/hooks/use-max-height";
import type {
  GameLauncherStructuredContent,
  KeyboardControl,
  GameWidgetState,
  KnownKeyLabel,
} from "@/types/arcade";
import { cn } from "@/lib/utils";
import {
  KEY_LABEL_TO_EVENT_KEY,
  FALLBACK_GAME,
  CANVAS_DIMENSIONS,
  LAYOUT_SPACING,
  TIMING,
  DOS_CSS_URL,
  DOS_JS_URL,
  getDefaultDosUrl,
} from "@/lib/constants";

const deriveActiveKey = (label: string): string => {
  const normalizedLabel = label.trim();
  const mappedKey =
    KEY_LABEL_TO_EVENT_KEY[normalizedLabel as KnownKeyLabel];

  if (mappedKey) {
    return mappedKey;
  }

  if (/^[a-z0-9]$/i.test(normalizedLabel) && normalizedLabel.length === 1) {
    return normalizedLabel.toLowerCase();
  }

  return normalizedLabel;
};

interface ArcadeGameWidgetProps {
  initialGame?: string;
}

export function ArcadeGameWidget({ initialGame }: ArcadeGameWidgetProps) {
  
  const [dosLoaded, setDosLoaded] = useState(false);
  const [displayModeTransitioning, setDisplayModeTransitioning] =
    useState(false);
  const [displayModeMessage, setDisplayModeMessage] = useState<string | null>(
    null
  );
  const dosRef = useRef<HTMLDivElement>(null);
  const dosInstanceRef = useRef<any>(null);
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const requestDisplayMode = useRequestDisplayMode();
  const toolOutput = useToolOutput<GameLauncherStructuredContent>();
  const maxHeight = useMaxHeight();

  // const normalizedRouteGame = routeGame?.toLowerCase();
  // const normalizedQueryGame = queryGame?.toLowerCase();
  const normalizedToolGame = toolOutput?.game?.toLowerCase();
  const normalizedInitialGame = initialGame?.toLowerCase();

  const isGuidedFromTool = Boolean(toolOutput?.game) || Boolean(initialGame);
  const game =
    normalizedToolGame ??
    normalizedInitialGame ??
    FALLBACK_GAME;

  const dosUrl = toolOutput?.dosUrl ?? getDefaultDosUrl(game);

  // Calculate canvas dimensions based on available space
  const canvasDimensions = useMemo(() => {
    let width = CANVAS_DIMENSIONS.BASE_WIDTH;
    let height = CANVAS_DIMENSIONS.BASE_HEIGHT;

    // Constrain by maxHeight if available for the keyboard controls
    if (maxHeight) {
      const estimatedControlsHeight = game === "doom" || game === "digger"
        ? LAYOUT_SPACING.ESTIMATED_CONTROLS_HEIGHT_WITH_KEYS
        : LAYOUT_SPACING.ESTIMATED_CONTROLS_HEIGHT_MINIMAL;

      const availableHeight = maxHeight - estimatedControlsHeight;

      if (height > availableHeight) {
        height = Math.max(availableHeight, CANVAS_DIMENSIONS.MIN_HEIGHT);
        width = height * CANVAS_DIMENSIONS.ASPECT_RATIO;
      }
    }

    // Ensure minimum dimensions for the canvas
    width = Math.max(width, CANVAS_DIMENSIONS.MIN_WIDTH);
    height = Math.max(height, CANVAS_DIMENSIONS.MIN_HEIGHT);

    return {
      width: Math.round(width),
      height: Math.round(height),
    };
  }, [maxHeight, game]);

  const keyboardControls = useMemo<readonly KeyboardControl[] | null>(() => {
    if (game === "doom") {
      return [
        {
          action: "movement",
          keys: ["W", "A", "S", "D"],
        },
        {
          action: "camera",
          keys: ["←", "→"],
        },
        {
          action: "shoot",
          keys: ["Ctrl"],
        },
        {
          action: "interact",
          keys: ["Space"],
        },
      ];
    }

    if (game === "digger") {
      return [
        {
          action: "movement (fully mapped)",
          keys: ["↑", "↓", "←", "→"],
        },
      ];
    }

    return null;
  }, [game]);

  // Persistent widget state across display mode changes
  const [widgetState, setWidgetState] = useWidgetState<GameWidgetState>(() => ({
    currentGame: game,
    lastDisplayMode: "inline",
    sessionStartTime: Date.now(),
    totalPlayTime: 0,
  }));

  useEffect(() => {
    const initDisplayMode = async (): Promise<void> => {
      try {
        const result = await requestDisplayMode("inline");

        if (result.mode !== "inline") {
          setDisplayModeMessage(`Using ${result.mode} mode`);
          setTimeout(() => setDisplayModeMessage(null), TIMING.MESSAGE_DISPLAY_DURATION_LONG_MS);
        }
      } catch {
        // Silent error handling
      }
    };

    initDisplayMode();
  }, [requestDisplayMode]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Dos) {
      setDosLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (dosLoaded && dosRef.current && typeof window !== "undefined") {
      if (window.Dos && !dosInstanceRef.current) {
        try {
          dosInstanceRef.current = (window.Dos as any)(dosRef.current, {
            url: dosUrl,
            theme: "black",
            backendLocked: true,
            mouseCapture: false,
            mouseSensitivity: 0.8,
            autoStart: true,
            noNetworking: false,
            noCursor: true,
            renderAspect: "Fit",
          });
        } catch {
          // Silent error handling
        }
      }
    }

    return () => {
      if (dosInstanceRef.current) {
        dosInstanceRef.current.stop();
        dosInstanceRef.current = null;
      }
      if (dosRef.current) {
        dosRef.current.innerHTML = "";
      }
    };
  }, [dosLoaded, dosUrl]);

  useEffect(() => {
    if (!widgetState || !dosLoaded) return;

    const interval = setInterval(() => {
      const currentPlayTime = Date.now() - widgetState.sessionStartTime;
      const totalTime = widgetState.totalPlayTime + currentPlayTime;

      setWidgetState({
        ...widgetState,
        totalPlayTime: totalTime,
      });
    }, TIMING.STATE_SYNC_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [widgetState, dosLoaded, setWidgetState]);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
    };
  }, [game, widgetState]);

  // Notify ChatGPT of widget height to prevent scroll clipping
  useEffect(() => {
    if (!widgetContainerRef.current) return;
    
    const height = widgetContainerRef.current.scrollHeight;
    
    if (typeof window !== "undefined" && window.openai?.notifyIntrinsicHeight) {
      try {
        window.openai.notifyIntrinsicHeight(height);
      } catch (error) {
        // Silent error handling - API may not be available in all contexts
        console.debug("Failed to notify intrinsic height:", error);
      }
    }
  }, [canvasDimensions, keyboardControls, dosLoaded]);

  const handleToggleDisplayMode = useCallback(async (): Promise<void> => {
    setDisplayModeTransitioning(true);

    try {
      const result = await requestDisplayMode("pip");

      if (widgetState) {
        setWidgetState({
          ...widgetState,
          lastDisplayMode: result.mode as "pip" | "inline",
        });
      }

      setDisplayModeMessage(`Switched to ${result.mode} mode`);
      setTimeout(() => setDisplayModeMessage(null), TIMING.MESSAGE_DISPLAY_DURATION_MS);
    } catch {
      setDisplayModeMessage(`Failed to switch mode`);
      setTimeout(() => setDisplayModeMessage(null), TIMING.MESSAGE_DISPLAY_DURATION_MS);
    } finally {
      setDisplayModeTransitioning(false);
    }
  }, [requestDisplayMode, widgetState, setWidgetState]);

  const safeAreaTop = 0;
  const safeAreaRight = 0;
  const buttonSize = 44;
  const buttonPadding = LAYOUT_SPACING.BUTTON_PADDING_DESKTOP;

  const dosCanvas = (
    <div
      className="relative overflow-hidden mx-auto box-border"
      style={{
        width: `${canvasDimensions.width}px`,
        height: `${canvasDimensions.height}px`,
        minWidth: `${canvasDimensions.width}px`,
        minHeight: `${canvasDimensions.height}px`,
        maxWidth: `${canvasDimensions.width}px`,
        maxHeight: `${canvasDimensions.height}px`,
      }}
    >
      <div
        key={dosUrl}
        ref={dosRef}
        id="dos"
        role="application"
        aria-label={`${toolOutput?.title ?? game} game emulator`}
        className="border rounded-md overflow-hidden w-full h-full box-border"
      />

      {displayModeMessage && (
        <div
          className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm border border-green-500/50 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200"
          style={{
            top: `${safeAreaTop + LAYOUT_SPACING.MESSAGE_TOP_OFFSET}px`,
          }}
        >
          {displayModeMessage}
        </div>
      )}

      {dosLoaded && (
        <div
          className="absolute z-10 flex gap-2"
          style={{
            top: `${safeAreaTop + buttonPadding}px`,
            right: `${safeAreaRight + buttonPadding}px`,
          }}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={handleToggleDisplayMode}
            disabled={displayModeTransitioning}
            aria-label="Switch to picture-in-picture mode"
            className={cn(
              "text-white shadow-lg rounded-full border-2 transition-all duration-200 touch-manipulation hover:scale-105",
              displayModeTransitioning ? "opacity-50 cursor-wait" : "hover:bg-gray-800"
            )}
            style={{
              minWidth: `${buttonSize}px`,
              minHeight: `${buttonSize}px`,
              width: `${buttonSize}px`,
              height: `${buttonSize}px`,
            }}
          >
            <PictureInPicture2 className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );

  const missingSelection = !isGuidedFromTool;

  return (
    <div className='bg-black p-3 overflow-hidden mx-auto my-auto w-full h-full'>
      <div 
        // ref={widgetContainerRef}
        className="flex flex-col items-center justify-center font-sans"
      >
        {missingSelection && (
          <p className="mb-3 max-w-xs text-center text-xs uppercase tracking-wide text-amber-200">
            Ask ChatGPT to launch a game from the Retro Arcade list to start
            playing.
          </p>
        )}
        {keyboardControls && (
          <div className="mt-2 flex flex-wrap items-center gap-2 text-amber-50">
            {keyboardControls.map(({ action, keys }) => (
              <span
                key={action}
                className="inline-flex flex-col items-center gap-1.5 px-3 py-2 text-xs uppercase tracking-wide text-amber-100"
              >
                <span className="text-amber-300 text-xs">{action}</span>
                <span className="flex flex-wrap items-center gap-1">
                  {keys.map((keyLabel, index) => (
                    <Keycap
                      key={`${action}-${keyLabel}-${index}`}
                      activeKey={deriveActiveKey(keyLabel)}
                      className="h-8! min-w-[50px]! px-3! py-1! text-sm font-semibold uppercase tracking-wide"
                    >
                      {keyLabel}
                    </Keycap>
                  ))}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>
      <link rel="stylesheet" href={DOS_CSS_URL} />
      <Script
        src={DOS_JS_URL}
        onLoad={() => {
          setDosLoaded(true);
        }}
      />

      <div
        className="w-full h-full box-border"
        role="region"
        aria-label="Game player"
      >
        {dosCanvas}
      </div>
    </div>
  );
}

