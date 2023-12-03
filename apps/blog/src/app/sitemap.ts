import { allPosts } from "contentlayer/generated";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://untitled.dev",
      lastModified: new Date(),
    },
    {
      url: "https://untitled.dev/about",
      lastModified: new Date(2023, 7, 3),
    },
    ...allPosts.map((post) => ({
      url: `https://untitled.dev/${post.slug}`,
      lastModified: new Date(post.date),
    })),
  ];
}
