import type { MetadataRoute } from 'next';
import { websiteUrl } from '@/constants';

/*
 * Old doc versions (/v1–/v4) are de-indexed with a `noindex` robots meta tag
 * in their route-group layouts — deliberately NOT Disallow'd here, since a
 * Disallow would stop crawlers fetching the page and seeing that tag.
 */
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/'
  },
  sitemap: `${websiteUrl}/sitemap.xml`,
  host: websiteUrl
});

export default robots;
