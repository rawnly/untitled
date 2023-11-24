"use client";

import Link, { type LinkProps } from "next/link";
import { useState } from "react";
import { animated, useSpringValue, config } from "@react-spring/web";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";

interface Props extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedLink = animated(Link);
const AnimatedSlot = animated(Slot);

export function MagneticContainer({
  children,
  scale: shouldScale = false,
  direction = "x",
  rotate: shouldRotate = false,
  max,
}: {
  children: React.ReactNode;
  direction?: "x" | "y";
  scale?: boolean;
  rotate?: boolean;
  max?: number;
}) {
  const offset = useSpringValue(0, {
    config: {
      ...config.wobbly,
    },
  });

  const scale = useSpringValue(1, {
    config: {
      ...config.wobbly,
      tension: 200,
    },
  });

  return (
    <AnimatedSlot
      style={{
        willChange: "transform",
        translate3d: [
          direction === "x" ? offset : 0,
          direction === "y" ? offset : 0,
          1,
        ],
        rotate3d: shouldRotate
          ? [
              direction === "y" ? 1 : 0,
              direction === "x" ? 1 : 0,
              0,
              offset.to((x) => x * 2.5),
            ]
          : undefined,
        scale,
      }}
      onMouseOut={() => {
        scale.start(1, {
          delay: 75,
        });

        offset.start(0, {
          delay: 75,
        });
      }}
      onMouseMove={(e) => {
        let val = 0,
          center = 0;

        switch (direction) {
          case "x":
            let { left, width } = e.currentTarget.getBoundingClientRect();
            center = left + width / 2;
            val = (e.clientX - center) / 10;
            break;
          case "y":
            let { top, height } = e.currentTarget.getBoundingClientRect();
            center = top + height / 2;
            val = (e.clientY - center) / 10;
            break;
        }

        if (max !== undefined) val = Math.min(Math.max(val, -max), max);
        offset.start(val);
        if (shouldScale) scale.start(1.01);
      }}
    >
      {children}
    </AnimatedSlot>
  );
}

export default function MagneticLink({ children, ...props }: Props) {
  const offset = useSpringValue(0, {
    config: {
      ...config.wobbly,
      tension: 200,
    },
  });

  return (
    <AnimatedLink
      {...props}
      className={clsx(
        "py-2 px-4 rounded transition-colors hover:bg-neutral-2",
        props.className,
      )}
      style={{
        willChange: "transform",
        translate3d: [offset, 0, 1],
      }}
      onMouseOut={() => offset.start(0)}
      onMouseMove={(e) => {
        let { left, width } = e.currentTarget.getBoundingClientRect();
        const center = left + width / 2;
        let val = (e.clientX - center) / 10;

        offset.start(val);
      }}
    >
      <animated.div
        style={{
          willChange: "transform",
          translate3d: [offset, 0, 1],
          rotate3d: [0, 1, 0, offset.to((x) => x * 2.5)],
        }}
      >
        {children}
      </animated.div>
    </AnimatedLink>
  );
}

export const AnimatePostLink = ({ children, ...props }: Props) => {
  const offset = useSpringValue(0, {
    config: {
      ...config.wobbly,
      tension: 200,
    },
  });

  const scale = useSpringValue(1, {
    config: {
      ...config.wobbly,
      tension: 200,
    },
  });

  return (
    <AnimatedLink
      {...props}
      style={{
        willChange: "transform",
        translate3d: [0, offset, 1],
        scale,
      }}
      onMouseOut={() => {
        scale.start(1, {
          delay: 75,
        });

        offset.start(0, {
          delay: 75,
        });
      }}
      onMouseMove={(e) => {
        let { top, height } = e.currentTarget.getBoundingClientRect();
        const center = top + height / 2;
        let val = (e.clientY - center) / 10;

        offset.start(val);
        scale.start(1.01);
      }}
    >
      {children}
    </AnimatedLink>
  );
};
