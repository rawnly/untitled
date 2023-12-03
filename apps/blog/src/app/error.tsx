"use client";

import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset(): void;
}) {
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <div>
        <h1>Oops, something went wrong</h1>
        <p>{error.message}</p>
        <div className="flex items-center gap-4 justify-end">
          <button
            onClick={reset}
            className="mt-4 px-4 py-2 rounded hover:bg-neutral-2 active:scale-[.98] active:bg-neutral-3 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="mt-4 px-4 py-2 rounded hover:bg-neutral-2 active:scale-[.98] active:bg-neutral-3 transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
