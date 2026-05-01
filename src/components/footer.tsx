import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import Address from "@/components/address";
import { Button } from "@/components/ui/button";
import { WidthConstraint } from "@/components/ui/width-constraint";
import { cn } from "@/lib/utils";

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">{title}</h3>
      <ul className="space-y-2 text-sm text-foreground">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="hover:text-foreground">
        {children}
      </Link>
    </li>
  );
}

function FooterDisabledLink({ children }: { children: React.ReactNode }) {
  return (
    <li className={cn("opacity-60", "cursor-not-allowed")}>
      <span>{children}</span>
    </li>
  );
}

const Footer = () => {
  return (
    <footer>
      <WidthConstraint className="py-10 sm:py-14 space-y-20">
        <Address />

        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center">
              <Image src="/assets/logo.svg" alt="Oarcoin" width={160} height={32} />
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              Subscribe to get the latest Oarcoin news and blog posts
            </p>
            <Button variant="outline">Subscribe</Button>
          </div>

          <div className="grid gap-10 grid-cols-2 lg:grid-cols-5">
            <FooterColumn title="Introduction">
              <FooterLink href="/start">Getting started</FooterLink>
              <FooterLink href="/about">How it works</FooterLink>
              <FooterLink href="/progress">OAR Progress</FooterLink>
              <FooterDisabledLink>Whitepaper</FooterDisabledLink>
            </FooterColumn>

            <FooterColumn title="Resources">
              <FooterDisabledLink>Exchanges</FooterDisabledLink>
              <FooterLink href="/communities">Community</FooterLink>
              <FooterDisabledLink>Documentation</FooterDisabledLink>
            </FooterColumn>

            <FooterColumn title="Participate">
              <FooterLink href="/faucet">Faucet</FooterLink>
              <FooterDisabledLink>Rafla</FooterDisabledLink>
              <FooterLink href="/reserve">Oar Reserve Dashboard</FooterLink>
            </FooterColumn>

            <FooterColumn title="Socials">
              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground"
                >
                  X (Twitter)
                </a>
              </li>
              <FooterDisabledLink>LinkedIn</FooterDisabledLink>
            </FooterColumn>

            <FooterColumn title="Other">
              <FooterLink href="/terms">Legal</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
            </FooterColumn>
          </div>
        </div>
      </WidthConstraint>
    </footer>
  );
};

export default Footer;
