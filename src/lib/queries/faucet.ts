import type { FaucetTask } from "@/lib/interfaces";
import { sanityFetch } from "@/lib/sanity-fetch";

const PROJECTION = `{
  "id": _id,
  label,
  href,
  platform,
  "logoUrl": logo.asset->url
}`;

const FAUCET_TASKS_QUERY = `*[_type == "faucetTask" && active != false]${PROJECTION} | order(order asc, _createdAt asc)`;

export function getFaucetTasks(): Promise<FaucetTask[]> {
  return sanityFetch<FaucetTask[]>(FAUCET_TASKS_QUERY, {}, { tags: ["faucetTask"] });
}
