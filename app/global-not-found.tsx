import './globals.css';
import Link from 'next/link';
export const metadata={title:'404 | HomeOS',robots:{index:false,follow:true}};
export default function GlobalNotFound(){return <html lang="pl"><body><main className="container page-intro"><div className="eyebrow">404 / HOMEOS</div><h1>Nie znaleziono strony / Page not found</h1><p><Link className="button primary" href="/">Strona główna · PL</Link> <Link className="button secondary" href="/en/">Home · EN</Link></p></main></body></html>}
