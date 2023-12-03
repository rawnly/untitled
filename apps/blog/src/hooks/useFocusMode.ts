"use client";

import { atom, useAtom } from "jotai";
import { useCallback, useEffect } from "react";

const focusModeAtom = atom(false);

export default function useFocusMode() {
  const [isActive, setActive] = useAtom(focusModeAtom);

  useEffect(() => {
    document.body.classList.toggle("data-focus-mode", isActive);
  }, [isActive]);

  const toggle = useCallback(() => setActive((a) => !a), [setActive]);

  return {
    isActive,
    toggle,
    setActive,
  };
}
