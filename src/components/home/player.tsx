"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type PlayerProps = {
  src: string;
  poster?: string;
  className?: string;
};

const Player = ({ src, poster, className }: PlayerProps) => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const togglePlay = async () => {
    const el = videoRef.current;
    if (!el) return;

    if (el.paused) {
      try {
        await el.play();
      } catch {
        // Autoplay / gesture restrictions can throw; ignore.
      }
    } else {
      el.pause();
    }
  };

  return (
    <section className={cn("w-full", className)}>
      <div className="relative w-full">
        <video
          ref={videoRef}
          className="h-[min(72vh,720px)] w-full object-cover sm:h-[min(78vh,780px)]"
          src={src}
          poster={poster}
          playsInline
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />

        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="pointer-events-none flex flex-col items-center gap-4 text-center">
            <Button
              type="button"
              variant="ghost"
              className={cn("pointer-events-auto", "h-14 w-14 rounded-full p-0")}
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
              {isPlaying ? (
                <span className="grid grid-cols-2 gap-1">
                  <span className="h-5 w-1.5 rounded-sm bg-foreground" />
                  <span className="h-5 w-1.5 rounded-sm bg-foreground" />
                </span>
              ) : (
                <span
                  className="ms-0.5 block h-0 w-0"
                  style={{
                    borderTop: "8px solid transparent",
                    borderBottom: "8px solid transparent",
                    borderLeft: "14px solid currentColor",
                  }}
                />
              )}
            </Button>
            {!isPlaying ? (
              <Link href="/start" className="pointer-events-auto">
                <h2 className="text-sm text-foreground/80 sm:text-base lg:text-2xl max-w-lg">
                  What is Oarcoin?
                </h2>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Player;
