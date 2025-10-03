// useScrollBlur.js
// Custom React hook for scroll-based navbar shrink/blur
import { useEffect, useState } from 'react';

export function useScrollBlur(threshold = 32) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > threshold);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}
