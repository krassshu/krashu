/** A connected H with a square core: one model joining the home's information. */
export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className="logo-symbol">
      <rect width="64" height="64" rx="12" fill="currentColor" />
      <path d="M18 18v28m28-28v28M18 32h28" stroke="var(--logo-lines, #F4F6F8)" strokeWidth="4" strokeLinecap="square" />
      <path d="M26 26h12v12H26z" fill="var(--logo-core, #7cc7f5)" stroke="currentColor" strokeWidth="3" />
      <path d="M15 15h6v6h-6zm28 0h6v6h-6zM15 43h6v6h-6zm28 0h6v6h-6z" fill="var(--logo-lines, #F4F6F8)" />
    </svg>
  );
}
