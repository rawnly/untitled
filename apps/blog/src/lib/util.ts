import { Post } from "contentlayer/generated";
import compare from "date-fns/compareDesc";

export function sortPosts(posts: Post[]) {
  return posts.sort((a, b) => compare(new Date(a.date), new Date(b.date)));
}
