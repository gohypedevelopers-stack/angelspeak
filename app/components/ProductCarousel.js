'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { products } from '../../data/products';
import { useCart } from '../context/CartContext';

export default function ProductCarousel() {
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
      <div className="container" style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
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
      
      <div className="container custom-scrollbar" ref={scrollRef} style={{ display: 'flex', gap: '3rem', overflowX: 'auto', paddingBottom: '4rem', scrollSnapType: 'x mandatory' }}>
        {products.map((product) => (
          <div key={product.id} className="group" style={{ minWidth: '350px', width: '350px', flexShrink: 0, scrollSnapAlign: 'start' }}>
            <div style={{ aspectRatio: '1/1', backgroundColor: '#e8e8e8', marginBottom: '2rem', overflow: 'hidden', position: 'relative' }}>
              <Link href={`/shop/${product.slug}`}>
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="hover-scale"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} 
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className="fw-bold uppercase fs-base" style={{ letterSpacing: '0.05em' }}>{product.title}</span>
              <span className="fs-sm" style={{ color: 'var(--gray-400)' }}>{product.price}</span>
            </div>
            <p className="fs-sm" style={{ color: 'var(--gray-400)', lineHeight: '1.4' }}>{product.chapter}</p>
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .group:hover .overlay { opacity: 1 !important; }
        .custom-scrollbar::-webkit-scrollbar { height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: var(--gray-900); border-radius: 4px; margin: 0 2rem; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--gray-500); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--foreground); }
      `}} />
    </section>
  );
}
