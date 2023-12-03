---
title: "Github: Delete all repository deployments"
summary: Sometimes you just want to delete all your deployments
date: 2023-03-14
tags:
  - github
  - workflows
  - github-actions
  - git
  - script
---

```sh
#!/bin/bash

# This script deletes all GitHub Actions runs for the current repository.
# It is useful for cleaning up the Actions tab after a large number of runs
# have been created, such as when testing a workflow.

# check for help flag (-h or --help)
if [[ $1 == "-h" || $1 == "--help" ]]; then
	echo "Usage: $0 [count]"
	echo "Deletes all GitHub deployments for the current repository."
	echo "The count argument is optional and defaults to 10."
	exit 0
fi

# default limit value: 10
limit=${1:-10}

# parse limit value
if ! [[ $limit =~ ^[0-9]+$ ]]; then
	echo "Invalid limit value: $limit"
	exit 2
fi

# transform $limit as number
limit=$(echo "$limit" | tr -d '[:space:]')

# check if gh is installed
if ! command -v gh &>/dev/null; then
	echo "gh could not be found. Please install it from https://cli.github.com/"
	exit 1
fi

# check if gh is authenticated
if ! gh auth status &>/dev/null; then
	echo "gh is not authenticated. Please run 'gh auth login' to authenticate."
	exit 1
fi

REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)

if [[ -z $repo ]]; then
	echo "No repository found."
	exit 1
fi

# Fetch all deployments in the repository
deployments=$(gh api "repos/$REPO/deployments" --jq '.[].id')

if [[ -z $deployments ]]; then
	echo "No deployments found."
	exit 0
fi

total_deployments=$(echo "$deployments" | wc -l)
completed=0

# Loop through deployment IDs and delete each deployment
for deployment_id in $deployments; do
	((completed++))
	printf "\r [%d/%d] Deleting deployment: %s..." "$completed" "$total_deployments" "$deployment_id"

	gh api -X DELETE "repos/$REPO/deployments/$deployment_id" --silent
done

printf "\nAll deployments have been deleted."
```
