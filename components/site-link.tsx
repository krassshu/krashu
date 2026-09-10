'use client';

import Link, { useLinkStatus } from 'next/link';
import type { ComponentProps } from 'react';
import { LogoMark } from './logo-mark';

function NavigationHint() {
  const { pending } = useLinkStatus();
  if (!pending) return null;
  return <span className="navigation-loader" aria-hidden="true"><span className="navigation-loader-line" /><span className="navigation-loader-symbol"><LogoMark size={28} /></span></span>;
}

/** Use Next's actual pending state, with no synthetic progress or navigation delay. */
export default function SiteLink({ children, ...props }: ComponentProps<typeof Link>) {
  return <Link {...props}>{children}<NavigationHint /></Link>;
}
