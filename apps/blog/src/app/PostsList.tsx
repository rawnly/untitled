"use client";

import type { Post } from "contentlayer/generated";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { SearchResponse } from "./api/search/type";
import PostListItem from "@/components/PostListItem";
import { sortPosts } from "@/lib/util";

interface Props {
  posts: Post[];
  search?: string;
  tags?: string[];
}

const makeUrl = (
  url: string,
  params: Record<string, string | string[] | undefined | null>
): string => {
  const searchParams = new URLSearchParams();

  for (const [k, v] of Object.entries(params)) {
    if (!v) continue;

    if (Array.isArray(v)) {
      for (const i of v) {
        searchParams.append(k, i);
      }

      continue;
    }

    searchParams.set(k, v);
  }

  return `${url}?${searchParams.toString()}`;
};

export default function PostsList({ posts = [], ...props }: Props) {
  const p = useSearchParams();
  const tag = props.tags ?? p.getAll("tag");
  const q = props.search ?? p.get("search");

  const { data: response } = useSWR(
    [{ tag, q }, "/api/search"],
    ([p, url]) =>
      fetch(makeUrl(url, p)).then(
        (r) => r.json() as Promise<SearchResponse<Post>>
      ),
    {
      fallbackData: {
        data: sortPosts(posts),
        count: posts.length,
      },
    }
  );

  return (
    <ul className="flex flex-col gap-4">
      {response.data.map((post) => (
        <PostListItem key={post.slug} post={post} />
      ))}
    </ul>
  );
}
