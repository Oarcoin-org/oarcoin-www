"use client";

import { CopyIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type AddressProps = {
  value?: string;
  className?: string;
};

const DEFAULT_ADDRESS = "n8475nywery9848nowu028w";

const Address = ({ value = DEFAULT_ADDRESS, className }: AddressProps) => {
  const [copied, setCopied] = React.useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // no-op: clipboard may be unavailable in some contexts
    }
  };

  return (
    <section className={cn("text-center", className)}>
      <h2 className="font-medium">Official Token Address</h2>
      <div className="mt-2 inline-flex items-center overflow-hidden rounded-[0.4rem] border bg-[#EDEDE6] p-1 border-foreground">
        <code className="px-3 py-2 text-xs sm:text-sm">{value}</code>
        <Button
          type="button"
          size="sm"
          className="h-full border-y-0 border-r-0 px-3 py-2 bg-foreground text-white rounded-[0.3rem]"
          onClick={onCopy}
        >
          {copied ? "Copied" : "Copy"}
          <CopyIcon className="ms-2" />
        </Button>
      </div>
    </section>
  );
};

export default Address;
