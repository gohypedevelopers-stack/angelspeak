'use client';
import { useState } from 'react';

export default function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ borderTop: '1px solid var(--gray-800)' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: '100%', padding: '2rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', color: 'var(--foreground)', cursor: 'pointer', outline: 'none' }}
      >
        <h3 className="fs-sm fw-bold uppercase" style={{ letterSpacing: '0.05em', margin: 0 }}>{title}</h3>
        <span style={{ fontSize: '1.5rem', fontWeight: '300', transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s ease' }}>+</span>
      </button>
      <div style={{ maxHeight: isOpen ? '500px' : '0', opacity: isOpen ? 1 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease, opacity 0.4s ease' }}>
        <div style={{ paddingBottom: '2rem' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
