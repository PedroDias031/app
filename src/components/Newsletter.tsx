import { useState, type FormEvent } from 'react';
export default function Newsletter() {
  const [s, setS] = useState<'idle' | 'busy' | 'ok' | 'err'>('idle');
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get('email'));
    setS('busy');
    try { const r = await fetch('/api/newsletter', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email }) }); setS(r.ok ? 'ok' : 'err'); } catch { setS('err'); }
  }
  return (
    <section className="news"><div className="w">
      <div><small>FAÇA PARTE DO NOSSO UNIVERSO</small><h2>Um pouco de Marcelo Chavan na sua caixa de entrada.</h2><small>Novidades, inspirações e 10% de boas-vindas na primeira compra.</small></div>
      <div><form onSubmit={submit}><input name="email" type="email" required placeholder="Seu melhor e-mail" aria-label="E-mail" /><button className="btn" disabled={s === 'busy'}>Quero fazer parte</button></form>
        <small role="status">{s === 'ok' ? 'Obrigado! Você receberá nossas novidades.' : s === 'err' ? 'Não foi possível cadastrar agora. Confira o e-mail e tente de novo.' : 'Ao se cadastrar, você concorda com nossa Política de Privacidade.'}</small></div>
    </div></section>
  );
}
