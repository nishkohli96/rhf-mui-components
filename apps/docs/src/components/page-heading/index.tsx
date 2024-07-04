import Typography from '@mui/material/Typography';

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

export function SubTitle({ title }: PageHeadingProps) {
  return (
    <Typography
      variant="h6"
      color="secondary"
      sx={{ mb: '10px', fontWeight: 400 }}
    >
      {title}
    </Typography>
  );
}
