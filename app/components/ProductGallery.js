'use client';
import { useRef, useEffect, useState } from 'react';

import Image from 'next/image';

export default function ProductGallery({ product }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const maskRef = useRef(null);
  const [translateY, setTranslateY] = useState(0);

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
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .gallery-container { height: 250vh; position: relative; }
        .gallery-sticky { position: sticky; top: 8rem; display: grid; grid-template-columns: 2.05fr 1fr; gap: 1rem; align-items: start; }
        .small-images-mask { position: relative; width: 100%; aspect-ratio: 1 / 2.05; border-radius: 12px; overflow: hidden; }
        .small-images-track { display: flex; flex-direction: column; gap: 1rem; transition: transform 0.1s ease-out; }
        .small-image-item { position: relative; width: 100%; aspect-ratio: 1/1; border-radius: 12px; overflow: hidden; background-color: #F0F0F0; flex-shrink: 0; }
        
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
          <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#F0F0F0' }}>
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
                <div key={i} className="small-image-item">
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
    </>
  );
}
