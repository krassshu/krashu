'use client';

import { useSyncExternalStore } from 'react';
import type { Locale } from '@/lib/i18n';
import { LogoMark } from './logo-mark';

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/** Visible only while the initial HTML is waiting for hydration. Never hides content. */
export function InitialLoader({ locale }: { locale: Locale }) {
  const ready = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (ready) return null;
  return <div className="initial-loader" role="status"><LogoMark size={28} /><span>{locale === 'pl' ? 'Wczytywanie…' : 'Loading…'}</span></div>;
}
