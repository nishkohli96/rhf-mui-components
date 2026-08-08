import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlined';

export type CalloutType = 'note' | 'tip' | 'info' | 'warning' | 'danger';

export type CalloutProps = {
  /** Admonition kind — picks the default title, icon and accent color. */
  type?: CalloutType;
  /** Overrides the default title (e.g. "NOTE") derived from `type`. */
  title?: ReactNode;
  children: ReactNode;
};

/**
 * `color` is an sx palette-token path (works with plain, non-function sx);
 * `cssVar` is the matching MUI CSS theme variable, needed for the
 * `color-mix()` tint below since sx has no built-in alpha-blend helper.
 * Both stay in lockstep with `theme/palette.ts` automatically — no
 * hardcoded hex here.
 */
const typeConfig: Record<CalloutType, {
  label: string;
  Icon: typeof InfoOutlinedIcon;
  color: string;
  cssVar: string;
}> = {
  note: { label: 'Note', Icon: EditOutlinedIcon, color: 'text.secondary', cssVar: '--mui-palette-text-secondary' },
  tip: { label: 'Tip', Icon: LightbulbOutlinedIcon, color: 'success.main', cssVar: '--mui-palette-success-main' },
  info: { label: 'Info', Icon: InfoOutlinedIcon, color: 'info.main', cssVar: '--mui-palette-info-main' },
  warning: { label: 'Warning', Icon: ReportProblemOutlinedIcon, color: 'warning.main', cssVar: '--mui-palette-warning-main' },
  danger: { label: 'Danger', Icon: ErrorOutlineIcon, color: 'error.main', cssVar: '--mui-palette-error-main' }
};

/**
 * Docusaurus-style admonition for .mdx pages — a colored header (icon +
 * title) above the body content:
 *
 * <Callout type="warning">
 *   Some **markdown** with a [link](/somewhere).
 * </Callout>
 *
 * This is a Server Component: tinted backgrounds use CSS `color-mix()`
 * against MUI's `--mui-palette-*` variables (which already flip with
 * `data-mui-color-scheme`) instead of `sx={theme => ...}`, since function
 * values can't cross the server → client boundary.
 */
const Callout = ({ type = 'info', title, children }: CalloutProps) => {
  const { label, Icon, color, cssVar } = typeConfig[type];

  return (
    <Box
      sx={{
        my: 2.5,
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: `color-mix(in srgb, var(${cssVar}) 35%, transparent)`
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 2,
          py: 1,
          bgcolor: `color-mix(in srgb, var(${cssVar}) 12%, transparent)`,
          borderBottom: '1px solid',
          borderColor: `color-mix(in srgb, var(${cssVar}) 25%, transparent)`,
          color
        }}
      >
        <Icon fontSize="small" sx={{ color }} />
        <Box
          component="span"
          sx={{
            fontWeight: 700,
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}
        >
          {title ?? label}
        </Box>
      </Box>
      <Box
        sx={{
          px: 2,
          py: 1.5,
          '& p': { m: 0 },
          '& p + p': { mt: 1 }
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Callout;
