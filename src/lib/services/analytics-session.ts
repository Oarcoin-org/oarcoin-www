import { db } from "@/lib/config/firebase";
import type { SessionPageVisit, UpsertSiteSessionInput } from "@/lib/types/analytics";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

function normalizeWalletAddress(address: string): string {
  return address.trim().toLowerCase();
}

function siteSessionRef(sessionId: string) {
  return doc(db, "analytics", "site_sessions", "sessions", sessionId);
}

function walletSessionRef(walletAddress: string, sessionId: string) {
  return doc(db, "users", normalizeWalletAddress(walletAddress), "sessions", sessionId);
}

function createPageVisit(pathname: string): SessionPageVisit {
  return {
    path: pathname,
    views: 1,
    last_visited: new Date().toISOString(),
  };
}

function upsertPageVisit(
  pagesVisited: SessionPageVisit[],
  pathname: string
): SessionPageVisit[] {
  const existingPageIdx = pagesVisited.findIndex((page) => page.path === pathname);

  if (existingPageIdx !== -1) {
    const updatedPages = [...pagesVisited];
    updatedPages[existingPageIdx] = {
      ...updatedPages[existingPageIdx],
      views: updatedPages[existingPageIdx].views + 1,
      last_visited: new Date().toISOString(),
    };
    return updatedPages;
  }

  return [...pagesVisited, createPageVisit(pathname)];
}

async function upsertSessionDocument(
  docRef: ReturnType<typeof siteSessionRef>,
  input: UpsertSiteSessionInput,
  extraFields?: Record<string, unknown>
): Promise<void> {
  const snapshot = await getDoc(docRef);
  const pageData = createPageVisit(input.pathname);

  if (snapshot.exists()) {
    const existingData = snapshot.data();
    const pagesVisited = upsertPageVisit(
      (existingData.pages_visited as SessionPageVisit[] | undefined) ?? [],
      input.pathname
    );

    await updateDoc(docRef, {
      recent_activity: serverTimestamp(),
      pages_visited: pagesVisited,
      ...(input.walletAddress
        ? { wallet_address: normalizeWalletAddress(input.walletAddress) }
        : {}),
      ...extraFields,
    });
    return;
  }

  await setDoc(docRef, {
    ip_meta: input.ipMeta ?? null,
    device: input.device,
    user_meta: {
      sessionID: input.sessionId,
    },
    created_at: serverTimestamp(),
    client_timestamp: new Date(),
    recent_activity: serverTimestamp(),
    pages_visited: [pageData],
    ...(input.walletAddress
      ? { wallet_address: normalizeWalletAddress(input.walletAddress) }
      : {}),
    ...extraFields,
  });
}

export async function upsertSiteSession(input: UpsertSiteSessionInput): Promise<void> {
  await upsertSessionDocument(siteSessionRef(input.sessionId), input);

  if (!input.walletAddress) return;

  const walletAddress = normalizeWalletAddress(input.walletAddress);

  await upsertSessionDocument(walletSessionRef(walletAddress, input.sessionId), input, {
    wallet_address: walletAddress,
  });
}
