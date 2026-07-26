"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAnalytics from "@/hooks/use-analytics";
import { LogEvents } from "@/lib/constants/enums";
import type { DirectoryProject } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

type DirectoryProjectCardProps = {
  project: DirectoryProject;
  className?: string;
};

export function DirectoryProjectCard({ project, className }: DirectoryProjectCardProps) {
  const { createLog } = useAnalytics();
  const isComingSoon = project.comingSoon === true;
  const isTestnet = project.isTestnet === true;
  const hasBadges = isComingSoon || isTestnet;

  const handleProjectClick = () => {
    if (isComingSoon) return;

    createLog(LogEvents.DIRECTORY_PROJECT_CLICK, {
      project_id: project.id,
      project_name: project.name,
      project_category: project.category,
      project_href: project.href,
    });
  };

  return (
    <Link
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleProjectClick}
      className="group block h-full focus-visible:outline-none"
    >
      <Card
        className={cn(
          "h-full min-h-44 gap-0 rounded-none bg-background py-0 ring-0",
          "transition-colors hover:bg-muted",
          "group-focus-visible:ring-2 group-focus-visible:ring-foreground group-focus-visible:ring-inset",
          className
        )}
      >
        <CardHeader className="px-5 pt-5 pb-0">
          <div className="flex items-start gap-3">
            <div className="size-10 shrink-0 bg-muted" aria-hidden="true">
              {project.logoUrl ? (
                <Image
                  src={project.logoUrl}
                  alt=""
                  width={40}
                  height={40}
                  className="size-full object-cover"
                />
              ) : null}
            </div>
            <div className="min-w-0 space-y-0.5">
              <CardTitle className="truncate font-sans text-sm font-semibold">
                {project.name}
              </CardTitle>
              <CardDescription className="text-xs">{project.category}</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col px-5 py-5">
          <p className="line-clamp-2 font-sans text-sm leading-snug text-foreground/90">
            {project.description}
          </p>

          <div
            className={cn(
              "mt-auto flex items-center gap-2 pt-5",
              hasBadges ? "justify-between" : "justify-start"
            )}
          >
            {hasBadges ? (
              <div className="flex flex-wrap items-center gap-1.5">
                {isTestnet ? (
                  <span className="inline-flex items-center border border-foreground px-2 py-0.5 font-sans text-xs text-muted-foreground">
                    Testnet
                  </span>
                ) : null}
                {isComingSoon ? (
                  <span className="inline-flex items-center border border-foreground px-2 py-0.5 font-sans text-xs text-muted-foreground">
                    Coming soon
                  </span>
                ) : null}
              </div>
            ) : null}
            <ArrowUpRight
              className="size-4 shrink-0 text-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

type DirectoryProjectGridProps = {
  projects: DirectoryProject[];
  className?: string;
};

export function DirectoryProjectGrid({ projects, className }: DirectoryProjectGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 border-foreground sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {projects.map((project) => (
        <DirectoryProjectCard
          key={project.id}
          project={project}
          className="border border-foreground"
        />
      ))}
    </div>
  );
}
