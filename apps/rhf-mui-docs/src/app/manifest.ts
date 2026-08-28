import type { MetadataRoute } from 'next';
import { defaultPageTitle, defaultPageDescription } from '@/constants';

const manifest = (): MetadataRoute.Manifest => ({
  name: defaultPageTitle,
  short_name: 'RHF-MUI',
  description: defaultPageDescription,
  start_url: '/',
  display: 'standalone',
  background_color: '#ffffff',
  theme_color: '#007aba',
  icons: [
    { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    {
      src: '/icons/icon-512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable'
    }
  ]
});

export default manifest;
