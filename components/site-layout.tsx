import type { ReactNode } from 'react';
import { Instrument_Sans, IBM_Plex_Mono } from 'next/font/google';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';
import { InitialLoader } from './initial-loader';
import { t, type Locale } from '@/lib/i18n';
import '@/app/globals.css';

const sans = Instrument_Sans({ subsets: ['latin', 'latin-ext'], display: 'swap', variable: '--font-sans' });
const mono = IBM_Plex_Mono({ subsets: ['latin', 'latin-ext'], weight: ['400', '500'], display: 'swap', variable: '--font-mono' });

export function SiteLayout({ children, locale }: { children: ReactNode; locale: Locale }) {
  return <html lang={locale} className={`${sans.variable} ${mono.variable}`}>
    <body>
      <a className="skip-link" href="#main">{t('Przejdź do treści', locale)}</a>
      <InitialLoader locale={locale} />
      <noscript><style>{'.initial-loader{display:none!important}'}</style></noscript>
      <SiteHeader locale={locale} />
      <main id="main">{children}</main>
      <SiteFooter locale={locale} />
    </body>
  </html>;
}
