import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Grid from '@mui/material/Grid';
import styles from './index.module.css';

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
            <Link className="button button--lg" to="/intro">
              View Demo
            </Link>
          </Grid>
        </Grid>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main></main>
    </Layout>
  );
}
