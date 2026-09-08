import type { ReactNode } from 'react';
import { Header, Footer } from './header';
import { t, type Locale } from '@/lib/i18n';
import '@/app/globals.css';
export function SiteLayout({children,locale}:{children:ReactNode;locale:Locale}){return <html lang={locale}><body><a className="skip-link" href="#main">{t('Przejdź do treści',locale)}</a><Header locale={locale}/><main id="main">{children}</main><Footer locale={locale}/></body></html>}
