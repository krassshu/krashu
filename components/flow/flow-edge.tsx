'use client';
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath, type EdgeProps, type Edge } from '@xyflow/react';
import { useHighlight } from './flow-context';

export type FlowEdgeType = Edge<{ kind?: 'default' | 'planned' | 'fast'; label?: string }, 'system'>;

/** Subtle by default, accent when part of the highlighted path. */
export function FlowEdge({ id, source, target, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: EdgeProps<FlowEdgeType>) {
  const { active, related } = useHighlight();
  const [path, labelX, labelY] = getSmoothStepPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, borderRadius: 10 });
  const lit = active !== null && related.has(source) && related.has(target) && (active === source || active === target);
  const dim = active !== null && !lit;
  const cls = `fedge fedge-${data?.kind ?? 'default'}${lit ? ' fedge-lit' : ''}${dim ? ' fedge-dim' : ''}`;
  return <>
    <BaseEdge id={id} path={path} className={cls} />
    {data?.label ? <EdgeLabelRenderer>
      <span className={`fedge-label${dim ? ' fedge-dim' : ''}${lit ? ' fedge-label-lit' : ''}`} style={{ transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)` }}>{data.label}</span>
    </EdgeLabelRenderer> : null}
  </>;
}
