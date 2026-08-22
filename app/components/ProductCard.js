'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const isBookmarked = isInWishlist(product.id) || isInWishlist(product.handle);

  const images = product.images?.edges?.map(edge => edge.node.url) || ['/placeholder.png'];
  const variantId = product.variants?.edges?.[0]?.node?.id || product.id;
  const minPrice = parseFloat(product.priceRange?.minVariantPrice?.amount || 0);
  const maxPrice = parseFloat(product.priceRange?.maxVariantPrice?.amount || 0);

  let formattedPrice = '';
  if (minPrice > 0 && maxPrice > 0 && minPrice !== maxPrice) {
    formattedPrice = `₹${minPrice.toLocaleString('en-IN')} – ₹${maxPrice.toLocaleString('en-IN')}`;
  } else if (minPrice > 0) {
    formattedPrice = `₹${minPrice.toLocaleString('en-IN')}`;
  }

  const nextImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const activeIndex = isHovered && currentImageIndex === 0 && images.length > 1 ? 1 : currentImageIndex;
  const [showQuickSize, setShowQuickSize] = useState(false);
  const [addedSize, setAddedSize] = useState('');

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const handleQuickAdd = (size, e) => {
    e.preventDefault();
    e.stopPropagation();

    const selectedVariant = product.variants?.edges?.find(
      (edge) => edge.node?.title?.trim().toLowerCase() === size.trim().toLowerCase()
    )?.node;

    const variantId = selectedVariant?.id || product.variants?.edges?.[0]?.node?.id || product.id;
    const priceToUse = selectedVariant?.price?.amount || product.priceRange?.minVariantPrice?.amount;

    addToCart({
      id: variantId,
      title: product.title,
      price: priceToUse,
      image: images[0],
      selectedSize: size
    });

    setAddedSize(size);
    setTimeout(() => {
      setAddedSize('');
      setShowQuickSize(false);
    }, 1200);
  };

  return (
    <div className="group product-card-container" style={{ display: 'flex', flexDirection: 'column' }}>
      <div 
        style={{ aspectRatio: '4/5', backgroundColor: '#F0F0F0', borderRadius: '12px', marginBottom: '1rem', overflow: 'hidden', position: 'relative', width: '100%' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowQuickSize(false);
        }}
      >
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
                opacity: activeIndex === idx ? 1 : 0,
                transition: 'opacity 0.4s ease',
                pointerEvents: activeIndex === idx ? 'auto' : 'none'
              }} 
            />
          ))}
        </Link>

        {/* Quick Size Overlay */}
        {showQuickSize && (
          <div 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            style={{
              position: 'absolute', inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(8px)',
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center', alignItems: 'center',
              padding: '1.5rem', zIndex: 30,
              animation: 'fadeIn 0.2s ease-in-out'
            }}
          >
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowQuickSize(false); }}
              style={{
                position: 'absolute', top: '0.75rem', right: '0.75rem',
                background: 'none', border: 'none', color: '#fff',
                fontSize: '1.25rem', cursor: 'pointer', opacity: 0.8
              }}
            >
              &times;
            </button>

            {addedSize ? (
              <div style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                ✓ Added Size {addedSize}!
              </div>
            ) : (
              <>
                <span style={{ color: 'var(--gray-300)', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                  Select Size
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                  {sizes.map((size) => {
                    const variant = product.variants?.edges?.find(
                      (edge) => edge.node?.title?.trim().toLowerCase() === size.trim().toLowerCase()
                    )?.node;
                    const vPrice = variant?.price?.amount ? parseFloat(variant.price.amount).toLocaleString('en-IN') : null;

                    return (
                      <button
                        key={size}
                        onClick={(e) => handleQuickAdd(size, e)}
                        style={{
                          padding: vPrice && minPrice !== maxPrice ? '0.4rem 0.75rem' : '0.5rem 0.85rem',
                          borderRadius: '20px',
                          border: '1px solid rgba(255,255,255,0.4)',
                          backgroundColor: 'transparent',
                          color: '#ffffff',
                          fontWeight: '600',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center'
                        }}
                        className="hover-scale"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#ffffff';
                          e.currentTarget.style.color = '#000000';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#ffffff';
                        }}
                      >
                        <span>{size}</span>
                        {vPrice && minPrice !== maxPrice && (
                          <span style={{ fontSize: '0.625rem', opacity: 0.85 }}>₹{vPrice}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
        
        {/* Navigation Arrows (Visible on hover if there are multiple images) */}
        {images.length > 1 && !showQuickSize && (
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
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          style={{ 
            position: 'absolute', top: '1rem', right: '1rem', background: isBookmarked ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.85)', 
            border: 'none', borderRadius: '50%', width: '36px', height: '36px',
            color: isBookmarked ? '#ffffff' : 'var(--gray-900)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', opacity: isBookmarked ? 1 : 0.85, zIndex: 10,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            transition: 'all 0.2s ease'
          }} 
          className="hover-scale"
          title={isBookmarked ? "Remove from Bookmarks" : "Save to Bookmarks"}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
        
        {/* Carousel Dots Indicator */}
        {images.length > 1 && !showQuickSize && (
          <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '4px', zIndex: 10 }}>
            {images.map((_, idx) => (
              <div 
                key={idx} 
                style={{ 
                  width: '4px', height: '4px', borderRadius: '50%', 
                  backgroundColor: 'var(--gray-900)', 
                  opacity: activeIndex === idx ? 0.8 : 0.3,
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
          <span className="fs-xs" style={{ color: 'var(--gray-400)' }}>{formattedPrice}</span>
        </div>
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowQuickSize((prev) => !prev);
          }}
          style={{ 
            width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--gray-600)', 
            background: showQuickSize ? 'var(--foreground)' : 'transparent', 
            color: showQuickSize ? 'var(--background)' : 'var(--foreground)', 
            display: 'flex', alignItems: 'center', 
            justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s ease', flexShrink: 0
          }} 
          className="add-btn hover-scale"
          title="Quick Select Size & Add to Cart"
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
