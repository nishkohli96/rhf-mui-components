import { type ReactElement } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

type FormContainerProps = {
  title?: string;
  children: ReactElement | ReactElement[];
};

export const ContentContainer = ({ children }: Pick<FormContainerProps, 'children'>) => {
  /* Horizontal gutters come from the layout's <main> padding. */
  return (
    <Box sx={{ padding: { xs: '10px 0', md: '20px 0' } }}>
      {children}
    </Box>
  );
};

export const FormContainer = ({ title, children }: FormContainerProps) => {
  return (
    <Box sx={{ padding: { xs: '15px', md: '15px 20px' }, border: '1px solid gray' }}>
      {title && (
        <Typography variant="h6" sx={{ mb: '20px' }}>
          {title}
        </Typography>
      )}
      {children}
    </Box>
  );
};

export const GridContainer = ({ children }: Pick<FormContainerProps, 'children'>) => {
  return (
    <Grid container spacing={2}>
      {children}
    </Grid>
  );
};
