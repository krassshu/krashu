'use client';
import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { NodeIcon } from './flow/node-icon';
import { NodeStatus } from './node-status';
import type { NodeKind } from '@/lib/graphs';

export type HeroModule = { id: string; label: string; note: string; status: string; icon: NodeKind; planned?: boolean };

/** Core with its modules. Lines draw once; hovering or focusing a module lights its link. */
export function HeroSystem({ core, modules, caption }: { core: { label: string; note: string }; modules: HeroModule[]; caption: string }) {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const w = 560, top = 56, bottom = 226, xs = modules.map((_, i) => 70 + i * ((w - 140) / (modules.length - 1)));
  const current = modules.find(m => m.id === active);
  return <div className="hero-system" role="group" aria-label={caption}>
    <div className="hero-core"><span className="technical-label">CORE</span><strong>{core.label}</strong><span>{core.note}</span></div>
    <svg className="hero-lines" viewBox={`0 0 ${w} 240`} aria-hidden="true" preserveAspectRatio="none">
      {xs.map((x, i) => {
        const m = modules[i];
        const d = `M ${w / 2} ${top} C ${w / 2} ${top + 70}, ${x} ${bottom - 80}, ${x} ${bottom}`;
        const lit = active === m.id;
        return <motion.path key={m.id} d={d} className={`hero-line${m.planned ? ' hero-line-planned' : ''}${lit ? ' hero-line-lit' : ''}`}
          initial={reduce ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.9, delay: 0.2 + i * 0.08, ease: 'easeOut' }} />;
      })}
    </svg>
    <ul className="hero-modules">
      {modules.map(m => <li key={m.id}>
        <button type="button" className={`hero-module${m.planned ? ' hero-module-planned' : ''}${active === m.id ? ' hero-module-active' : ''}`}
          onMouseEnter={() => setActive(m.id)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(m.id)} onBlur={() => setActive(null)} onClick={() => setActive(active === m.id ? null : m.id)}
          aria-pressed={active === m.id} aria-describedby="hero-module-note">
          <span className="hero-module-head"><span className="hero-module-icon" aria-hidden="true"><NodeIcon kind={m.icon} size={14} /></span><span className="hero-module-label">{m.label}</span></span>
          <NodeStatus status={m.planned ? 'planned' : 'lab'} className="hero-module-status">{m.status}</NodeStatus>
        </button>
      </li>)}
    </ul>
    <div className="hero-system-note" id="hero-module-note" aria-live="polite">
      <p className={current ? 'is-hidden' : undefined} aria-hidden={current ? true : undefined}>{caption}</p>
      {modules.map(m => <p key={m.id} className={active === m.id ? undefined : 'is-hidden'} aria-hidden={active === m.id ? undefined : true}>{m.note}</p>)}
    </div>
  </div>;
}
