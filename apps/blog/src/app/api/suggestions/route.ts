// based on current post tags
// suggest similar posts

import compare from "date-fns/compareDesc";
import { Post, allPosts } from "contentlayer/generated";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  let suggestions = allPosts
    .filter(filterSimilar(post))
    .sort((a, b) => compare(new Date(a.date), new Date(b.date)))
    .slice(0, 3);

  if (suggestions.length < 3) {
    suggestions = [
      ...suggestions,
      ...allPosts
        .filter(
          (p) =>
            p.slug !== post.slug && suggestions.every((s) => s.slug !== p.slug)
        )
        .sort((a, b) => compare(new Date(a.date), new Date(b.date)))
        .slice(0, 3 - suggestions.length),
    ];
  }

  return NextResponse.json(suggestions);
}

const getTags = (post: Pick<Post, "tags">) =>
  post.tags.map((tag) => tag.trim());

function filterSimilar({ tags, slug }: Post) {
  return (post: Post) =>
    post.slug !== slug &&
    getTags(post).some((tag) => getTags({ tags }).includes(tag));
}
