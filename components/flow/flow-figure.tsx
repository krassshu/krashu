import type { ReactNode } from 'react';
import { t, type Locale } from '@/lib/i18n';
import type { GraphDef, GraphNode } from '@/lib/graphs';
import { statusLabel, type Status } from '@/lib/content';
import { FlowLoader } from './flow-loader';
import type { FlowLabels } from './system-flow';

/** Translate a graph on the server so the client bundle never needs the dictionary. */
export function translateGraph(graph: GraphDef, locale: Locale): GraphDef {
  return { ...graph, nodes: graph.nodes.map(n => ({ ...n, data: { ...n.data, label: t(n.data.label, locale), role: n.data.role ? t(n.data.role, locale) : undefined, details: n.data.details?.map(([k, v]) => [t(k, locale), t(v, locale)] as [string, string]) } })), edges: graph.edges.map(e => ({ ...e, label: e.label ? t(e.label, locale) : undefined })) };
}

export function flowLabels(locale: Locale, ariaLabel: string): FlowLabels {
  const status = Object.fromEntries((Object.keys(statusLabel) as Status[]).map(s => [s, t(statusLabel[s], locale)]));
  return { status, details: t('Szczegóły', locale), zoomIn: t('Powiększ', locale), zoomOut: t('Pomniejsz', locale), fit: t('Dopasuj widok', locale), ariaLabel: t(ariaLabel, locale) };
}

/** Text equivalent of a diagram: every node with its role and status, every link as a sentence. */
export function GraphText({ graph, locale }: { graph: GraphDef; locale: Locale }) {
  const byId = new Map(graph.nodes.map(n => [n.id, n] as [string, GraphNode]));
  return <ul className="visually-hidden">
    {graph.edges.map(e => <li key={e.id}>{byId.get(e.source)?.data.label} → {byId.get(e.target)?.data.label}{e.label ? ` (${e.label})` : ''}{e.kind === 'planned' ? ` · ${t('Planowane', locale)}` : ''}</li>)}
  </ul>;
}

/** Shared frame: head, interactive diagram for wide screens, vertical fallback for narrow ones, caption. */
export function FlowFigure({ graph, locale, title, meta, ariaLabel, height, caption, fallback, className }: { graph: GraphDef; locale: Locale; title: string; meta?: string; ariaLabel: string; height?: number; caption: ReactNode; fallback: ReactNode; className?: string }) {
  const translated = translateGraph(graph, locale);
  return <figure className={`diagram${className ? ` ${className}` : ''}`} aria-label={t(ariaLabel, locale)}>
    <div className="diagram-head"><span>{t(title, locale)}</span>{meta ? <span>{t(meta, locale)}</span> : null}</div>
    <div className="diagram-desktop"><FlowLoader graph={translated} labels={flowLabels(locale, ariaLabel)} height={height} /></div>
    <div className="diagram-mobile">{fallback}</div>
    <GraphText graph={translated} locale={locale} />
    <figcaption>{caption}</figcaption>
  </figure>;
}
