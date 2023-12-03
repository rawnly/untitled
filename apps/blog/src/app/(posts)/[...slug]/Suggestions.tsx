import clsx from "clsx";
import { headers } from "next/headers";
import type { Post } from "contentlayer/generated";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

interface Props {
  post: Post;
}

export const SuggestionsPlaceholder = () => (
  <div>
    <h1 className="mb-4 text-base opacity-50">You might also like:</h1>
    <div
      className={clsx(
        "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-x-scroll"
      )}
    >
      {Array.from(new Array(3).fill(0)).map((_, idx) => (
        <div
          key={idx}
          className={clsx(
            "px-4 py-2 rounded space-y-3 py-4 bg-neutral-2 transition-colors",
            {
              "xl:col-span-1 md:col-span-2": idx === 2,
            }
          )}
        >
          <h3 className="w-full h-5 rounded animate-pulse bg-neutral-6"></h3>
          <div className="space-y-2">
            <p className="w-[30%] h-4 rounded animate-pulse bg-neutral-4"></p>
            <p className="w-[80%] h-4 rounded animate-pulse bg-neutral-4"></p>
            <p className="w-[50%] h-4 rounded animate-pulse bg-neutral-4"></p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default async function Suggestions({ post }: Props) {
  const host = headers().get("host");

  const posts = await fetch(
    `http://${host}/api/suggestions?slug=${post.slug}`
  ).then((response) => response.json() as Promise<Post[]>);

  if (!posts || !posts.length) return null;

  return (
    <div>
      <h1 className="mb-4 text-base opacity-50">You might also like:</h1>
      <div
        className={clsx(
          "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-x-scroll",
          {
            "xl:grid-cols-1": posts.length === 1,
            "xl:grid-cols-2": posts.length === 2,
          }
        )}
      >
        {posts?.map((post, idx) => (
          <Link
            href={`/${post.slug}`}
            prefetch
            className={clsx(
              "px-4 py-2 rounded hover:bg-neutral-2 transition-colors",
              {
                "xl:col-span-1 md:col-span-2": idx === 2,
              }
            )}
            key={post.slug}
          >
            <h3 className="text-lg">
              <Balancer>{post.title}</Balancer>
            </h3>
            <p className="text-sm">
              <Balancer>{post.summary}</Balancer>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
