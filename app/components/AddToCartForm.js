'use client';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function AddToCartForm({ product }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size first.');
      return;
    }
    addToCart({ ...product, selectedSize });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <span className="fs-sm fw-bold uppercase" style={{ letterSpacing: '0.05em' }}>Size</span>
          <button style={{ background: 'none', border: 'none', textDecoration: 'underline', color: 'var(--gray-400)', cursor: 'pointer', fontSize: '0.75rem', textTransform: 'uppercase' }}>Size Guide</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem' }}>
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              style={{
                padding: '0.75rem',
                backgroundColor: selectedSize === size ? 'var(--foreground)' : 'transparent',
                color: selectedSize === size ? 'var(--background)' : 'var(--foreground)',
                border: '1px solid var(--gray-600)',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.875rem',
                transition: 'all 0.2s ease',
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      <button 
        className="btn btn-full hover-scale" 
        style={{ padding: '1.5rem', fontSize: '1rem', cursor: 'pointer', fontWeight: '900', letterSpacing: '0.1em' }}
        onClick={handleAddToCart}
      >
        ADD TO CART
      </button>
    </div>
  );
}
