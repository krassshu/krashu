import Link from 'next/link';
export default function NotFound() {
  return <section className="container page-intro">
    <p className="technical-label">404</p>
    <h1>Nie znaleziono strony</h1>
    <p className="lead">Tego adresu nie ma w dokumentacji projektu. Wróć do strony głównej albo wybierz temat w nawigacji.</p>
    <p><Link href="/" className="button button-primary">Wróć do strony głównej</Link></p>
  </section>;
}
