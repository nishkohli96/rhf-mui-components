import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.icons8.com'
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com'
      }
    ],
  }
};

export default nextConfig;
