"use client";
import { Glasses, SunDim } from "lucide-react";

import useFocusMode from "@/hooks/useFocusMode";
import { tv } from "tailwind-variants";

const variants = tv({
  base: "px-4 py-2 rounded hover:bg-neutral-2 cursor-pointer",
});

export default function FocusModeToggle({
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<"button">, "onClick">) {
  const { isActive, toggle } = useFocusMode();

  return (
    <button onClick={toggle} className={variants({ className })} {...props}>
      {isActive ? <SunDim /> : <Glasses />}
    </button>
  );
}
