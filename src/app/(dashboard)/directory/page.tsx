import DirectoryExplore from "@/components/directory/explore";
import DirectoryFeatured from "@/components/directory/featured";
import DirectoryHero from "@/components/directory/hero";
import DirectoryStats from "@/components/directory/stats";
import { DIRECTORY } from "@/lib/constants";
import type {
  DirectoryProjectCategory,
  DirectoryProjectType,
  DirectoryStat,
} from "@/lib/interfaces";
import {
  DIRECTORY_PAGE_SIZE,
  getDirectoryProjects,
  getFilteredDirectoryProjects,
  type DirectoryCategoryFilter,
  type DirectoryFilters,
  type DirectorySortMode,
  type DirectoryTypeFilter,
} from "@/lib/queries/directory";
import { unstable_noStore as noStore } from "next/cache";

const STAT_LABELS: { label: string; type: DirectoryProjectType }[] = [
  { label: "Projects", type: "project" },
  { label: "Communities", type: "community" },
  { label: "Infrastructure Tools", type: "infrastructure" },
  { label: "Public Goods", type: "public-good" },
];

const TYPE_VALUES: DirectoryProjectType[] = [
  "project",
  "community",
  "infrastructure",
  "public-good",
];

const CATEGORY_VALUES: DirectoryProjectCategory[] = [
  "Identity",
  "Infrastructure",
  "Finance",
  "Social",
  "Utility",
  "DAO",
  "Data and Analytics",
  "Developer Tools",
  "Marketplace",
  "Public Goods",
];

type DirectorySearchParams = {
  type?: string;
  category?: string;
  q?: string;
  sort?: string;
  page?: string;
};

function normalizeType(value: string | undefined): DirectoryTypeFilter {
  return TYPE_VALUES.includes(value as DirectoryProjectType)
    ? (value as DirectoryProjectType)
    : "all";
}

function normalizeCategory(value: string | undefined): DirectoryCategoryFilter {
  return CATEGORY_VALUES.includes(value as DirectoryProjectCategory)
    ? (value as DirectoryProjectCategory)
    : "all";
}

function normalizeSort(value: string | undefined): DirectorySortMode {
  return value === "new" ? "new" : "top";
}

function normalizePage(value: string | undefined): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

const DirectoryPage = async ({
  searchParams,
}: {
  searchParams: Promise<DirectorySearchParams>;
}) => {
  noStore();
  const sp = await searchParams;

  const filters: DirectoryFilters = {
    type: normalizeType(sp.type),
    category: normalizeCategory(sp.category),
    search: sp.q ?? "",
    sort: normalizeSort(sp.sort),
  };
  const page = normalizePage(sp.page);

  const [allProjects, explore] = await Promise.all([
    getDirectoryProjects(),
    getFilteredDirectoryProjects(filters, page),
  ]);

  const stats: DirectoryStat[] = STAT_LABELS.map(({ label, type }) => ({
    label,
    value: allProjects.filter((project) => project.type === type).length,
  }));

  const featured = allProjects.filter((project) => project.featured);

  const totalPages = Math.max(1, Math.ceil(explore.total / DIRECTORY_PAGE_SIZE));

  return (
    <main>
      <DirectoryHero />
      <DirectoryStats stats={stats} />
      <DirectoryFeatured projects={featured} title={DIRECTORY.featuredSectionTitle} />
      <DirectoryExplore
        projects={explore.items}
        filters={filters}
        page={Math.min(page, totalPages)}
        totalPages={totalPages}
      />
    </main>
  );
};

export default DirectoryPage;
