import Link from 'next/link';
export default function NotFound(){return <section className="container page-intro"><div className="eyebrow">404 / BRAK STRONY</div><h1>Tego adresu nie ma w modelu.</h1><p>Wróć do strony głównej lub wybierz temat w nawigacji.</p><Link href="/" className="button primary" style={{marginTop:25}}>Wróć do HomeOS →</Link></section>}
