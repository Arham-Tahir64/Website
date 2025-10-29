"use client";

import { useEffect, useRef } from 'react';

export function DotGridBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Optional subtle parallax on mouse move for depth
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      el.style.transform = `translate3d(${x * 8}px, ${y * 8}px, 0)`;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return <div ref={ref} className="dot-grid" aria-hidden />;
}

export default DotGridBackground;

