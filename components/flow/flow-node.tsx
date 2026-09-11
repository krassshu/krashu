'use client';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { Popover } from '@base-ui/react/popover';
import type { FlowNodeData } from '@/lib/graphs';
import { useHighlight } from './flow-context';
import { NodeIcon } from './node-icon';

export type FlowNodeType = Node<FlowNodeData & { statusLabel?: string; detailsLabel?: string; closeLabel?: string }, 'system'>;

/** One node design for every diagram: icon, label, technology/role line and status. */
export function FlowNode({ id, data, targetPosition = Position.Top, sourcePosition = Position.Bottom }: NodeProps<FlowNodeType>) {
  const { active, related, set } = useHighlight();
  const dimmed = active !== null && !related.has(id);
  return <div
    className={`fnode fnode-${data.kind}${dimmed ? ' fnode-dim' : ''}${active === id ? ' fnode-active' : ''}`}
    onFocus={() => set(id)} onBlur={() => set(null)}
  >
    <Handle type="target" position={targetPosition} className="fhandle" />
    <span className="fnode-icon" aria-hidden="true"><NodeIcon kind={data.kind} /></span>
    <span className="fnode-text">
      <span className="fnode-label">{data.label}</span>
      {data.tech ? <span className="fnode-tech mono">{data.tech}</span> : null}
      {data.role ? <span className="fnode-role">{data.role}</span> : null}
    </span>
    {data.tag ? <span className="fnode-tag mono">{data.tag}</span> : data.status ? <span className={`fnode-status status-${data.status}`} title={data.statusLabel}><span className="status-dot" aria-hidden="true" /><span className="visually-hidden">{data.statusLabel}</span></span> : null}
    {data.details ? <Popover.Root>
      <Popover.Trigger className="fnode-more nodrag nopan" aria-label={`${data.detailsLabel}: ${data.label}`}>
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" /><path d="M6 5.2v3.3M6 3.4v.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner side="right" sideOffset={10} className="popover-positioner">
          <Popover.Popup className="popover">
            <Popover.Arrow className="popover-arrow" />
            <Popover.Title className="popover-title">{data.label}</Popover.Title>
            <dl className="popover-list">{data.details.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root> : null}
    <Handle type="source" position={sourcePosition} className="fhandle" />
  </div>;
}
