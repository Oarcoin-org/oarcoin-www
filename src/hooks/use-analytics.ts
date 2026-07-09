"use client";

import { app } from "@/lib/config/firebase";
import { LogEvents } from "@/lib/constants/enums";
import type { Analytics, EventParams } from "firebase/analytics";
import { getAnalytics, logEvent } from "firebase/analytics";
import { useCallback } from "react";

interface UseAnalytics {
  createLog: (log: LogEvents, eventParams?: EventParams) => void;
}

let analyticsInstance: Analytics | undefined;

function getFirebaseAnalytics(): Analytics | undefined {
  if (typeof window === "undefined") return undefined;

  if (!analyticsInstance) {
    try {
      analyticsInstance = getAnalytics(app);
    } catch (error) {
      console.error("Failed to initialize Firebase Analytics:", error);
    }
  }

  return analyticsInstance;
}

export default function useAnalytics(): UseAnalytics {
  const createLog = useCallback((log: LogEvents, eventParams?: EventParams): void => {
    const analytics = getFirebaseAnalytics();
    if (!analytics) {
      console.warn("Analytics not initialized. Skipping log:", log);
      return;
    }

    try {
      logEvent(analytics, log as string, eventParams);

      if (process.env.NODE_ENV === "development") {
        console.debug(
          `[Analytics] Event: ${log}`,
          eventParams ? `Params: ${JSON.stringify(eventParams)}` : ""
        );
      }
    } catch (error) {
      console.error(`Failed to log analytics event "${log}":`, error);
    }
  }, []);

  return { createLog };
}
