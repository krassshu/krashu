'use client';
import { useState } from 'react';
import { Tabs } from '@base-ui/react/tabs';

export type Chain = { id: string; tab: string; nodes: { type: string; value: string; note?: string; date?: string; accent?: boolean }[]; edges: string[] };

/** One object type at a time. All chains stay mounted and overlap, so the panel keeps the height of the tallest one. */
export function ObjectExplorer({ chains, label, caption }: { chains: Chain[]; label: string; caption: string }) {
  const [value, setValue] = useState(chains[0].id);
  return <div className="relation">
    <div className="diagram-head"><span>OBJECT ENGINE</span><span>{caption}</span></div>
    <Tabs.Root value={value} onValueChange={v => setValue(String(v))} className="tabs tabs-inline">
      <Tabs.List className="tabs-list" aria-label={label}>
        {chains.map(c => <Tabs.Tab key={c.id} value={c.id} className="tab">{c.tab}</Tabs.Tab>)}
        <Tabs.Indicator className="tab-indicator" />
      </Tabs.List>
      <div className="tab-stack">
      {chains.map(c => <Tabs.Panel key={c.id} value={c.id} keepMounted className="tab-panel">
          <ol className="relation-chain">
            {c.nodes.map((node, i) => <li key={i} className="relation-item">
              {i > 0 ? <span className="relation-edge"><span className="mono">{c.edges[i - 1]}</span></span> : null}
              <div className={`relation-node${node.accent ? ' relation-node-accent' : ''}`}>
                <span className="technical-label">{node.type}</span>
                <strong>{node.date ? <time dateTime={node.date}>{node.value}</time> : node.value}</strong>
                {node.note ? <span>{node.note}</span> : null}
              </div>
            </li>)}
          </ol>
      </Tabs.Panel>)}
      </div>
    </Tabs.Root>
  </div>;
}
