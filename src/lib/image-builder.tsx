import type { SanityImageSource } from "@sanity/image-url";

import { createImageUrlBuilder, type ImageUrlBuilder } from "@sanity/image-url";

import type { SanityImageValue } from "@/lib/interfaces";
import { sanityClient } from "./config/sanity";

export function urlFor(source: SanityImageSource): ImageUrlBuilder {
  return createImageUrlBuilder(sanityClient).image(source);
}

/** Minimal image value for static `/public` paths (matches `SanityImageValue` for fallbacks). */
export function localImageAsset(webPath: string): SanityImageValue {
  return {
    asset: {
      _type: "sanity.imageAsset",
      url: webPath,
    },
  };
}

function isDirectUrl(url: string): boolean {
  return url.startsWith("/") || /^https?:\/\//i.test(url);
}

/** Build a URL for Next/Image: CDN via `urlFor`, or pass through root-relative / absolute URLs on `asset.url`. */
export function sanityImageSrc(
  image: SanityImageValue | undefined,
  width: number,
  quality = 95
): string | undefined {
  if (!image?.asset) return undefined;
  const url = image.asset.url;
  if (typeof url === "string" && isDirectUrl(url)) {
    return url;
  }
  // Request retina assets directly from Sanity (sharper than relying on CSS scaling).
  // Cap width to avoid excessively large downloads.
  const effectiveWidth = Math.min(width, 2400);

  return urlFor(image as SanityImageSource)
    .auto("format")
    .fit("max")
    .width(effectiveWidth)
    .dpr(2)
    .quality(quality)
    .url();
}
