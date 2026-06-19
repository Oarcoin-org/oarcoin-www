"use client";

import { ChevronDown, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { DirectoryProjectGrid } from "@/components/directory/project-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { WidthConstraint } from "@/components/ui/width-constraint";
import { DIRECTORY } from "@/lib/constants";
import type { DirectoryProject } from "@/lib/interfaces";
import type {
  DirectoryCategoryFilter,
  DirectoryFilters,
  DirectorySortMode,
  DirectoryTypeFilter,
} from "@/lib/queries/directory";
import { cn } from "@/lib/utils";

type DirectoryExploreProps = {
  projects: DirectoryProject[];
  filters: DirectoryFilters;
  page: number;
  totalPages: number;
};

type PageToken = number | "ellipsis-left" | "ellipsis-right";

function getPageTokens(current: number, total: number): PageToken[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const tokens: PageToken[] = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);

  if (left > 2) tokens.push("ellipsis-left");
  for (let i = left; i <= right; i += 1) tokens.push(i);
  if (right < total - 1) tokens.push("ellipsis-right");

  tokens.push(total);
  return tokens;
}

const TYPE_OPTIONS: { value: DirectoryTypeFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "project", label: "Projects" },
  { value: "community", label: "Communities" },
  { value: "infrastructure", label: "Infrastructure Tools" },
  { value: "public-good", label: "Public Goods" },
];

const CATEGORY_OPTIONS: { value: DirectoryCategoryFilter; label: string }[] = [
  { value: "all", label: "All Categories" },
  { value: "Identity", label: "Identity" },
  { value: "Infrastructure", label: "Infrastructure" },
  { value: "Finance", label: "Finance" },
  { value: "Social", label: "Social" },
  { value: "Utility", label: "Utility" },
  { value: "DAO", label: "DAO" },
  { value: "Data and Analytics", label: "Data and Analytics" },
  { value: "Developer Tools", label: "Developer Tools" },
  { value: "Marketplace", label: "Marketplace" },
  { value: "Public Goods", label: "Public Goods" },
];

const selectClassName = cn(
  "h-10 appearance-none rounded-none border border-foreground bg-background",
  "px-3 pe-8 font-sans text-sm",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
);

const DirectoryExplore = ({
  projects,
  filters,
  page,
  totalPages,
}: DirectoryExploreProps) => {
  const { exploreSectionTitle } = DIRECTORY;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = React.useTransition();

  const [searchInput, setSearchInput] = React.useState(filters.search);

  // Keep the input in sync when the URL changes externally (e.g. back/forward)
  // using the "adjust state during render" pattern instead of an effect.
  const [prevSearch, setPrevSearch] = React.useState(filters.search);
  if (filters.search !== prevSearch) {
    setPrevSearch(filters.search);
    setSearchInput(filters.search);
  }

  // Build a URL for the given param updates. Any change other than `page`
  // resets pagination back to the first page.
  const buildHref = React.useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!("page" in updates)) params.delete("page");
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
      const queryString = params.toString();
      return queryString ? `${pathname}?${queryString}` : pathname;
    },
    [pathname, searchParams]
  );

  const pushParams = React.useCallback(
    (updates: Record<string, string | null>) => {
      const href = buildHref(updates);
      startTransition(() => {
        router.replace(href, { scroll: false });
      });
    },
    [buildHref, router]
  );

  const pageHref = React.useCallback(
    (target: number) => buildHref({ page: target <= 1 ? null : String(target) }),
    [buildHref]
  );

  const goToPage = React.useCallback(
    (target: number) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      if (target < 1 || target > totalPages || target === page) return;
      pushParams({ page: target <= 1 ? null : String(target) });
    },
    [page, pushParams, totalPages]
  );

  // Debounce search updates to the URL.
  React.useEffect(() => {
    const trimmed = searchInput.trim();
    if (trimmed === filters.search.trim()) return;

    const timeout = setTimeout(() => {
      pushParams({ q: trimmed || null });
    }, 350);

    return () => clearTimeout(timeout);
  }, [searchInput, filters.search, pushParams]);

  return (
    <section className="pb-20 sm:pb-28" data-aos="fade-up">
      <WidthConstraint className="space-y-5 sm:space-y-6">
        <h2 className="font-heading text-2xl sm:text-3xl">{exploreSectionTitle}</h2>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <select
                value={filters.type}
                onChange={(event) =>
                  pushParams({
                    type: event.target.value === "all" ? null : event.target.value,
                  })
                }
                className={cn(selectClassName, "min-w-28")}
                aria-label="Filter by type"
              >
                {TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2"
                aria-hidden="true"
              />
            </div>

            <div className="relative">
              <select
                value={filters.category}
                onChange={(event) =>
                  pushParams({
                    category: event.target.value === "all" ? null : event.target.value,
                  })
                }
                className={cn(selectClassName, "min-w-36")}
                aria-label="Filter by category"
              >
                {CATEGORY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-0 flex-1 sm:min-w-56 sm:flex-none">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Search"
                className={cn(
                  "h-10 w-full border border-foreground bg-background ps-9 pe-3",
                  "font-sans text-sm placeholder:text-muted-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
                )}
                aria-label="Search projects"
              />
            </div>

            <div
              className="inline-flex border border-foreground"
              role="group"
              aria-label="Sort projects"
            >
              {(["top", "new"] as const).map((mode: DirectorySortMode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => pushParams({ sort: mode === "top" ? null : mode })}
                  className={cn(
                    "h-10 min-w-14 px-4 font-sans text-sm capitalize transition-colors",
                    filters.sort === mode
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-foreground hover:bg-muted"
                  )}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {projects.length > 0 ? (
          <div className={cn(isPending && "opacity-60 transition-opacity")}>
            <DirectoryProjectGrid projects={projects} />
          </div>
        ) : (
          <p className="border border-foreground px-6 py-10 text-center font-sans text-sm text-muted-foreground">
            No projects match your filters.
          </p>
        )}

        {totalPages > 1 ? (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={pageHref(page - 1)}
                  onClick={goToPage(page - 1)}
                  aria-disabled={page <= 1}
                  className={cn(page <= 1 && "pointer-events-none opacity-50")}
                />
              </PaginationItem>

              {getPageTokens(page, totalPages).map((token) =>
                typeof token === "number" ? (
                  <PaginationItem key={token}>
                    <PaginationLink
                      href={pageHref(token)}
                      onClick={goToPage(token)}
                      isActive={token === page}
                    >
                      {token}
                    </PaginationLink>
                  </PaginationItem>
                ) : (
                  <PaginationItem key={token}>
                    <PaginationEllipsis />
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  href={pageHref(page + 1)}
                  onClick={goToPage(page + 1)}
                  aria-disabled={page >= totalPages}
                  className={cn(page >= totalPages && "pointer-events-none opacity-50")}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        ) : null}
      </WidthConstraint>
    </section>
  );
};

export default DirectoryExplore;
