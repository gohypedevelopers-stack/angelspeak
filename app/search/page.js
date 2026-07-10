import Link from 'next/link';
import { getProducts } from '../lib/shopify';
import ShopClient from '../shop/ShopClient';

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = params.q ? params.q.toLowerCase() : '';
  
  const rawProducts = await getProducts();
  const allProducts = rawProducts.map(edge => edge.node);
  
  // Filter products by title or description
  const filteredProducts = allProducts.filter(product => {
    if (!query) return false;
    const titleMatch = product.title.toLowerCase().includes(query);
    const descMatch = product.descriptionHtml && product.descriptionHtml.toLowerCase().includes(query);
    return titleMatch || descMatch;
  });

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '8rem', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <div className="container" style={{ maxWidth: '1800px' }}>
        
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <h1 className="fs-3xl fw-black uppercase" style={{ marginBottom: '1rem', letterSpacing: '0.05em' }}>
            Search Results
          </h1>
          <p style={{ color: 'var(--gray-400)', fontSize: '1.2rem' }}>
            {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} for "{params.q}"
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          // We can reuse the ShopClient component by passing our filtered products as the 'normalRail'
          // and empty collections, so it just renders them in a grid.
          <ShopClient collections={[]} allProducts={filteredProducts} />
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--gray-400)' }}>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>No pieces found matching your search.</p>
            <Link href="/shop" className="quick-add-btn" style={{ 
              display: 'inline-block', padding: '1rem 2rem', borderRadius: '30px',
              border: '1px solid var(--foreground)', color: 'var(--foreground)',
              textTransform: 'uppercase', fontWeight: 'bold', textDecoration: 'none'
            }}>
              Explore All Drops
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
