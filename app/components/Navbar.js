'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { cartItems, cartCount, cartTotal, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCart();

  return (
    <>
      <nav className="main-nav" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: isSearchOpen ? 0 : 1, transition: 'opacity 0.2s ease', pointerEvents: isSearchOpen ? 'none' : 'auto', width: '100%', position: 'relative' }}>
          
          {/* Left: Navigation Links & Mobile Menu */}
          <div style={{ display: 'flex', gap: '2rem', textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: '500', letterSpacing: '0.05em', flex: 1 }}>
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} 
              className="hover-scale"
              onClick={() => setIsMenuOpen(true)}
            >
              {/* Hamburger Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              <span className="desktop-only">MENU</span>
            </div>
            <div style={{ display: 'flex', gap: '2rem' }} className="desktop-only">
              <Link href="/shop" className="hover-scale">SHOP</Link>

              <Link href="/about-us" className="hover-scale">ABOUT US</Link>
            </div>
          </div>

          {/* Center: Brand Logo */}
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', display: 'flex', justifyContent: 'center', zIndex: 10 }}>
            <Link href="/" className="hover-scale" style={{ display: 'inline-block' }}>
              <img src="/Angel_peak_name_White.png" alt="Angels Peak" className="logo-img" style={{ height: 'clamp(24px, 8vw, 60px)', width: 'auto', objectFit: 'contain' }} />
            </Link>
          </div>

          {/* Right: Utility Icons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1.5rem', alignItems: 'center', flex: 1 }}>
            {/* Search */}
            <button className="hover-scale" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }} onClick={() => setIsSearchOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
            {/* Account */}
            <button className="hover-scale desktop-only" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => setIsLoginOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <span style={{ fontSize: '0.875rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>LOG IN</span>
            </button>
            {/* Cart */}
            <button 
              className="hover-scale" 
              style={{ position: 'relative', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}
              onClick={() => setIsCartOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              {/* Cart Badge */}
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: '-8px', right: '-12px', backgroundColor: 'var(--foreground)', color: 'var(--background)', fontSize: '0.65rem', fontWeight: '900', padding: '2px 6px', borderRadius: '50%' }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* INLINE SEARCH BAR */}
        <div style={{ 
          position: 'absolute', inset: 0, backgroundColor: 'var(--background)', 
          display: 'flex', alignItems: 'center', padding: '0 2rem',
          transform: isSearchOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '1rem' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--gray-400)' }}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input 
              type="text" 
              placeholder="SEARCH FOR PIECES..." 
              autoFocus={isSearchOpen}
              style={{ width: '100%', background: 'transparent', border: 'none', color: 'var(--foreground)', fontSize: '1.25rem', fontWeight: '700', outline: 'none', textTransform: 'uppercase' }} 
            />
            <button onClick={() => setIsSearchOpen(false)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }} className="hover-scale">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .main-nav { padding: 1.5rem 3rem; }
          @media (max-width: 768px) {
            .desktop-only { display: none !important; }
            .main-nav { padding: 1rem 1.5rem !important; }
            .logo-img { height: 28px !important; }
          }
        `}} />
      </nav>

      {/* SIDEBAR MENU */}
      <div style={{ 
        position: 'fixed', inset: 0, zIndex: 1000, pointerEvents: isMenuOpen ? 'auto' : 'none'
      }}>
        {/* Backdrop */}
        <div 
          style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', opacity: isMenuOpen ? 1 : 0, transition: 'opacity 0.4s ease' }}
          onClick={() => setIsMenuOpen(false)}
        ></div>

        {/* Drawer */}
        <div style={{ 
          position: 'absolute', top: 0, left: 0, bottom: 0, width: '100%', maxWidth: '350px',
          backgroundColor: 'var(--background)', color: 'var(--foreground)', borderRight: '1px solid var(--gray-800)',
          transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex', flexDirection: 'column'
        }}>
        <div style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--gray-800)' }}>
          <img src="/Angel_peak_logo_White.png" alt="Angels Peak Icon" style={{ height: '50px', objectFit: 'contain' }} />
          <button onClick={() => setIsMenuOpen(false)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }} className="hover-scale">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div style={{ padding: '4rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.5rem', fontWeight: '600', textTransform: 'uppercase' }}>
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover-scale" style={{ transformOrigin: 'left' }}>Home</Link>
          <Link href="/shop" onClick={() => setIsMenuOpen(false)} className="hover-scale" style={{ transformOrigin: 'left' }}>The Drops</Link>

          <Link href="/about-us" onClick={() => setIsMenuOpen(false)} className="hover-scale" style={{ transformOrigin: 'left' }}>About Us</Link>
        </div>
      </div>
      </div>

      {/* LOGIN/SIGNUP MODAL OVERLAY */}
      <div style={{ 
        position: 'fixed', inset: 0, zIndex: 1000, 
        backgroundColor: 'rgba(0,0,0,0.8)',
        opacity: isLoginOpen ? 1 : 0, pointerEvents: isLoginOpen ? 'auto' : 'none',
        transition: 'opacity 0.3s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{ 
          backgroundColor: 'var(--background)', color: 'var(--foreground)', 
          width: '100%', maxWidth: '500px', padding: '3rem', position: 'relative',
          border: '1px solid var(--gray-800)'
        }}>
          <button onClick={() => setIsLoginOpen(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }} className="hover-scale">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 className="fs-2xl fw-black uppercase" style={{ letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Log In</h2>
            <p className="fs-sm uppercase" style={{ color: 'var(--gray-400)', letterSpacing: '0.1em' }}>Log in to view your drops and order history.</p>
          </div>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <input 
              type="email" 
              placeholder="EMAIL ADDRESS" 
              style={{ width: '100%', background: 'transparent', border: '1px solid var(--gray-600)', color: 'var(--foreground)', padding: '1rem', fontSize: '0.875rem', outline: 'none', textTransform: 'uppercase' }} 
            />
            <input 
              type="password" 
              placeholder="PASSWORD" 
              style={{ width: '100%', background: 'transparent', border: '1px solid var(--gray-600)', color: 'var(--foreground)', padding: '1rem', fontSize: '0.875rem', outline: 'none', textTransform: 'uppercase' }} 
            />
            <button type="submit" className="btn btn-full" style={{ marginTop: '1rem' }}>
              SIGN IN
            </button>
          </form>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="#" className="fs-xs fw-bold uppercase" style={{ color: 'var(--gray-400)', letterSpacing: '0.05em' }}>Create an account</Link>
          </div>
        </div>
      </div>

      {/* SLIDING CART DRAWER */}
      <div style={{ 
        position: 'fixed', inset: 0, zIndex: 1000, pointerEvents: isCartOpen ? 'auto' : 'none'
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
                      <p className="fs-xs uppercase" style={{ color: 'var(--gray-400)', marginTop: '0.2rem' }}>{item.price}</p>
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
            <Link href="/checkout" onClick={() => setIsCartOpen(false)} style={{ display: 'block' }}>
              <button className="btn btn-full" disabled={cartItems.length === 0} style={{ opacity: cartItems.length === 0 ? 0.5 : 1, width: '100%' }}>CHECKOUT</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
