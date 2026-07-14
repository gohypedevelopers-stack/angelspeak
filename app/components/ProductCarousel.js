'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import ProductCard from './ProductCard';

export default function ProductCarousel({ products = [] }) {
  const { addToCart } = useCart();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400; // width of card + gap
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section style={{ padding: '6rem 0', backgroundColor: 'var(--background)' }}>
      <div className="container" style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', maxWidth: '1800px' }}>
        <h2 className="fs-3xl fw-black uppercase">Latest Drops</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => scroll('left')} style={{ width: '40px', height: '40px', border: '1px solid var(--gray-800)', backgroundColor: 'transparent', color: 'var(--foreground)', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="hover-scale">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button onClick={() => scroll('right')} style={{ width: '40px', height: '40px', border: '1px solid var(--gray-800)', backgroundColor: 'transparent', color: 'var(--foreground)', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="hover-scale">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
          <Link href="/shop" style={{ textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: '700', letterSpacing: '0.05em', borderBottom: '1px solid var(--foreground)', paddingBottom: '0.2rem' }}>
            VIEW ALL PIECES
          </Link>
        </div>
      </div>
      
      <div className="container custom-scrollbar" ref={scrollRef} style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '4rem', scrollSnapType: 'x mandatory', maxWidth: '1800px' }}>
        {products.map((product) => {
          return (
            <div key={product.id} className="group" style={{ minWidth: '400px', width: '400px', flexShrink: 0, scrollSnapAlign: 'start' }}>
              <ProductCard product={product} />
            </div>
          )})}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .add-btn:hover { background-color: var(--foreground) !important; color: var(--background) !important; border-color: var(--foreground) !important; }
        
        .custom-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}
