import type { NextConfig } from 'next';
const config: NextConfig = { output: process.env.SITE_OUTPUT === 'export' ? 'export' : 'standalone', trailingSlash: true, poweredByHeader: false, experimental: { globalNotFound: true } };
export default config;
