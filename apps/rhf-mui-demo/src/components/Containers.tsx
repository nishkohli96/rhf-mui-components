import { ReactElement } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

type FormContainerProps = {
  title: string;
  children: ReactElement | ReactElement[];
};

export function FormContainer({ title, children }: FormContainerProps) {
  return (
    <Box sx={{ padding: '10px', border: '1px solid gray' }}>
      <Typography variant="h6" sx={{ mb: '20px' }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}

export function GridContainer({ children }: Pick<FormContainerProps, 'children'>) {
  return (
    <Grid container spacing={2}>
      {children}
    </Grid>
  );
}
