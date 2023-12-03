---
title: Generate secrets with OpenSSL
summary: A quick way to generate secrets with OpenSSL
date: 2023-03-21T12:00:00
tags:
  - openssl
  - scripting
  - bash
---

When developing a new application, it's often necessary to generate a secret key for encoding and decoding tokens.
This can be easily achieved via the `openssl{:bash}` toolkit.

```bash title="OpenSSL secret generation"
openssl rand -base64 32 | tr -d '\n'
```

Here's a more in depth explanation of the command:

- `openssl`: This is the CLI for using the OpenSSL toolkit, which is
  installed by default on most Linux distributions.
- `-base64`: This option tells to the `rand` subcommand to encode the output in
  base64.
- `32`: This is the number of bytes to generate. Since each base64 character represents 6 bits of the original data, 32 bytes will generate a 256-bit key.
- `tr`: This command is used to delete characters. In this particular case is used to delete any newline that may be included in the output form OpenSSL
