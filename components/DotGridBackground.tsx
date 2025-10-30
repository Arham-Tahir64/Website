"use client";

import { useEffect, useRef } from 'react';

export function DotGridBackground() {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!el.current) return;
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      if (el.current) {
        el.current.style.transform = `translate3d(${x * 8}px, ${y * 8}px, 0)`;
      }
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return <div ref={el} className="dot-grid" aria-hidden />;
}

export default DotGridBackground;

