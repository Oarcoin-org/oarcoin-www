"use client";

import { ChevronDown, Search } from "lucide-react";
import * as React from "react";

import { DirectoryProjectGrid } from "@/components/directory/project-card";
import { WidthConstraint } from "@/components/ui/width-constraint";
import { DIRECTORY } from "@/lib/constants";
import type {
  DirectoryProject,
  DirectoryProjectCategory,
  DirectoryProjectType,
} from "@/lib/interfaces";
import { cn } from "@/lib/utils";

type SortMode = "top" | "new";

type TypeFilter = "all" | DirectoryProjectType;

const TYPE_OPTIONS: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "project", label: "Projects" },
  { value: "community", label: "Communities" },
  { value: "infrastructure", label: "Infrastructure Tools" },
  { value: "public-good", label: "Public Goods" },
];

const CATEGORY_OPTIONS: { value: "all" | DirectoryProjectCategory; label: string }[] = [
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

function filterProjects(
  projects: DirectoryProject[],
  {
    typeFilter,
    categoryFilter,
    searchQuery,
    sortMode,
  }: {
    typeFilter: TypeFilter;
    categoryFilter: "all" | DirectoryProjectCategory;
    searchQuery: string;
    sortMode: SortMode;
  }
) {
  const query = searchQuery.trim().toLowerCase();

  let result = projects.filter((project) => {
    if (typeFilter !== "all" && project.type !== typeFilter) return false;
    if (categoryFilter !== "all" && project.category !== categoryFilter) return false;
    if (!query) return true;

    return (
      project.name.toLowerCase().includes(query) ||
      project.category.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query)
    );
  });

  if (sortMode === "new") {
    result = [...result].reverse();
  } else {
    result = [...result].sort((a, b) => {
      const usersA = a.usersCount ?? 0;
      const usersB = b.usersCount ?? 0;
      if (usersB !== usersA) return usersB - usersA;
      return a.name.localeCompare(b.name);
    });
  }

  return result;
}

const DirectoryExplore = () => {
  const { exploreSectionTitle, projects } = DIRECTORY;
  const [typeFilter, setTypeFilter] = React.useState<TypeFilter>("all");
  const [categoryFilter, setCategoryFilter] = React.useState<
    "all" | DirectoryProjectCategory
  >("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortMode, setSortMode] = React.useState<SortMode>("top");

  const filteredProjects = filterProjects(projects, {
    typeFilter,
    categoryFilter,
    searchQuery,
    sortMode,
  });

  return (
    <section className="pb-20 sm:pb-28">
      <WidthConstraint className="space-y-5 sm:space-y-6">
        <h2 className="font-heading text-2xl sm:text-3xl">{exploreSectionTitle}</h2>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value as TypeFilter)}
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
                value={categoryFilter}
                onChange={(event) =>
                  setCategoryFilter(
                    event.target.value as "all" | DirectoryProjectCategory
                  )
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
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
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
              {(["top", "new"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setSortMode(mode)}
                  className={cn(
                    "h-10 min-w-14 px-4 font-sans text-sm capitalize transition-colors",
                    sortMode === mode
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

        {filteredProjects.length > 0 ? (
          <DirectoryProjectGrid projects={filteredProjects} />
        ) : (
          <p className="border border-foreground px-6 py-10 text-center font-sans text-sm text-muted-foreground">
            No projects match your filters.
          </p>
        )}
      </WidthConstraint>
    </section>
  );
};

export default DirectoryExplore;
