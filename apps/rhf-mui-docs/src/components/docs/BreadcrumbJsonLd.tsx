'use client';

import { usePathname } from 'next/navigation';
import { getBreadcrumbTrail } from '@/utils';

/**
 * Emits BreadcrumbList structured data for the current doc page. Only crumbs
 * that resolve to a real URL are included (category headers are dropped), so
 * positions stay contiguous and every ListItem carries an `item`.
 */
const BreadcrumbJsonLd = () => {
  const pathname = usePathname();
  const trail = getBreadcrumbTrail(pathname).filter(crumb => crumb.url);

  if (trail.length < 2) {
    return null;
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default BreadcrumbJsonLd;
