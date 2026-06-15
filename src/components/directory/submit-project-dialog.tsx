"use client";

import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DIRECTORY } from "@/lib/constants";

const SubmitProjectDialog = () => {
  const { hero, submit } = DIRECTORY;
  const mailtoHref = `mailto:${submit.email}?subject=${encodeURIComponent(submit.mailSubject)}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="min-w-40">{hero.submitProjectLabel}</Button>
      </DialogTrigger>
      <DialogContent className="gap-6 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">{submit.title}</DialogTitle>
          <DialogDescription>{submit.description}</DialogDescription>
        </DialogHeader>

        <div className="rounded-lg bg-muted px-4 py-3.5 text-center">
          <a
            href={mailtoHref}
            className="font-heading text-base text-foreground underline-offset-4 hover:underline"
          >
            {submit.email}
          </a>
        </div>

        <Button asChild className="w-full">
          <a href={mailtoHref} target="_blank" rel="noopener noreferrer">
            {submit.ctaLabel}
            <ArrowUpRight />
          </a>
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitProjectDialog;
