import type { NextConfig } from 'next';
/** SITE_OUTPUT: unset → standalone (Docker), "export" → static export to out/, "server" → plain `next start` (used by the Playwright web server). */
const output = process.env.SITE_OUTPUT === 'export' ? 'export' : process.env.SITE_OUTPUT === 'server' ? undefined : 'standalone';
const config: NextConfig = { output, trailingSlash: true, poweredByHeader: false, experimental: { globalNotFound: true } };
export default config;
