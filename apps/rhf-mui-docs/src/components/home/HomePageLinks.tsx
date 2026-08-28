'use client';

import Link from 'next/link';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';

/*
 * Landing-page deep links, grouped by intent. Gives crawlers a path into
 * the docs tree without relying on the sidebar, and spreads internal link
 * equity. The "See it running" group is rendered as accent chips — those
 * are the primary "try it" actions.
 */
const linkGroups: {
  heading: string;
  accent?: boolean;
  links: { label: string; href: string }[];
}[] = [
  {
    heading: 'See it running',
    accent: true,
    links: [
      { label: 'Complete form — every field', href: '/examples/complete-form' },
      { label: 'Complete form + Joi', href: '/examples/complete-form-joi' },
      { label: 'Inputs Fields form', href: '/examples/inputs' }
    ]
  },
  {
    heading: 'Popular components',
    links: [
      { label: 'RHFTextField', href: '/components/mui/RHFTextfield' },
      { label: 'RHFSelect', href: '/components/mui/RHFSelect' },
      { label: 'RHFAutocomplete', href: '/components/mui/RHFAutocomplete' },
      { label: 'RHFDatePicker', href: '/components/mui-pickers/RHFDatePicker' },
      { label: 'RHFPhoneInput', href: '/components/misc/RHFPhoneInput' },
      { label: 'RHFFileUploader', href: '/components/mui/RHFFileUploader' }
    ]
  },
  {
    heading: 'Get set up',
    links: [
      { label: 'Getting Started', href: '/getting-started' },
      { label: 'Customization', href: '/customization' },
      { label: 'Migration guide (v4 → v5)', href: '/migration-guide/v4-to-v5' }
    ]
  }
];

export default function HomePageLinks() {
  return (
    <Box
      component="nav"
      aria-label="Explore the documentation"
      sx={{
        mt: { xs: 7, md: 9 },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 3.5, md: 4 }
      }}
    >
      {linkGroups.map(group => (
        <Box key={group.heading} sx={{ textAlign: 'center' }}>
          <Typography
            component="h2"
            sx={{
              mb: 1.5,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'text.secondary'
            }}
          >
            {group.heading}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 1.25
            }}
          >
            {group.links.map(link => (
              <MuiLink
                key={link.href}
                component={Link}
                href={link.href}
                underline="none"
                sx={{
                  px: 1.75,
                  py: 0.7,
                  fontSize: 13,
                  fontWeight: 600,
                  borderRadius: 1.5,
                  border: '1px solid',
                  ...(group.accent
                    ? {
                      color: 'primary.main',
                      borderColor: 'primary.main',
                      bgcolor: 'action.hover',
                      '&:hover': { bgcolor: 'primary.main', color: 'primary.contrastText' }
                    }
                    : {
                      color: 'text.secondary',
                      borderColor: 'divider',
                      '&:hover': { color: 'primary.main', borderColor: 'primary.main' }
                    })
                }}
              >
                {link.label}
              </MuiLink>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
