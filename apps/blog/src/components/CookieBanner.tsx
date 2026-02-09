"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePostHog } from "posthog-js/react";
import { useState } from "react";

export default function CookieBanner() {
  const posthog = usePostHog();

  // @see https://posthog.com/tutorials/react-cookie-banner
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return false;

    return (
      window.localStorage.getItem("cookie_banner_accepted") !== "true" &&
      posthog.getFeatureFlag("cookie_banner_enabled") === "with_banner"
    );
  });

  function accept() {
    posthog.capture("cookie_banner_accepted");
    setIsVisible(false);
    window.localStorage.setItem("cookie_banner_accepted", "true");
  }

  function deny() {
    posthog.capture("cookie_banner_rejected");
    setIsVisible(false);
  }

  return (
    <AnimatePresence>
      {isVisible
        ? ((
            <motion.div
              animate={{ y: 0, opacity: 1 }}
              initial={{ y: 20, opacity: 0 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: "spring" }}
              className="flex fixed inset-x-0 bottom-0 p-4 w-full border-t backdrop-blur text-neutral-12 border-neutral-6"
            >
              <div className="flex flex-1 justify-between items-center z-[1]">
                <h4 className="font-bold">
                  This website uses cookies for analytics.
                </h4>

                <div className="flex gap-4 items-center justify-stretch">
                  <button
                    className="py-1 px-4 text-sm rounded duration-150 hover:opacity-80 text-[black] transition-ease dark:text-[white]"
                    onClick={deny}
                  >
                    Deny
                  </button>
                  <button
                    className="py-1 px-4 text-sm rounded duration-150 hover:opacity-80 transition-ease text-[white] bg-[black] dark:text-[black] dark:bg-[white]"
                    onClick={accept}
                  >
                    Accept
                  </button>
                </div>
              </div>
              <div className="absolute inset-0 z-0 opacity-80 bg-neutral-1" />
            </motion.div>
          ) as any)
        : null}
    </AnimatePresence>
  );
}
