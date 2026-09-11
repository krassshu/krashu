import type { ReactNode } from 'react';

export type NodeStatusKind = 'active' | 'lab' | 'planned' | 'future' | 'concept' | 'passive';

/**
 * Status inside diagrams and panels: a dot plus a short uppercase label.
 * Deliberately light so it reads as metadata, never as a button. Colour only reinforces the text.
 */
export function NodeStatus({ status, children, className }: { status: NodeStatusKind; children: ReactNode; className?: string }) {
  return <span className={`nstatus nstatus-${status}${className ? ` ${className}` : ''}`}><span className="nstatus-dot" aria-hidden="true" />{children}</span>;
}
