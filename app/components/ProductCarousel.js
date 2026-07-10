'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import Image from 'next/image';

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
          const variantId = product.variants?.edges?.[0]?.node?.id || product.id;
          const price = parseFloat(product.priceRange?.minVariantPrice?.amount || 0).toLocaleString('en-IN');
          return (
          <div key={product.id} className="group" style={{ minWidth: '400px', width: '400px', flexShrink: 0, scrollSnapAlign: 'start' }}>
            <div style={{ aspectRatio: '4/5', backgroundColor: '#F0F0F0', borderRadius: '12px', marginBottom: '1rem', overflow: 'hidden', position: 'relative' }}>
              <Link href={`/shop/${product.handle}`} className="no-hover" style={{ display: 'block', width: '100%', height: '100%' }}>
                <Image 
                  src={product.images?.edges?.[0]?.node?.url || '/placeholder.png'} 
                  alt={product.title} 
                  fill
                  sizes="400px"
                  className="primary-img"
                  style={{ objectFit: 'cover', transition: 'opacity 0.4s ease' }} 
                />
                {product.images?.edges?.[1]?.node?.url && (
                  <Image 
                    src={product.images.edges[1].node.url} 
                    alt={`${product.title} Alternate`} 
                    fill
                    sizes="400px"
                    className="hover-img"
                    style={{ objectFit: 'cover', transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }} 
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
                <Link href={`/shop/${product.handle}`} className="fw-bold uppercase fs-sm" style={{ letterSpacing: '0.05em' }}>{product.title}</Link>
                <span className="fs-xs" style={{ color: 'var(--gray-400)' }}>₹{price}</span>
              </div>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  addToCart({
                    id: variantId,
                    title: product.title,
                    price: product.priceRange.minVariantPrice.amount,
                    image: product.images?.edges?.[0]?.node?.url
                  });
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
