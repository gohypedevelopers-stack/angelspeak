'use client';

import Link from 'next/link';
import { products } from '../../data/products';
import { useCart } from '../context/CartContext';

export default function ProductCarousel() {
  const { addToCart } = useCart();

  return (
    <section style={{ padding: '4rem 0 4rem', backgroundColor: 'var(--background)' }}>
      <div className="container" style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <h2 className="fs-3xl fw-black uppercase">Latest Drops</h2>
        <Link href="/shop" style={{ textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: '700', letterSpacing: '0.05em', borderBottom: '1px solid var(--foreground)', paddingBottom: '0.2rem' }}>
          VIEW ALL PIECES
        </Link>
      </div>
      
      <div className="hide-scrollbar" style={{ display: 'flex', gap: '2rem', overflowX: 'auto', padding: '0 2rem 4rem', scrollSnapType: 'x mandatory' }}>
        {products.map((product) => (
          <div key={product.id} className="group" style={{ minWidth: '350px', width: '350px', flexShrink: 0, scrollSnapAlign: 'start' }}>
            <div style={{ aspectRatio: '3/4', backgroundColor: 'var(--gray-900)', marginBottom: '1.5rem', overflow: 'hidden', position: 'relative' }}>
              <Link href={`/shop/${product.slug}`}>
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="hover-scale"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) brightness(0.9)', display: 'block' }} 
                />
              </Link>
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', opacity: 0, transition: 'opacity 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }} className="overlay">
                <button 
                  className="btn" 
                  style={{ padding: '0.8rem 1.5rem', pointerEvents: 'auto', cursor: 'pointer' }}
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product);
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="fw-bold uppercase fs-base" style={{ letterSpacing: '0.05em' }}>{product.title}</span>
              <span className="fs-sm" style={{ color: 'var(--gray-400)' }}>{product.price}</span>
            </div>
            <p className="fs-xs" style={{ color: 'var(--gray-400)', marginTop: '0.5rem' }}>{product.chapter}</p>
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .group:hover .overlay { opacity: 1 !important; }
      `}} />
    </section>
  );
}
