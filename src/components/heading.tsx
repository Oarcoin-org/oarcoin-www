import * as React from "react";

import { cn } from "@/lib/utils";

type HighlightRange = {
  start: number;
  end: number;
  className?: string;
};

type HighlightWord = {
  text: string;
  className?: string;
  /** default: "first" */
  match?: "first" | "all";
};

export type HeadingProps<T extends React.ElementType = "h1"> = {
  as?: T;
  text: string;
  className?: string;
  /** Character ranges: [start, end) */
  highlights?: HighlightRange[];
  /** Convenience for full word(s) */
  highlightWords?: HighlightWord[];
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children">;

function rangesFromWords(text: string, words: HighlightWord[] = []): HighlightRange[] {
  const ranges: HighlightRange[] = [];

  for (const w of words) {
    if (!w.text) continue;
    if (w.match === "all") {
      let idx = 0;

      while (true) {
        const found = text.indexOf(w.text, idx);
        if (found === -1) break;
        ranges.push({ start: found, end: found + w.text.length, className: w.className });
        idx = found + w.text.length;
      }
    } else {
      const found = text.indexOf(w.text);
      if (found !== -1) {
        ranges.push({ start: found, end: found + w.text.length, className: w.className });
      }
    }
  }

  return ranges;
}

function normalizeRanges(text: string, ranges: HighlightRange[] = []): HighlightRange[] {
  return ranges
    .map((r) => ({
      start: Math.max(0, Math.min(text.length, r.start)),
      end: Math.max(0, Math.min(text.length, r.end)),
      className: r.className,
    }))
    .filter((r) => r.end > r.start)
    .sort((a, b) => a.start - b.start || a.end - b.end);
}

function mergeRanges(a: HighlightRange[], b: HighlightRange[]): HighlightRange[] {
  return [...a, ...b].sort((x, y) => x.start - y.start || x.end - y.end);
}

export function Heading<T extends React.ElementType = "h1">({
  as,
  text,
  className,
  highlights,
  highlightWords,
  ...props
}: HeadingProps<T>) {
  const Comp = (as ?? "h1") as React.ElementType;

  const allRanges = normalizeRanges(
    text,
    mergeRanges(normalizeRanges(text, highlights), rangesFromWords(text, highlightWords))
  );

  const parts: Array<{ text: string; className?: string }> = [];
  let cursor = 0;

  for (const r of allRanges) {
    if (r.start < cursor) continue; // ignore overlaps
    if (r.start > cursor) parts.push({ text: text.slice(cursor, r.start) });
    parts.push({ text: text.slice(r.start, r.end), className: r.className });
    cursor = r.end;
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor) });

  return (
    <Comp
      className={cn(
        "font-heading tracking-tight",
        "text-4xl leading-[1.05] sm:text-6xl sm:leading-[1.05]",
        className
      )}
      {...props}
    >
      {parts.map((p, idx) => {
        // preserve spaces without needing &nbsp;
        const content = p.text
          .split(" ")
          .reduce<React.ReactNode[]>((acc, word, i, arr) => {
            acc.push(word);
            if (i !== arr.length - 1) acc.push(" ");
            return acc;
          }, []);

        return p.className ? (
          <span key={idx} className={p.className}>
            {content}
          </span>
        ) : (
          <React.Fragment key={idx}>{content}</React.Fragment>
        );
      })}
    </Comp>
  );
}
