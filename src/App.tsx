import { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { HomePage } from './features/home/HomePage';
import { ProductDetailPage } from './features/product-detail/ProductDetailPage';

type Route =
  | { name: 'home' }
  | { name: 'product'; id: string };

function parseHash(hash: string): Route {
  const match = hash.match(/^#\/product\/([^/?#]+)/);
  if (match) return { name: 'product', id: decodeURIComponent(match[1]!) };
  return { name: 'home' };
}

function App() {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));

  useEffect(() => {
    function handleHashChange() {
      setRoute(parseHash(window.location.hash));
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <Layout>
      {route.name === 'product' ? <ProductDetailPage /> : <HomePage />}
    </Layout>
  );
}

export default App;
