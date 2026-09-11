'use client';
import { createContext, useContext } from 'react';
export type Highlight = { active: string | null; related: Set<string>; set: (id: string | null) => void };
export const HighlightContext = createContext<Highlight>({ active: null, related: new Set(), set: () => {} });
export const useHighlight = () => useContext(HighlightContext);
