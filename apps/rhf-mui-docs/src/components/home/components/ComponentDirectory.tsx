import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { sidebarLinks } from '@/constants';
import type { Page } from '@/types';

/** One-line summary per component group, keyed by its sidebar title. */
const groupBlurbs: Record<string, string> = {
  MUI: 'Controlled wrappers around Material UI form fields — text entry, selection, choice and range inputs.',
  'MUI Pickers': 'Material UI X date and time pickers, each with Desktop, Mobile and Static variants.',
  Misc: 'Standalone form components that are not part of Material UI — colour picker, phone input, rich text editor.'
};

const componentGroups: Page[]
  = sidebarLinks.find(page => page.title === 'Components')?.pages ?? [];

const totalComponents = componentGroups.reduce(
  (count, group) => count + (group.pages?.length ?? 0),
  0
);

/**
 * Full directory of every documented component, grouped by module. Gives the
 * homepage real content depth and an internal link to every component doc page.
 *
 * Rendered inside a native `<details>` — collapsed by default so the long list
 * doesn't dominate the page, but every link stays in the server-rendered DOM
 * (crawlable, no client JS).
 */
const ComponentDirectory = () => (
  <Box component="section" sx={{ mt: { xs: 7, md: 9 } }}>
    <Typography
      component="h2"
      sx={{
        textAlign: 'center',
        fontSize: { xs: 22, md: 28 },
        fontWeight: 800,
        lineHeight: 1.2
      }}
    >
      All components
    </Typography>
    <Typography
      sx={{
        mt: 1.5,
        mx: 'auto',
        maxWidth: 620,
        textAlign: 'center',
        color: 'text.secondary',
        fontSize: { xs: 14, md: 16 },
        lineHeight: 1.65
      }}
    >
      Every component ships with a live demo and a full props reference.
    </Typography>

    <Box
      component="details"
      sx={{
        mt: 3,
        mx: 'auto',
        maxWidth: 860,
        '&[open] .directory-chevron': { transform: 'rotate(180deg)' },
        /*
         * Re-assert the native collapse: the body Box carries an emotion
         * `display: flex` class, which out-specifies the UA
         * `details:not([open]) > :not(summary)` rule, so without this the
         * list would stay visible when closed.
         */
        '&:not([open]) .directory-body': { display: 'none' }
      }}
    >
      <Box
        component="summary"
        sx={{
          listStyle: 'none',
          '&::-webkit-details-marker': { display: 'none' },
          mx: 'auto',
          width: 'fit-content',
          display: 'flex',
          alignItems: 'center',
          gap: 0.75,
          px: 2.5,
          py: 1,
          borderRadius: 999,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'action.hover',
          cursor: 'pointer',
          fontSize: { xs: 13, md: 14 },
          fontWeight: 700,
          userSelect: 'none',
          '&:hover': { borderColor: 'primary.main', color: 'primary.main' }
        }}
      >
        {`Browse all ${totalComponents} components`}
        <ExpandMoreRoundedIcon
          className="directory-chevron"
          fontSize="small"
          sx={{ transition: 'transform 0.2s' }}
        />
      </Box>

      <Box
        className="directory-body"
        sx={{
          mt: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 4, md: 5 }
        }}
      >
        {componentGroups.map(group => (
          <Box key={group.title}>
            <Typography
              component="h3"
              color="primary"
              sx={{ fontSize: { xs: 16, md: 18 }, fontWeight: 700 }}
            >
              {group.title}
            </Typography>
            {groupBlurbs[group.title] && (
              <Typography
                sx={{
                  mt: 0.5,
                  color: 'text.secondary',
                  fontSize: { xs: 13, md: 14 },
                  lineHeight: 1.6
                }}
              >
                {groupBlurbs[group.title]}
              </Typography>
            )}
            <Box
              sx={{
                mt: 2,
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, minmax(0, 1fr))',
                  sm: 'repeat(3, minmax(0, 1fr))',
                  md: 'repeat(4, minmax(0, 1fr))'
                },
                gap: 1.5
              }}
            >
              {(group.pages ?? []).map(component => (
                <MuiLink
                  key={component.href}
                  href={component.href ?? '#'}
                  underline="hover"
                  sx={{
                    fontSize: { xs: 13, md: 14 },
                    fontWeight: 600,
                    color: 'text.primary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  {component.title}
                  {component.isNew && (
                    <Box
                      component="span"
                      aria-hidden
                      sx={{
                        ml: 0.75,
                        px: 0.5,
                        fontSize: '0.6rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        borderRadius: 0.75,
                        color: 'success.contrastText',
                        bgcolor: 'success.main',
                        '&::after': { content: '"New"' }
                      }}
                    />
                  )}
                </MuiLink>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
);

export default ComponentDirectory;
