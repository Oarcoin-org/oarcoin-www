import type { UseIPResponse } from "@/lib/interfaces";

export type SessionPageVisit = {
  path: string;
  views: number;
  last_visited: string;
};

export type SessionDeviceInfo = {
  type?: string;
  browser?: string;
};

export type UpsertSiteSessionInput = {
  sessionId: string;
  pathname: string;
  ipMeta: UseIPResponse | null;
  device: SessionDeviceInfo;
  walletAddress?: string;
};

export type PageLogParams = {
  pathname: string;
  url: string;
  time: string;
};
