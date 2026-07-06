'use client';

import Link from 'next/link';
import { products } from '../../data/products';
import { useCart } from '../context/CartContext';

import Image from 'next/image';

export default function ProductGrid() {
  const { addToCart } = useCart();
  
  // Take all products for this section
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
          {gridProducts.map((product) => (
            <div key={product.id} className="group" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ aspectRatio: '4/5', backgroundColor: '#F0F0F0', borderRadius: '12px', marginBottom: '1rem', overflow: 'hidden', position: 'relative', width: '100%' }}>
                <Link href={`/shop/${product.slug}`} className="no-hover" style={{ display: 'block', width: '100%', height: '100%' }}>
                  <Image 
                    src={product.image} 
                    alt={product.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="primary-img"
                    style={{ objectFit: 'cover', transition: 'opacity 0.4s ease' }} 
                  />
                  {product.hoverImage && (
                    <Image 
                      src={product.hoverImage} 
                      alt={`${product.title} Alternate`} 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="hover-img"
                      style={{ objectFit: 'cover', opacity: 0, transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }} 
                    />
                  )}
                </Link>
                
                {/* Bookmark Icon */}
                <button style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--gray-900)', cursor: 'pointer', opacity: 0.7 }} className="hover-scale">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                </button>
                
                {/* Carousel Dots Indicator */}
                <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '4px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--gray-900)', opacity: 0.8 }}></div>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--gray-900)', opacity: 0.3 }}></div>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--gray-900)', opacity: 0.3 }}></div>
                </div>
              </div>
              
              {/* Minimalist Details Section */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '0 0.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <Link href={`/shop/${product.slug}`} className="fw-bold uppercase fs-sm" style={{ letterSpacing: '0.05em' }}>{product.title}</Link>
                  <span className="fs-xs" style={{ color: 'var(--gray-400)' }}>{product.price}</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product);
                  }}
                  style={{ 
                    width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--gray-600)', 
                    background: 'transparent', color: 'var(--foreground)', display: 'flex', alignItems: 'center', 
                    justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s ease', flexShrink: 0
                  }} 
                  className="add-btn hover-scale"
                  title="Quick Add to Cart"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
            </div>
          ))}
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
