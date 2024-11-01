import { Fragment } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { HomePageButton } from '@site/src/components';
import { InternalLinks } from '@site/src/constants';
import theme from '@site/src/styles/theme';
import styles from './index.module.css';

const IntroductionBtn = () => (
  <HomePageButton
    text="Get Started"
    href="/introduction"
    bgColor="#25C19F"
    align="flex-end"
  />
);

const ExamplesBtn = () => (
  <HomePageButton
    text="View Examples"
    href={InternalLinks.demo}
    bgColor="#54C7EC"
    align="center"
  />
);

const PlaygroundBtn = () => (
  <HomePageButton
    text="Playground"
    href={InternalLinks.playground}
    bgColor="#ff6b6b"
    align="flex-start"
  />
);

const HomepageButtons = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Grid container spacing={2} sx={{ mt: '10px' }}>
      {isLargeScreen ? (
        <></>
      ) : (
        <Fragment>
          <Grid item xs={12}>
            <IntroductionBtn />
          </Grid>
          <Grid item xs={12}>
            <ExamplesBtn />
          </Grid>
          <Grid item xs={12}>
            <PlaygroundBtn />
          </Grid>
        </Fragment>
      )}
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
        <p className="hero__subtitle">{siteConfig.tagline}</p>
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
