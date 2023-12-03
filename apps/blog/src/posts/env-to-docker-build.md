---
title: Dyanmic ENV in docker builds
summary: Hardcoded ENV values can be a tedious solution if they need to be changed often
date: 2023-03-13
tags:
  - docker
---

Hardcoded ENV values can be a tedious solution if they need to be changed often. Imagine having to edit your Dockerfile again and again with each build.
<br />
You can do better! Introduce a new ARG variable, and reference it to set your initial ENV variables dynamically during the build:

```docker
ARG var_name # you could give this a default value as well
ENV env_var_name=$var_name
```

the `env_var_name` environment variable value passed with `var_name` will be available to future containers. If needed, you can override it when starting up a container from the image.
<br />
They are merely default values after all.
