import { Poppins } from 'next/font/google';
import Box, { type BoxProps } from '@mui/material/Box';

const poppinsBold = Poppins({
  subsets: ['latin'],
  weight: '800'
});

export type WordmarkProps = BoxProps<'span'>;

/**
 * "MUI-Components" brand wordmark, rendered as real text (gradient-filled via
 * `background-clip: text`) instead of `/wordmark.svg`. The SVG's fixed
 * viewBox doesn't tightly match its glyph run, so centering it as an image
 * leaves a visibly off-center gap; real text sizes to its own content and
 * centers precisely. Pass `sx` to control size — e.g. `fontSize`.
 */
const Wordmark = ({ sx, ...otherProps }: WordmarkProps) => {
  return (
    <Box
      component="span"
      className={poppinsBold.className}
      sx={{
        display: 'inline-block',
        fontWeight: 800,
        letterSpacing: '-1px',
        lineHeight: 1,
        background: 'linear-gradient(90deg, #2196F3 0%, #1AACD8 50%, #0BD1A8 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        ...sx
      }}
      {...otherProps}
    >
      MUI-Components
    </Box>
  );
};

export default Wordmark;
