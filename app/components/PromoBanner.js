'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop',
    title: 'CHAOS DIVISION',
    linkText: 'SHOP NOW',
    href: '/shop'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1600&auto=format&fit=crop',
    title: 'THE FALLEN ANGEL',
    linkText: 'EXPLORE COLLECTION',
    href: '/shop/fallen-angel-zip'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=1600&auto=format&fit=crop',
    title: 'OUTLAST THE VALLEY',
    linkText: 'VIEW LOOKBOOK',
    href: '/about-us'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop',
    title: 'NEW ORIGINS',
    linkText: 'DISCOVER MORE',
    href: '/shop'
  }
];

export default function PromoBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{ padding: '2rem 1rem', backgroundColor: 'var(--background)' }}>
      <div className="container" style={{ maxWidth: '1800px' }}>
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          height: 'clamp(400px, 60vh, 700px)', 
          borderRadius: '16px', 
          overflow: 'hidden' 
        }}>
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: currentSlide === index ? 1 : 0,
                transition: 'opacity 0.8s ease-in-out',
                zIndex: currentSlide === index ? 1 : 0
              }}
            >
              {/* Background Image */}
              <img 
                src={slide.image} 
                alt={slide.title} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover' 
                }} 
              />
              
              {/* Gradient Overlay for Text Readability */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 40%)'
              }} />

              {/* Content */}
              <div style={{
                position: 'absolute',
                bottom: '3rem',
                left: '0',
                right: '0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                color: '#ffffff',
                transform: currentSlide === index ? 'translateY(0)' : 'translateY(20px)',
                opacity: currentSlide === index ? 1 : 0,
                transition: 'all 0.8s ease-out 0.2s'
              }}>
                <h2 className="fs-2xl fw-black uppercase" style={{ letterSpacing: '0.05em', textAlign: 'center' }}>
                  {slide.title}
                </h2>
                
                <Link href={slide.href} style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: '700', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em',
                  borderBottom: '1px solid #ffffff',
                  paddingBottom: '2px',
                  transition: 'opacity 0.3s ease'
                }} className="hover-scale">
                  {slide.linkText}
                </Link>
              </div>
            </div>
          ))}

          {/* Carousel Dots */}
          <div style={{ 
            position: 'absolute', 
            bottom: '1.5rem', 
            left: '0', 
            right: '0', 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '8px',
            zIndex: 10
          }}>
            {slides.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentSlide(index)}
                style={{
                  width: currentSlide === index ? '24px' : '6px',
                  height: currentSlide === index ? '4px' : '6px',
                  borderRadius: currentSlide === index ? '2px' : '50%',
                  backgroundColor: '#ffffff',
                  opacity: currentSlide === index ? 1 : 0.5,
                  marginTop: currentSlide === index ? '0' : '-1px',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.3s ease'
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
