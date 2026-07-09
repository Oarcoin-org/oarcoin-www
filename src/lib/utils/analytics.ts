import { UAParser } from "ua-parser-js";

import { SITE_URL } from "@/lib/constants";
import type { PageLogParams, SessionDeviceInfo } from "@/lib/types/analytics";

const parser = new UAParser();

export function buildPageLogParams(pathname: string): PageLogParams {
  return {
    pathname,
    url: `${SITE_URL}${pathname}`,
    time: new Date().toISOString(),
  };
}

export function getSessionDeviceInfo(): SessionDeviceInfo {
  const browserInfo = parser.getBrowser();
  const osInfo = parser.getOS();

  return {
    type: osInfo.name,
    browser: browserInfo.name,
  };
}
