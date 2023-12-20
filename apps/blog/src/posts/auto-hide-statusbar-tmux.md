---
title: Effortless Status Bar Auto-Hide in tmux for Single Window Mode
summary: Automatically hide status bar in tmux when only one window is open
date: 2023-12-20
image: /images/auto-hide-tmux-status-bar/image.png
tags:
  - tmux  
  - shell 
  - bash
---

![my-setup](/images/auto-hide-tmux-status-bar/image.png)

# What 
I want to hide my tmux status bar when only 1 window is open. Otherwise is shown.

# How?
Showind or hiding the status bar is pretty straightforward: 

```sh
set -g status <on|off>
```

How do we make this automatically? `tmux` provides us hooks, by using them we can dynamically set the status to `off` when windows are less than 2, below the script:

```sh /after-new-window/ /pane-exited/ /after-kill-pane/ /window-layout-changed/
# Hide status bar if only one window and one session
set -g status off 

set-hook -g after-new-window 'if "[ #{session_windows} -gt 1 ]" "set -g status on"'
set-hook -g after-kill-pane 'if "[ #{session_windows} -lt 2 ]" "set -g status off"'
set-hook -g pane-exited 'if "[ #{session_windows} -lt 2 ]" "set -g status off"'
set-hook -g window-layout-changed 'if "[ #{session_windows} -lt 2 ]" "set -g status off"'
```

As you can see, we check `after-new-window{:sh}` if there are more than 1 window then we show the statusbar.
On `after-kill-pane{:sh}`, `pane-exited{:sh}` and `window-layout-changed{:sh}` we check if windows are less than 2 then we hide the statusbar.

![animated](/images/auto-hide-tmux-status-bar/animation.gif)

In this way we achieved what we wanted, from now on when there's only 1 window open, the statusbar will be hidden.
