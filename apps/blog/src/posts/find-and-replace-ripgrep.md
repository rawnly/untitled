---
title: Find & Replace in a project
summary: Find and replace using ripgrep and sed
date: 2023-02-01
tags:
  - shell
  - scripting
  - cli
  - terminal
---

```bash /YOUR_SERCH_TERMS/ /REPLACE_VALUE/
  rg 'YOUR_SERCH_TERMS' <location> -l | xargs sed \
    -i '' 's,YOUR_SEARCH_TERMS,REPLACE_VALUE,g'
```

- `-l` list all the affected files
- **NOTE**: `sed` does not have full regex support, at least for what I tried, so you cannot use the same pattern as for `rg`

## Examples

```bash title='Replace Imports'
  rg "import (\w+) from '@components/untitled-icons/(.*)'" \
    src/**/* -l | xargs \
    sed -i '' "s,import \(.*\) from '@components/untitled-icons/\(.*\)',import { \1 } from '@smartfish/icons',g"
```

### Useful Resources

- [ripgrep GUIDE](https://github.com/BurntSushi/ripgrep/blob/master/GUIDE.md#replacements)
- [Sobstitution with ripgrep](https://learnbyexample.github.io/substitution-with-ripgrep/)
