import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { HomePageButton } from '@site/src/components';
import { InternalLinks } from '@site/src/constants';
import theme from '@site/src/styles/theme';
import styles from './index.module.css';

function HomepageHeader() {
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
        <Grid container spacing={2} sx={{ mt: '10px' }}>
          <HomePageButton
            text="Get Started"
            href="/introduction"
            bgColor='#25C19F'
          />
          <HomePageButton
            text="View Examples"
            href={InternalLinks.demo}
            bgColor='#54C7EC'
          />
          <HomePageButton
            text="Playground"
            href={InternalLinks.playground}
            bgColor='#54C7EC'
          />
          {/* <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Link
              className="button button--lg"
              to="/introduction"
              style={{ backgroundColor: '#25C19F' }}
            >
              Get Started
            </Link>
          </Grid> */}
          {/* <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              justifyContent: 'flex-start'
            }}
          >
            <Link
              className="button button--lg"
              to="https://rhf-mui-components-examples.netlify.app/"
              style={{ backgroundColor: '#54C7EC' }}
            >
              View Examples
            </Link>
          </Grid> */}
        </Grid>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
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
}
