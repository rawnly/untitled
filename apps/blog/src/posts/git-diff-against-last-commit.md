---
title: Enhance Your Workflow with  git diff  Against the Last Commit
summary: Discover the power of `git diff HEAD~1`
date: 2023-02-02
tags:
  - shell
  - scripting
  - cli
  - terminal
---

Today, I learned how to use `git diff` to compare changes in a Git repository against the _last commit_.
This can be incredibly useful for reviewing the modifications made since the previous commit, ensuring that only the intended changes are included before committing again.
In this post, I'll walk you through the simple ~steps~ step to perform this action and understand its output.

```bash title="Talk is cheap, show me the code!"
  git diff $(git log --pretty=format:'%H' -n 2 | xargs)
```

And now you may think: "Just that?" Yes, just that. But it's a very pow.
<br />
Let's break it down and understand what's going on here:

1. `git log --pretty=format:'%H' -n 2{:bash}`: This part of the command retrieves the commit hashes of the last two commits. The `--pretty=format:'%H'{:bash}` option formats the output to show only the full commit hashes, and the `-n 2` option limits the output to the last two commits.
2. `| xargs{:bash}`: The pipe (`|`) is used to redirect the output of the previous command (the commit hashes) as input to the `xargs{:bash}` command.
   `xargs{:bash}` is a Unix command that reads items from standard input and executes a command with those items as arguments.
3. `git diff{:bash}`: This is the main command that compares two commit hashes provided by the `xargs{:bash}` command.
   Since `xargs{:bash}` passes the two commit hashes as arguments to `git diff{:bash}`, the command effectively becomes `git diff <commit_hash_1> <commit_hash_2>{:bash}`, which compares the changes between the two specified commits.

So, in summary, this command shows the differences between the last two commits in a Git repository by passing their commit hashes to the `git diff{:bash}` command.
<br />
See you in the next one!
