import type { MDXComponents } from 'mdx/types';
import type { ComponentPropsWithoutRef } from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import { Callout, MdxPre, PackageManagerTabs } from '@/components/docs';

type HeadingProps = ComponentPropsWithoutRef<'h2'>;

/**
 * Renders an anchored heading: `rehype-slug` supplies the `id`, this adds
 * the hover `#` link. Real h2/h3 tags in server HTML keep sections crawlable.
 */
const AnchoredHeading = (
  variant: 'h5' | 'h6',
  component: 'h2' | 'h3'
) => {
  const Heading = ({ id, children, ...props }: HeadingProps) => (
    <Typography
      {...props}
      id={id}
      variant={variant}
      component={component}
      className="doc-heading"
      sx={{ mt: 4, mb: 2, fontWeight: 600, scrollMarginTop: '90px' }}
    >
      {children}
      {id && (
        <a
          href={`#${id}`}
          className="doc-heading-anchor"
          aria-label="Link to this section"
        >
          #
        </a>
      )}
    </Typography>
  );
  Heading.displayName = `AnchoredHeading(${component})`;
  return Heading;
};

/**
 * Global element mappings for .mdx pages — write plain markdown and get
 * MUI-consistent output. Fenced code blocks are highlighted by shiki at
 * build time; MdxPre only adds the copy button around them.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <Typography
        {...props}
        variant="h4"
        component="h1"
        color="primary"
        sx={{ mb: '20px' }}
      >
        {children}
      </Typography>
    ),
    h2: AnchoredHeading('h5', 'h2'),
    h3: AnchoredHeading('h6', 'h3'),
    p: ({ children, ...props }) => (
      <Typography {...props} variant="body1" sx={{ my: 1.5 }}>
        {children}
      </Typography>
    ),
    a: ({ children, href, ...props }) => {
      const isExternal = !!href && (/^https?:\/\//).test(href);
      return (
        <MuiLink
          {...props}
          href={href}
          underline="hover"
          {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
        >
          {children}
        </MuiLink>
      );
    },
    pre: MdxPre,
    Callout,
    PackageManagerTabs,
    ...components
  };
}
