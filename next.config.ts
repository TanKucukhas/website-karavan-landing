import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

// Bundle analyzer
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  ...(isProd ? { output: 'export' } : {}),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizeCss: false,
  },
  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: './tsconfig.json',
  },
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src'],
  },
  // Removed rewrites to allow Cloudflare Pages Functions to work in development
  // async rewrites() {
  //   // In local development, proxy API calls to the Apps Script Web App
  //   if (!isProd && process.env.APPSCRIPT_WEBAPP_URL) {
  //     const base = process.env.APPSCRIPT_WEBAPP_URL;
  //     const secret = process.env.APPSCRIPT_SHARED_SECRET || '';
  //     const notify = '1';
  //     const url = new URL(base);
  //     if (secret) url.searchParams.set('secret', secret);
  //     url.searchParams.set('notify', notify);
  //     const dest = url.toString();
  //     return [
  //       { source: '/api/contact', destination: dest },
  //       { source: '/api/contact/', destination: dest },
  //     ];
  //   }
  //   return [];
  // },
};

export default withBundleAnalyzer(nextConfig);
