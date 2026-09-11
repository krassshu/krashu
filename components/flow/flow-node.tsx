'use client';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { Popover } from '@base-ui/react/popover';
import type { FlowNodeData } from '@/lib/graphs';
import { useHighlight } from './flow-context';
import { NodeIcon } from './node-icon';
import { NodeStatus } from '../node-status';

export type FlowNodeType = Node<FlowNodeData & { statusLabel?: string; detailsLabel?: string }, 'system'>;

/**
 * One geometry for every diagram node: title row, two reserved metadata lines, status pinned to the bottom.
 * The outer React Flow wrapper stays overflow-visible for handles; the inner card clips its own text.
 */
export function FlowNode({ id, data, targetPosition = Position.Top, sourcePosition = Position.Bottom }: NodeProps<FlowNodeType>) {
  const { active, related, set } = useHighlight();
  const dimmed = active !== null && !related.has(id);
  const endpoint = data.kind === 'user' || data.kind === 'internet';
  const leaf = data.kind === 'server' || data.kind === 'client' || data.kind === 'ap';
  const tier = endpoint ? 'endpoint' : data.kind === 'core' ? 'root' : leaf ? 'leaf' : 'service';
  return <div className={`fnode fnode-${data.kind}${endpoint ? ' fnode-endpoint' : ''}${leaf ? ' fnode-leaf' : ''}${dimmed ? ' fnode-dim' : ''}${active === id ? ' fnode-active' : ''}`} data-tier={tier} onFocus={() => set(id)} onBlur={() => set(null)}>
    <Handle type="target" position={targetPosition} className="fhandle" />
    <div className="fnode-head">
      <span className="fnode-icon" aria-hidden="true"><NodeIcon kind={data.kind} size={15} /></span>
      <span className="fnode-label">{data.label}</span>
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
    </div>
    {endpoint ? (data.role ? <span className="fnode-role fnode-role-inline">{data.role}</span> : null) : <>
      <div className="fnode-meta">
        <span className="fnode-tech mono">{data.tech ?? ''}</span>
        <span className="fnode-role">{data.role ?? ''}</span>
      </div>
      <div className="fnode-foot">
        {data.tag ? <NodeStatus status="passive">{data.tag}</NodeStatus> : data.status ? <NodeStatus status={data.status}>{data.statusLabel}</NodeStatus> : null}
      </div>
    </>}
    <Handle type="source" position={sourcePosition} className="fhandle" />
  </div>;
}
