---
title: Busy Port 5000 on macOS
summary: Understand why port 5000 may be occupied on macOS and learn how to fix this behaviour
date: 2023-03-12
tags:
  - mac
  - scripting
  - networking
  - bash
---

By running `portPid 5000{:sh}` (aliased to `lsof -i :5000{:sh}`), I found that the process that was using that port was macOS Control Centre.

This is due to the option `airplay receiver` checked in the macOS Settings
