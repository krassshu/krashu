'use client';
import { useState } from 'react';
import { Tabs } from '@base-ui/react/tabs';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

export type Chain = { id: string; tab: string; nodes: { type: string; value: string; note?: string; date?: string; accent?: boolean }[]; edges: string[] };

/** One object type at a time. Switching the tab swaps the relation chain with a short layout transition. */
export function ObjectExplorer({ chains, label, caption }: { chains: Chain[]; label: string; caption: string }) {
  const [value, setValue] = useState(chains[0].id);
  const reduce = useReducedMotion();
  const chain = chains.find(c => c.id === value) ?? chains[0];
  return <div className="relation">
    <div className="diagram-head"><span>OBJECT ENGINE</span><span>{caption}</span></div>
    <Tabs.Root value={value} onValueChange={v => setValue(String(v))} className="tabs tabs-inline">
      <Tabs.List className="tabs-list" aria-label={label}>
        {chains.map(c => <Tabs.Tab key={c.id} value={c.id} className="tab">{c.tab}</Tabs.Tab>)}
        <Tabs.Indicator className="tab-indicator" />
      </Tabs.List>
      {chains.map(c => <Tabs.Panel key={c.id} value={c.id} className="tab-panel">
        <AnimatePresence mode="wait" initial={false}>
          {c.id === chain.id ? <motion.ol key={c.id} className="relation-chain" initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
            {c.nodes.map((node, i) => <li key={i} className="relation-item">
              {i > 0 ? <span className="relation-edge"><span className="mono">{c.edges[i - 1]}</span></span> : null}
              <div className={`relation-node${node.accent ? ' relation-node-accent' : ''}`}>
                <span className="technical-label">{node.type}</span>
                <strong>{node.date ? <time dateTime={node.date}>{node.value}</time> : node.value}</strong>
                {node.note ? <span>{node.note}</span> : null}
              </div>
            </li>)}
          </motion.ol> : null}
        </AnimatePresence>
      </Tabs.Panel>)}
    </Tabs.Root>
  </div>;
}
