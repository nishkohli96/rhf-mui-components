import type { ReactNode } from 'react';
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
    <a href={joinUrl(EXAMPLES_URL, path)}>
      {children}
    </a>
  );
}
