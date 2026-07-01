'use client';
import { useState, useRef, useEffect } from 'react';

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // High-quality public placeholder ambient drone/rain sound
    audioRef.current = new Audio('https://actions.google.com/sounds/v1/weather/rain_on_roof.ogg'); 
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2; 
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log('Audio play blocked by browser', e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button 
      onClick={toggleAudio}
      style={{
        position: 'fixed', bottom: '2rem', left: '2rem', zIndex: 90,
        background: 'transparent', border: 'none', color: 'var(--foreground)',
        textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '0.1em',
        cursor: 'pointer', outline: 'none', opacity: 0.5, transition: 'opacity 0.3s ease',
        mixBlendMode: 'difference'
      }}
      onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
      onMouseOut={(e) => e.currentTarget.style.opacity = '0.5'}
    >
      [ SOUND {isPlaying ? 'ON' : 'OFF'} ]
    </button>
  );
}
