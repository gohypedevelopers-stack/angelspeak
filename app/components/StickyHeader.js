'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function StickyHeader() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(!isHome);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(!isHome || window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      zIndex: 100, 
      backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.7)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent'
    }}>
      <div 
        className="announcement-bar fs-xs fw-bold text-center uppercase" 
        style={{ 
          backgroundColor: 'transparent', 
          color: 'var(--foreground)', 
          padding: scrolled ? '0' : '10px 0', 
          letterSpacing: '0.1em',
          height: scrolled ? '0px' : 'auto',
          opacity: scrolled ? 0 : 1,
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          borderBottom: scrolled ? 'none' : '1px solid rgba(255,255,255,0.1)'
        }}
      >
        DROP 1 — BUILT IN CHAOS. 1 AUGUST. 250 PIECES. NO RESTOCK.
      </div>
      <Navbar />
    </div>
  );
}
