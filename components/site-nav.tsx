'use client';
import { usePathname } from 'next/navigation';
import Link from '@/components/site-link';

/** Marks the current section so the active page is visible in the header. */
export function SiteNav({ items, label, className }: { items: { href: string; label: string }[]; label: string; className: string }) {
  const pathname = usePathname();
  const current = (href: string) => {
    const path = href.endsWith('/') ? href : `${href}/`;
    const here = pathname.endsWith('/') ? pathname : `${pathname}/`;
    return here === path || (path !== '/' && path !== '/en/' && here.startsWith(path));
  };
  /* The mobile menu is a <details>; close it once a destination is chosen. */
  const close = (event: React.MouseEvent<HTMLAnchorElement>) => { event.currentTarget.closest('details')?.removeAttribute('open'); };
  return <nav className={className} aria-label={label}>
    {items.map(item => <Link key={item.href} href={item.href} onClick={close} aria-current={current(item.href) ? 'page' : undefined}>{item.label}</Link>)}
  </nav>;
}
