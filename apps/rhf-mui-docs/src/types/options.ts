import { ReactNode } from 'react';

export type PageInfo = {
  title: string;
  href: string;
};

export type Page = PageInfo & { pages?: PageInfo[] };

export type PropDescV2 = {
  name: string;
  description: ReactNode;
  type: string;
  required?: boolean;
  hasLinkInType?: boolean;
};
