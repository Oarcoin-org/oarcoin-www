import type { QueryParams } from "next-sanity";
import { sanityClient } from "./config/sanity";

const DEFAULT_TAG = "sanity";
const DEFAULT_REVALIDATE = 60;

export type SanityFetchOptions = {
  revalidate?: number;
  tags?: string[];
};

export async function sanityFetch<T>(
  query: string,
  params: QueryParams = {},
  options?: SanityFetchOptions
): Promise<T> {
  const revalidate = options?.revalidate ?? DEFAULT_REVALIDATE;
  const tags = options?.tags ?? [DEFAULT_TAG];

  return sanityClient.fetch<T>(query, params, {
    next: { revalidate, tags },
  });
}
