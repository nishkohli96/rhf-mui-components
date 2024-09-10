import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@site/src/styles/theme';
import styles from './index.module.css';
import Button from '@mui/material/Button';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <Grid container spacing={2}>
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Link className="button button--secondary button--lg" to="/introduction">
              Read Docs
            </Link>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              justifyContent: 'flex-start'
            }}
          >
            {/* <Link className="button button--lg" to="/intro"> */}
              View Demo
            {/* </Link> */}
          </Grid>
          <Button color='secondary' variant='contained'>hell3</Button>
        </Grid>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  // const { siteConfig } = useDocusaurusContext();
  // const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
  // console.log('isDarkTheme: ', isDarkTheme);

  return (
    <Layout
      title="Homepage"
      description="Reusable material-ui components for react-hook-form to minimize your time and effort in creating forms."
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HomepageHeader />
        <main></main>
      </ThemeProvider>
    </Layout>
  );
}
