import clsx from "clsx";
import Link from "next/link";
import { tv } from "tailwind-variants";
import CopyContent from "./CopyContent";

const linkVariants = tv({
  base: "text-primary-11 hover:underline",
});

const isRepoUrl = (url?: string) =>
  /(https?:\/\/)?github.com\/.*\/.*/g.test(url ?? "");

const shortenRepoUrl = (url?: string) =>
  url?.replace(/(https?:\/\/)?github.com\//g, "");

export const a = ({
  className,
  href,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"a">) =>
  isRepoUrl(href) && !children ? (
    <Link href={href ?? "#"} className={linkVariants({ className })} {...props}>
      {shortenRepoUrl(href)}
    </Link>
  ) : (
    <Link className={linkVariants({ className })} href={href ?? "#"} {...props}>
      {children}
    </Link>
  );

const ulVariants = tv({
  base: "my-6 ml-6 list-disc [&>li]:mt-2",
});

export const ul = ({
  children,
  className,
  ...props
}: React.ComponentProps<"ul">) => (
  <ul className={ulVariants({ className })} {...props}>
    {children}
  </ul>
);

const olVariants = tv({
  base: ["my-6 ml-6 list-disc [&>li]:mt-2", "list-decimal"],
});

export const ol = ({
  children,
  className,
  ...props
}: React.ComponentProps<"ol">) => (
  <ul className={olVariants({ className })} {...props}>
    {children}
  </ul>
);

export const h1 = ({
  children,
  className,
  ...props
}: React.ComponentProps<"h1">) => (
  <h1
    {...props}
    className={clsx(
      "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      className
    )}
  >
    {children}
  </h1>
);

export const h2 = ({
  children,
  className,
  ...props
}: React.ComponentProps<"h2">) => (
  <h2
    {...props}
    className={clsx(
      "scroll-m-20 border-b pb-4 mb-2 mt-6 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
      "border-neutral-6",
      className
    )}
  >
    {children}
  </h2>
);

export const h3 = ({
  children,
  className,
  ...props
}: React.ComponentProps<"h2">) => (
  <h3
    {...props}
    className={clsx(
      "scroll-m-20 text-2xl font-semibold tracking-tight",
      className
    )}
  >
    {children}
  </h3>
);

export const h4 = ({
  children,
  className,
  ...props
}: React.ComponentProps<"h2">) => (
  <h4
    {...props}
    className={clsx(
      "scroll-m-20 text-xl font-semibold tracking-tight",
      className
    )}
  >
    {children}
  </h4>
);

export const small = ({
  children,
  className,
  ...props
}: React.ComponentProps<"small">) => (
  <small
    {...props}
    className={clsx("text-sm font-medium leading-none", className)}
  >
    {children}
  </small>
);

export const blockquote = ({
  children,
  ...props
}: React.ComponentProps<"blockquote">) => (
  <blockquote
    {...props}
    className={clsx(
      "mt-6 border-l-2 border-neutral-6 pl-6 italic",
      "text-neutral-11",
      props.className
    )}
  >
    {children}
  </blockquote>
);

const codeVariants = tv({
  base: [
    "text-neutral-12 bg-neutral-3 tabular-nums",
    "relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
  ],
});

export function code({
  children,
  className,
  ...props
}: React.ComponentProps<"code">) {
  return (
    <code className={codeVariants({ className })} {...props}>
      {children}
    </code>
  );
}

const preVariants = tv({
  base: [
    "text-sm text-neutral-12",
    "border border-neutral-6 rounded bg-neutral-3 p-4 my-4 overflow-x-scroll",
    "relative group",
  ],
});

export function pre({
  className,
  children,
  ref: _ref,
  ...props
}: React.ComponentProps<"pre">) {
  return (
    <CopyContent>
      <pre className={preVariants({ className })} {...props}>
        {children}
      </pre>
    </CopyContent>
  );
}

export const p = ({ className, ...props }: any) => (
  <p
    {...props}
    className={clsx(
      className,
      "leading-7 [&:not(:first-child)]:mt-6 focusable-row"
    )}
  />
);
