import { pageMetadata } from '@/lib/site';
export const metadata = pageMetadata('Dokumenty', 'Przepływ dokumentów w HomeIntelCore: PDF, OCR w Paperless-ngx, metadane, relacja z obiektem, termin i przypomnienie. Obecny zakres Home Memory na własnym serwerze.', '/documents/', 'en');
import View from '@/components/views/documents';
export default function Page(){return <View locale="en"/>}
