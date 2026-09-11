'use client';
import '@xyflow/react/dist/base.css';
import { useMemo, useState, useCallback } from 'react';
import { ReactFlow, ReactFlowProvider, Background, BackgroundVariant, Position, useReactFlow, type Node, type Edge } from '@xyflow/react';
import dagre from '@dagrejs/dagre';
import type { GraphDef } from '@/lib/graphs';
import { HighlightContext } from './flow-context';
import { FlowNode, type FlowNodeType } from './flow-node';
import { FlowEdge, type FlowEdgeType } from './flow-edge';

export type FlowLabels = { status: Record<string, string>; details: string; zoomIn: string; zoomOut: string; fit: string; ariaLabel: string };

const nodeTypes = { system: FlowNode };
const edgeTypes = { system: FlowEdge };

/** Dagre gives every diagram the same top-to-bottom rhythm without hand-placed coordinates. */
function layout(graph: GraphDef, labels: FlowLabels): { nodes: Node[]; edges: Edge[] } {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: graph.direction, nodesep: graph.direction === 'LR' ? 18 : 24, ranksep: graph.direction === 'LR' ? 72 : 44, marginx: 8, marginy: 8 });
  graph.nodes.forEach(n => g.setNode(n.id, { width: n.width, height: n.height }));
  graph.edges.forEach(e => g.setEdge(e.source, e.target, { minlen: e.minlen ?? 1 }));
  dagre.layout(g);
  const horizontal = graph.direction === 'LR';
  const nodes: FlowNodeType[] = graph.nodes.map(n => {
    const p = g.node(n.id);
    return { id: n.id, type: 'system', position: { x: p.x - n.width / 2, y: p.y - n.height / 2 }, width: n.width, height: n.height, draggable: false, connectable: false, selectable: false,
      sourcePosition: horizontal ? Position.Right : Position.Bottom, targetPosition: horizontal ? Position.Left : Position.Top,
      data: { ...n.data, statusLabel: n.data.status ? labels.status[n.data.status] : undefined, detailsLabel: labels.details } };
  });
  const edges: FlowEdgeType[] = graph.edges.map(e => ({ id: e.id, source: e.source, target: e.target, type: 'system', focusable: false, data: { kind: e.kind, label: e.label } }));
  return { nodes, edges };
}

function Controls({ labels }: { labels: FlowLabels }) {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  return <div className="flow-controls" role="group" aria-label="Zoom">
    <button type="button" onClick={() => zoomIn({ duration: 200 })} aria-label={labels.zoomIn}>+</button>
    <button type="button" onClick={() => zoomOut({ duration: 200 })} aria-label={labels.zoomOut}>−</button>
    <button type="button" onClick={() => fitView({ duration: 250, padding: 0.12 })} aria-label={labels.fit}>⤢</button>
  </div>;
}

export function SystemFlow({ graph, labels, height = 520 }: { graph: GraphDef; labels: FlowLabels; height?: number }) {
  const { nodes, edges } = useMemo(() => layout(graph, labels), [graph, labels]);
  const [active, setActive] = useState<string | null>(null);
  const neighbours = useMemo(() => {
    const map = new Map<string, Set<string>>();
    const link = (a: string, b: string) => { const set = map.get(a) ?? new Set<string>(); set.add(b); map.set(a, set); };
    graph.edges.forEach(e => { link(e.source, e.target); link(e.target, e.source); });
    return map;
  }, [graph]);
  const related = useMemo(() => active ? new Set([active, ...(neighbours.get(active) ?? [])]) : new Set<string>(), [active, neighbours]);
  const set = useCallback((id: string | null) => setActive(id), []);
  return <HighlightContext.Provider value={{ active, related, set }}>
    <div className="flow" style={{ height }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes} edges={edges} nodeTypes={nodeTypes} edgeTypes={edgeTypes}
          fitView fitViewOptions={{ padding: 0.12 }} minZoom={0.4} maxZoom={1.6}
          nodesDraggable={false} nodesConnectable={false} elementsSelectable={false} nodesFocusable
          zoomOnScroll={false} zoomOnDoubleClick={false} panOnScroll={false} preventScrolling={false} panOnDrag
          onNodeMouseEnter={(_, node) => set(node.id)} onNodeMouseLeave={() => set(null)}
          proOptions={{ hideAttribution: true }} aria-label={labels.ariaLabel}
        >
          <Background variant={BackgroundVariant.Dots} gap={22} size={1} className="flow-bg" />
          <Controls labels={labels} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  </HighlightContext.Provider>;
}
