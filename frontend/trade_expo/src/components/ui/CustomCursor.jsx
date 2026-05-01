import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, input, .interactive')) {
        setHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, input, .interactive')) {
        setHovering(false);
      }
    };

    if (window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('mousemove', handleMouseMove);
      document.body.addEventListener('mouseover', handleMouseOver);
      document.body.addEventListener('mouseout', handleMouseOut);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isVisible]);

  if (!window.matchMedia('(pointer: fine)').matches || !isVisible) return null;

  return (
    <>
      <div 
        className={`cursor-dot hidden md:block fixed pointer-events-none rounded-full z-[999999] bg-brand-accent transition-opacity duration-300 ${hovering ? 'opacity-0' : 'opacity-100'}`}
        style={{
          top: position.y,
          left: position.x,
          width: '8px',
          height: '8px',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div 
        className={`cursor-outline hidden md:block fixed pointer-events-none rounded-full z-[999999] border transition-all duration-100 ${hovering ? 'w-[70px] h-[70px] bg-brand-accent/15 border-brand-accent mix-blend-exclusion' : 'w-[40px] h-[40px] border-brand-accent/50'}`}
        style={{
          top: position.y,
          left: position.x,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
};

export default CustomCursor;
