import { db } from "@/lib/config/firebase";
import type { SessionPageVisit, UpsertSiteSessionInput } from "@/lib/types/analytics";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

const SITE_SESSIONS_PATH = "analytics/site_sessions/sessions";

function normalizeWalletAddress(address: string): string {
  return address.trim().toLowerCase();
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
  docPath: string,
  input: UpsertSiteSessionInput,
  extraFields?: Record<string, unknown>
): Promise<void> {
  const docRef = doc(db, docPath);
  const snapshot = await getDoc(docRef);
  const pageData = createPageVisit(input.pathname);

  if (snapshot.exists()) {
    const existingData = snapshot.data();
    const pagesVisited = upsertPageVisit(
      (existingData.pages_visited as SessionPageVisit[] | undefined) ?? [],
      input.pathname
    );

    await updateDoc(docRef, {
      recent_activity: new Date(),
      pages_visited: pagesVisited,
      ...(input.walletAddress
        ? { wallet_address: normalizeWalletAddress(input.walletAddress) }
        : {}),
      ...extraFields,
    });
    return;
  }

  await setDoc(docRef, {
    ip_meta: input.ipMeta,
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
  await upsertSessionDocument(`${SITE_SESSIONS_PATH}/${input.sessionId}`, input);

  if (!input.walletAddress) return;

  const walletAddress = normalizeWalletAddress(input.walletAddress);
  await upsertSessionDocument(
    `users/${walletAddress}/sessions/${input.sessionId}`,
    input,
    {
      wallet_address: walletAddress,
    }
  );
}
