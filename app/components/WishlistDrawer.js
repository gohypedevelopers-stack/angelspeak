'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function WishlistDrawer() {
  const { wishlistItems, wishlistCount, isWishlistOpen, setIsWishlistOpen, removeFromWishlist } = useWishlist();
  const { addToCart, setIsCartOpen } = useCart();
  const [addedItemMap, setAddedItemMap] = useState({});
  const [selectedSizeItemId, setSelectedSizeItemId] = useState(null);

  const handleSelectSizeAndAdd = (item, size) => {
    const selectedVariant = item.rawProduct?.variants?.edges?.find(
      (edge) => edge.node?.title?.trim().toLowerCase() === size.trim().toLowerCase()
    )?.node;

    const variantId = selectedVariant?.id || item.variantId || item.id;
    const priceToUse = selectedVariant?.price?.amount || item.price;

    addToCart({
      id: variantId,
      title: item.title,
      price: priceToUse,
      image: item.image,
      selectedSize: size
    });

    setSelectedSizeItemId(null);

    // Provide visual feedback
    setAddedItemMap(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemMap(prev => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <div style={{ 
      position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: isWishlistOpen ? 'auto' : 'none'
    }}>
      {/* Backdrop */}
      <div 
        style={{ 
          position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', 
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          opacity: isWishlistOpen ? 1 : 0, transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)' 
        }}
        onClick={() => setIsWishlistOpen(false)}
      ></div>
      
      {/* Drawer */}
      <div style={{ 
        position: 'absolute', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '440px',
        backgroundColor: '#050505', color: '#ffffff', borderLeft: '1px solid #1a1a1a',
        transform: isWishlistOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex', flexDirection: 'column',
        boxShadow: '-15px 0 40px rgba(0, 0, 0, 0.8)'
      }}>
        {/* Header */}
        <div style={{ padding: '1.75rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" stroke="#ffffff" strokeWidth="1">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            <span className="fs-lg fw-black uppercase" style={{ letterSpacing: '0.12em', color: '#ffffff' }}>BOOKMARKS ({wishlistCount})</span>
          </div>
          <button onClick={() => setIsWishlistOpen(false)} style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', padding: '0.25rem' }} className="hover-scale" title="Close">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {/* Wishlist Items List */}
        <div style={{ padding: '2rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }} className="custom-scrollbar">
          {wishlistItems.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem', padding: '0 1rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#111111', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #222222' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <p className="fs-sm fw-bold uppercase" style={{ letterSpacing: '0.1em', color: '#ffffff' }}>YOUR BOOKMARKS ARE EMPTY</p>
              <span className="fs-xs" style={{ color: '#888888', lineHeight: '1.6', maxWidth: '260px' }}>
                Click the bookmark icon on any piece to save it for quick access later.
              </span>
            </div>
          ) : (
            wishlistItems.map((item) => {
              const isJustAdded = addedItemMap[item.id];
              return (
                <div 
                  key={item.id} 
                  style={{ 
                    display: 'flex', 
                    gap: '1.25rem', 
                    paddingBottom: '1.75rem', 
                    borderBottom: '1px solid #1a1a1a'
                  }}
                >
                  {/* Image */}
                  <Link href={item.handle ? `/shop/${item.handle}` : '/shop'} onClick={() => setIsWishlistOpen(false)} style={{ display: 'block', flexShrink: 0 }}>
                    <div style={{ width: '95px', aspectRatio: '3/4', backgroundColor: '#F0F0F0', borderRadius: '8px', overflow: 'hidden' }}>
                      <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </Link>

                  {/* Details */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Link href={item.handle ? `/shop/${item.handle}` : '/shop'} onClick={() => setIsWishlistOpen(false)} style={{ textDecoration: 'none' }}>
                          <h4 style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0, lineHeight: '1.3' }}>
                            {item.title}
                          </h4>
                        </Link>
                        <button 
                          onClick={() => removeFromWishlist(item.id)} 
                          style={{ background: 'none', border: 'none', color: '#666666', cursor: 'pointer', padding: '0.2rem', marginLeft: '0.5rem', flexShrink: 0 }} 
                          className="hover-scale" 
                          title="Remove bookmark"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                      
                      <p style={{ color: '#ffffff', fontSize: '0.875rem', fontWeight: '700', marginTop: '0.35rem', letterSpacing: '0.04em' }}>
                        ₹{parseFloat(item.price || 0).toLocaleString('en-IN')}
                      </p>
                    </div>

                      {/* Size Selector or Add to Cart Button */}
                      {selectedSizeItemId === item.id ? (
                        <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', backgroundColor: '#111', padding: '0.75rem', borderRadius: '6px', border: '1px solid #333' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.65rem', fontWeight: '700', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Select Size:</span>
                            <button 
                              onClick={() => setSelectedSizeItemId(null)}
                              style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '0.9rem', lineHeight: 1 }}
                            >
                              &times;
                            </button>
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                            {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                              <button
                                key={size}
                                onClick={() => handleSelectSizeAndAdd(item, size)}
                                style={{
                                  flex: 1,
                                  minWidth: '32px',
                                  padding: '0.35rem 0.25rem',
                                  borderRadius: '4px',
                                  border: '1px solid #444',
                                  backgroundColor: '#222',
                                  color: '#fff',
                                  fontSize: '0.7rem',
                                  fontWeight: '700',
                                  cursor: 'pointer',
                                  textAlign: 'center',
                                  transition: 'all 0.2s ease'
                                }}
                                className="hover-scale"
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = '#fff';
                                  e.currentTarget.style.color = '#000';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = '#222';
                                  e.currentTarget.style.color = '#fff';
                                }}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <button 
                          onClick={() => setSelectedSizeItemId(item.id)}
                          style={{ 
                            backgroundColor: isJustAdded ? '#ffffff' : 'transparent', 
                            color: isJustAdded ? '#000000' : '#ffffff', 
                            border: '1px solid #ffffff', 
                            borderRadius: '6px', 
                            padding: '0.6rem 1rem', 
                            fontSize: '0.75rem', 
                            fontWeight: '800', 
                            letterSpacing: '0.08em', 
                            cursor: 'pointer', 
                            textTransform: 'uppercase',
                            transition: 'all 0.25s ease',
                            marginTop: '0.85rem',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.4rem'
                          }}
                          className="hover-scale"
                        >
                          {isJustAdded ? (
                            <>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                              ADDED TO CART
                            </>
                          ) : (
                            'ADD TO CART'
                          )}
                        </button>
                      )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {wishlistItems.length > 0 && (
          <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid #1a1a1a', backgroundColor: '#050505', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button 
              onClick={() => {
                setIsWishlistOpen(false);
                setIsCartOpen(true);
              }}
              style={{ width: '100%', padding: '0.9rem', backgroundColor: 'transparent', border: '1px solid #444444', color: '#ffffff', fontWeight: 'bold', fontSize: '0.85rem', letterSpacing: '0.08em', borderRadius: '8px', cursor: 'pointer', textTransform: 'uppercase' }}
              className="hover-scale"
            >
              VIEW CART
            </button>
            <Link href="/shop" onClick={() => setIsWishlistOpen(false)} style={{ width: '100%', display: 'block' }}>
              <button className="btn btn-full" style={{ width: '100%', borderRadius: '8px', padding: '0.9rem', fontSize: '0.85rem', letterSpacing: '0.08em', backgroundColor: '#ffffff', color: '#000000', fontWeight: '900' }}>
                CONTINUE SHOPPING
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
