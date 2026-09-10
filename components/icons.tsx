import type { CSSProperties } from 'react';
import { LogoMark } from './logo-mark';
export function Icon({ name = 'box', size = 20, style }: { name?: string; size?: number; style?: CSSProperties }) {
 const paths: Record<string,string> = {
 box:'M12 3 3 7.5v9L12 21l9-4.5v-9L12 3ZM3 7.5l9 4.5 9-4.5M12 12v9',
 file:'M14 2H5v20h14V7l-5-5Zm0 0v5h5M8 12h8M8 16h6',
 person:'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-2a8 8 0 0 1 16 0v2',
 car:'m5 7 2-4h10l2 4 2 3v7H3v-7l2-3ZM3 10h18M6 13h2m8 0h2M5 17v3m14-3v3',
 server:'M3 3h18v7H3V3Zm0 11h18v7H3v-7ZM7 6v1m0 10v1M11 6h6m-6 11h6',
 network:'M9 2h6v6H9V2Zm-7 14h6v6H2v-6Zm14 0h6v6h-6v-6ZM12 8v4M5 16v-4h14v4',
 calendar:'M3 5h18v16H3V5Zm4-3v6m10-6v6M3 10h18M7 14h3m4 0h3m-10 4h3',
 plug:'M8 2v5m8-5v5M5 7h14v3a7 7 0 0 1-14 0V7Zm7 10v5',
 arrow:'M4 12h16m-6-6 6 6-6 6',
 shield:'M12 2 3 6v6c0 5 9 10 9 10s9-5 9-10V6l-9-4Zm-4 10 3 3 5-6',
 home:'m2 11 10-9 10 9M5 9v12h14V9M9 21v-8h6v8',
 search:'M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-2 6 6 6',
 clock:'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Zm-10-6v6l4 2',
 check:'m5 12 4 4L19 6',
 };
 return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}><path d={paths[name] || paths.box}/></svg>;
}
export function Brand() {
  return <span className="brand"><LogoMark /><span className="brand-wordmark"><b>H</b>ome<b>I</b>ntel<b>C</b>ore</span></span>;
}
