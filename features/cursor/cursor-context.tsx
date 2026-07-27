'use client';

import React, { createContext, useContext, useState } from 'react';

export type CursorVariant = 'default' | 'button' | 'link' | 'window' | 'drag' | 'text' | 'hidden';

interface CursorContextType {
  cursorVariant: CursorVariant;
  cursorText: string;
  setCursorState: (variant: CursorVariant, text?: string) => void;
  resetCursorState: () => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorVariant: 'default',
  cursorText: '',
  setCursorState: () => {},
  resetCursorState: () => {},
});

export const useCursor = () => useContext(CursorContext);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [cursorText, setCursorText] = useState<string>('');

  const setCursorState = (variant: CursorVariant, text: string = '') => {
    setCursorVariant(variant);
    setCursorText(text);
  };

  const resetCursorState = () => {
    setCursorVariant('default');
    setCursorText('');
  };

  return (
    <CursorContext.Provider value={{ cursorVariant, cursorText, setCursorState, resetCursorState }}>
      {children}
    </CursorContext.Provider>
  );
}
