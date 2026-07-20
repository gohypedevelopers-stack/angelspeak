'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';

export default function CheckoutRedirect() {
  const { checkoutUrl, cartItems } = useCart();
  const router = useRouter();

  useEffect(() => {
    // If the cart is empty, redirect back to shop
    if (cartItems.length === 0) {
      router.push('/shop');
      return;
    }

    // If we have a Shopify checkout URL, redirect the user to it
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  }, [checkoutUrl, cartItems, router]);

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--background)' }}>
      <div style={{ textAlign: 'center', maxWidth: '600px', padding: '2rem' }}>
        <h1 className="fs-3xl fw-black uppercase" style={{ marginBottom: '1.5rem', letterSpacing: '0.05em' }}>
          Redirecting to Secure Checkout...
        </h1>
        <p className="fs-base" style={{ color: 'var(--gray-400)', marginBottom: '3rem', lineHeight: '1.6' }}>
          Please wait while we transfer you to our secure Shopify payment portal.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ 
            width: '40px', height: '40px', 
            border: '3px solid var(--gray-800)', 
            borderTop: '3px solid var(--foreground)', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite' 
          }}></div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
}
