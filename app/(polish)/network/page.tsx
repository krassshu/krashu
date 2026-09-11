import { pageMetadata } from '@/lib/site';
export const metadata = pageMetadata('Sieć domowa', 'Plan sieci domowej HomeIntelCore: router MikroTik RB5009, switch CRS310-8G+2S+IN, link SFP+ do serwera, koncepcja segmentacji logicznej i dostęp zdalny przez WireGuard.', '/network/');
import View from '@/components/views/network';
export default function Page(){return <View locale="pl"/>}
