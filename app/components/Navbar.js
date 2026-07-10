'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartItems, cartCount, cartTotal, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, checkoutUrl, isUpdating } = useCart();

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
            <a href="https://51q8ch-m3.myshopify.com/account/login" className="hover-scale desktop-only" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <span style={{ fontSize: '0.875rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>LOG IN</span>
            </a>
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



    </>
  );
}
