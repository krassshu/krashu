import { SiteLayout } from '@/components/site-layout';
import { rootMetadata } from '@/lib/site';
export const metadata=rootMetadata('en');
export default function Layout({children}:{children:React.ReactNode}){return <SiteLayout locale="en">{children}</SiteLayout>}
