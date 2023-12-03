import { allPosts } from "contentlayer/generated";
import { NextRequest, NextResponse } from "next/server";
import { sortPosts } from "@/lib/util";

export async function GET(request: NextRequest) {
  const tags = request.nextUrl.searchParams.getAll("tag");
  const query = request.nextUrl.searchParams.get("q");

  const posts = allPosts
    .filter((post) => {
      if (tags.length) {
        return tags.some((tag) => post.tags.includes(tag.trim()));
      }

      return true;
    })
    .filter((post) => {
      if (query) {
        return post.title
          .toLowerCase()
          .trim()
          .includes(query.toLowerCase().trim());
      }

      return true;
    });

  return NextResponse.json({
    data: sortPosts(posts),
    count: posts.length,
  });
}
