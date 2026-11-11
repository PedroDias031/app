import { Link } from 'react-router-dom';
import { useTitle } from '../lib/useTitle';
export default function NotFound() {
  useTitle('Página não encontrada');
  return <div className="w sec"><h1>Página não encontrada</h1><p style={{ margin: '16px 0 24px' }}>O endereço não existe ou a joia saiu do catálogo.</p><Link className="btn" to="/joias">Ver todas as joias</Link></div>;
}
