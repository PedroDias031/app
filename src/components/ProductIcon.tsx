import type { Category, Metal } from '../../shared/catalog';
const PATHS: Record<Category, string> = {
  aneis: 'M30 68a20 20 0 1 0 40 0a20 20 0 1 0-40 0M40 40l-6-9h32l-6 9-10 14z',
  brincos: 'M29 36a9 14 0 1 0 18 0a9 14 0 1 0-18 0M53 36a9 14 0 1 0 18 0a9 14 0 1 0-18 0M32 62a6 6 0 1 0 12 0a6 6 0 1 0-12 0M56 62a6 6 0 1 0 12 0a6 6 0 1 0-12 0',
  colares: 'M22 20Q50 90 78 20M45 66a5 5 0 1 0 10 0a5 5 0 1 0-10 0',
  pulseiras: 'M18 50a32 22 0 1 0 64 0a32 22 0 1 0-64 0',
  pingentes: 'M44 22a6 6 0 1 0 12 0a6 6 0 1 0-12 0M50 82C20 58 28 36 50 52 72 36 80 58 50 82z',
};
export default function ProductIcon({ category, metal }: { category: Category; metal: Metal }) {
  return <svg viewBox="0 0 100 100" fill="none" stroke={metal === 'ouro' ? '#b39b6e' : '#a8aaa4'} strokeWidth="1.4" aria-hidden="true"><path d={PATHS[category]} /></svg>;
}
