import Image from "next/image";
import Link from "next/link";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { WidthConstraint } from "@/components/ui/width-constraint";
import { NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const Header = () => {
  return (
    <header className={cn("sticky top-0 z-50")}>
      <WidthConstraint className="flex h-14 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/assets/logo.svg" alt="Oarcoin" width={110} height={24} priority />
        </Link>

        <Menubar className="py-0">
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
      </WidthConstraint>
    </header>
  );
};

export default Header;
