'use client';
import { useRef, useEffect, useState } from 'react';

export default function ScrollReveal({ children, delay = 0, className = '' }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Only reveal once
          if (currentRef) observer.unobserve(currentRef);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.15, // Trigger when 15% of the element is visible
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
}
