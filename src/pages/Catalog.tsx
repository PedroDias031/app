import { useSearchParams } from 'react-router-dom';
import { CATEGORIES, PRODUCTS, type Category } from '../../shared/catalog';
import ProductCard from '../components/ProductCard';
import { money } from '../lib/format';
import { useTitle } from '../lib/useTitle';

function Check({ on, label, onChange }: { on: boolean; label: string; onChange: () => void }) {
  return <label><input type="checkbox" checked={on} onChange={onChange} /> {label}</label>;
}

export default function Catalog() {
  useTitle('Joias');
  const [sp, setSp] = useSearchParams();
  const cats = sp.getAll('cat'), mats = sp.getAll('mat'), max = Number(sp.get('max') ?? 1299), sort = sp.get('sort') ?? 'rel', q = (sp.get('q') ?? '').toLowerCase(), novo = sp.get('novo');
  const list = PRODUCTS.filter((p) => (!cats.length || cats.includes(p.category)) && (!mats.length || mats.includes(p.metal)) && p.price <= max && (!q || `${p.name} ${p.material}`.toLowerCase().includes(q)) && (!novo || p.tag === 'NOVO'));
  if (sort === 'asc') list.sort((a, b) => a.price - b.price); else if (sort === 'desc') list.sort((a, b) => b.price - a.price);
  const toggle = (k: string, v: string) => { const n = new URLSearchParams(sp), cur = n.getAll(k); n.delete(k); (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]).forEach((x) => n.append(k, x)); setSp(n, { replace: true }); };
  const set = (k: string, v: string) => { const n = new URLSearchParams(sp); n.set(k, v); setSp(n, { replace: true }); };
  return (
    <div className="w sec"><h1>Joias para todos os seus momentos</h1>
      <div className="shop" style={{ marginTop: 24 }}>
        <aside>
          <fieldset><legend>Categoria</legend>{(Object.keys(CATEGORIES) as Category[]).map((c) => <Check key={c} label={CATEGORIES[c]} on={cats.includes(c)} onChange={() => toggle('cat', c)} />)}</fieldset>
          <fieldset><legend>Material</legend><Check label="Prata 925" on={mats.includes('prata')} onChange={() => toggle('mat', 'prata')} /><Check label="Banho de ouro 18k" on={mats.includes('ouro')} onChange={() => toggle('mat', 'ouro')} /></fieldset>
          <fieldset><legend>Preço máximo</legend><input type="range" min={129} max={1299} value={max} style={{ width: '100%' }} onChange={(e) => set('max', e.target.value)} aria-label="Preço máximo" /><small>até {money(max)}</small></fieldset>
        </aside>
        <section>
          <div className="tools" style={{ marginTop: 0 }}><span role="status">{list.length} joias encontradas</span>
            <label>Ordenar por: <select value={sort} onChange={(e) => set('sort', e.target.value)}><option value="rel">Mais relevantes</option><option value="asc">Menor preço</option><option value="desc">Maior preço</option></select></label></div>
          {list.length ? <div className="grid">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div> : <p>Nenhuma joia encontrada. Tente remover algum filtro.</p>}
        </section>
      </div></div>
  );
}
