import { Link } from 'react-router-dom';
import type { Product } from '../../shared/catalog';
import { installment, money } from '../lib/format';
import ProductIcon from './ProductIcon';
export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link className="card" to={`/produto/${p.id}`}>
      <div className="img">{p.tag && <span className="tag">{p.tag}</span>}<ProductIcon category={p.category} metal={p.metal} /></div>
      <h3>{p.name}</h3><small>{p.material}</small><b>{money(p.price)}</b><small>{installment(p.price)}</small>
    </Link>
  );
}
