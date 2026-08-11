import { Roboto } from 'next/font/google';

/**
 * Single shared font instance for the whole app. Both the `<body>` (in
 * `layout.tsx`) and the MUI theme's `typography.fontFamily` (in `theme.ts`) use
 * this, so text renders in one font instead of swapping between the body font
 * and the theme font as each loads.
 *
 * No `weight` is specified, so `next/font` loads Roboto's variable font (100–900)
 * — covering the `fontWeight: 800` headings, which avoids faux-bold reflow.
 */
export const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
});
