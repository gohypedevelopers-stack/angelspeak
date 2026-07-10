'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { createCart, addToCart as shopifyAddToCart, updateCartLines, removeFromCart as shopifyRemoveFromCart } from '../lib/shopify';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [shopifyCartId, setShopifyCartId] = useState(null);
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Load existing cart from localStorage on mount
  useEffect(() => {
    const savedCartId = localStorage.getItem('shopifyCartId');
    const savedCheckoutUrl = localStorage.getItem('shopifyCheckoutUrl');
    const savedItems = localStorage.getItem('cartItems');
    
    if (savedCartId) setShopifyCartId(savedCartId);
    if (savedCheckoutUrl) setCheckoutUrl(savedCheckoutUrl);
    if (savedItems) {
      try {
        setCartItems(JSON.parse(savedItems));
      } catch (e) {
        console.error('Failed to parse cart items');
      }
    }
  }, []);

  // Save cart items to local storage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (product) => {
    setIsCartOpen(true);
    setIsUpdating(true);
    try {
      let currentCartId = shopifyCartId;
      let currentCheckoutUrl = checkoutUrl;
      
      if (!currentCartId) {
        const cart = await createCart();
        currentCartId = cart.id;
        currentCheckoutUrl = cart.checkoutUrl;
        setShopifyCartId(cart.id);
        setCheckoutUrl(cart.checkoutUrl);
        localStorage.setItem('shopifyCartId', cart.id);
        localStorage.setItem('shopifyCheckoutUrl', cart.checkoutUrl);
      }

      // Optimistic UI update
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id);
        if (existingItem) {
          return prevItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prevItems, { ...product, quantity: 1 }];
      });

      // Update Shopify Cart
      let updatedCart;
      try {
        updatedCart = await shopifyAddToCart(currentCartId, product.id, 1);
        if (!updatedCart) throw new Error('Cart not found');
      } catch (err) {
        console.warn('Cart expired or invalid, creating a new one...');
        const newCart = await createCart();
        currentCartId = newCart.id;
        currentCheckoutUrl = newCart.checkoutUrl;
        setShopifyCartId(newCart.id);
        setCheckoutUrl(newCart.checkoutUrl);
        localStorage.setItem('shopifyCartId', newCart.id);
        localStorage.setItem('shopifyCheckoutUrl', newCart.checkoutUrl);
        updatedCart = await shopifyAddToCart(currentCartId, product.id, 1);
      }
      
      // Sync line item IDs from Shopify so we can update/remove them later
      if (updatedCart && updatedCart.lines) {
        const lines = updatedCart.lines.edges.map(e => e.node);
        setCartItems(prev => prev.map(item => {
          const shopifyLine = lines.find(l => l.merchandise.id === item.id);
          if (shopifyLine) return { ...item, lineId: shopifyLine.id };
          return item;
        }));
      }

      return currentCheckoutUrl;

    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const removeFromCart = async (productId) => {
    const itemToRemove = cartItems.find(item => item.id === productId);
    if (!itemToRemove) return;

    // Optimistic UI update
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));

    if (shopifyCartId && itemToRemove.lineId) {
      setIsUpdating(true);
      try {
        await shopifyRemoveFromCart(shopifyCartId, [itemToRemove.lineId]);
      } catch (error) {
        console.error('Error removing from cart:', error);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    const itemToUpdate = cartItems.find(item => item.id === productId);
    if (!itemToUpdate) return;

    // Optimistic UI update
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );

    if (shopifyCartId && itemToUpdate.lineId) {
      setIsUpdating(true);
      try {
        await updateCartLines(shopifyCartId, [{ id: itemToUpdate.lineId, quantity: newQuantity }]);
      } catch (error) {
        console.error('Error updating quantity:', error);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const cartTotal = cartItems.reduce(
    (total, item) => {
      const price = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.-]+/g, "")) : item.price;
      return total + (price * item.quantity);
    },
    0
  );

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartTotal,
      cartCount,
      isCartOpen,
      setIsCartOpen,
      checkoutUrl,
      isUpdating
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
