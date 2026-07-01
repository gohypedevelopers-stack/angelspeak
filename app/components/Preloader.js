'use client';
import { useState, useEffect } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = 'hidden';
    
    // Unmount after 2.5 seconds (gives time for fade out)
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = '';
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  if (!loading) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 999999, backgroundColor: 'var(--background)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'preloaderFadeOut 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.5s forwards'
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes preloaderFadeOut {
          to { opacity: 0; visibility: hidden; transform: scale(1.05); }
        }
        @keyframes flicker {
          0% { opacity: 0; }
          10% { opacity: 1; }
          20% { opacity: 0; }
          30% { opacity: 1; }
          70% { opacity: 1; }
          80% { opacity: 0; }
          90% { opacity: 1; }
          100% { opacity: 1; }
        }
        .preloader-text {
          animation: flicker 1.5s ease-in-out forwards;
        }
      `}} />
      <h1 className="fs-xl fw-black uppercase preloader-text" style={{ color: 'var(--foreground)', letterSpacing: '0.3em', textAlign: 'center', padding: '0 1rem' }}>
        DIVISION 01 — NO RETURN
      </h1>
    </div>
  );
}
