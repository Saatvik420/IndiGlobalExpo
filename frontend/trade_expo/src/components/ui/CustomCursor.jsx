import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('.interactive, a, button, input, textarea, select')) {
        setHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('.interactive, a, button, input, textarea, select')) {
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
  }, []);

  if (!window.matchMedia('(pointer: fine)').matches) return null;

  return (
    <>
      <div 
        className="cursor-dot hidden md:block fixed"
        style={{
          top: position.y,
          left: position.x,
          width: '8px',
          height: '8px',
          backgroundColor: '#cfa670',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 999999,
          pointerEvents: 'none',
          opacity: hovering ? 0 : 1,
          transition: 'opacity 0.3s'
        }}
      />
      <div 
        className="cursor-outline hidden md:block fixed"
        style={{
          top: position.y,
          left: position.x,
          width: hovering ? '70px' : '40px',
          height: hovering ? '70px' : '40px',
          border: `1px solid ${hovering ? '#cfa670' : 'rgba(207, 166, 112, 0.5)'}`,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 999999,
          pointerEvents: 'none',
          backgroundColor: hovering ? 'rgba(207, 166, 112, 0.15)' : 'transparent',
          mixBlendMode: hovering ? 'exclusion' : 'normal',
          transition: 'width 0.3s, height 0.3s, background-color 0.3s, border-color 0.3s'
        }}
      />
    </>
  );
};

export default CustomCursor;
