import { findPost } from "@/app/(posts)/[...slug]/utils";
import { allPosts } from "contentlayer/generated";
import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";

type P = {
  params: {
    [k: string]: string | string[];
  };
};

export const runtime = "edge";

export function GET(_request: NextRequest, { params = {} }: P) {
  const post = allPosts.find(findPost(params.slug));

  return new ImageResponse(
    (
      <div
        style={{
          background: "#151718",
          color: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            flexDirection: "column",
            display: "flex",
            maxWidth: 1000,
            margin: "0 auto",
          }}
        >
          <b style={{ fontSize: 42, fontWeight: 600 }}>
            {post?.title ?? "hello"}
          </b>
          <div style={{ fontSize: 24 }}>{post?.summary}</div>
        </div>

        <div
          style={{
            left: 50,
            bottom: 50,
            position: "absolute",
            display: "flex",
            gap: 16,
          }}
        >
          <img
            width="256"
            height="256"
            src={`https://github.com/rawnly.png`}
            alt="rawnly"
            style={{
              borderRadius: 128,
              width: 100,
              height: 100,
              border: "2px solid currentColor",
            }}
          />

          {/* <div */}
          {/*   style={{ */}
          {/*     width: 100, */}
          {/*     height: 100, */}
          {/*     borderRadius: "100%", */}
          {/*     background: "currentColor", */}
          {/*     backgroundImage: "url(https://unavatar.io/github/rawnly)", */}
          {/*     backgroundSize: "100% 100%", */}
          {/*     border: "2px solid currentColor", */}
          {/*   }} */}
          {/* /> */}
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "auto 0",
            }}
          >
            <li>twitter.com/fedevitaledev</li>
            <li>github.com/rawnly</li>
          </ul>
        </div>
      </div>
    )
  );
}
