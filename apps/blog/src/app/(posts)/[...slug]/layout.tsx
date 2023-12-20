import { allPosts } from "contentlayer/generated";
import { Metadata } from "next";
import { findPost } from "./utils";
import { notFound } from "next/navigation";
import Suggestions, { SuggestionsPlaceholder } from "./Suggestions";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import Balancer from "react-wrap-balancer";
import { format } from "date-fns";
import { Suspense } from "react";
import ThemeSelector from '@repo/ui/theme-selector'
import HackerText from "@/components/HackerText";
import ThemeSwitch from "./theme-switch";

type Params = {
  slug: string
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata | undefined> {
  const post = allPosts.find(findPost(params.slug));

  if (!post) {
    return;
  }

  const { title, date, summary: description, image, slug } = post;
  const ogImage = image
    ? `/${image}`.replace(/\/\//g, "/")
    : `/api/og/${slug}`.replace(/\/\//g, "/");

  return {
    title,
    description,
    keywords: post.tags,
    alternates: {
      canonical: post.origin,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: date,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@fedevitaledev",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Layout(props: { params: Params; children: React.ReactNode }) {
  const post = allPosts.find(findPost(props.params.slug));

  if (!post) notFound();

  const date = format(new Date(post.date), "MMMM do, yyyy");

  return (
    <>
      <nav className="flex sticky top-0 gap-4 justify-start items-center py-4 px-8 navbar z-[51]">
        <div className="inset-0 z-50 aboslute">
          <Link href="/" className="hover:opacity-50 active:opacity-25">
            <HackerText
              colored
              as="h1"
              className="-mb-1.5 font-mono text-xl font-bold"
            >
              untitled.dev
            </HackerText>
            <small className="text-xs">by Federico Vitale</small>
          </Link>
        </div>
      </nav>
      <ThemeSwitch className='absolute top-5 right-5 z-[52]'/>
      <div className="flex flex-col gap-8 py-24 px-4 md:px-12">
        <header className="flex flex-col gap-2 mb-8 w-full text-center sm:mb-16">
          <small>{date}</small>
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl text-neutral-12">
            <Balancer>{post.title}</Balancer>
          </h1>
          <p className="mx-auto md:text-xl lg:text-2xl max-w-[600px]">
            <Balancer>{post.summary}</Balancer>
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center mx-auto mt-4 text-sm max-sm:text-xs">
            {post.tags.map((tag: string) => (
              <Link
                className="py-2 px-2 rounded opacity-25 transition-all cursor-pointer sm:px-4 hover:opacity-100 hover:bg-neutral-2"
                key={tag}
                href={`/?tag=${tag}`}
              >
                #{tag}
              </Link>
            ))}
          </div>
        </header>
        <section>
          {props.children}
          {post.origin && (
            <div className="flex flex-col gap-4 mt-4">
              <hr className="my-0 opacity-50" />
              <p className="inline-flex gap-1 text-sm opacity-75 transition-all hover:opacity-100">
                Originally posted{" "}
                <Link
                  target="_blank"
                  className="inline-flex gap-0 justify-start items-base"
                  href={post.origin}
                >
                  here <ExternalLink className="h-2.5" />
                </Link>
              </p>
            </div>
          )}
        </section>

        <Suspense fallback={<SuggestionsPlaceholder />}>
          <Suggestions post={post} />
        </Suspense>
      </div>
    </>
  );
}
