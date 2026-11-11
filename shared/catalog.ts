// Fonte única de verdade: usada pelo front-end e pelas Functions (o servidor recalcula preços).
export type Category = 'aneis' | 'brincos' | 'colares' | 'pulseiras' | 'pingentes';
export type Metal = 'prata' | 'ouro';
export interface Product { id: string; name: string; category: Category; material: string; metal: Metal; price: number; tag?: 'MAIS AMADO' | 'NOVO' }
export interface CartLine { id: string; size: string; qty: number }

export const CATEGORIES: Record<Category, string> = { aneis: 'Anéis', brincos: 'Brincos', colares: 'Colares', pulseiras: 'Pulseiras', pingentes: 'Pingentes' };
export const FREE_SHIPPING = 599, SHIPPING = 29.9, PIX_DISCOUNT = 0.05, INSTALLMENTS = 6;
export const COUPONS: Record<string, number> = { BEMVINDO10: 0.1 };
export const RING_SIZES = [12, 14, 16, 18, 20, 22], UNAVAILABLE_SIZES = ['22'];

export const PRODUCTS: Product[] = [
  { id: 'anel-halo', name: 'Anel Halo', category: 'aneis', material: 'Prata 925 · Zircônia', metal: 'prata', price: 389, tag: 'MAIS AMADO' },
  { id: 'brinco-gota-de-luz', name: 'Brinco Gota de Luz', category: 'brincos', material: 'Banho de ouro 18k · Pérola', metal: 'ouro', price: 269, tag: 'NOVO' },
  { id: 'colar-elo-essencial', name: 'Colar Elo Essencial', category: 'colares', material: 'Banho de ouro 18k', metal: 'ouro', price: 329 },
  { id: 'pulseira-orbita', name: 'Pulseira Órbita', category: 'pulseiras', material: 'Banho de ouro 18k', metal: 'ouro', price: 459 },
  { id: 'pingente-afeto', name: 'Pingente Afeto', category: 'pingentes', material: 'Prata 925 · Esmalte rosé', metal: 'prata', price: 179 },
  { id: 'anel-ponto-de-luz', name: 'Anel Ponto de Luz', category: 'aneis', material: 'Banho de ouro 18k · Zircônia', metal: 'ouro', price: 299, tag: 'NOVO' },
  { id: 'argola-serena', name: 'Argola Serena', category: 'brincos', material: 'Prata 925 · Pérola', metal: 'prata', price: 249 },
  { id: 'colar-lua', name: 'Colar Lua', category: 'colares', material: 'Prata 925 · Zircônia', metal: 'prata', price: 359 },
  { id: 'bracelete-essencia', name: 'Bracelete Essência', category: 'pulseiras', material: 'Prata 925', metal: 'prata', price: 429 },
];
export const findProduct = (id?: string) => PRODUCTS.find((p) => p.id === id);

export function quote(lines: CartLine[], coupon?: string) {
  const items = lines.flatMap((l) => { const product = findProduct(l.id); return product ? [{ ...l, product, total: product.price * l.qty }] : []; });
  const subtotal = items.reduce((a, i) => a + i.total, 0);
  const discount = subtotal * (COUPONS[coupon ?? ''] ?? 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING ? 0 : SHIPPING;
  const total = subtotal - discount + shipping;
  return { items, subtotal, discount, shipping, total, pix: total * (1 - PIX_DISCOUNT) };
}
