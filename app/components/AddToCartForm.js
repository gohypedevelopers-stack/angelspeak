'use client';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function AddToCartForm({ product }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size first.');
      return;
    }
    addToCart({ ...product, selectedSize });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--gray-200)', fontWeight: '500' }}>Select Size</span>
          <button 
            className="hover-opacity" 
            onClick={() => setShowSizeGuide(true)}
            style={{ background: 'transparent', border: 'none', color: 'var(--gray-400)', cursor: 'pointer', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'underline' }}
          >
            Size Guide
          </button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'flex-start' }}>
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              style={{
                minWidth: '64px',
                padding: '0.75rem 1rem',
                backgroundColor: selectedSize === size ? 'var(--foreground)' : 'transparent',
                color: selectedSize === size ? 'var(--background)' : 'var(--gray-200)',
                border: selectedSize === size ? '1px solid var(--foreground)' : '1px solid var(--gray-700)',
                borderRadius: '30px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '0.875rem',
                transition: 'all 0.2s ease',
                flexGrow: 1,
                textAlign: 'center'
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <button 
          className="hover-opacity" 
          style={{ padding: '1.25rem', fontSize: '0.875rem', cursor: 'pointer', fontWeight: '600', letterSpacing: '0.05em', backgroundColor: 'transparent', color: 'var(--foreground)', border: '1px solid var(--gray-600)', borderRadius: '30px', textTransform: 'uppercase', transition: 'all 0.2s ease' }}
          onClick={handleAddToCart}
        >
          Add to Bag
        </button>
        <button 
          className="hover-opacity" 
          style={{ padding: '1.25rem', fontSize: '0.875rem', cursor: 'pointer', fontWeight: '600', letterSpacing: '0.05em', backgroundColor: 'var(--foreground)', color: 'var(--background)', border: '1px solid var(--foreground)', borderRadius: '30px', textTransform: 'uppercase', transition: 'all 0.2s ease' }}
          onClick={() => {
            handleAddToCart();
            if (selectedSize) {
              window.location.href = '/checkout';
            }
          }}
        >
          Buy Now
        </button>
      </div>

      {showSizeGuide && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)' }} onClick={() => setShowSizeGuide(false)}>
          <div style={{ backgroundColor: 'var(--background)', border: '1px solid var(--gray-800)', borderRadius: '16px', padding: '3rem', width: '90%', maxWidth: '500px', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setShowSizeGuide(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'var(--foreground)', cursor: 'pointer', fontSize: '1.5rem', lineHeight: 1 }}
            >
              &times;
            </button>
            <h2 className="fs-xl fw-bold uppercase" style={{ marginBottom: '2rem', letterSpacing: '0.05em', textAlign: 'center' }}>Size Guide</h2>
            <div style={{ width: '100%', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--gray-800)' }}>
                    <th style={{ padding: '1rem', color: 'var(--gray-400)', fontWeight: '500' }}>Size</th>
                    <th style={{ padding: '1rem', color: 'var(--gray-400)', fontWeight: '500' }}>Chest (in)</th>
                    <th style={{ padding: '1rem', color: 'var(--gray-400)', fontWeight: '500' }}>Length (in)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--gray-900)' }}>
                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>XS</td>
                    <td style={{ padding: '1rem' }}>40</td>
                    <td style={{ padding: '1rem' }}>26</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--gray-900)' }}>
                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>S</td>
                    <td style={{ padding: '1rem' }}>42</td>
                    <td style={{ padding: '1rem' }}>27</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--gray-900)' }}>
                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>M</td>
                    <td style={{ padding: '1rem' }}>44</td>
                    <td style={{ padding: '1rem' }}>28</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--gray-900)' }}>
                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>L</td>
                    <td style={{ padding: '1rem' }}>46</td>
                    <td style={{ padding: '1rem' }}>29</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>XL</td>
                    <td style={{ padding: '1rem' }}>48</td>
                    <td style={{ padding: '1rem' }}>30</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ marginTop: '2rem', fontSize: '0.75rem', color: 'var(--gray-400)', textAlign: 'center' }}>Measurements are approximate and may vary slightly.</p>
          </div>
        </div>
      )}
    </div>
  );
}
