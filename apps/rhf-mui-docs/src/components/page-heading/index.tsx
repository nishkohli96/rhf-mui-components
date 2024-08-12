import { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import MuiLink, { LinkProps } from '@mui/material/Link';

type PageHeadingProps = {
  title: string;
};

type Props = {
  children: ReactNode;
};

export function PageHeading({ title }: PageHeadingProps) {
  return (
    <Typography variant="h4" color="primary" sx={{ mb: '30px' }}>
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
        color: '#006600' // theme => theme.palette.info.main
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
