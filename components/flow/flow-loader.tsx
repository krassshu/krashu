'use client';
import dynamic from 'next/dynamic';
import { useSyncExternalStore } from 'react';
import type { GraphDef } from '@/lib/graphs';
import type { FlowLabels } from './system-flow';

const SystemFlow = dynamic(() => import('./system-flow').then(m => m.SystemFlow), { ssr: false, loading: () => <div className="flow flow-loading" aria-hidden="true" /> });

const query = '(min-width: 1024px)';
const subscribe = (cb: () => void) => { const m = window.matchMedia(query); m.addEventListener('change', cb); return () => m.removeEventListener('change', cb); };
const getSnapshot = () => window.matchMedia(query).matches;
const getServerSnapshot = () => false;

/** Mounts the interactive diagram only where it has room. Narrow screens keep the vertical HTML tree. */
export function FlowLoader({ graph, labels, height }: { graph: GraphDef; labels: FlowLabels; height?: number }) {
  const desktop = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (!desktop) return null;
  return <SystemFlow graph={graph} labels={labels} height={height} />;
}
