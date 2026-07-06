'use client';

import Link from 'next/link';
import Image from 'next/image';
import { products } from '../../data/products';
import { useCart } from '../context/CartContext';

export default function Shop() {
  const { addToCart } = useCart();

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '8rem', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <div className="container" style={{ maxWidth: '1800px' }}>
        
        {/* Premium Hero Section */}
        <div style={{ marginBottom: '6rem', textAlign: 'center', position: 'relative' }} className="animate-fade-in">
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
            borderRadius: '50%', zIndex: 0, pointerEvents: 'none'
          }}></div>
          
          <h1 className="fs-4xl fw-black uppercase" style={{ 
            marginBottom: '1.5rem', letterSpacing: '0.08em', position: 'relative', zIndex: 1,
            background: 'linear-gradient(to right, var(--foreground), var(--gray-400))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block'
          }}>
            The Drops
          </h1>
          <p className="fs-base mx-auto" style={{ 
            color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em', 
            maxWidth: '600px', position: 'relative', zIndex: 1, lineHeight: '1.6'
          }}>
            Drop 1 — Built in Chaos. Six pieces, limited numbers, no restock. Choose your chapter.
          </p>
        </div>

        {/* Product Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '4rem 2rem' 
        }}>
          {products.map((product, index) => (
            <div key={product.id} className={`group animate-fade-in delay-${(index % 3) * 100}`} style={{ display: 'flex', flexDirection: 'column' }}>
              
              <div style={{ 
                aspectRatio: '4/5', backgroundColor: '#F0F0F0', borderRadius: '16px', 
                marginBottom: '1.5rem', overflow: 'hidden', position: 'relative', width: '100%' 
              }}>
                <Link href={`/shop/${product.slug}`} className="no-hover" style={{ display: 'block', width: '100%', height: '100%' }}>
                  <Image 
                    src={product.image} 
                    alt={product.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="primary-img"
                    style={{ objectFit: 'cover', transition: 'opacity 0.6s ease, transform 1s ease' }} 
                  />
                  {product.hoverImage && (
                    <Image 
                      src={product.hoverImage} 
                      alt={`${product.title} Alternate`} 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="hover-img"
                      style={{ objectFit: 'cover', opacity: 0, transition: 'opacity 0.6s ease, transform 1s ease' }} 
                    />
                  )}
                </Link>
                
                {/* Scarcity Badge */}
                <div style={{ 
                  position: 'absolute', top: '1rem', left: '1rem', 
                  background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                  color: '#fff', fontSize: '0.7rem', padding: '0.4rem 0.8rem', borderRadius: '30px',
                  textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 'bold'
                }}>
                  Limited
                </div>

                {/* Quick Add Button */}
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product);
                  }}
                  className="quick-add-btn"
                  style={{
                    position: 'absolute', bottom: '1rem', left: '50%', transform: 'translate(-50%, 20px)',
                    width: 'calc(100% - 2rem)', padding: '1rem', borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0,0,0,0.1)', color: '#000', fontWeight: 'bold', 
                    textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer',
                    opacity: 0, transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', zIndex: 10
                  }}
                >
                  Quick Add — {product.price}
                </button>
              </div>

              {/* Product Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', padding: '0 0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Link href={`/shop/${product.slug}`} className="fw-bold uppercase fs-base hover-underline" style={{ letterSpacing: '0.05em' }}>
                    {product.title}
                  </Link>
                  <span className="fs-sm fw-bold" style={{ color: 'var(--foreground)' }}>{product.price}</span>
                </div>
                <p className="fs-xs" style={{ color: 'var(--gray-400)', lineHeight: '1.4' }}>{product.chapter}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .group:hover .primary-img { opacity: 0; transform: scale(1.03); }
        .group:hover .hover-img { opacity: 1; transform: scale(1.05); }
        .group:hover .quick-add-btn { opacity: 1; transform: translate(-50%, 0); box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .quick-add-btn:hover { background: #000 !important; color: #fff !important; border-color: #000 !important; }
        .hover-underline:hover { text-decoration: underline; text-underline-offset: 4px; }
      `}} />
    </div>
  );
}
