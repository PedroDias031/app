import { Link } from 'react-router-dom';
import { CATEGORIES, PRODUCTS, type Category } from '../../shared/catalog';
import ProductCard from '../components/ProductCard';
import ProductIcon from '../components/ProductIcon';
import { useTitle } from '../lib/useTitle';
export default function Home() {
  useTitle('Joias para todos os seus momentos');
  return (<>
    <section className="hero"><div className="w">
      <div><h1>O extraordinário no seu dia a dia.</h1><p>Formas delicadas, significados únicos. Joias que acompanham você em todos os seus momentos.</p><Link className="btn" to="/joias">Conheça a coleção Essência</Link></div>
      <div style={{ width: 'min(320px,70%)', justifySelf: 'center' }}><ProductIcon category="aneis" metal="ouro" /></div>
    </div></section>
    <section className="band"><div className="w"><div><b>Frete grátis</b>Em compras acima de R$ 599</div><div><b>Até 6x sem juros</b>Seu tempo, seu jeito</div><div><b>Primeira troca grátis</b>Até 30 dias para decidir</div></div></section>
    <section className="sec w"><h2>Encontre o seu próximo essencial</h2>
      <div className="cats">{(Object.keys(CATEGORIES) as Category[]).map((c) => <Link key={c} to={`/joias?cat=${c}`}><div><ProductIcon category={c} metal="ouro" /></div>{CATEGORIES[c]}</Link>)}</div></section>
    <section className="sec w" style={{ paddingTop: 0 }}><h2 style={{ marginBottom: 24 }}>Pequenos detalhes, grandes favoritos</h2><div className="grid">{PRODUCTS.slice(0, 4).map((p) => <ProductCard key={p.id} p={p} />)}</div></section>
    <section className="sec band"><div className="w" style={{ display: 'block' }}><h2>O carinho ganha forma.</h2><p style={{ margin: '12px 0 20px', maxWidth: '50ch' }}>Celebre encontros, conquistas e histórias, com embalagem e mensagem especiais por nossa conta.</p><Link className="btn" to="/joias?max=299">Encontre o presente ideal</Link></div></section>
    <section className="sec w" id="universo"><h2>Feitas para acompanhar histórias.</h2><div className="band" style={{ marginTop: 24 }}><div className="w"><div><b>Materiais selecionados</b>Joias de Prata 925 e banho de ouro 18k.</div><div><b>Cuidado em cada detalhe</b>Acabamentos que valorizam o simples.</div><div><b>Com você por mais tempo</b>Garantia de 1 ano e suporte próximo.</div></div></div></section>
  </>);
}
