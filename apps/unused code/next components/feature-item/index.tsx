import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

type FeatureItemProps = {
  text: string;
}

export function FeatureItem({ text }: Readonly<FeatureItemProps>) {
  return (
    <Paper sx={{ padding: '20px', borderRadius: '8px' }}>
      <Typography color="primary" variant="h6">
        {text}
      </Typography>
    </Paper>
  );
}
