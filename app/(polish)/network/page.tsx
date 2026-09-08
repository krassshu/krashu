import { pageMetadata } from '@/lib/site';
export const metadata = pageMetadata('Sieć domowa — topologia i segmentacja', 'Plan infrastruktury sieci domowej HomeOS: MikroTik CRS310-8G+2S+IN, okablowanie RJ45, link SFP+ do serwera oraz osobna koncepcja segmentacji sieci.', '/network/');
import View from '@/components/views/network';
export default function Page(){return <View locale="pl"/>}
