import ColoredHackerText from "@/components/HackerText";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

export default function Layout(p: any) {
  return (
    <>
      <nav className="flex sticky top-0 gap-4 justify-start items-center py-4 px-8 navbar z-[9999]">
        <div className="inset-0 z-50 aboslute">
          <Link href="/" className="hover:opacity-50 active:opacity-25">
            <ColoredHackerText
              as="h1"
              colored
              className="-mb-1.5 text-2xl font-bold"
            >
              untitled.dev
            </ColoredHackerText>
            <small className="text-xs">by Federico Vitale</small>
          </Link>
        </div>
      </nav>
      <div className="flex flex-col gap-8 py-24 px-4 md:px-12">
        <header className="flex flex-col gap-2 mb-8 w-full text-center sm:mb-16">
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl text-neutral-12">
            <Balancer>About Me</Balancer>
          </h1>
          <p className="mx-auto md:text-xl lg:text-2xl max-w-[600px]">
            <Balancer>
              A little bit about me, my journey and my passions
            </Balancer>
          </p>
        </header>
        <section>{p.children}</section>
      </div>
    </>
  );
}
