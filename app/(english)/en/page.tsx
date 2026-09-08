import { pageMetadata } from '@/lib/site';
export const metadata = pageMetadata("HomeOS — a local home operating system", "A private home management system connecting objects, documents and deadlines on your own server. Explore the concept, architecture and network.", "/", "en");
import View from '@/components/views/home';
export default function Page(){return <View locale="en"/>}
