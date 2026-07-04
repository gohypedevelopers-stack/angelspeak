'use client';
import { useState } from 'react';

export default function ProductTabs({ description, fabric }) {
  const [activeTab, setActiveTab] = useState('Details & Description');

  const tabs = ['Details & Description', 'Washcare', 'Shipping'];

  return (
    <div style={{ marginTop: '3rem' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid var(--gray-800)', gap: '2rem' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '1rem 0',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab ? '1px solid var(--foreground)' : '1px solid transparent',
              color: activeTab === tab ? 'var(--foreground)' : 'var(--gray-400)',
              fontSize: '0.875rem',
              fontWeight: activeTab === tab ? '600' : '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginBottom: '-1px'
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div style={{ paddingTop: '2rem' }}>
        {activeTab === 'Details & Description' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem', color: 'var(--gray-400)', lineHeight: '1.6' }}>
            <div>
              <h4 className="fw-bold" style={{ color: 'var(--foreground)', marginBottom: '0.5rem' }}>Details</h4>
              <p>{fabric}</p>
            </div>
            <div>
              <h4 className="fw-bold" style={{ color: 'var(--foreground)', marginBottom: '0.5rem' }}>Description</h4>
              <p>{description}</p>
            </div>
          </div>
        )}
        {activeTab === 'Washcare' && (
          <div style={{ fontSize: '0.875rem', color: 'var(--gray-400)', lineHeight: '1.6' }}>
            <p>Machine wash cold with like colors.</p>
            <p>Do not bleach.</p>
            <p>Tumble dry low or hang dry for best results.</p>
            <p>Do not iron on print.</p>
          </div>
        )}
        {activeTab === 'Shipping' && (
          <div style={{ fontSize: '0.875rem', color: 'var(--gray-400)', lineHeight: '1.6' }}>
            <p>Free prepaid shipping pan-India.</p>
            <p>Dispatched in 24-48 hours.</p>
            <p>Easy size exchanges within 7 days of delivery.</p>
          </div>
        )}
      </div>
    </div>
  );
}
