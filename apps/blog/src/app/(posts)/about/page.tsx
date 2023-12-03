import { p as Text, a as RawLink } from "@/components/mdx";

const WhiteText = ({ children }: any) => (
  <span className="font-medium text-[black] dark:text-[white]">{children}</span>
);

const Link = ({ children, href }: any) => (
  <RawLink href={href} target="_blank">
    {children}
  </RawLink>
);

export default function Page() {
  return (
    <div className="space-y-4 text-justify" id="post-content">
      <Text>
        At the age of 7, my passion for technology was sparked by my brother,
        who suffers from a disease that almost renders him tetraplegic. Despite
        his condition, he found ways to engage me in tech and science, becoming
        the brain to my arm. We spent countless afternoons together, immersed in
        real-time strategic games like Caesar III and Age of Empires. His love
        for these games and technology deeply influenced me and inspired my
        career choice
      </Text>

      <Text>
        From a young age, I was fascinated by the inner workings of computers.
        Whenever my brother&apos;s PC broke down he was used to call the
        maintenance guy and let him repair the broken pieces but once he
        finished I eagerly retrieved the discarded parts from the garbage,
        intent on dissecting and exploring their insides. Our curiosity and
        experimentation continued to grow, leading to pivotal moments in my
        journey.
      </Text>

      <Text>
        There&apos;s an episode I remember like it was yesterday: Carlo (my
        brother&apos;s name) told me that inside a DVD reader there was a laser.
        I got so excited (image tell a 8yrs old kid that he can disassemble a
        part of the computer with a laser inside), I was expecting star-wars
        like technology but I ended up disappointed once I realised that the
        &quot;laser&quot; was just a little bulb on a plate.
      </Text>

      <Text>
        In 2012 my brother gifted me my first computer, an{" "}
        <Link href="https://support.apple.com/kb/sp623?locale=en_US">
          iMac 21&quot; with 4gb of ram
        </Link>
        . I started playing around with things and discovered the Adobe Suite.
        As I delved deeper into the creative possibilities I decided that once
        grown I wanted to be a VFX artist (I also had a small parenthesis with{" "}
        <Link href="https://www.maxon.net/en/cinema-4d">Cine4d</Link> and{" "}
        <Link href="https://www.blender.org/">Blender</Link>). One day my
        brother introduced me to an even more mind-blowing concept: running{" "}
        <Link href="https://spaziofumetti.wordpress.com/"> my own website</Link>
        . This was something crazy for me, it was like having a billboard in the
        street, everyone could&apos;ve seen it! Motived by this I requested my
        brother assistance in setting up a Wordpress account. Following in his
        footsteps as a journalist, I began writing articles about everything it
        came to my mind, from comics to{" "}
        <Link href="https://www.adobe.com/products/photoshop.html">
          Photoshop
        </Link>{" "}
        and{" "}
        <Link href="https://www.adobe.com/products/aftereffects.html">
          After Effects
        </Link>{" "}
        tutorials, diving headfirst into the depths of the digital realm
      </Text>

      <Text>
        That moment ignited my curiosity about how things worked on the web. My
        initial introduction to the developer world was through{" "}
        <Link href="https://coronalabs.com/">Corona SDK</Link>, a framework for
        building mobile apps in Lua (although, in hindsight, it may not have
        been the best choice).
      </Text>

      <Text>
        Once again, my brother&apos;s support propelled me forward. He gifted me
        a Google Developer License, opening the doors for me to publish my
        creations on app stores. This marked the beginning of a rapid escalation
        in my journey. In 2015 I delved into tutorials on PHP and Node.js. Then
        in 2018 I got my first job as{" "}
        <WhiteText>Intern Frontend Developer</WhiteText> working with{" "}
        <WhiteText>React</WhiteText> and <WhiteText>Next.js</WhiteText>. This
        opportunity quickly evolved into a FullStack role, where I had the
        chance to explore <WhiteText>Java</WhiteText>/
        <WhiteText>Kotlin</WhiteText> and Spring Boot and also a bites of{" "}
        <WhiteText>Go</WhiteText> (learn more about my work experience in{" "}
        <Link href="https://fedevitale.dev/resume">my cv</Link>).
      </Text>

      <Text>
        To summarise, empowered by my brother&apos;s unwavering encouragement, I
        am now 24 and I&apos;m employed as Software Engineer in a local startup
        trying to revolutionize the{" "}
        <Link href="https://en.wikipedia.org/wiki/Blue_economy">
          Blue Economy
        </Link>
        . I thrive perpetual learning and the exploration of emerging
        technologies. I am grateful for the opportunities I&apos;ve had and the
        incredible experiences that have shaped me. I am excited to continue
        this journey, driven by my unwavering love for technology and the
        endless possibilities it offers.
      </Text>

      <Text>
        Thank you for taking the time to learn about my story. I look forward to
        connecting with you and creating remarkable digital experiences
        together.
      </Text>

      <Text>
        You can find me on{" "}
        <Link href="https://fedevitale.dev/twitter">Twitter</Link>,{" "}
        <Link href="https://fedevitale.dev/github">Github</Link> and{" "}
        <Link href="https://fedevitale.dev/linkedin">LinkedIn</Link>. You can
        learn more about my writings on my{" "}
        <Link href="https://fedevitale.dev/medium">Medium</Link> and on{" "}
        <Link href="https://untitled.dev">my blog</Link>
      </Text>
    </div>
  );
}
