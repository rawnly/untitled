"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import ScrambleText from "@repo/ui/hacker-text";
import * as Avatar from "@radix-ui/react-avatar";
import clsx from "clsx";

interface WorkExperience {
  role: string;
  company: string;
  period: string;
  extra?: string;
  location: string;
  children?: React.ReactNode;
  technologies?: string[];
  image?: string;

  className?: string;
}

export default function WorkExperience(props: WorkExperience) {
  const { ref, inView } = useInView();

  return (
    <div ref={ref} className="space-y-4">
      <div className="flex gap-4 justify-start items-end max-sm:items-start max-sm:flex-col">
        <div className="overflow-hidden relative w-12 h-12 rounded print:hidden">
          {props.image && (
            <Image
              fill
              alt={props.company}
              className="w-full h-full"
              src={props.image}
            />
          )}
        </div>
        <div className="flex flex-col justify-start items-start">
          <h3 className="font-mono text-lg font-bold sm:text-xl print:text-lg text-neutral-12">
            {props.role} @ {props.company}
          </h3>
          <p className="font-mono">
            {props.period}, {props.extra ? `${props.extra},` : ""}{" "}
            {props.location}
          </p>
        </div>
        {props.technologies && (
          <p
            key={props.role + props.company}
            className="space-x-2 sm:ml-auto print:hidden"
          >
            {props.technologies.map((item, i) => (
              <ScrambleText
                key={item}
                as="span"
                className="font-mono text-sm font-medium capitalize"
                autoStart={false}
                shouldPlay={inView}
                colored
              >
                {item}
              </ScrambleText>
            ))}
          </p>
        )}
      </div>
      <div className={clsx(props.className, "leading-relaxed text-neutral-11")}>
        {props.children}
      </div>
    </div>
  );
}
