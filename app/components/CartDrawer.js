'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { cartItems, cartCount, cartTotal, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, checkoutUrl, isUpdating } = useCart();

  return (
    <div style={{ 
      position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: isCartOpen ? 'auto' : 'none'
    }}>
      {/* Backdrop */}
      <div 
        style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', opacity: isCartOpen ? 1 : 0, transition: 'opacity 0.4s ease' }}
        onClick={() => setIsCartOpen(false)}
      ></div>
      
      {/* Drawer */}
      <div style={{ 
        position: 'absolute', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '450px',
        backgroundColor: 'var(--background)', color: 'var(--foreground)', borderLeft: '1px solid var(--gray-800)',
        transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--gray-800)' }}>
          <span className="fs-xl fw-black uppercase" style={{ letterSpacing: '0.1em' }}>YOUR CART ({cartCount})</span>
          <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }} className="hover-scale">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <div style={{ padding: '2rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {cartItems.length === 0 ? (
            <p className="fs-sm uppercase" style={{ color: 'var(--gray-400)', textAlign: 'center', marginTop: '2rem' }}>Your items will appear here...</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1rem' }}>
                <div style={{ aspectRatio: '3/4', backgroundColor: 'var(--gray-900)' }}>
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h4 className="fs-sm fw-bold uppercase" style={{ letterSpacing: '0.05em' }}>{item.title}</h4>
                      <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: 'var(--gray-400)', cursor: 'pointer', padding: 0 }} className="hover-scale">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </button>
                    </div>
                    <p className="fs-xs uppercase" style={{ color: 'var(--gray-400)', marginTop: '0.2rem' }}>
                      {item.selectedSize ? `Size: ${item.selectedSize} | ` : ''}₹{item.price}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid var(--gray-800)', width: 'fit-content' }}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '0.2rem 0.5rem', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>-</button>
                    <span className="fs-xs fw-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '0.2rem 0.5rem', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ padding: '2rem', borderTop: '1px solid var(--gray-800)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', textTransform: 'uppercase', fontWeight: '900', letterSpacing: '0.05em' }}>
            <span>SUBTOTAL</span>
            <span>Rs. {cartTotal.toLocaleString()}</span>
          </div>
          {checkoutUrl ? (
            <a href={checkoutUrl} onClick={() => setIsCartOpen(false)} style={{ display: 'block' }}>
              <button className="btn btn-full" disabled={cartItems.length === 0 || isUpdating} style={{ opacity: cartItems.length === 0 || isUpdating ? 0.5 : 1, width: '100%', cursor: isUpdating ? 'wait' : 'pointer' }}>
                {isUpdating ? 'UPDATING...' : 'CHECKOUT'}
              </button>
            </a>
          ) : (
            <button className="btn btn-full" disabled={true} style={{ opacity: 0.5, width: '100%' }}>CHECKOUT</button>
          )}
        </div>
      </div>
    </div>
  );
}
