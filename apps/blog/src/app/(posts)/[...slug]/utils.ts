import { Post } from "contentlayer/generated";

export const makeSlug = (slug: string | string[]): string =>
  Array.isArray(slug) ? slug.join("/") : slug;

export function findPost(slug: string | string[]) {
  return (post: Post) => post.slug === makeSlug(slug);
}
