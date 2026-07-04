'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cartItems, cartTotal } = useCart();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });
  const [orderComplete, setOrderComplete] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    // Simulate order placement
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--background)' }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', padding: '2rem' }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--foreground)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 2rem' }}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <h1 className="fs-4xl fw-black uppercase" style={{ marginBottom: '1.5rem' }}>Order Confirmed</h1>
          <p className="fs-base" style={{ color: 'var(--gray-400)', marginBottom: '3rem', lineHeight: '1.6' }}>
            Your order has been placed. You will receive an email confirmation shortly with your order details and tracking information.
          </p>
          <Link href="/" className="btn-full" style={{ padding: '1rem 2rem', backgroundColor: 'var(--foreground)', color: 'var(--background)', fontWeight: 'bold', textTransform: 'uppercase', textDecoration: 'none' }}>
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)', padding: '6rem 0' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <h1 className="fs-3xl fw-black uppercase" style={{ marginBottom: '3rem', letterSpacing: '0.05em' }}>Checkout</h1>
        
        <div className="checkout-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '4rem', alignItems: 'start' }}>
          
          {/* Left: Checkout Form */}
          <div>
            <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h2 className="fs-xl fw-bold uppercase" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--gray-800)', paddingBottom: '1rem' }}>Contact Information</h2>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email Address" 
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '1rem', backgroundColor: 'transparent', border: '1px solid var(--gray-600)', color: 'var(--foreground)', outline: 'none' }} 
                />
              </div>

              <div>
                <h2 className="fs-xl fw-bold uppercase" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--gray-800)', paddingBottom: '1rem' }}>Shipping Address</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <input type="text" name="firstName" placeholder="First Name" required value={formData.firstName} onChange={handleInputChange} style={{ width: '100%', padding: '1rem', backgroundColor: 'transparent', border: '1px solid var(--gray-600)', color: 'var(--foreground)', outline: 'none' }} />
                  <input type="text" name="lastName" placeholder="Last Name" required value={formData.lastName} onChange={handleInputChange} style={{ width: '100%', padding: '1rem', backgroundColor: 'transparent', border: '1px solid var(--gray-600)', color: 'var(--foreground)', outline: 'none' }} />
                </div>
                <input type="text" name="address" placeholder="Address" required value={formData.address} onChange={handleInputChange} style={{ width: '100%', padding: '1rem', backgroundColor: 'transparent', border: '1px solid var(--gray-600)', color: 'var(--foreground)', outline: 'none', marginBottom: '1rem' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <input type="text" name="city" placeholder="City" required value={formData.city} onChange={handleInputChange} style={{ width: '100%', padding: '1rem', backgroundColor: 'transparent', border: '1px solid var(--gray-600)', color: 'var(--foreground)', outline: 'none' }} />
                  <input type="text" name="postalCode" placeholder="Postal Code" required value={formData.postalCode} onChange={handleInputChange} style={{ width: '100%', padding: '1rem', backgroundColor: 'transparent', border: '1px solid var(--gray-600)', color: 'var(--foreground)', outline: 'none' }} />
                </div>
                <input type="tel" name="phone" placeholder="Phone" required value={formData.phone} onChange={handleInputChange} style={{ width: '100%', padding: '1rem', backgroundColor: 'transparent', border: '1px solid var(--gray-600)', color: 'var(--foreground)', outline: 'none' }} />
              </div>
              
              <button type="submit" style={{ padding: '1.5rem', backgroundColor: 'var(--foreground)', color: 'var(--background)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', border: 'none', marginTop: '1rem' }}>
                Complete Order
              </button>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div style={{ position: 'sticky', top: '120px', backgroundColor: 'var(--gray-900)', padding: '2rem', borderRadius: '8px' }}>
            <h2 className="fs-xl fw-bold uppercase" style={{ marginBottom: '2rem' }}>Order Summary</h2>
            
            {cartItems.length === 0 ? (
              <p style={{ color: 'var(--gray-400)' }}>Your cart is empty.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                {cartItems.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ width: '60px', height: '60px', backgroundColor: '#e5e5e5', borderRadius: '8px', overflow: 'hidden' }}>
                      <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p className="fw-bold uppercase fs-sm" style={{ marginBottom: '0.2rem' }}>{item.title}</p>
                      <p className="fs-xs" style={{ color: 'var(--gray-400)' }}>Qty: {item.quantity}</p>
                    </div>
                    <p className="fw-bold fs-sm">{item.price}</p>
                  </div>
                ))}
              </div>
            )}

            <div style={{ borderTop: '1px solid var(--gray-800)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--gray-400)' }}>
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--gray-400)' }}>
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.25rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--gray-800)' }}>
                <span>Total</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 992px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
        }
      `}} />
    </div>
  );
}
