import Footer from "@/components/footer";
import Header from "@/components/header";
import JsonLd from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/constants";
import Providers from "@/lib/providers";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter, Ledger } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const ledgerHeading = Ledger({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: "400",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        inter.variable,
        ledgerHeading.variable
      )}
    >
      <body className="min-h-full flex flex-col overflow-x-clip">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Toaster />
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
