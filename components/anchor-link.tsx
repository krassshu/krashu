'use client';

import type { ComponentProps, MouseEvent } from 'react';
import Link from '@/components/site-link';

/**
 * Smooth scrolling lives here rather than in a global `scroll-behavior: smooth`, which would
 * also animate the router's own scroll resets and leave a new route parked mid-page.
 */
export function scrollToHash(hash: string): boolean {
  const target = document.getElementById(hash.replace(/^#/, ''));
  if (!target) return false;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  return true;
}

/**
 * A link to a section. When the target is on the current page it scrolls there smoothly and
 * updates the hash; otherwise it stays an ordinary link and Next.js positions the new route.
 */
export function AnchorLink({ href, children, onClick, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    const index = href.indexOf('#');
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || index < 0) return;
    const path = href.slice(0, index) || window.location.pathname;
    const withSlash = (value: string) => (value.endsWith('/') ? value : `${value}/`);
    if (withSlash(path) !== withSlash(window.location.pathname)) return;
    if (!scrollToHash(href.slice(index))) return;
    event.preventDefault();
    window.history.pushState(null, '', href);
  };
  return <Link href={href} onClick={handleClick} {...props}>{children}</Link>;
}
