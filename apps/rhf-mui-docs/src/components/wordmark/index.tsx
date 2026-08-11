import { Space_Grotesk } from 'next/font/google';
import Box, { type BoxProps } from '@mui/material/Box';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700']
});

export type WordmarkProps = BoxProps<'span'>;

/**
 * "RHF-MUI Components" brand wordmark, rendered as real text (gradient-filled
 * via `background-clip: text`) instead of `/wordmark.svg`. The SVG's fixed
 * viewBox doesn't tightly match its glyph run, so centering it as an image
 * leaves a visibly off-center gap; real text sizes to its own content and
 * centers precisely. Pass `sx` to control size — e.g. `fontSize`.
 *
 * Font family/weights match `/wordmark.svg` exactly (Space Grotesk, 700 for
 * "RHF-MUI", 400 for "Components") so the large homescreen wordmark and the
 * nav/mobile SVG logo read as the same mark.
 */
const Wordmark = ({ sx, ...otherProps }: WordmarkProps) => {
  return (
    <Box
      component="span"
      className={spaceGrotesk.className}
      sx={{
        display: 'inline-block',
        fontWeight: 700,
        letterSpacing: '-1px',
        lineHeight: 1,
        background: 'linear-gradient(90deg, #2683cc 0%, #014280 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        ...sx
      }}
      {...otherProps}
    >
      RHF-MUI
      <Box component="span" sx={{ fontWeight: 400 }}> Components</Box>
    </Box>
  );
};

export default Wordmark;
