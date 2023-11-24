"use client";

import { Fragment, useCallback, useEffect, useState } from "react";

interface Props {
  children: string;
  duration?: number;
  as?: React.JSXElementConstructor<any> | keyof React.JSX.IntrinsicElements;
  asChild?: boolean;
  className?: string;
  repeat?: number;
  colored?: boolean;
  autoStart?: boolean;
}

function randomChars(length: number) {
  const charset = "abcdefghilmnpqrstuvwxyz0123456789!$%&/()=?*@#";

  return Array.from(
    { length },
    () => charset[Math.floor(Math.random() * charset.length)],
  ).join("");
}

function maskText(text: string): string {
  return text
    .split(" ")
    .map((w) =>
      w.includes(".")
        ? w.split(".").map(maskText).join(".")
        : randomChars(w.length),
    )
    .join(" ");
}

async function* unmask(text: string, speed = 75) {
  let prefix = "";

  for (let i = 0; i < text.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, speed));

    let remainingText = maskText(text.slice(i + 1));
    prefix += text.charAt(i);

    yield { text: prefix, scrambled: remainingText };
  }
}

async function* scramble(text: string, speed: number = 75) {
  let prefix: string = "";

  for (let i = 0; i < text.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, speed));
    prefix += text.charAt(i);
    yield prefix + randomChars(text.trim().length - prefix.trim().length);
  }

  yield prefix;
}

export default function ColoredHackerText({
  children,
  as: Component,
  duration,
  className,
  repeat = 0,
  autoStart = true,
  colored,
}: Props) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [text, setText] = useState(
    autoStart ? children?.toString() : maskText(children?.toString()),
  );
  const [scrambled, setScrambled] = useState("");

  const animate = useCallback(
    async function animate() {
      console.log("animate");
      setIsAnimating(true);

      for await (const chunk of unmask(
        children?.toString(),
        duration ? duration / children?.toString()?.length : 75,
      )) {
        setText(chunk.text);
        setScrambled(chunk.scrambled);
      }

      setIsAnimating(false);
    },
    [duration, children],
  );

  useEffect(() => {
    if (!autoStart) return;

    animate();

    if (!repeat) return;

    let id = setInterval(() => {
      animate();

      if (repeat === 0) {
        clearInterval(id);
      }
    }, repeat);

    return () => clearInterval(id);
  }, [children, animate, autoStart, duration, repeat]);

  function onHover() {
    console.log("onHover");
    if (autoStart || isAnimating) return;
    animate();
  }

  const Comp = Component ?? Fragment;

  return (
    <Comp onMouseOver={onHover} className={className}>
      {text}
      <span className={colored ? "text-primary-11 tabular-nums" : undefined}>
        {scrambled}
      </span>
    </Comp>
  );
}

function isReactText(node: any): node is React.ReactText {
  return typeof node === "string" || typeof node === "number";
}
