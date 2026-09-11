import { NodeIcon } from './flow/node-icon';
import type { NodeKind } from '@/lib/graphs';

export type FlowStep = { n: string; label: string; value: string; mono?: boolean; kind: NodeKind };

/** Six small nodes on one rail. Rendered statically so the flow is always visible, whatever the viewport or scroll position. */
export function DocumentFlow({ steps, title, meta, caption }: { steps: FlowStep[]; title: string; meta: string; caption: string }) {
  return <figure className="diagram doc-flow" aria-label={title}>
    <div className="diagram-head"><span>{title}</span><span>{meta}</span></div>
    <ol className="doc-steps">
      {steps.map(s => <li key={s.n}>
        <span className="doc-step-icon" aria-hidden="true"><NodeIcon kind={s.kind} size={18} /></span>
        <span className="technical-label">{s.n} {s.label}</span>
        <strong className={s.mono ? 'mono' : undefined}>{s.value}</strong>
      </li>)}
    </ol>
    <figcaption>{caption}</figcaption>
  </figure>;
}
