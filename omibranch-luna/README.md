# Luna

A Windows XP Luna inspired theme for Remnawave Minishop. Omibranch · omibranch.uk

- **Light — Luna.** Blue windows with glossy title bars, every primary action is the green Start button, the bottom navigation is a taskbar, the desktop rail is a Start menu, traffic is shown as the green blocks of a file copy. Wallpaper: original rolling hills under a blue sky.
- **Dark — inspired by Royale Noir.** Charcoal glass windows and taskbar, the same green Start, the same hills at night under a full moon (Luna, after all).
- **Optional helper: Skrepysh the paperclip (default) or the cat** (`effects/main.js`, needs the separate JavaScript permission). The helper lives in the window title bars, sits on the window you read the longest, falls asleep when you are away and now and then shows a yellow XP balloon with a hint built from what is really on the screen (for example the cheapest month in the checkout). It never covers buttons or fields, ducks out instead of flying over the pay button, can be paused or hidden by clicking it, and stays still with `prefers-reduced-motion`.

## What is new in 1.2

- **Skrepysh**: a glossy blue-silver wire paperclip with its own big kind eyes is now the default helper (original character, not the Microsoft one). Nine poses in `effects/clip/`.
- The cat stays: click the helper and choose "Call the cat" / "Call the paperclip" (the choice is saved in `localStorage`, key `luna-assistant`). Everything else (never over pay buttons, sleep, pause, reduced motion) works the same for both.
- Hints no longer mention cats.

The theme is complete without JavaScript. `use_in_admin` is off, so the admin panel keeps the default theme.

Fonts: Tahoma / Trebuchet MS where the system has them, otherwise the bundled "Luna UI" (a renamed subset of PT Sans, SIL OFL 1.1, see `fonts/OFL.txt`). No external requests.

License: MIT (see `LICENSE`). All artwork is original; no Microsoft files are included.
