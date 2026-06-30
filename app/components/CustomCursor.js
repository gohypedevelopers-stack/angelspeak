'use client';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (window.matchMedia("(any-hover: none)").matches) {
      setIsMobile(true);
      return;
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e) => {
      const isClickable = 
        e.target.tagName?.toLowerCase() === 'button' ||
        e.target.tagName?.toLowerCase() === 'a' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.closest('.hover-scale') ||
        e.target.closest('.group');

      setHovering(!!isClickable);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  if (!mounted || isMobile) return null;

  return (
    <div 
      className="custom-cursor"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${hovering ? 3 : 1})`,
        backgroundColor: hovering ? 'transparent' : 'var(--foreground)',
        border: hovering ? '1px solid var(--foreground)' : 'none',
        opacity: (position.x === 0 && position.y === 0) ? 0 : 1
      }}
    />
  );
}
