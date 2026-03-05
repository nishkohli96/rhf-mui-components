import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export function useEnvironmentConfig() {
  const { siteConfig } = useDocusaurusContext();
  return {
    EXAMPLES_URL: siteConfig.customFields.EXAMPLES_URL ?? 'https://rhf-mui-components-examples.netlify.app',
  };
}
