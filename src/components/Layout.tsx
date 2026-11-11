import { useEffect, type FormEvent } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../store/cart';
import Newsletter from './Newsletter';

const NAV: [string, string][] = [['Novidades', '/joias?novo=1'], ['Joias', '/joias'], ['Anéis', '/joias?cat=aneis'], ['Brincos', '/joias?cat=brincos'], ['Colares', '/joias?cat=colares'], ['Pulseiras', '/joias?cat=pulseiras'], ['Presentes', '/joias?max=299'], ['Universo Chavan', '/#universo']];

export default function Layout() {
  const { count } = useCart(), go = useNavigate(), { pathname, hash } = useLocation();
  useEffect(() => { const el = hash && document.getElementById(hash.slice(1)); if (el) el.scrollIntoView(); else window.scrollTo(0, 0); }, [pathname, hash]);
  const search = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); go(`/joias?q=${encodeURIComponent(String(new FormData(e.currentTarget).get('q')))}`); };
  return (<>
    <header>
      <div className="top">Frete grátis a partir de R$ 599 &nbsp;·&nbsp; Até 6x sem juros para brilhar no seu tempo</div>
      <div className="bar"><form onSubmit={search} role="search"><input name="q" placeholder="O que faz você brilhar?" aria-label="Buscar" /></form>
        <Link className="logo" to="/"><img src="/logo.png" alt="Marcelo Chavan" /></Link>
        <Link className="r" to="/sacola">Sacola ({count})</Link></div>
      <nav aria-label="Principal">{NAV.map(([t, u]) => <Link key={t} to={u}>{t}</Link>)}</nav>
    </header>
    <main><Outlet /></main>
    <Newsletter />
    <footer><div className="w">
      <div><img src="/logo.png" alt="" style={{ height: 52, mixBlendMode: 'multiply' }} /><p>Joias para iluminar o que é seu. Design contemporâneo, histórias que ficam.</p></div>
      <div><h4>Universo Chavan</h4><a href="#">Nossa história</a><a href="#">Materiais e cuidados</a><a href="#">Nossas lojas</a></div>
      <div><h4>Podemos ajudar?</h4><a href="#">Acompanhe seu pedido</a><a href="#">Trocas e devoluções</a><a href="#">Guia de medidas</a></div>
      <div><h4>Fale com a gente</h4><p>Ildefonso de las Muñecas 136, T4000 San Miguel de Tucumán, Tucumán, Argentina</p><a href="mailto:MarceloChavan@gmail.com">MarceloChavan@gmail.com</a><p>Seg. a sex., das 9h às 18h</p></div>
    </div><div className="copy">© 2026 Marcelo Chavan. Todos os direitos reservados.</div></footer>
  </>);
}
