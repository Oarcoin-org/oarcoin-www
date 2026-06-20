import { ROUTES, SITE_URL, type Route } from "@/lib/constants";
import type { MetadataRoute } from "next";

const routes: {
  path: Route;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: ROUTES.home, changeFrequency: "daily", priority: 1 },
  { path: ROUTES.start, changeFrequency: "monthly", priority: 0.9 },
  { path: ROUTES.about, changeFrequency: "monthly", priority: 0.8 },
  { path: ROUTES.progress, changeFrequency: "weekly", priority: 0.8 },
  { path: ROUTES.getOarcoin, changeFrequency: "weekly", priority: 0.8 },
  { path: ROUTES.communities, changeFrequency: "weekly", priority: 0.7 },
  { path: ROUTES.faqs, changeFrequency: "monthly", priority: 0.7 },
  { path: ROUTES.faucet, changeFrequency: "daily", priority: 0.7 },
  { path: ROUTES.directory, changeFrequency: "weekly", priority: 0.6 },
  { path: ROUTES.reserve, changeFrequency: "daily", priority: 0.6 },
  { path: ROUTES.terms, changeFrequency: "yearly", priority: 0.3 },
  { path: ROUTES.privacy, changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
