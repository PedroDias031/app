import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
const Catalog = lazy(() => import('./pages/Catalog')), Product = lazy(() => import('./pages/Product')), Cart = lazy(() => import('./pages/Cart')), NotFound = lazy(() => import('./pages/NotFound'));
export default function App() {
  return <Suspense fallback={<div className="w sec" aria-busy="true">Carregando…</div>}><Routes><Route element={<Layout />}>
    <Route index element={<Home />} /><Route path="joias" element={<Catalog />} /><Route path="produto/:id" element={<Product />} /><Route path="sacola" element={<Cart />} /><Route path="*" element={<NotFound />} />
  </Route></Routes></Suspense>;
}
