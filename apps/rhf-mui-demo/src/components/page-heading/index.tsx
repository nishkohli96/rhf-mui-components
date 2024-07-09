'use client';

import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
type PageHeadingProps = {
  title: string;
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
        color: theme => theme.palette.info.main
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
