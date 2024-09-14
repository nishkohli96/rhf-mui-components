import Typography from '@mui/material/Typography';

type PageHeadingProps = {
  title: string;
};

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