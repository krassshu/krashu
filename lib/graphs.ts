import type { Status } from './content';
import { branches, segments } from './content';

/** Node and edge definitions shared by the React Flow diagrams and their mobile/text fallbacks. */
export type NodeKind = 'user' | 'ui' | 'entry' | 'core' | 'db' | 'queue' | 'provider' | 'service' | 'planned' | 'internet' | 'router' | 'panel' | 'switch' | 'server' | 'client' | 'ap' | 'segment';
export type FlowNodeData = {
  label: string;
  tech?: string;
  role?: string;
  status?: Status;
  kind: NodeKind;
  details?: [string, string][];
};
export type GraphNode = { id: string; data: FlowNodeData; width: number; height: number };
export type GraphEdge = { id: string; source: string; target: string; label?: string; kind?: 'default' | 'planned' | 'fast'; minlen?: number };
export type GraphDef = { nodes: GraphNode[]; edges: GraphEdge[]; direction: 'TB' | 'LR' };

const size = (kind: NodeKind): [number, number] => {
  switch (kind) {
    case 'core': return [244, 78];
    case 'user': case 'internet': return [168, 54];
    case 'planned': return [214, 62];
    case 'segment': return [220, 70];
    case 'switch': case 'router': return [244, 78];
    case 'server': case 'client': case 'ap': return [244, 74];
    default: return [224, 70];
  }
};
const n = (id: string, data: FlowNodeData): GraphNode => { const [width, height] = size(data.kind); return { id, data, width, height }; };
const e = (source: string, target: string, label?: string, kind: GraphEdge['kind'] = 'default', minlen?: number): GraphEdge => ({ id: `${source}-${target}`, source, target, label, kind, minlen });

const planned: GraphNode[] = [
  n('ha', { label: 'Home Assistant', role: 'urządzenia, sceny, rutyny', status: 'planned', kind: 'planned' }),
  n('nvr', { label: 'Monitoring / NVR', role: 'kamery, lokalna rejestracja', status: 'planned', kind: 'planned' }),
  n('energy', { label: 'Energia', role: 'falownik, licznik, magazyn', status: 'planned', kind: 'planned' }),
  n('ai', { label: 'Lokalne AI', role: 'wyszukiwanie semantyczne', status: 'planned', kind: 'planned' }),
];

export function architectureGraph(compact: boolean): GraphDef {
  const nodes: GraphNode[] = [
    n('user', { label: 'Użytkownik', kind: 'user' }),
    ...(compact ? [] : [n('caddy', { label: 'Caddy', role: 'reverse proxy w LAN', status: 'lab', kind: 'entry' })]),
    n('next', { label: 'Next.js', role: 'interfejs użytkownika', status: 'lab', kind: 'ui' }),
    n('core', { label: 'Core', role: compact ? 'obiekty, relacje, terminy' : 'obiekty, relacje, uprawnienia, terminy', status: 'lab', kind: 'core' }),
    n('pg', { label: 'PostgreSQL', role: compact ? 'dane Core' : 'baza Core: obiekty i relacje', status: 'lab', kind: 'db' }),
    n('queue', { label: 'Kolejka zadań', role: compact ? 'praca w tle' : 'import, OCR, przypomnienia', status: 'lab', kind: 'queue' }),
    n('provider', { label: 'DocumentProvider', role: 'granica integracji', status: 'lab', kind: 'provider' }),
    n('paperless', { label: 'Paperless-ngx', tech: compact ? undefined : '3.0.4', role: compact ? 'dokumenty, OCR' : 'dokumenty, OCR, wyszukiwanie', status: 'lab', kind: 'service' }),
    n('pg2', { label: 'PostgreSQL', role: 'baza Paperless', status: 'lab', kind: 'db' }),
    n('gotenberg', { label: 'Gotenberg', role: 'konwersja plików', status: 'lab', kind: 'service' }),
    ...planned,
    ...(compact ? [] : [n('wg', { label: 'WireGuard', role: 'dostęp zdalny', status: 'planned', kind: 'planned' })]),
  ];
  const edges: GraphEdge[] = [
    ...(compact ? [e('user', 'next')] : [e('user', 'caddy'), e('caddy', 'next')]),
    e('next', 'core'),
    e('core', 'pg'), e('core', 'queue'), e('core', 'provider'),
    e('provider', 'paperless'),
    e('paperless', 'pg2'), e('paperless', 'gotenberg'),
    ...planned.map(p => e('core', p.id, undefined, 'planned', compact ? 3 : 4)),
    ...(compact ? [] : [e('core', 'wg', undefined, 'planned', 4)]),
  ];
  return { nodes, edges, direction: 'TB' };
}

const crsDetails: [string, string][] = [['Model', 'CRS310-8G+2S+IN'], ['Porty', '8 × 2.5G RJ45, 2 × SFP+'], ['Przypisanie portów', 'nieokreślone'], ['Uplink do routera', 'medium nieokreślone']];

export function networkPhysicalGraph(compact: boolean): GraphDef {
  const nodes: GraphNode[] = [
    n('internet', { label: 'Internet', kind: 'internet' }),
    n('rb5009', { label: 'MikroTik RB5009', tech: 'RB5009', role: 'router', status: 'planned', kind: 'router', details: [['Rola', 'router, brama'], ['Uplink do switcha', 'port nieprzypisany'], ['Status', 'plan homelabu']] }),
    ...(compact ? [] : [n('patch', { label: 'Patch panel', role: 'zakończenia okablowania', status: 'planned', kind: 'panel' })]),
    n('crs310', { label: 'MikroTik CRS310', tech: 'CRS310-8G+2S+IN', role: 'główny switch', status: 'planned', kind: 'switch', details: crsDetails }),
  ];
  const edges: GraphEdge[] = compact
    ? [e('internet', 'rb5009'), e('rb5009', 'crs310')]
    : [e('internet', 'rb5009'), e('rb5009', 'patch'), e('patch', 'crs310')];
  if (compact) {
    nodes.push(
      n('server', { label: 'Serwer HomeIntelCore / NAS', role: 'usługi i dane', status: 'planned', kind: 'server' }),
      n('pc', { label: 'Komputer i rezerwa', role: '2 × RJ45', status: 'planned', kind: 'client' }),
      n('outlets', { label: 'Punkty sieciowe', role: '5 × RJ45: sypialnia, pokój 2, salon', status: 'planned', kind: 'client' }),
      n('aps', { label: '2 × punkt dostępowy', role: 'dół i góra', status: 'planned', kind: 'ap' }),
    );
    edges.push(e('crs310', 'server', 'SFP+', 'fast'), e('crs310', 'pc', 'RJ45 · 2.5G'), e('crs310', 'outlets', 'RJ45 · 2.5G'), e('crs310', 'aps', 'RJ45 · 2.5G', 'planned'));
  } else {
    branches.forEach((b, i) => {
      const id = `b${i}`;
      const kind: NodeKind = b.fast ? 'server' : b.planned ? 'ap' : 'client';
      const link = b.fast ? 'SFP+' : b.count ? `${b.count} × RJ45 · 2.5G` : 'RJ45 · 2.5G';
      nodes.push(n(id, { label: b.target, tech: link, role: b.room, status: 'planned', kind, details: [['Łącze', `${b.count ?? 1} × ${b.port}`], ['Pomieszczenie', b.room], ['Port switcha', 'nieprzypisany'], ...(b.fast ? [['Moduł SFP+', 'nieokreślony'] as [string, string]] : [])] }));
      edges.push(e('crs310', id, undefined, b.fast ? 'fast' : b.planned ? 'planned' : 'default'));
    });
  }
  return { nodes, edges, direction: compact ? 'TB' : 'LR' };
}

export function networkLogicalGraph(): GraphDef {
  const nodes: GraphNode[] = [
    n('rb5009', { label: 'MikroTik RB5009', tech: 'RB5009', role: 'router między segmentami', status: 'planned', kind: 'router' }),
    ...segments.map(s => n(`seg-${s.name.toLowerCase()}`, { label: s.name, role: s.role, status: 'concept', kind: 'segment', details: [['VLAN ID', 'nieokreślony'], ['Podsieć', 'nieokreślona'], ['Reguły firewalla', 'nieokreślone']] })),
  ];
  const edges: GraphEdge[] = segments.map(s => e('rb5009', `seg-${s.name.toLowerCase()}`, undefined, 'planned'));
  return { nodes, edges, direction: 'LR' };
}
