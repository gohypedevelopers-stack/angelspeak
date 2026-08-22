'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved wishlist items from localStorage on mount
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem('angelspeak_wishlist');
      if (savedItems) {
        setWishlistItems(JSON.parse(savedItems));
      }
    } catch (e) {
      console.error('Failed to parse wishlist items from localStorage', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Sync wishlist items to localStorage on state change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('angelspeak_wishlist', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, isInitialized]);

  const isInWishlist = (productId) => {
    if (!productId) return false;
    return wishlistItems.some((item) => item.id === productId || item.handle === productId);
  };

  const toggleWishlist = (product) => {
    if (!product || (!product.id && !product.handle)) return;
    
    setWishlistItems((prevItems) => {
      const exists = prevItems.some((item) => item.id === product.id || (product.handle && item.handle === product.handle));
      if (exists) {
        return prevItems.filter((item) => item.id !== product.id && (!product.handle || item.handle !== product.handle));
      } else {
        // Standardize product payload for wishlist rendering
        const formattedProduct = {
          id: product.id,
          handle: product.handle,
          title: product.title,
          price: product.priceRange?.minVariantPrice?.amount || product.price || 0,
          image: product.images?.edges?.[0]?.node?.url || product.image || '/placeholder.png',
          variantId: product.variants?.edges?.[0]?.node?.id || product.variantId || product.id,
          rawProduct: product
        };
        return [...prevItems, formattedProduct];
      }
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== productId && item.handle !== productId));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        isWishlistOpen,
        setIsWishlistOpen,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
