import React from 'react';

export default function useScroll() {
  const [scroll, setScroll] = React.useState(0);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  const calculateDistanceToTop = (componentRef: HTMLDivElement | null) => {
    if (componentRef) {
      const distance = componentRef.offsetTop;
      return distance;
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    scroll,
    calculateDistanceToTop,
  };
}
