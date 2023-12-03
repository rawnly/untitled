---
title: "Github Actions: Get the next build number"
summary: "How to get the next build number for a specific branch"
date: 2023-04-06
tags:
  - github-actions
  - github
  - ci
  - bash
---

A few days ago in our company we decided to rebuild our CI from scratch.
Our new CI is based on the following principles:

- We want to have a CI that is easy to use and maintain.
- We want to have a CI that is easy to extend and reuse
- We want to have a CI that is easy to understand and to read

Since we're using Github Actions to perform our CI we decided to open a new repo inspired to
[Raycast's Github Actions Repo](https://github.com/raycast/github-actions), and so we created
[this repo](https://github.com/aquacloud-dev/github-actions).

This makes our CI more readable and easier to maintain. If there's a bug or something wrong you don't have to
edit every project `YAML` to fix it, but is centralized in a single place.

Ok you might wondering: "the title of this article is about getting the next build number" not about Github Actions.

Our build process works as the following:

- `main` branch is the production
- `develop` branch is the next release

Then we have

- `feature/*` for upcoming features

We wanted to have a build number related to features, since the docker tag released is:

- `feature/add-my-feature` -> `add-my-feature.<build-number>`

So we created a Github Action that gets the next build number for a specific branch.
It's a simple bash script that gets the latest tag matching the branch name and increments the build number,
if the tag is not available uses `1` as starting number.

```sh title="get-next-build-number.sh"
#!/bin/bash

# @see https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions
# @see https://github.com/orgs/community/discussions/25939

set -e

BRANCH_NAME=${GITHUB_REF##*/}
BRANCH_NAME=${BRANCH_NAME//\//-}

if [ -z "$BRANCH_NAME" ]; then
	echo "::error::Could not retrive BRANCH_NAME"
	exit 1
fi

# We use NOTICE to show the variable in the Github Action log
echo "::notice::BRANCH_NAME=${BRANCH_NAME}"

# Get the Tags sorted
BUILD_NUMBER=$(git tag | sort --version-sort)

# Grep for the branch name
BUILD_NUMBER=$(echo "${BUILD_NUMBER}" | grep "$BRANCH_NAME" || true)

# Get the last tag and extract the build number
BUILD_NUMBER=$(echo "${BUILD_NUMBER}" | tail -n 1 | awk -F. '{print $2}')

# Trim
BUILD_NUMBER=$(echo "${BUILD_NUMBER}" | xargs echo -n)

# Check if the build number is empty
# if it's empty we use 1 as starting number
# otherwise we increment the build number
if [ -z "$BUILD_NUMBER" ]; then
	BUILD_NUMBER=1
else
	BUILD_NUMBER=$((BUILD_NUMBER + 1))
fi

TAG="$BRANCH_NAME.$BUILD_NUMBER"
echo "::notice::TAG=${TAG}"

# Output the next new tag
echo "tag=$TAG" >>$GITHUB_OUTPUT
```
