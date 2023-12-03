"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h1>Page not found</h1>
      <p>Sorry, I couldn&apos;t find the page you were looking for.</p>
      <p className="mt-2 text-sm">
        <Link
          className="flex inline-flex relative justify-start items-center pl-5 group"
          href="/"
        >
          <ArrowLeft className="absolute -left-0 top-1/2 w-4 transition-all -translate-y-1/2 group-hover:-translate-x-2" />
          <span>Back home</span>
        </Link>
      </p>
    </div>
  );
}
