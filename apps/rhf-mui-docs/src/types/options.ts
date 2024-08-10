import { ReactNode } from 'react';

export type PageInfo = {
  title: string;
  href: string;
};

export type Page = PageInfo & { pages?: PageInfo[] };

export type PropDesc = {
  name: string;
  description: ReactNode;
  isRequired: boolean;
};

export type PropDescV2 = {
  name: string;
  description: ReactNode;
  isRequired: boolean;
  type: string;
};