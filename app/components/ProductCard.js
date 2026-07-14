'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = product.images?.edges?.map(edge => edge.node.url) || ['/placeholder.png'];
  const variantId = product.variants?.edges?.[0]?.node?.id || product.id;
  const price = parseFloat(product.priceRange?.minVariantPrice?.amount || 0).toLocaleString('en-IN');

  const nextImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="group product-card-container" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ aspectRatio: '4/5', backgroundColor: '#F0F0F0', borderRadius: '12px', marginBottom: '1rem', overflow: 'hidden', position: 'relative', width: '100%' }}>
        <Link href={`/shop/${product.handle}`} style={{ display: 'block', width: '100%', height: '100%' }}>
          {images.map((url, idx) => (
            <Image 
              key={idx}
              src={url}
              alt={`${product.title} - Image ${idx + 1}`} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ 
                objectFit: 'cover', 
                opacity: currentImageIndex === idx ? 1 : 0,
                transition: 'opacity 0.4s ease',
                pointerEvents: currentImageIndex === idx ? 'auto' : 'none'
              }} 
            />
          ))}
        </Link>
        
        {/* Navigation Arrows (Visible on hover if there are multiple images) */}
        {images.length > 1 && (
          <>
            <button 
              className="carousel-arrow left hover-scale" 
              onClick={prevImage}
              style={{
                position: 'absolute', top: '50%', left: '0.5rem', transform: 'translateY(-50%)',
                width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.7)',
                border: 'none', color: 'var(--gray-900)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', opacity: 0, transition: 'opacity 0.2s ease', zIndex: 10
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button 
              className="carousel-arrow right hover-scale" 
              onClick={nextImage}
              style={{
                position: 'absolute', top: '50%', right: '0.5rem', transform: 'translateY(-50%)',
                width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.7)',
                border: 'none', color: 'var(--gray-900)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', opacity: 0, transition: 'opacity 0.2s ease', zIndex: 10
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </>
        )}

        {/* Bookmark Icon */}
        <button style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--gray-900)', cursor: 'pointer', opacity: 0.7, zIndex: 10 }} className="hover-scale">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
        </button>
        
        {/* Carousel Dots Indicator */}
        {images.length > 1 && (
          <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '4px', zIndex: 10 }}>
            {images.map((_, idx) => (
              <div 
                key={idx} 
                style={{ 
                  width: '4px', height: '4px', borderRadius: '50%', 
                  backgroundColor: 'var(--gray-900)', 
                  opacity: currentImageIndex === idx ? 0.8 : 0.3,
                  transition: 'opacity 0.3s'
                }}
              ></div>
            ))}
          </div>
        )}
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
              image: images[0]
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
      <style jsx>{`
        .product-card-container:hover .carousel-arrow {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
