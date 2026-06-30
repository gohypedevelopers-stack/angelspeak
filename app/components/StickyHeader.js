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
      backgroundColor: scrolled ? 'var(--background)' : 'transparent',
      transition: 'background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      borderBottom: scrolled ? '1px solid var(--gray-800)' : '1px solid transparent'
    }}>
      <div 
        className="announcement-bar fs-xs fw-bold text-center uppercase" 
        style={{ 
          backgroundColor: 'var(--foreground)', 
          color: 'var(--background)', 
          padding: scrolled ? '0' : '8px 0', 
          letterSpacing: '0.05em',
          height: scrolled ? '0px' : 'auto',
          opacity: scrolled ? 0 : 1,
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        DROP 1 — BUILT IN CHAOS. 1 AUGUST. 250 PIECES. NO RESTOCK.
      </div>
      <Navbar />
    </div>
  );
}
