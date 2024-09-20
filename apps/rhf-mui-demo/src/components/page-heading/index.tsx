'use client';

import Typography from '@mui/material/Typography';
import MuiLink, { LinkProps } from '@mui/material/Link';

type PageHeadingProps = {
  title: string;
};

export function PageHeading({ title }: PageHeadingProps) {
  return (
    <Typography variant="h4" color="primary" sx={{ mb: '20px' }}>
      {title}
    </Typography>
  );
}

export function SubHeading({ title }: PageHeadingProps) {
  return (
    <Typography
      variant="h6"
      sx={{
        mb: '10px',
        fontWeight: 400,
        color: theme => theme.palette.warning.main
      }}
    >
      {title}
    </Typography>
  );
}

export function FieldVariantInfo({ title }: PageHeadingProps) {
  return (
    <Typography
      variant="body1"
      color="secondary"
      sx={{ mb: '10px', fontWeight: 400 }}
    >
      {title}
    </Typography>
  );
}

export function Link(props: Omit<LinkProps, 'underline'>) {
  const { children, href, ...otherLinkProps } = props;
  return (
    <MuiLink href={href} underline="hover" {...otherLinkProps}>
      {children}
    </MuiLink>
  );
}
