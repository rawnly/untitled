---
title: Next Wayfinder
summary: Simplify Middleware Management in Next.js
date: 2023-03-28
image: /img/next-wayfinder.png
tags:
  - react
  - nextjs
  - typescript
  - middleware
---

I'm excited to share with you a new package I've been working on called [`next-wayfinder`][repo].
It's a lightweight and flexible package that simplifies middleware management in Next.js applications.

Traditionally, managing middleware in Next.js can be challenging, especially when dealing with complex routing scenarios. For example, you may want to apply an authentication middleware only for certain paths or a subdomain-specific middleware for certain hostnames

With [`next-wayfinder`][repo], you can easily apply different `middlewares` based on the route, without having to use cumbersome and error-prone path checks.
This makes it easy to handle complex routing scenarios and keep your code organized.

## Installation

```bash
  npm install next-wayfinder
```

## Usage

[`next-wayfinder `][repo] exports an handlePaths function that can be used as middleware entry point. It accepts an array of Middleware objects that match route or hostname, and applies the first matching middleware.

```ts
// middleware.ts

import { handlePaths } from "next-wayfinder";
import { NextResponse } from "next/server";
import { DashboardMiddleware } from "@/middlewares";

export default handlePaths([
  // rewrite / to /dashboard when under the `app.` subdomain
  {
    hostname: /^app\./,
    handler: [
      {
        path: "/path*",
        rewriteTo: "/dashboard/:path",
      },
    ],
  },
  {
    // redirect the authenticated user to app.{hostname}
    // if the user is not authenticated, redirect to {hostname}/login
    hostname: /^(?!app\.)/,
    pre: async (req) => {
      const isAuthenticated = await checkAuth(req);

      if (!isAuthenticated) {
        return {
          redirectTo: "/login",
          status: 302,
        };
      }

      // continue to the handler/s
      return true;
    },
    handler: [
      {
        path: `/dashboard/:path*`,
        redirectTo: `app.${req.headers.host}/dashboard/:path`,
      },
    ],
  },
  {
    // all the routes after /dashboard will be matched
    // index included
    path: "/dashboard/:path*",
    handler: DashboardMiddleware,
  },
]);
```

This is a full example of what [next-wayfinder][repo] has to offer to you.
If you think that it could improve your workflow, please give it a try and let me know what you think!

> [][repo]

[repo]: https://github.com/rawnly/next-wayfinder
