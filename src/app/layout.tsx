import Footer from "@/components/footer";
import Header from "@/components/header";
import WagmiContextProvider from "@/lib/providers";
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
  title: "Oarcoin",
  description: "Oarcoin is a decentralized exchange for trading Oarcoin",
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
      <body className="min-h-full flex flex-col">
        <Toaster />
        <WagmiContextProvider>
          <Header />
          {children}
          <Footer />
        </WagmiContextProvider>
      </body>
    </html>
  );
}
