import { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { HomePage } from './features/home/HomePage';
import { ProductDetailPage } from './features/product-detail/ProductDetailPage';
import { SignUpPage } from './features/sign-up/SignUpPage';

type Route =
  | { name: 'home' }
  | { name: 'product'; id: string }
  | { name: 'signup' };

function parseHash(hash: string): Route {
  const productMatch = hash.match(/^#\/product\/([^/?#]+)/);
  if (productMatch) return { name: 'product', id: decodeURIComponent(productMatch[1]!) };
  if (hash === '#signup' || hash === '#/signup') return { name: 'signup' };
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
      {route.name === 'product' ? (
        <ProductDetailPage />
      ) : route.name === 'signup' ? (
        <SignUpPage />
      ) : (
        <HomePage />
      )}
    </Layout>
  );
}

export default App;
