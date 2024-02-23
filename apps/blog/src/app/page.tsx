import { allPosts } from "contentlayer/generated";
import PostsList from "./PostsList";
import Link from "next/link";
import SearchTag from "./SearchTag";
import HackerText from "@/components/HackerText";

import clsx from "clsx";

export default async function Page({ params, searchParams }: any) {
  const isFilteredByTag = !!searchParams.tag;

  return (
    <div>
      <div className={clsx("py-24 mx-auto text-center")}>
        <h1
          className={clsx(
            "mb-2.5 text-3xl font-mono font-medium md:text-5xl lg:text-7xl"
          )}
        >
          Welcome to{" "}
          <HackerText
            colored
            repeat={10_000}
            as="span"
            className={clsx(
              "italic font-bold transition-colors hover:text-primary-11 hover:not-italic"
            )}
          >
            untitled
          </HackerText>
        </h1>
        <p className="text-xl">A place where I share my daily findings</p>
        <p className="mt-1 text-xs">
          by{" "}
          <Link
            className="hover:underline text-primary-11"
            href="https://fedevitale.dev"
          >
            Federico Vitale
          </Link>
        </p>
      </div>
      <PostsList posts={allPosts} />
      {isFilteredByTag && (
        <div className="flex gap-x-2 justify-center items-center px-4 my-4 w-full">
          Posts tagged by <SearchTag>{searchParams.tag}</SearchTag>
        </div>
      )}
    </div>
  );
}
