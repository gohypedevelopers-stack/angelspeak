'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import ProductCard from './ProductCard';

export default function ProductGrid({ products = [] }) {
  const { addToCart } = useCart();
  const gridProducts = products;

  return (
    <section style={{ padding: '6rem 0', backgroundColor: 'var(--background)' }}>
      <div className="container" style={{ marginBottom: '4rem', maxWidth: '1800px' }}>
        <h2 className="fs-3xl fw-black uppercase text-center" style={{ marginBottom: '3rem' }}>All Pieces</h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '2rem 1.5rem' 
        }}>
          {gridProducts.map((product) => {
            const variantId = product.variants?.edges?.[0]?.node?.id || product.id;
            const price = parseFloat(product.priceRange?.minVariantPrice?.amount || 0).toLocaleString('en-IN');
            return <ProductCard key={product.id} product={product} />
          })}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .add-btn:hover { background-color: var(--foreground) !important; color: var(--background) !important; border-color: var(--foreground) !important; }
        
        @media (min-width: 1024px) {
          /* Force exactly 4 items per row on desktop for this specific grid */
          div[style*="grid-template-columns"] {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}} />
    </section>
  );
}
