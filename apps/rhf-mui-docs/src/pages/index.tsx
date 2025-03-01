import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { HomePageButton } from '@site/src/components';
import theme from '@site/src/styles/theme';
import styles from './index.module.css';

const IntroductionBtn = () => (
  <HomePageButton text="Get Started" href="/docs/introduction" bgColor="#25C19F" />
);

const HomepageButtons = () => {
  return (
    <Grid container justifyContent="center" sx={{ mt: '40px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <IntroductionBtn />
      </Box>
    </Grid>
  );
};

const HomepageHeader = () => {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">
          {siteConfig.tagline}
        </p>
        <HomepageButtons />
      </div>
    </header>
  );
};

const HomePage = (): JSX.Element => {
  return (
    <Layout
      title="Homepage"
      description="Reusable material-ui components for react-hook-form to minimize your time and effort in creating forms."
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HomepageHeader />
        <main />
      </ThemeProvider>
    </Layout>
  );
};

export default HomePage;
