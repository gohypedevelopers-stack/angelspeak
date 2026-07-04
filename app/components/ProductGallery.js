'use client';
import { useRef, useEffect, useState } from 'react';

export default function ProductGallery({ product }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const maskRef = useRef(null);
  const [translateY, setTranslateY] = useState(0);

  const images = [
    product.hoverImage || product.image,
    product.image,
    product.hoverImage || product.image,
    product.image
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current || !maskRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const maskHeight = maskRef.current.offsetHeight;
      const trackHeight = trackRef.current.offsetHeight;
      
      // The sticky element is at top: 8rem (128px)
      const offsetTop = 128;
      
      // Calculate how far we have scrolled past the sticky point
      const scrolledPast = offsetTop - containerRect.top;
      
      // The sticky container is the first child
      const stickyChild = containerRef.current.firstElementChild;
      const stickyChildHeight = stickyChild ? stickyChild.offsetHeight : 0;
      
      // The total scrollable distance for the sticky effect is the container height minus the sticky child's height
      const totalScrollable = containerRef.current.offsetHeight - stickyChildHeight;
      
      if (scrolledPast > 0 && totalScrollable > 0) {
        let progress = scrolledPast / totalScrollable;
        progress = Math.max(0, Math.min(1, progress));
        
        // Max distance the track can translate
        const maxTranslate = trackHeight - maskHeight;
        setTranslateY(progress * maxTranslate);
      } else if (scrolledPast <= 0) {
        setTranslateY(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} style={{ height: '250vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: '8rem', display: 'grid', gridTemplateColumns: '2.05fr 1fr', gap: '1rem', alignItems: 'start' }}>
        
        {/* Big Image (Perfect Square) */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#F0F0F0' }}>
          <img 
            src={product.image} 
            alt={`${product.title} Main`} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
          />
        </div>

        {/* Small Images Mask (Perfectly fits 2 squares) */}
        <div ref={maskRef} style={{ position: 'relative', width: '100%', aspectRatio: '1 / 2.05', borderRadius: '12px', overflow: 'hidden' }}>
          <div ref={trackRef} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', transform: `translateY(-${translateY}px)`, transition: 'transform 0.1s ease-out' }}>
            {images.map((img, i) => (
              <div key={i} style={{ position: 'relative', width: '100%', aspectRatio: '1/1', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#F0F0F0', flexShrink: 0 }}>
                <img 
                  src={img} 
                  alt={`${product.title} Detail ${i + 1}`} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
