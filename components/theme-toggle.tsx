'use client';
import { useSyncExternalStore } from 'react';

type Pref = 'light' | 'system' | 'dark';
const KEY = 'hic-theme';
const listeners = new Set<() => void>();
const read = (): Pref => { try { const v = localStorage.getItem(KEY); return v === 'light' || v === 'dark' ? v : 'system'; } catch { return 'system'; } };
const subscribe = (cb: () => void) => { listeners.add(cb); return () => { listeners.delete(cb); }; };

export function applyTheme(pref: Pref) {
  const dark = pref === 'dark' || (pref === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
}

/** Light / system / dark. The inline script in the layout applies the stored choice before first paint. */
export function ThemeToggle({ labels }: { labels: Record<Pref, string> & { group: string } }) {
  const pref = useSyncExternalStore(subscribe, read, () => 'system' as Pref);
  const choose = (next: Pref) => {
    try { if (next === 'system') localStorage.removeItem(KEY); else localStorage.setItem(KEY, next); } catch {}
    applyTheme(next);
    listeners.forEach(l => l());
  };
  const options: [Pref, string][] = [['light', 'M12 4v2m0 12v2M4 12h2m12 0h2M6.3 6.3l1.4 1.4m8.6 8.6 1.4 1.4m0-11.4-1.4 1.4M7.7 16.3l-1.4 1.4M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z'], ['system', 'M4 5h16v11H4zM9 20h6M12 16v4'], ['dark', 'M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z']];
  return <div className="theme-toggle" role="group" aria-label={labels.group}>
    {options.map(([value, d]) => <button key={value} type="button" aria-pressed={pref === value} aria-label={labels[value]} title={labels[value]} onClick={() => choose(value)}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
    </button>)}
  </div>;
}
