'use client';
import type { ReactNode } from 'react';
import { Tabs } from '@base-ui/react/tabs';

/** Base UI supplies roles, focus and keyboard handling; the look is ours. */
export function ModeTabs({ tabs, label, orientation = 'horizontal', className }: { tabs: { id: string; label: ReactNode; content: ReactNode }[]; label: string; orientation?: 'horizontal' | 'vertical'; className?: string }) {
  return <Tabs.Root defaultValue={tabs[0].id} orientation={orientation} className={`tabs${className ? ` ${className}` : ''}`}>
    <Tabs.List className="tabs-list" aria-label={label}>
      {tabs.map(tab => <Tabs.Tab key={tab.id} value={tab.id} className="tab">{tab.label}</Tabs.Tab>)}
      <Tabs.Indicator className="tab-indicator" />
    </Tabs.List>
    {tabs.map(tab => <Tabs.Panel key={tab.id} value={tab.id} className="tab-panel">{tab.content}</Tabs.Panel>)}
  </Tabs.Root>;
}
