import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = ({ initialVisible = false, threshold = 0.2 } = {}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(initialVisible);
  const hasAnimated = useRef(initialVisible);

  useEffect(() => {
    if (hasAnimated.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return [elementRef, isVisible];
};
