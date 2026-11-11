import { useState } from 'react';
import { Link } from 'react-router-dom';
import { COUPONS, FREE_SHIPPING, PRODUCTS, quote } from '../../shared/catalog';
import ProductCard from '../components/ProductCard';
import ProductIcon from '../components/ProductIcon';
import { installment, money } from '../lib/format';
import { useTitle } from '../lib/useTitle';
import { useCart } from '../store/cart';

export default function Cart() {
  useTitle('Minha sacola');
  const { lines, count, dispatch } = useCart();
  const [code, setCode] = useState(''), [coupon, setCoupon] = useState<string>(), [couponMsg, setCouponMsg] = useState('');
  const [gift, setGift] = useState(true), [text, setText] = useState('Para iluminar os seus dias. Com carinho!');
  const [busy, setBusy] = useState(false), [err, setErr] = useState('');
  const q = quote(lines, coupon);
  const apply = () => { const c = code.trim().toUpperCase(), ok = c in COUPONS; setCoupon(ok ? c : undefined); setCouponMsg(ok ? 'Cupom aplicado.' : 'Cupom inválido.'); };
  async function checkout() {
    setBusy(true); setErr('');
    try {
      const r = await fetch('/api/orders', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ lines, coupon, gift: gift ? text : '' }) });
      if (!r.ok) throw new Error();
      const { whatsapp } = await r.json(); dispatch({ t: 'clear' }); window.location.href = whatsapp;
    } catch { setErr('Não foi possível finalizar agora. Tente novamente em instantes.'); } finally { setBusy(false); }
  }
  return (
    <div className="w sec"><h1>Minha sacola <small style={{ display: 'inline' }}>({count} joias)</small></h1>
      <div className="cartw" style={{ marginTop: 24 }}>
        <div>
          {q.subtotal > 0 && <div className="band" style={{ padding: '12px 16px' }}>{q.shipping === 0 ? 'Seu pedido ganhou frete grátis!' : `Faltam ${money(FREE_SHIPPING - q.subtotal)} para o frete grátis.`}</div>}
          {q.items.length ? q.items.map((i, k) => (
            <div className="item" key={`${i.id}-${i.size}`}>
              <div className="img"><ProductIcon category={i.product.category} metal={i.product.metal} /></div>
              <div><h3>{i.product.name}</h3><small>{i.product.material}</small><small>Tamanho: {i.size}</small>
                <span className="qty"><button aria-label="Diminuir" onClick={() => dispatch({ t: 'step', i: k, d: -1 })}>−</button> {i.qty} <button aria-label="Aumentar" onClick={() => dispatch({ t: 'step', i: k, d: 1 })}>+</button></span></div>
              <div>{money(i.total)}<br /><button className="x" aria-label={`Remover ${i.product.name}`} onClick={() => dispatch({ t: 'rm', i: k })}>✕</button></div>
            </div>)) : <p style={{ padding: '24px 0' }}>Sua sacola está vazia. <Link to="/joias"><u>Descubra nossas joias</u></Link>.</p>}
          {q.items.length > 0 && <><p style={{ marginTop: 20 }}><label><input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} /> É um presente? Embalagem especial grátis, com cartão.</label></p>
            {gift && <><textarea rows={3} maxLength={200} value={text} onChange={(e) => setText(e.target.value)} aria-label="Mensagem do cartão" /><small>{text.length} / 200 caracteres</small></>}</>}
        </div>
        <aside className="sum"><h2>Resumo do pedido</h2>
          <div><span>Subtotal</span><span>{money(q.subtotal)}</span></div>
          {q.discount > 0 && <div><span>Cupom</span><span>−{money(q.discount)}</span></div>}
          <div><span>Frete</span><span>{q.shipping ? money(q.shipping) : 'Grátis'}</span></div>
          <label>Cupom<div><input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Digite o código" style={{ width: 'calc(100% - 90px)' }} /><button type="button" className="btn o" style={{ marginLeft: 8 }} onClick={apply}>Aplicar</button></div></label>
          <small role="status">{couponMsg}</small>
          <div style={{ fontSize: 20, marginTop: 12 }}><span>Total</span><b>{money(q.total)}</b></div>
          <small>ou {installment(q.total)}</small><small>{money(q.pix)} no Pix</small>
          <button className="btn" style={{ width: '100%' }} disabled={!q.items.length || busy} onClick={checkout}>{busy ? 'Enviando…' : 'Finalizar pelo WhatsApp'}</button>
          <small role="alert" style={{ color: '#a33' }}>{err}</small>
        </aside></div>
      <h2 style={{ margin: '56px 0 24px' }}>Para completar a sua história</h2>
      <div className="grid">{PRODUCTS.filter((p) => !lines.some((l) => l.id === p.id)).slice(0, 4).map((p) => <ProductCard key={p.id} p={p} />)}</div>
    </div>
  );
}
