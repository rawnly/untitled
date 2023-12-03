import { forwardRef } from "react";
import clsx from "clsx";

export const inputStyle = clsx(
  "py-2 px-4 w-full text-sm rounded border transition-all outline-none",
  "focus:ring-1 aria-[errormessage]:border-red-6 placeholder:opacity-50",
  "border-neutral-6 bg-neutral-2 sm:text-md focus:ring-neutral-6",
  "read-only:opacity-25",
);

export default forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  function Input(props, ref) {
    return (
      <input
        ref={ref}
        {...props}
        className={clsx(inputStyle, props.className)}
      />
    );
  },
);

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(function TextArea(props, ref) {
  return (
    <textarea
      {...props}
      ref={ref}
      className={clsx(inputStyle, props.className)}
    ></textarea>
  );
});
