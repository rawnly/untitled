---
title: Ensure Radix UI Popover width matches trigger
date: 2023-03-29
summary: Learn to match popover width with trigger
tags:
  - react
  - typescript
  - radix-ui
  - web
---

I spent the day building a custom combobox using [`cmdk`][cmdk] and [`@radix-ui/react-popover`][popover],
but at the end of the day the popover size wasn't following the trigger width.

So by playing around I discovered that the popover injects the `--radix-ui-popover-trigger-width` css variable ito the popover content.

To fix this I just had to add the following css to my popover content:

```css title="standard CSS" /--radix-popover-trigger-width/
.combobox-popover {
  width: var(--radix-popover-trigger-width);
}
```

```tsx title="with tailwind" /--radix-popover-trigger-width/
import * as Popover from "@radix-ui/react-popover";

// later in your code

<Popover.Root>
  <Popover.Trigger>
    <Button />
  </Popover.Trigger>
  <Popover.Content className="combobox-popover w-[var(--radix-popover-trigger-width)]">
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </Popover.Content>
</Popover.Root>;
```

Just that! Super simple and easy to fix.

[cmdk]: https://cmdk.paco.me
[popover]: https://www.radix-ui.com/docs/primitives/components/popover
