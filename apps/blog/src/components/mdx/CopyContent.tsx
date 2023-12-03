"use client";

import { Check, Copy } from "lucide-react";
import { useRef, useState } from "react";
import { tv } from "tailwind-variants";

const variants = tv({
  base: [
    "absolute z-50 opacity-0 top-2.5 right-2.5",
    "duration-250 px-4 py-2.5 rounded transition-all",
    "group-hover:opacity-100",
    "hover:bg-neutral-4 active:bg-neutral-5 active:scale-[.96]",
    "max-sm:hidden",
  ],
});

export default function CopyContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  function onClick() {
    if (!ref.current || copied) return;
    const content = ref.current.textContent;

    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  return (
    <div ref={ref} className="group relative">
      <button onClick={onClick} className={variants()} disabled={copied}>
        {copied ? <Check className="w-5" /> : <Copy className="w-5" />}
      </button>

      {children}
    </div>
  );
}
