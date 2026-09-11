import { t, localHref, type Locale } from '@/lib/i18n';
import Link from '@/components/site-link';
import type { ReactNode } from 'react';
import { Arrow } from './icons';
import { siteUrl } from '@/lib/site';

export function TextLink({ href, children, locale = 'pl' }: { href: string; children: ReactNode; locale?: Locale }) {
  return <Link className="text-link" href={localHref(href, locale)}>{t(children, locale)}<Arrow /></Link>;
}

export function TechnicalLabel({ children, locale = 'pl' }: { children: ReactNode; locale?: Locale }) {
  return <span className="technical-label">{t(children, locale)}</span>;
}

/** Section title with an optional lead paragraph and a link on the opposite side. */
export function SectionHeading({ id, title, children, link, locale = 'pl' }: { id?: string; title: string; children?: ReactNode; link?: { href: string; label: string }; locale?: Locale }) {
  return <div className="section-heading">
    <div>
      <h2 id={id}>{t(title, locale)}</h2>
      {children ? <p>{t(children, locale)}</p> : null}
    </div>
    {link ? <TextLink href={link.href} locale={locale}>{t(link.label, locale)}</TextLink> : null}
  </div>;
}

export function PageIntro({ label, title, description, meta, locale = 'pl' }: { label: string; title: string; description: string; meta?: ReactNode; locale?: Locale }) {
  return <section className="page-intro container">
    <nav className="breadcrumb" aria-label={t('Ścieżka nawigacji', locale)}>
      <Link href={localHref('/', locale)}>HomeIntelCore</Link><span aria-hidden="true">/</span><span aria-current="page">{t(label, locale)}</span>
    </nav>
    <div className="page-intro-grid">
      <div>
        <h1>{t(title, locale)}</h1>
        <p className="lead">{t(description, locale)}</p>
      </div>
      {meta ? <div className="page-intro-meta">{meta}</div> : null}
    </div>
  </section>;
}

export function BreadcrumbData({ label, path, locale = 'pl' }: { label: string; path: string; locale?: Locale }) {
  const data = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'HomeIntelCore', item: new URL(localHref('/', locale), siteUrl).href },
    { '@type': 'ListItem', position: 2, name: t(label, locale), item: new URL(localHref(path, locale), siteUrl).href },
  ] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

/** A short factual caveat. Use only where a status badge alone would mislead. */
export function Note({ children, locale = 'pl' }: { children: ReactNode; locale?: Locale }) {
  return <p className="note">{t(children, locale)}</p>;
}

/** Key–value metadata rendered in a definition list. */
export function MetaList({ items, locale = 'pl' }: { items: [string, ReactNode][]; locale?: Locale }) {
  return <dl className="meta-list">{items.map(([key, value]) => <div key={key}><dt>{t(key, locale)}</dt><dd>{typeof value === 'string' ? t(value, locale) : value}</dd></div>)}</dl>;
}
