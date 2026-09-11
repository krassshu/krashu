import type { NodeKind } from '@/lib/graphs';
const paths: Partial<Record<NodeKind, string>> = {
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9a7 7 0 0 1 14 0',
  ui: 'M3 5h18v12H3zM8 21h8M12 17v4',
  entry: 'M4 12h11m-4-4 4 4-4 4M15 4h5v16h-5',
  core: 'M8 8h8v8H8zM12 3v5m0 8v5M3 12h5m8 0h5',
  db: 'M12 3c-5 0-8 1.3-8 3v12c0 1.7 3 3 8 3s8-1.3 8-3V6c0-1.7-3-3-8-3ZM4 6c0 1.7 3 3 8 3s8-1.3 8-3M4 12c0 1.7 3 3 8 3s8-1.3 8-3',
  queue: 'M4 6h16M4 12h11M4 18h7',
  provider: 'M4 8h16v10H4zM9 8V5h6v3',
  service: 'M14 3H6v18h12V7l-4-4Zm0 0v4h4M9 13h6M9 17h4',
  planned: 'M12 3v18M3 12h18',
  internet: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-18c3 3 3 15 0 18M3 12h18M5 7.5h14M5 16.5h14',
  router: 'M3 13h18v6H3zM7 16h.01M11 16h.01M8 13V9m8 4V9M8 9a4 4 0 0 1 8 0',
  panel: 'M3 8h18v8H3zM7 12h.01M11 12h.01M15 12h.01',
  switch: 'M3 9h18v6H3zM7 12h.01M10 12h.01M13 12h.01M16 12h.01',
  server: 'M3 4h18v6H3zM3 14h18v6H3zM7 7h.01M7 17h.01',
  client: 'M4 5h16v11H4zM2 20h20',
  ap: 'M12 20v-6m-6.4-1.6a9 9 0 0 1 12.8 0M3 9a13 13 0 0 1 18 0',
  segment: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
};
export function NodeIcon({ kind, size = 16 }: { kind: NodeKind; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[kind] || paths.service!} /></svg>;
}
