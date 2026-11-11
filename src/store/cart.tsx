import { createContext, useContext, useEffect, useMemo, useReducer, type Dispatch, type ReactNode } from 'react';
import type { CartLine } from '../../shared/catalog';

type Action = { t: 'add'; line: CartLine } | { t: 'step'; i: number; d: 1 | -1 } | { t: 'rm'; i: number } | { t: 'clear' };
const KEY = 'chavan:cart';
const load = (): CartLine[] => { try { return JSON.parse(localStorage.getItem(KEY) ?? '[]'); } catch { return []; } };

function reducer(s: CartLine[], a: Action): CartLine[] {
  switch (a.t) {
    case 'add': { const i = s.findIndex((l) => l.id === a.line.id && l.size === a.line.size); return i < 0 ? [...s, a.line] : s.map((l, k) => (k === i ? { ...l, qty: Math.min(20, l.qty + a.line.qty) } : l)); }
    case 'step': return s.map((l, k) => (k === a.i ? { ...l, qty: l.qty + a.d } : l)).filter((l) => l.qty > 0 && l.qty <= 20);
    case 'rm': return s.filter((_, k) => k !== a.i);
    case 'clear': return [];
  }
}
const Ctx = createContext<{ lines: CartLine[]; count: number; dispatch: Dispatch<Action> } | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, [], load);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch { /* modo privado */ } }, [lines]);
  const value = useMemo(() => ({ lines, dispatch, count: lines.reduce((a, l) => a + l.qty, 0) }), [lines]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export const useCart = () => { const c = useContext(Ctx); if (!c) throw new Error('useCart fora do CartProvider'); return c; };
