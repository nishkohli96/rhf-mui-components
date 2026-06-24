import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import { useEnvironmentConfig } from '@site/src/constants';

type DemoLinkProps = {
  children: ReactNode;
  path: string;
};

function joinUrl(baseUrl: string, path: string) {
  const normalizedBaseUrl = baseUrl.replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBaseUrl}${normalizedPath}`;
}

export default function DemoLink({ children, path }: DemoLinkProps) {
  const { EXAMPLES_URL } = useEnvironmentConfig();

  return (
    <Link
      href={joinUrl(EXAMPLES_URL, path)}
      target="_blank"
      rel="noreferrer noopener"
    >
      {children}
    </Link>
  );
}
