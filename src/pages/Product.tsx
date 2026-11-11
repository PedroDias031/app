import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { findProduct, PIX_DISCOUNT, PRODUCTS, RING_SIZES, UNAVAILABLE_SIZES } from '../../shared/catalog';
import ProductCard from '../components/ProductCard';
import ProductIcon from '../components/ProductIcon';
import { installment, money } from '../lib/format';
import { useTitle } from '../lib/useTitle';
import { useCart } from '../store/cart';
import NotFound from './NotFound';

export default function Product() {
  const p = findProduct(useParams().id), { dispatch } = useCart();
  const [size, setSize] = useState('16'), [added, setAdded] = useState(false);
  useTitle(p?.name ?? 'Produto');
  if (!p) return <NotFound />;
  const ring = p.category === 'aneis', line = { id: p.id, size: ring ? size : 'Único', qty: 1 };
  return (
    <div className="w sec">
      <div className="pg">
        <div className="pic"><div style={{ width: '50%' }}><ProductIcon category={p.category} metal={p.metal} /></div></div>
        <div>
          <small>COLEÇÃO ESSÊNCIA</small><h1 style={{ fontSize: 36 }}>{p.name}</h1><small>{p.material}</small>
          <h2>{money(p.price)}</h2><small>ou {installment(p.price)}<br />{money(p.price * (1 - PIX_DISCOUNT))} no Pix · 5% de desconto</small>
          <p>Um ponto de luz para os seus dias. Linhas delicadas, para usar sempre.</p>
          {ring ? <><p>Tamanho: <b>{size}</b></p><div className="sizes" role="group" aria-label="Tamanho">{RING_SIZES.map((s) => <button key={s} type="button" className={String(s) === size ? 'on' : ''} disabled={UNAVAILABLE_SIZES.includes(String(s))} onClick={() => setSize(String(s))}>{s}</button>)}</div></> : <p>Tamanho único</p>}
          <button className="btn" onClick={() => { dispatch({ t: 'add', line }); setAdded(true); }}>Adicionar à sacola</button>
          <small role="status">{added && 'Adicionado à sua sacola.'}</small>
          <details><summary>Como cuidar da sua joia</summary>Evite perfumes, cloro e produtos abrasivos. Limpe com flanela seca e guarde separadamente.</details>
          <details><summary>Garantia e autenticidade</summary>Garantia de 1 ano contra defeitos de fabricação.</details>
          <details><summary>Trocas e devoluções</summary>Primeira troca grátis em até 30 dias. Devoluções em até 7 dias após o recebimento.</details>
        </div>
      </div>
      <h2 style={{ margin: '56px 0 24px' }}>Um brilho combina com outro</h2>
      <div className="grid">{PRODUCTS.filter((x) => x.id !== p.id).slice(0, 4).map((x) => <ProductCard key={x.id} p={x} />)}</div>
    </div>
  );
}
