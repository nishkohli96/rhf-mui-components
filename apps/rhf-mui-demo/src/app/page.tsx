import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { PageHeading, SubHeading, GridContainer } from '@/components';

export default function Home() {
  return (
    <main>
      <Box sx={{ flexGrow: 1, padding: '20px' }}>
        <GridContainer>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <PageHeading title="@nish1896/rhf-mui-components" />
              <SubHeading title="Create and Style forms effortlessly within minutes!" />
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button variant="contained" href="/docs">
              Read Docs
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            <Button variant="contained" color="secondary" href="/demo">
              View Demo
            </Button>
          </Grid>
        </GridContainer>
      </Box>
    </main>
  );
}
