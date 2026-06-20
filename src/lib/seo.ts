import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const SITE_NAME = "Oarcoin";
export const SITE_TAGLINE = "The Open Asset Reserve";
export const SITE_TITLE = `${SITE_NAME} (OAR) — ${SITE_TAGLINE}`;
export const SITE_DESCRIPTION =
  "Oarcoin (OAR) is the Open Asset Reserve — a fair, community-owned crypto system with no presale and no insiders. Claim OAR daily, use it across the ecosystem, and verify the reserve in real time.";
export const SITE_LOGO = `${SITE_URL}/assets/logo.svg`;

export const SITE_KEYWORDS = [
  "Oarcoin",
  "OAR",
  "Open Asset Reserve",
  "crypto faucet",
  "fair launch",
  "decentralized finance",
  "Base network",
  "Ethereum Layer 2",
  "community crypto",
  "Rafla",
];

export const SOCIAL_PROFILES = [
  "https://x.com/oarcoin",
  "https://t.me/oarcoin",
];

type CreateMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

/**
 * Builds a consistent Metadata object for a page. The root layout supplies the
 * title template, metadataBase and default OpenGraph image, so pages only need
 * to pass their own title/description/path here.
 */
export function createMetadata({
  title,
  description,
  path,
  keywords,
}: CreateMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    keywords: keywords ?? SITE_KEYWORDS,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

type JsonLd = Record<string, unknown>;

/** Identity of the project — consumed by search engines and AI agents. */
export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: "OAR",
    url: SITE_URL,
    logo: SITE_LOGO,
    description: SITE_DESCRIPTION,
    sameAs: SOCIAL_PROFILES,
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}

type WebPageInput = {
  title: string;
  description: string;
  path: string;
};

export function webPageSchema({ title, description, path }: WebPageInput): JsonLd {
  const url = `${SITE_URL}${path}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}

type Crumb = { name: string; path: string };

function breadcrumbSchema(crumbs: Crumb[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

type FaqItem = { question: string; answer: string };

export function faqSchema(items: FaqItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Standard structured data for a content page: the WebPage node plus a
 * Home → page breadcrumb trail derived from the title and path.
 */
export function pageGraph({ title, description, path }: WebPageInput): JsonLd[] {
  return [
    webPageSchema({ title, description, path }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: title, path },
    ]),
  ];
}
