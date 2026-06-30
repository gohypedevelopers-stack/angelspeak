'use client';

import { useEffect, useRef } from 'react';

export default function ReelVideo({ src }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      // Force muted and autoplay to bypass strict browser policies
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(e => console.log('Autoplay blocked:', e));
    }
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      controls
      className="reel-video"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  );
}
