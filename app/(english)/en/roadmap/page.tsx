import { pageMetadata } from '@/lib/site';
export const metadata = pageMetadata('Roadmapa — MVP i plan rozwoju', 'Kierunek rozwoju HomeOS: obecny zakres Core 1.0 oraz planowane Calendar, Home Assistant, Cameras / NVR, Energy i Local AI. Bez obietnic dat wydania.', '/roadmap/', "en");
import View from '@/components/views/roadmap';
export default function Page(){return <View locale="en"/>}
