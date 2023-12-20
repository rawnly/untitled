import clsx from "clsx";
import Avatar from "@radix-ui/react-avatar";
import WorkExperience from "@/components/work-experience";
import { MagneticContainer } from "@repo/ui/magnet";
import ScrambledText from "@repo/ui/hacker-text";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="space-y-2 font-mono">
        <ScrambledText
          as="h2"
          colored
          className="text-2xl font-bold text-neutral-12"
        >
          Software Engineer
        </ScrambledText>
        <ScrambledText
          colored
          as="h1"
          className="text-5xl font-bold text-neutral-12"
        >
          Federico Vitale
        </ScrambledText>
      </div>
      <div className="grid grid-cols-1 items-start mt-12 sm:grid-cols-8 sm:gap-8">
        <aside className="self-start space-y-6 sm:sticky sm:top-12 sm:col-span-2 max-sm:mb-16">
          <div className="space-y-2">
            <h3 className="font-mono font-medium text-neutral-12">
              Things I work with
            </h3>

            <ul className="text-neutral-11">
              <li>Go</li>
              <li>Rust</li>
              <li>Typescript</li>
              <li>React / Next.js</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-mono font-medium text-neutral-12">
              Get in touch
            </h3>
            <ul className="text-neutral-11">
              <li>
                <a target="_blank" href="https://github.com/rawnly">
                  Github
                </a>
              </li>
              <li>
                <a target="_blank" href="https://x.com/fedevitaledev">
                  X (Twitter)
                </a>
              </li>
              <li>
                <a target="_blank" href="https://medium.com/@fedevitale">
                  Medium
                </a>
              </li>
              <li className="mt-4">
                <a target="_blank" href="https://untitled.dev">
                  untitled.dev
                </a>
              </li>
              <li>
                <a target="_blank" href="https://fedevitale.dev">
                  fedevitale.dev
                </a>
              </li>
              <li className="mt-4">
                <a href="mailto:mail@fedevitale.dev">mail@fedevitale.dev</a>
              </li>
            </ul>
          </div>
          {/* <div className="grid grid-cols-2 gap-4"> */}
          {/*   <MagneticContainer direction="x"> */}
          {/*     <button className="w-full text-sm font-medium text-center rounded border hover:opacity-75 bg-neutral-3 border-neutral-6 text-neutral-12"> */}
          {/*       <p className="py-2 px-4">PDF</p> */}
          {/*     </button> */}
          {/*   </MagneticContainer> */}
          {/*   <MagneticContainer direction="x"> */}
          {/*     <button className="w-full text-sm font-medium text-center rounded border hover:opacity-75 bg-neutral-3 border-neutral-6 text-neutral-12"> */}
          {/*       <p className="py-2 px-4">PDF</p> */}
          {/*     </button> */}
          {/*   </MagneticContainer> */}
          {/* </div> */}
        </aside>

        <div className="col-span-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">About Me</h1>
            <p className="leading-relaxed">
              At the age of 7, my passion for technology was sparked by my
              brother, who despite everything, engaged me in tech and science.
              His love for games and technology deeply influenced me and
              inspired my career choice. Now as a Software Engineer, I thrive on
              perpetual learning and the exploration of emerging technologies.{" "}
              <Link
                href="https://untitled.dev/about"
                className="font-mono text-xs"
                data-attr="autocapture-button"
              >
                [Learn more]
              </Link>
            </p>
          </div>

          <div className="flex flex-col gap-8 mt-16 space-y-2">
            <h1 className="-mb-2 text-2xl font-bold">Experience</h1>
            <WorkExperience
              image="/companies/satispay.jpeg"
              role="Software Engineer"
              company="Satispay"
              period="2024"
              technologies={["React", "Typescript"]}
              location="Milan (Hybrid)"
            ></WorkExperience>

            <WorkExperience
              image="/companies/palette.jpeg"
              role="Software Engineer, Rust"
              company="Palette"
              period="Jul 2023"
              technologies={["Rust", "Tokio", "Apache Kafka"]}
              location="San Francisco"
              extra="contract"
            >
              I assisted Palette in transitioning a TypeScript micro-service to
              Rust. My primary responsibilities included utilising Rust’s
              asynchronous and multithreaded capabilities to optimise the
              performance and reliability of the micro-service. As result of the
              transition the new product is 2 times faster and capable to ingest
              up to 500k msg/s from Kafka.
            </WorkExperience>

            <WorkExperience
              image="/companies/aquacloud.jpeg"
              role="Software Engineer"
              company="Aquacloud"
              period="Sept 2021 - Nov 2023"
              technologies={["Next.js", "React", "Rust", "Typescript"]}
              location="Trento"
            >
              Led the front-end team in our endeavor to develop an accessible
              and maintainable platform that drives innovation in the
              blue-economy sector. In our tech stack, we leverage a monorepo
              architecture powered by Next.js, Turbo, and Typescript. To ensure
              the quality of our codebase, we employ Vitest for unit testing and
              conduct end-to-end testing using Playwright. As part of my
              responsibilities, I oversee the maintenance of our CI/CD pipeline
              with Github Actions. Additionally, I actively contribute to the
              development and upkeep of internal utilities and microservices
              written in Rust and Go.
            </WorkExperience>

            <WorkExperience
              image="/companies/facile.jpeg"
              role="React Engineer"
              company="Facile.it"
              period="May 2021 - Sept 2021"
              technologies={["React", "PHP", "Typescript"]}
              location="Milan"
            >
              During my tenure at Facile, I was entrusted with the development
              of an internal tool specifically focused on refactoring the
              authentication system to support multi-tab functionality. As part
              of my role, I successfully created a new internal library that was
              subsequently adopted by all teams within the organization.
            </WorkExperience>

            <WorkExperience
              image="/companies/chili.jpeg"
              role="Frontend Engineer"
              company="CHILI"
              period="June 2020 - May 2021"
              technologies={["React", "Typescript"]}
              location="Milan"
              className="space-y-2"
            >
              <p>
                During my tenure at CHILI, I was responsible for the development
                and maintenance of various sections of the Smart TV app and
                website, using React as the primary framework. A significant
                contribution I made was driving the adoption of Typescript
                across the company's front-end teams. This involved gradually
                refactoring existing codebases and teaching best practices.
              </p>
              <p>Here are some notable achievements during my time at CHILI:</p>
              <ul className="pl-4 my-2 list-disc">
                <li>Led the successful adoption of Typescript company-wide.</li>
                <li>
                  Revamped the build system by migrating from grunt to Webpack
                  5.
                </li>
                <li>
                  Led the transition to a monorepo structure to accommodate
                  internal new projects.
                </li>
                <li>
                  Conducted extensive refactoring of the testing suite,
                  leveraging jest.
                </li>
              </ul>
              <p>
                These initiatives aimed to bolster development processes, ensure
                code quality, and foster an efficient and scalable environment
                at CHILI.
              </p>
            </WorkExperience>

            <WorkExperience
              image="/companies/simul_tech.jpeg"
              role="Fullstack Developer"
              company="Simultech"
              period="Dec 2018 - June 2020"
              technologies={["React", "Typescript", "Spring", "Java"]}
              location="Rome"
              className="space-y-2"
            >
              <ul className="pl-4 list-disc">
                <li>
                  <strong>thess.io</strong>: Developed the complete front-end
                  using React (Next.js) and contributed to the backend using
                  Java (SpringBoot). Thess was an event management platform
                  utilized by AS Roma (2019-2020) and Heineken (2019) for
                  managing premium hospitality at Olympic Stadium.
                </li>
                <li>
                  <strong>flyup.aero</strong>: Migrated the front-end platform
                  from Angular to React, ensuring a seamless transition.
                </li>
                <li>
                  <strong>schoolr.net</strong>: Assisted the client by
                  transforming their design into a functional application. This
                  involved migrating an existing PHP-based web application to
                  Next.js and developing an administration panel.
                </li>
              </ul>

              <p>
                Apart from these specific projects, I also worked on various
                other endeavors for multiple clients. My primary focus was
                building front-end solutions using React, while the backend was
                developed using Node.js, SpringBoot (Java/Kotlin), or a
                combination of both technologies.
              </p>
            </WorkExperience>
          </div>

          <div className="flex flex-col gap-8 mt-16 space-y-2">
            <h1 className="-mb-2 text-2xl font-bold">Projects</h1>

            <Project
              name="gist.nvim"
              url="https://github.com/rawnly/gist.nvim"
              year={2023}
            >
              gist.nvim is a Neovim plugin that allows you to create a GitHub
              Gist from the current file. The plugin uses the gh command-line
              tool to create the Gist and provides a simple interface for
              specifying the Gist's description and privacy settings.
            </Project>

            <Project
              name="Next Wayfinder"
              url="https://next-wayfinder.dev"
              year={2023}
            >
              <b>next-wayfinder</b> is a lightweight{" "}
              <code>(~3kb minzipped)</code> and flexible package that simplifies
              the organization of middleware in Next.js applications. With
              next-wayfinder, you can easily apply different middlewares based
              on the route or hostname, without having to use cumbersome and
              error-prone path checks.
            </Project>

            <Project
              name="Hawk"
              url="https://github.com/rawnly/hawk"
              year={2022}
            >
              <p>
                <a href="#">
                  Github actions don't yet support workflows inside subfolders
                </a>
                , neither in your <code>.github/workflows/</code> folder or
                project custom folders. So I made hawk to solve this problem
                without using custom commands. It lets you copy workflows from
                custom paths and paste them with a prefix, handling most of the
                pain. With 10 lines config you have a working monorepo setup.
              </p>
            </Project>

            <Project
              name="Raycast Music"
              url="https://raycast-music.app"
              year={2022}
            >
              A popular Raycast extension for Apple Music control, serving over
              25k active users. Enables seamless management of music playback,
              playlists, and settings within the Raycast productivity app
            </Project>

            <Project name="Splash CLI" url="https://splash-cli.app" year={2016}>
              A simple, command line tool to download Unsplash wallpapers. It’s
              not intended to be anything particularly fancy — it just works.
            </Project>
          </div>
        </div>
      </div>
    </>
  );
}

interface Project {
  name: string;
  url: string;
  year: number;
  children: React.ReactNode;
}

function Project(project: Project) {
  return (
    <div>
      <h3 className="mb-2 font-mono text-xl font-bold text-neutral-12">
        {project.name}
      </h3>
      <p className="mb-4 font-mono text-sm">
        {project.year} &mdash;{" "}
        <a className="underline" href={project.url}>
          {project.url.replace(/https?:\/\//, "")}
        </a>
      </p>
      <div className="leading-relaxed text-neutral-11">{project.children}</div>
    </div>
  );
}
