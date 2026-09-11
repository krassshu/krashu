import './globals.css';
import Link from 'next/link';
export const metadata = { title: '404 | HomeIntelCore', robots: { index: false, follow: true } };
export default function GlobalNotFound() {
  return <html lang="pl"><body><main className="container page-intro">
    <p className="technical-label">404</p>
    <h1>Nie znaleziono strony / Page not found</h1>
    <p className="hero-actions"><Link className="button button-primary" href="/">Strona główna (PL)</Link> <Link className="button" href="/en/">Home (EN)</Link></p>
  </main></body></html>;
}
