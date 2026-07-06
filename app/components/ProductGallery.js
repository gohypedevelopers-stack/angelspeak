'use client';
import { useRef, useEffect, useState } from 'react';

import Image from 'next/image';

export default function ProductGallery({ product }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const maskRef = useRef(null);
  const [translateY, setTranslateY] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null); // Lightbox state

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [
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
      
      const offsetTop = 128;
      const scrolledPast = offsetTop - containerRect.top;
      const stickyChild = containerRef.current.firstElementChild;
      const stickyChildHeight = stickyChild ? stickyChild.offsetHeight : 0;
      const totalScrollable = containerRef.current.offsetHeight - stickyChildHeight;
      
      if (scrolledPast > 0 && totalScrollable > 0) {
        let progress = scrolledPast / totalScrollable;
        progress = Math.max(0, Math.min(1, progress));
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

  // Prevent background scrolling and add keyboard nav when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
      
      const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
        if (e.key === 'ArrowRight') setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        if (e.key === 'Escape') setSelectedIndex(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'auto';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedIndex, images.length]);

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .gallery-container { height: 250vh; position: relative; }
        .gallery-sticky { position: sticky; top: 8rem; display: grid; grid-template-columns: 2.05fr 1fr; gap: 1rem; align-items: start; }
        .small-images-mask { position: relative; width: 100%; aspect-ratio: 1 / 2.05; border-radius: 12px; overflow: hidden; }
        .small-images-track { display: flex; flex-direction: column; gap: 1rem; transition: transform 0.1s ease-out; }
        .small-image-item { position: relative; width: 100%; aspect-ratio: 1/1; border-radius: 12px; overflow: hidden; background-color: #F0F0F0; flex-shrink: 0; cursor: zoom-in; }
        .big-image-item { position: relative; width: 100%; aspect-ratio: 1/1; border-radius: 12px; overflow: hidden; background-color: #F0F0F0; cursor: zoom-in; }
        
        @media (max-width: 768px) {
          .gallery-container { height: auto !important; }
          .gallery-sticky { position: static !important; display: flex !important; flex-direction: column !important; gap: 1rem !important; }
          .small-images-mask { aspect-ratio: auto !important; overflow: visible !important; }
          .small-images-track { flex-direction: row !important; overflow-x: auto !important; scroll-snap-type: x mandatory; padding-bottom: 0.5rem; transform: none !important; }
          .small-images-track::-webkit-scrollbar { display: none; }
          .small-image-item { width: 85% !important; scroll-snap-align: center; }
        }
      `}} />
      <div ref={containerRef} className="gallery-container">
        <div className="gallery-sticky">
          
          {/* Big Image (Perfect Square) */}
          <div className="big-image-item" onClick={() => {
            const idx = images.indexOf(product.image);
            setSelectedIndex(idx !== -1 ? idx : 0);
          }}>
            <Image 
              src={product.image} 
              alt={`${product.title} Main`} 
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              style={{ objectFit: 'cover' }} 
            />
          </div>

          {/* Small Images Mask */}
          <div ref={maskRef} className="small-images-mask">
            <div ref={trackRef} className="small-images-track" style={{ transform: `translateY(-${translateY}px)` }}>
              {images.map((img, i) => (
                <div key={i} className="small-image-item" onClick={() => setSelectedIndex(i)}>
                  <Image 
                    src={img} 
                    alt={`${product.title} Detail ${i + 1}`} 
                    fill
                    sizes="(max-width: 768px) 85vw, 25vw"
                    style={{ objectFit: 'cover' }} 
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox / Fullscreen Modal */}
      {selectedIndex !== null && (
        <div 
          style={{ 
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
            backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 99999, display: 'flex', 
            justifyContent: 'center', alignItems: 'center', cursor: 'zoom-out',
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)'
          }}
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close Button */}
          <button 
            style={{ 
              position: 'absolute', top: '2rem', right: '2rem', background: 'rgba(255,255,255,0.1)', 
              border: 'none', color: 'white', cursor: 'pointer', zIndex: 100000, 
              width: '44px', height: '44px', borderRadius: '50%', display: 'flex', 
              justifyContent: 'center', alignItems: 'center', transition: 'background 0.2s'
            }} 
            onClick={() => setSelectedIndex(null)}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          {/* Prev Button */}
          <button 
            style={{ 
              position: 'absolute', left: '2rem', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', 
              cursor: 'pointer', zIndex: 100000, width: '56px', height: '56px', 
              borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center',
              transition: 'background 0.2s'
            }} 
            onClick={handlePrev}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          {/* Next Button */}
          <button 
            style={{ 
              position: 'absolute', right: '2rem', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', 
              cursor: 'pointer', zIndex: 100000, width: '56px', height: '56px', 
              borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center',
              transition: 'background 0.2s'
            }} 
            onClick={handleNext}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          <div style={{ position: 'relative', width: '90%', height: '90%' }}>
            <Image 
              src={images[selectedIndex]} 
              alt="Enlarged view" 
              fill 
              style={{ objectFit: 'contain' }} 
              sizes="100vw" 
              priority
            />
          </div>
          
          {/* Image Counter */}
          <div style={{
            position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', letterSpacing: '0.1em'
          }}>
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
