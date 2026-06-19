import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/config/firebase";
import { COLLECTIONS } from "../constants";

// Firestore `in` queries accept at most 30 values.
const MAX_IN_QUERY_VALUES = 30;

function normalizeAddress(address: string): string {
  return address.trim().toLowerCase();
}

/**
 * Creates the user document on first connect and refreshes `lastSeenAt`.
 * `createdAt` is only written once thanks to the merge + missing-field check.
 */
export async function upsertFaucetUser(address: string): Promise<void> {
  const id = normalizeAddress(address);
  const userRef = doc(db, COLLECTIONS.USERS, id);
  const snapshot = await getDoc(userRef);

  await setDoc(
    userRef,
    {
      address: id,
      ...(snapshot.exists() ? {} : { createdAt: serverTimestamp() }),
      lastSeenAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/**
 * Returns the task ids the wallet has already completed. When `activeIds` is
 * provided (and small enough), the lookup is filtered by document id so we only
 * read the completions relevant to today's active tasks.
 */
export async function getCompletedTaskIds(
  address: string,
  activeIds?: string[]
): Promise<string[]> {
  const id = normalizeAddress(address);
  const completionsRef = collection(db, COLLECTIONS.USERS, id, COLLECTIONS.COMPLETIONS);

  if (activeIds && activeIds.length > 0 && activeIds.length <= MAX_IN_QUERY_VALUES) {
    const filtered = query(completionsRef, where(documentId(), "in", activeIds));
    const snapshot = await getDocs(filtered);
    return snapshot.docs.map((completion) => completion.id);
  }

  const snapshot = await getDocs(completionsRef);
  return snapshot.docs.map((completion) => completion.id);
}

export type CompletedTaskInput = {
  /** Stable Sanity document id, used as the completion doc key. */
  id: string;
  /** User-friendly task id (slug generated from the label). */
  taskId: string;
  label: string;
};

/** Permanently records a completed task for the wallet. */
export async function markTaskComplete(
  address: string,
  task: CompletedTaskInput
): Promise<void> {
  const id = normalizeAddress(address);
  const completionRef = doc(db, COLLECTIONS.USERS, id, COLLECTIONS.COMPLETIONS, task.id);

  await setDoc(
    completionRef,
    {
      taskId: task.taskId,
      label: task.label,
      completedAt: serverTimestamp(),
    },
    { merge: true }
  );
}
