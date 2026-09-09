import { pageMetadata } from '@/lib/site';
export const metadata = pageMetadata('Sieć domowa i plan homelabu', 'Plan sieci domowej HomeIntelCore: router MikroTik RB5009, switch CRS310-8G+2S+IN, patch panel, link SFP+ do serwera oraz koncepcja segmentacji i dostępu zdalnego przez WireGuard.', '/network/');
import View from '@/components/views/network';
export default function Page(){return <View locale="pl"/>}
