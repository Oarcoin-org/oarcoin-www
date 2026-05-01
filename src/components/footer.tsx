import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import Address from "@/components/address";
import { Button } from "@/components/ui/button";
import { WidthConstraint } from "@/components/ui/width-constraint";
import { FOOTER_LINKS } from "@/lib/constants";
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

function FooterExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a href={href} target="_blank" rel="noreferrer" className="hover:text-foreground">
        {children}
      </a>
    </li>
  );
}

const Footer = () => {
  return (
    <footer>
      <WidthConstraint className="py-10 sm:py-14 space-y-20 lg:pt-32">
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
            {FOOTER_LINKS.map((section) => (
              <FooterColumn key={section.title} title={section.title}>
                {section.items.map((item) => {
                  if ("href" in item) {
                    return (
                      <FooterLink key={item.label} href={item.href}>
                        {item.label}
                      </FooterLink>
                    );
                  }

                  if ("externalHref" in item) {
                    return (
                      <FooterExternalLink key={item.label} href={item.externalHref}>
                        {item.label}
                      </FooterExternalLink>
                    );
                  }

                  return (
                    <FooterDisabledLink key={item.label}>{item.label}</FooterDisabledLink>
                  );
                })}
              </FooterColumn>
            ))}
          </div>
        </div>
      </WidthConstraint>
    </footer>
  );
};

export default Footer;
