// useParallax.js
// Custom React hook for parallax background effect
import { useEffect, useRef } from 'react';

export function useParallax(strength = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    function handleMouseMove(e) {
      const el = ref.current;
      if (!el) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      el.style.transform = `translate(${x * strength * 40}px, ${y * strength * 40}px)`;
    }
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength]);

  return ref;
}
