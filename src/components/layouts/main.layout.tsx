"use client";

import useAnalytics from "@/hooks/use-analytics";
import useIP from "@/hooks/use-ip";
import { COOKIE_KEYS, COOKIE_OPTIONS, ROUTES } from "@/lib/constants";
import { LogEvents } from "@/lib/constants/enums";
import type { UseIPResponse } from "@/lib/interfaces";
import { upsertSiteSession } from "@/lib/services/analytics-session";
import { buildPageLogParams, getSessionDeviceInfo } from "@/lib/utils/analytics";
import { generateID } from "@/lib/utils/generate-id";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { useConnection } from "wagmi";

interface MainLayoutProps {
  children: ReactNode;
}

function readLocationCookie(): UseIPResponse | null {
  const location = Cookies.get(COOKIE_KEYS.USER_LOCATION);
  if (!location) return null;

  try {
    return JSON.parse(location) as UseIPResponse;
  } catch {
    return null;
  }
}

function ensureSessionId(): string {
  const existingSession = Cookies.get(COOKIE_KEYS.USER_SESSION);
  if (existingSession) return existingSession;

  const sessionId = generateID(32);
  Cookies.set(COOKIE_KEYS.USER_SESSION, sessionId, COOKIE_OPTIONS);
  return sessionId;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const { createLog } = useAnalytics();
  const { ipResponse } = useIP();
  const { address, isConnected } = useConnection();

  useEffect(() => {
    const sessionId = ensureSessionId();
    const pageParams = buildPageLogParams(pathname);

    if (pathname === ROUTES.home) {
      createLog(LogEvents.PAGE_VISIT, pageParams);
      createLog(LogEvents.VISIT_LANDING_PAGE, pageParams);
    } else {
      createLog(LogEvents.PAGE_VIEW, pageParams);
    }

    createLog(LogEvents.USER_SESSION, {
      session_id: sessionId,
      pathname,
      wallet_connected: isConnected,
      ...(address ? { wallet_address: address } : {}),
    });

    const ipMeta = readLocationCookie() ?? ipResponse;
    const device = getSessionDeviceInfo();

    void upsertSiteSession({
      sessionId,
      pathname,
      ipMeta,
      device,
      walletAddress: isConnected && address ? address : undefined,
    }).catch(() => {
      if (process.env.NODE_ENV === "development") {
        console.error("[Analytics] Failed session write", {
          sessionId,
          pathname,
          walletConnected: isConnected,
        });
      }
    });
  }, [pathname, createLog, ipResponse, isConnected, address]);

  return <div>{children}</div>;
}
