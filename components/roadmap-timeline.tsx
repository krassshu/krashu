'use client';
import { useState } from 'react';
import { Tabs } from '@base-ui/react/tabs';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

export type Stage = { stage: string; name: string; status: 'active' | 'planned' | 'future'; statusLabel: string; features: string[]; description: string };

/** Stages on one axis. Only the chosen stage shows its description; the current one is emphasised. */
export function RoadmapTimeline({ stages, label, modulesLabel, compact = false }: { stages: Stage[]; label: string; modulesLabel: string; compact?: boolean }) {
  const [value, setValue] = useState(stages[0].stage);
  const reduce = useReducedMotion();
  const current = stages.find(s => s.stage === value) ?? stages[0];
  return <Tabs.Root value={value} onValueChange={v => setValue(String(v))} className={`timeline${compact ? ' timeline-compact' : ''}`}>
    <Tabs.List className="timeline-track" aria-label={label}>
      {stages.map(s => <Tabs.Tab key={s.stage} value={s.stage} className={`stage stage-${s.status}`} aria-current={s.status === 'active' ? 'step' : undefined}>
        <span className="stage-marker" aria-hidden="true" />
        <span className="stage-number mono">{s.stage}</span>
        <span className="stage-name">{s.name}</span>
        <span className={`stage-status status-${s.status}`}><span className="status-dot" aria-hidden="true" />{s.statusLabel}</span>
      </Tabs.Tab>)}
    </Tabs.List>
    {stages.map(s => <Tabs.Panel key={s.stage} value={s.stage} className="timeline-panel">
      <AnimatePresence mode="wait" initial={false}>
        {s.stage === current.stage ? <motion.div key={s.stage} className={`stage-detail stage-detail-${s.status}`} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
          <div className="stage-detail-head"><span className="mono">{s.stage}</span><h3>{s.name}</h3><span className={`status status-${s.status}`}><span className="status-dot" aria-hidden="true" />{s.statusLabel}</span></div>
          <p className="stage-description">{s.description}</p>
          <p className="stage-features"><span className="technical-label">{modulesLabel}</span>{s.features.map(f => <span key={f} className="mono">{f}</span>)}</p>
        </motion.div> : null}
      </AnimatePresence>
    </Tabs.Panel>)}
  </Tabs.Root>;
}
