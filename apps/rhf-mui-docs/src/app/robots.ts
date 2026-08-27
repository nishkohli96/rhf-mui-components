import type { MetadataRoute } from 'next';
import { websiteUrl } from '@/constants';

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
    /* Older docs versions are noindex'd via their route-group layouts. */
    disallow: ['/v1/', '/v2/', '/v3/', '/v4/']
  },
  sitemap: `${websiteUrl}/sitemap.xml`,
  host: websiteUrl
});

export default robots;
