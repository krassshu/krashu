import { t, type Locale } from './i18n';
import type { Chain } from '@/components/object-explorer';
import type { Stage } from '@/components/roadmap-timeline';
import type { FlowStep } from '@/components/document-flow';
import { milestones, statusLabel } from './content';

/** Sample relation chains. Object types come from the project; names, vehicle and dates are illustrative. */
export function objectChains(locale: Locale): Chain[] {
  const T = (s: string) => t(s, locale);
  return [
    { id: 'vehicle', tab: T('Pojazd'), edges: ['owns', 'has document', 'expires'], nodes: [
      { type: T('OSOBA'), value: 'Oskar' }, { type: T('POJAZD'), value: 'Toyota Corolla' }, { type: T('DOKUMENT'), value: T('Polisa OC') }, { type: T('TERMIN'), value: T('12.04.2027'), date: '2027-04-12', note: T('przypomnienie 30 dni wcześniej'), accent: true } ] },
    { id: 'person', tab: T('Osoba'), edges: ['member of', 'has document', 'permissions'], nodes: [
      { type: T('OSOBA'), value: 'Oskar' }, { type: T('DOM'), value: T('Mieszkanie') }, { type: T('DOKUMENT'), value: T('Dokument mieszkania') }, { type: T('UPRAWNIENIA'), value: T('wspólny dla domowników'), note: T('prywatny dokument domownika pozostaje prywatny'), accent: true } ] },
    { id: 'home', tab: T('Dom'), edges: ['contains', 'contains', 'has document'], nodes: [
      { type: T('DOM'), value: T('Mieszkanie') }, { type: T('POMIESZCZENIE'), value: T('Salon') }, { type: T('URZĄDZENIE'), value: 'TV' }, { type: T('DOKUMENT'), value: T('Faktura'), note: T('zakup, gwarancja, urządzenie, pomieszczenie'), accent: true } ] },
    { id: 'device', tab: T('Urządzenie'), edges: ['has document', 'relates to', 'reminder'], nodes: [
      { type: T('URZĄDZENIE'), value: 'TV' }, { type: T('DOKUMENT'), value: T('Faktura') }, { type: T('RELACJE'), value: T('dom · pomieszczenie · zakup · gwarancja') }, { type: T('TERMIN'), value: T('koniec gwarancji'), note: T('termin z dokumentu, po poprawnym opisaniu'), accent: true } ] },
    { id: 'pet', tab: T('Zwierzę'), edges: ['has document', 'next'], nodes: [
      { type: T('ZWIERZĘ'), value: T('Pies') }, { type: T('DOKUMENT'), value: T('Książeczka zdrowia') }, { type: T('TERMIN'), value: T('szczepienie'), note: T('przypomnienie przed terminem'), accent: true } ] },
  ];
}

export function roadmapStages(locale: Locale): Stage[] {
  return milestones.map(m => ({ stage: m.stage, name: m.name, status: m.status as Stage['status'], statusLabel: t(statusLabel[m.status], locale), features: m.features.map(f => t(f, locale)), description: t(m.description, locale) }));
}

export function documentSteps(locale: Locale): FlowStep[] {
  const T = (s: string) => t(s, locale);
  return [
    { n: '01', label: 'PDF', value: 'scan_0032.pdf', mono: true, kind: 'service' },
    { n: '02', label: T('OCR'), value: 'Paperless-ngx', kind: 'service' },
    { n: '03', label: T('GRANICA'), value: 'DocumentProvider', kind: 'provider' },
    { n: '04', label: T('KONTEKST OBIEKTU'), value: 'Toyota Corolla', kind: 'core' },
    { n: '05', label: T('METADANE'), value: `${T('Polisa OC')} · ${T('12.04.2027')}`, kind: 'db' },
    { n: '06', label: T('PRZYPOMNIENIE'), value: T('30 dni wcześniej'), kind: 'queue' },
  ];
}
