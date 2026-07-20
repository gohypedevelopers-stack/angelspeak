'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();
  const { cartItems, cartCount, cartTotal, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, checkoutUrl, isUpdating } = useCart();

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
          .then(res => res.json())
          .then(data => {
            setSearchResults(data.products || []);
            setIsSearching(false);
          });
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav className="main-nav" style={{ position: 'relative', overflow: 'visible' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', position: 'relative' }}>
          
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
          <div className={`logo-container ${isSearchOpen ? 'search-open' : ''}`} style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', display: 'flex', justifyContent: 'center', zIndex: 10, transition: 'opacity 0.2s ease' }}>
            <Link href="/" className="hover-scale" style={{ display: 'inline-block' }}>
              <img src="/Angel_peak_name_White.png" alt="Angels Peak" className="logo-img" style={{ height: 'clamp(24px, 8vw, 60px)', width: 'auto', objectFit: 'contain' }} />
            </Link>
          </div>

          {/* Right: Utility Icons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1.5rem', alignItems: 'center', flex: 1 }} ref={searchRef}>
            
            {/* Expandable Search */}
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              <div className={`search-input-wrapper ${isSearchOpen ? 'open' : ''}`} style={{ 
                overflow: 'hidden', 
                transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                alignItems: 'center'
              }}>
                <form onSubmit={handleSearch} style={{ width: '100%', paddingRight: '0.5rem' }}>
                  <input 
                    type="text" 
                    placeholder="SEARCH..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus={isSearchOpen}
                    style={{ 
                      width: '100%', background: 'transparent', border: 'none', 
                      borderBottom: '1px solid var(--gray-400)', color: 'var(--foreground)', 
                      fontSize: '0.875rem', outline: 'none', padding: '0.25rem 0',
                      textTransform: 'uppercase'
                    }} 
                  />
                </form>
              </div>
              <button className="hover-scale" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }} onClick={() => {
                if (isSearchOpen && searchQuery) {
                  handleSearch(new Event('submit'));
                } else {
                  setIsSearchOpen(!isSearchOpen);
                  if (isSearchOpen) setSearchQuery('');
                }
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </button>

              {/* Live Search Dropdown */}
              {isSearchOpen && searchQuery.trim().length > 1 && (
                <div style={{ 
                  position: 'absolute', top: '100%', right: 0, marginTop: '1rem',
                  width: '300px', backgroundColor: 'var(--background)', 
                  border: '1px solid var(--gray-800)', borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.5)', overflow: 'hidden', zIndex: 50
                }}>
                  {isSearching ? (
                    <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--gray-400)', fontSize: '0.875rem' }}>SEARCHING...</div>
                  ) : searchResults.length > 0 ? (
                    <div>
                      {searchResults.map(product => (
                        <Link 
                          key={product.id} 
                          href={`/shop/${product.handle}`}
                          onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                          style={{ 
                            display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', 
                            borderBottom: '1px solid var(--gray-800)', textDecoration: 'none', color: 'inherit'
                          }}
                          className="hover-bg-gray"
                        >
                          <img src={product.images?.edges?.[0]?.node?.url || '/placeholder.png'} alt={product.title} style={{ width: '40px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.875rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{product.title}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>₹{parseFloat(product.priceRange?.minVariantPrice?.amount || 0).toLocaleString('en-IN')}</div>
                          </div>
                        </Link>
                      ))}
                      <div style={{ padding: '0.75rem', textAlign: 'center' }}>
                        <button onClick={handleSearch} style={{ background: 'none', border: 'none', color: 'var(--foreground)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}>
                          VIEW ALL RESULTS
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--gray-400)', fontSize: '0.875rem' }}>NO PIECES FOUND.</div>
                  )}
                </div>
              )}
            </div>

            {/* Account */}
            <a href="https://account.angelspeak.in/account/login" className="hover-scale desktop-only" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <span style={{ fontSize: '0.875rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ACCOUNT</span>
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

        <style dangerouslySetInnerHTML={{__html: `
          .main-nav { padding: 1.5rem 3rem; }
          .hover-bg-gray:hover { background-color: var(--gray-900); }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          .search-input-wrapper { width: 0px; }
          .search-input-wrapper.open { width: clamp(150px, 20vw, 250px); }
          
          @media (max-width: 768px) {
            .desktop-only { display: none !important; }
            .main-nav { padding: 1rem 1.5rem !important; }
            .logo-img { height: 28px !important; }
            .logo-container.search-open { opacity: 0; pointer-events: none; }
            .search-input-wrapper.open { width: calc(100vw - 8rem) !important; }
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
        <div className="no-scrollbar" style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '1.25rem', fontWeight: '600', textTransform: 'uppercase', overflowY: 'auto' }}>
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover-scale" style={{ transformOrigin: 'left' }}>Home</Link>
          <Link href="/shop" onClick={() => setIsMenuOpen(false)} className="hover-scale" style={{ transformOrigin: 'left' }}>All Drops</Link>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '1rem', marginBottom: '0.5rem' }}>
            <Link href="/shop#exile-mode" onClick={() => setIsMenuOpen(false)} className="hover-scale" style={{ transformOrigin: 'left', fontSize: '1rem', color: 'var(--gray-400)' }}>- Exile Mode</Link>
            <Link href="/shop#peak-state" onClick={() => setIsMenuOpen(false)} className="hover-scale" style={{ transformOrigin: 'left', fontSize: '1rem', color: 'var(--gray-400)' }}>- Peak State</Link>
            <Link href="/shop#fallen-division" onClick={() => setIsMenuOpen(false)} className="hover-scale" style={{ transformOrigin: 'left', fontSize: '1rem', color: 'var(--gray-400)' }}>- Fallen Division</Link>
            <Link href="/shop#final-form" onClick={() => setIsMenuOpen(false)} className="hover-scale" style={{ transformOrigin: 'left', fontSize: '1rem', color: 'var(--gray-400)' }}>- Final Form</Link>
          </div>
          <Link href="/about-us" onClick={() => setIsMenuOpen(false)} className="hover-scale" style={{ transformOrigin: 'left' }}>About Us</Link>
          <a href="https://account.angelspeak.in/account/login" onClick={() => setIsMenuOpen(false)} className="hover-scale" style={{ transformOrigin: 'left', marginTop: '0.5rem', borderTop: '1px solid var(--gray-800)', paddingTop: '1.5rem', textDecoration: 'none' }}>Account</a>
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--gray-800)', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.75rem', color: 'var(--gray-400)', textTransform: 'none', fontWeight: 'normal' }}>
            <strong>Contact Us</strong>
            <span>Email: theangelspeak@gmail.com</span>
            <span>Phone: 8393900007</span>
            <span>Address: Janta Tyre Retreading Works, Khanna Farm, Teenpani, Haldwani, Uttarakhand 263139</span>
          </div>
        </div>
      </div>
      </div>



    </>
  );
}
