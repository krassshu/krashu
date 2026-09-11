import { LogoMark } from './logo-mark';
export function Arrow({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.5 8h11M9.5 4l4 4-4 4" /></svg>;
}
export function Brand() {
  return <span className="brand"><LogoMark size={26} /><span className="brand-wordmark">HomeIntelCore</span></span>;
}
