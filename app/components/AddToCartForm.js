'use client';
import { useCart } from '../context/CartContext';

export default function AddToCartForm({ product }) {
  const { addToCart } = useCart();

  return (
    <button 
      className="btn btn-full hover-scale" 
      style={{ padding: '1.5rem', fontSize: '1rem', cursor: 'pointer' }}
      onClick={() => addToCart(product)}
    >
      CLAIM THIS PIECE
    </button>
  );
}
