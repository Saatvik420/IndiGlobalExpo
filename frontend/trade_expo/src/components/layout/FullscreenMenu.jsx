import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FullscreenMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 z-[50] flex flex-col justify-center items-center">
      <nav className="flex flex-col items-center space-y-8 text-center">
        <button
          onClick={() => handleNavigate('/visitor')}
          className="menu-link delay-100 font-serif text-4xl md:text-6xl text-white hover:text-amber-600 transition-colors interactive cursor-pointer"
        >
          Visitor Info
        </button>
        <button
          onClick={() => handleNavigate('/exhibitor')}
          className="menu-link delay-200 font-serif text-4xl md:text-6xl text-white hover:text-amber-600 transition-colors interactive cursor-pointer"
        >
          Exhibit With Us
        </button>
        <button
          onClick={() => handleNavigate('/sectors')}
          className="menu-link delay-300 font-serif text-4xl md:text-6xl text-white hover:text-amber-600 transition-colors interactive cursor-pointer"
        >
          Sectors
        </button>
        <button
          onClick={() => handleNavigate('/contact')}
          className="menu-link delay-400 font-serif text-4xl md:text-6xl text-white hover:text-amber-600 transition-colors interactive cursor-pointer"
        >
          Contact Us
        </button>
        <div className="menu-link delay-500 mt-12 pt-12 border-t border-white/10 flex flex-col items-center">
          <button
            onClick={() => handleNavigate('/tickets')}
            className="bg-amber-600 text-white px-8 py-4 text-sm font-bold tracking-widest hover:bg-white hover:text-gray-900 transition-all duration-300 uppercase interactive cursor-pointer"
          >
            Get Tickets Now
          </button>
        </div>
      </nav>
    </div>
  );
};

export default FullscreenMenu;
