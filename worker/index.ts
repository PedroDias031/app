import { quote, type CartLine } from '../shared/catalog';

interface Env { ASSETS: Fetcher; WHATSAPP_NUMBER: string; ORDERS?: KVNamespace; NEWSLETTER?: KVNamespace }
const json = (b: unknown, status = 200) => new Response(JSON.stringify(b), { status, headers: { 'content-type': 'application/json' } });

async function createOrder(req: Request, env: Env) {
  let body: { lines?: CartLine[]; coupon?: string; gift?: string };
  try { body = await req.json(); } catch { return json({ error: 'JSON inválido' }, 400); }
  const lines = (body.lines ?? []).filter((l) => l && typeof l.id === 'string' && Number.isInteger(l.qty) && l.qty > 0 && l.qty <= 20).slice(0, 30);
  const q = quote(lines, body.coupon); // preços sempre recalculados no servidor
  if (!q.items.length) return json({ error: 'Sacola vazia' }, 422);
  const id = crypto.randomUUID().slice(0, 8).toUpperCase();
  const gift = String(body.gift ?? '').slice(0, 200);
  const order = { id, createdAt: new Date().toISOString(), items: q.items.map((i) => ({ id: i.id, size: String(i.size).slice(0, 20), qty: i.qty })), total: q.total, gift };
  await env.ORDERS?.put(`order:${id}`, JSON.stringify(order), { expirationTtl: 60 * 60 * 24 * 365 });
  const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const text = `Olá! Pedido #${id}\n${q.items.map((i) => `${i.qty}x ${i.product.name} (tam. ${i.size})`).join('\n')}\nTotal: ${brl(q.total)}${gift ? `\nCartão: ${gift}` : ''}`;
  return json({ id, total: q.total, whatsapp: `https://wa.me/${env.WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}` });
}

async function subscribe(req: Request, env: Env) {
  const { email } = (await req.json().catch(() => ({}))) as { email?: string };
  const e = String(email ?? '').trim().toLowerCase();
  if (e.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return json({ error: 'E-mail inválido' }, 422);
  await env.NEWSLETTER?.put(`email:${e}`, new Date().toISOString());
  return json({ ok: true });
}

export default {
  async fetch(req, env) {
    const { pathname } = new URL(req.url);
    if (req.method === 'POST' && pathname === '/api/orders') return createOrder(req, env);
    if (req.method === 'POST' && pathname === '/api/newsletter') return subscribe(req, env);
    if (pathname.startsWith('/api/')) return json({ error: 'Não encontrado' }, 404);
    return env.ASSETS.fetch(req); // site (SPA) servido pelos assets
  },
} satisfies ExportedHandler<Env>;
