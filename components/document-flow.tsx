'use client';
import { motion, useReducedMotion } from 'motion/react';
import { NodeIcon } from './flow/node-icon';
import type { NodeKind } from '@/lib/graphs';

export type FlowStep = { n: string; label: string; value: string; mono?: boolean; kind: NodeKind };

/** Six small nodes on one rail; the rail and nodes appear once when scrolled into view. */
export function DocumentFlow({ steps, title, meta, caption }: { steps: FlowStep[]; title: string; meta: string; caption: string }) {
  const reduce = useReducedMotion();
  return <figure className="diagram doc-flow" aria-label={title}>
    <div className="diagram-head"><span>{title}</span><span>{meta}</span></div>
    <ol className="doc-steps">
      {steps.map((s, i) => <motion.li key={s.n} initial={reduce ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.35, delay: i * 0.07 }}>
        <span className="doc-step-icon" aria-hidden="true"><NodeIcon kind={s.kind} size={18} /></span>
        <span className="technical-label">{s.n} {s.label}</span>
        <strong className={s.mono ? 'mono' : undefined}>{s.value}</strong>
      </motion.li>)}
    </ol>
    <figcaption>{caption}</figcaption>
  </figure>;
}
