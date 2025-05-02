export type PageInfo = {
  title: string;
  href: string;
};

export type Page = PageInfo & { pages?: PageInfo[] };

export type PropsInfo = {
  name: string;
  description: string;
  type: string;
  required?: boolean;
  hasLinkInType?: boolean;
};
