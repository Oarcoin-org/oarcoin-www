"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { WidthConstraint } from "@/components/ui/width-constraint";
import { NAV } from "@/lib/constants";
import type { HeaderNavItem } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

function NavItemLink({
  item,
  className,
  onNavigate,
}: {
  item: HeaderNavItem;
  className?: string;
  onNavigate?: () => void;
}) {
  if (item.href) {
    return (
      <Link href={item.href} className={className} onClick={onNavigate}>
        {item.label}
      </Link>
    );
  }

  return (
    <span
      className={cn("text-muted-foreground", item.disabled && "opacity-50", className)}
    >
      {item.label}
    </span>
  );
}

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const scrollY = window.scrollY;

    const closeOnScroll = () => {
      if (window.scrollY !== scrollY) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", closeOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", closeOnScroll);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((open) => !open);

  return (
    <div className="sticky top-0 z-50">
      <header
        className={cn("relative z-[70] lg:bg-transparent", menuOpen && "bg-background")}
      >
        <WidthConstraint className="flex h-14 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={menuOpen ? closeMenu : undefined}
          >
            <Image
              src="/assets/logo.svg"
              alt="Oarcoin"
              width={110}
              height={24}
              priority
            />
          </Link>

          <Menubar className="hidden py-0 lg:flex">
            {NAV.map((section) => (
              <MenubarMenu key={section.label}>
                <MenubarTrigger>
                  {section.label} <ChevronDown className="size-4" />
                </MenubarTrigger>
                <MenubarContent>
                  {section.items.map((item) =>
                    item.href ? (
                      <MenubarItem key={item.label} asChild>
                        <Link href={item.href}>{item.label}</Link>
                      </MenubarItem>
                    ) : (
                      <MenubarItem key={item.label} disabled={item.disabled}>
                        {item.label}
                      </MenubarItem>
                    )
                  )}
                </MenubarContent>
              </MenubarMenu>
            ))}
          </Menubar>

          <div className="flex items-center gap-3 lg:hidden">
            <Button variant="outline" asChild className="h-10 rounded-md px-4">
              <Link href="/start" onClick={menuOpen ? closeMenu : undefined}>
                Get started
              </Link>
            </Button>
            <Button
              type="button"
              size="icon"
              className="size-10 rounded-md bg-[#100C24] text-white hover:bg-[#100C24]/90"
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </WidthConstraint>
      </header>

      <AnimatePresence
        onExitComplete={() => {
          document.body.style.overflow = "";
        }}
      >
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-x-0 top-14 bottom-0 z-[60] flex flex-col overflow-hidden bg-background lg:hidden"
          >
            <motion.div
              className="flex-1 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.05, ease: "easeOut" }}
            >
              <WidthConstraint className="pt-5 pb-10">
                <div className="border border-foreground bg-white">
                  <Accordion type="multiple" className="w-full">
                    {NAV.map((section) => (
                      <AccordionItem
                        key={section.label}
                        value={section.label}
                        className="border-foreground"
                      >
                        <AccordionTrigger className="rounded-none px-6 py-4 hover:no-underline">
                          {section.label}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-5 text-muted-foreground">
                          <ul className="flex flex-col gap-3">
                            {section.items.map((item) => (
                              <li key={item.label}>
                                <NavItemLink item={item} onNavigate={closeMenu} />
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </WidthConstraint>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
