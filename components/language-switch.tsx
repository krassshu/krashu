'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export function LanguageSwitch(){
 const pathname=usePathname();
 const english=pathname==='/en'||pathname.startsWith('/en/');
 const base=english?pathname.slice(3)||'/':pathname;
 const polish=base.endsWith('/')?base:`${base}/`;
 return <nav className="language-switch" aria-label={english?'Language':'Język'}>
  <Link href={polish} hrefLang="pl" lang="pl" aria-label="Polski" aria-current={!english?'page':undefined}>PL</Link>
  <span aria-hidden="true">/</span>
  <Link href={`/en${polish}`} hrefLang="en" lang="en" aria-label="English" aria-current={english?'page':undefined}>EN</Link>
 </nav>;
}
