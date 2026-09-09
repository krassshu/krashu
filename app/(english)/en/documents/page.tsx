import { pageMetadata } from '@/lib/site';
export const metadata = pageMetadata('Dokumenty, OCR i pamięć domu', 'Warstwa dokumentowa HomeIntelCore: Paperless-ngx, OCR i wyszukiwanie połączone z modelem obiektów domu. Obecny zakres Home Memory na własnym serwerze.', '/documents/', "en");
import View from '@/components/views/documents';
export default function Page(){return <View locale="en"/>}
