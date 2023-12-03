import {
  defineDocumentType,
  makeSource,
  type ComputedFields,
} from "contentlayer/source-files";

import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode, { Options } from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const computedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath,
  },
  structuredData: {
    type: "json",
    resolve: (doc) => ({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: doc.title,
      datePublished: doc.date,
      dateModified: doc.date,
      description: doc.summary,
      url: `https://untitled.dev/p/${doc._raw.flattenedPath}`,
      image: doc.image
        ? `https://untitled.dev/${doc.image}`
        : `https://untitled.dev/api/og?title=${encodeURIComponent(doc.title)}`,
      author: {
        "@type": "Person",
        name: "Federico Vitale",
      },
    }),
  },
};

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "**/*.md",
  contentType: "mdx",
  computedFields,
  fields: {
    title: {
      type: "string",
      required: true,
    },
    tags: {
      type: "list",
      required: true,
      of: {
        type: "string",
      },
    },
    summary: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    origin: {
      type: "string",
    },
    image: {
      type: "string",
    },
  },
}));

export default makeSource({
  contentDirPath: "src/posts",
  documentTypes: [Post],
  contentDirExclude: process.env.NODE_ENV === "production" ? ["drafts"] : [],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "vitesse-dark",
          onVisitLine: (node: any) => {
            if (node.children.length === 0) {
              node.children = [
                {
                  type: "text",
                  value: " ",
                },
              ];
            }
          },
          onVisitHighlightedLine: (node: any) => {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord: (node, id?: string) => {
            node.properties.className = ["word"];

            if (id) {
              const className = {
                v: "bg-red-3 text-red-12",
                s: "bg-green-3 text-green-12",
                i: "bg-blue-4 text-blue-12",
              }[id];

              if (node.properties["data-rehype-pretty-code-wrapper"]) {
                node.children.forEach((n: any) => {
                  n.properties.className.push(className);
                });
              }
            }

            // node.properties.className.push("word--highlighted");
          },
        } as Options,
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
});
