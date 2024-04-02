import Image from "next/image";
import clsx from "clsx";
import { MagneticContainer } from "@repo/ui/magnet";

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
  return (
    <div className="space-y-4">
      <div className="flex gap-4 justify-start items-end max-sm:items-start max-sm:flex-col">
        <MagneticContainer direction="both">
          <div className="overflow-hidden relative w-12 h-12 rounded aspect-square print:hidden">
            {props.image && (
              <Image
                fill
                alt={props.company}
                className="w-full h-full aspect-square"
                src={props.image}
              />
            )}
          </div>
        </MagneticContainer>
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
            className="flex uppercase sm:flex-col sm:ml-auto max-sm:gap-2 print:hidden"
          >
            {props.technologies.sort((a,b) => a.length - b.length).map((item, i) => (
              <span key={item} className="font-mono text-xs font-medium text-right">
                {item}
              </span>
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
