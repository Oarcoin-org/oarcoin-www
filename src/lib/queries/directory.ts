import type {
  DirectoryProject,
  DirectoryProjectCategory,
  DirectoryProjectType,
} from "@/lib/interfaces";
import { sanityFetch } from "@/lib/sanity-fetch";

export type DirectorySortMode = "top" | "new";
export type DirectoryTypeFilter = "all" | DirectoryProjectType;
export type DirectoryCategoryFilter = "all" | DirectoryProjectCategory;

export type DirectoryFilters = {
  type: DirectoryTypeFilter;
  category: DirectoryCategoryFilter;
  search: string;
  sort: DirectorySortMode;
};

export type DirectoryProjectsPage = {
  items: DirectoryProject[];
  total: number;
};

export const DIRECTORY_PAGE_SIZE = 50;

const PROJECTION = `{
  "id": coalesce(slug.current, _id),
  name,
  category,
  description,
  href,
  type,
  featured,
  comingSoon,
  "logoUrl": logo.asset->url
}`;

const ALL_PROJECTS_QUERY = `*[_type == "directoryProject"]${PROJECTION} | order(featured desc, name asc)`;

const FILTER_CONDITIONS = `*[_type == "directoryProject"
  && ($type == "all" || type == $type)
  && ($category == "all" || category == $category)
  && (
    $search == "" ||
    name match $search ||
    category match $search ||
    description match $search
  )
]`;

/** All projects, used for stats counts and the featured section. */
export function getDirectoryProjects(): Promise<DirectoryProject[]> {
  return sanityFetch<DirectoryProject[]>(
    ALL_PROJECTS_QUERY,
    {},
    { tags: ["directoryProject"] }
  );
}

/**
 * Filtered/sorted/searched + paginated projects for the explore section,
 * driven by URL params. Filtering, sorting and slicing all happen in GROQ.
 */
export function getFilteredDirectoryProjects(
  filters: DirectoryFilters,
  page: number
): Promise<DirectoryProjectsPage> {
  const order =
    filters.sort === "new" ? "_createdAt desc" : "featured desc, name asc";

  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const start = (safePage - 1) * DIRECTORY_PAGE_SIZE;
  const end = start + DIRECTORY_PAGE_SIZE;

  const query = `{
    "items": ${FILTER_CONDITIONS}${PROJECTION} | order(${order}) [${start}...${end}],
    "total": count(${FILTER_CONDITIONS})
  }`;

  const trimmed = filters.search.trim();

  return sanityFetch<DirectoryProjectsPage>(
    query,
    {
      type: filters.type,
      category: filters.category,
      search: trimmed ? `*${trimmed}*` : "",
    },
    { tags: ["directoryProject"] }
  );
}
