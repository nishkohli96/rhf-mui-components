'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getAdjacentPages } from '@/utils';

type NavCardProps = {
  href: string;
  title: string;
  direction: 'prev' | 'next';
};

const NavCard = ({ href, title, direction }: NavCardProps) => {
  const isPrev = direction === 'prev';

  return (
    <Paper
      component={NextLink}
      href={href}
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isPrev ? 'flex-start' : 'flex-end',
        gap: 0.5,
        px: 2.5,
        py: 1.5,
        borderRadius: 2,
        textDecoration: 'none',
        color: 'inherit',
        bgcolor: 'transparent',
        minWidth: 0,
        maxWidth: '48%',
        transition: 'border-color 0.15s ease, background-color 0.15s ease',
        '&:hover': {
          borderColor: 'primary.main',
          bgcolor: 'action.hover',
          '& .page-nav-title': { color: 'primary.main' }
        }
      }}
    >
      <Typography
        variant="caption"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          color: 'text.secondary',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontWeight: 600
        }}
      >
        {isPrev && <ArrowBackIcon sx={{ fontSize: 14 }} />}
        {isPrev ? 'Previous' : 'Next'}
        {!isPrev && <ArrowForwardIcon sx={{ fontSize: 14 }} />}
      </Typography>
      <Typography
        variant="body1"
        noWrap
        className="page-nav-title"
        sx={{
          fontWeight: 600,
          color: 'text.primary',
          maxWidth: '100%',
          transition: 'color 0.15s ease'
        }}
      >
        {title}
      </Typography>
    </Paper>
  );
};

/**
 * Docusaurus-style footer nav — links to the previous/next page in the
 * sidebar's reading order. Rendered by `DocsPage` on every doc page; renders
 * nothing on pages outside `sidebarLinks` (e.g. a 404).
 */
const PageNav = () => {
  const pathname = usePathname();
  const { prev, next } = getAdjacentPages(pathname);

  if (!prev && !next) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 2,
        mt: 6,
        pt: 3,
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      {prev ? <NavCard href={prev.href} title={prev.title} direction="prev" /> : <Box />}
      {next ? <NavCard href={next.href} title={next.title} direction="next" /> : <Box />}
    </Box>
  );
};

export default PageNav;
