import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../../context/GlobalContext';

const FullscreenMenu = () => {
  const navigate = useNavigate();
  const { isMenuOpen, closeMenu } = useGlobal();

  const handleNavigate = (path) => {
    navigate(path);
    closeMenu();
    window.scrollTo(0, 0);
  };

  return (
    <div 
      className={`fixed inset-0 bg-brand-dark z-[50] flex flex-col justify-center items-center transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
        isMenuOpen ? 'clip-circle-open' : 'clip-circle-closed'
      }`}
      style={{
        clipPath: isMenuOpen ? 'circle(150% at top right)' : 'circle(0px at top right)'
      }}
    >
      <nav className="flex flex-col items-center space-y-8 text-center">
        <button 
          onClick={() => handleNavigate('/')} 
          className={`font-serif text-4xl md:text-6xl text-white hover:text-brand-accent transition-all duration-500 interactive ${isMenuOpen ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 translate-y-5'}`}
        >
          Home
        </button>
        <button 
          onClick={() => handleNavigate('/visitor')} 
          className={`font-serif text-4xl md:text-6xl text-white hover:text-brand-accent transition-all duration-500 interactive ${isMenuOpen ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-5'}`}
        >
          Visitor Info
        </button>
        <button 
          onClick={() => handleNavigate('/exhibitor')} 
          className={`font-serif text-4xl md:text-6xl text-white hover:text-brand-accent transition-all duration-500 interactive ${isMenuOpen ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-5'}`}
        >
          Exhibit With Us
        </button>
        <button 
          onClick={() => handleNavigate('/sectors')} 
          className={`font-serif text-4xl md:text-6xl text-white hover:text-brand-accent transition-all duration-500 interactive ${isMenuOpen ? 'opacity-100 translate-y-0 delay-400' : 'opacity-0 translate-y-5'}`}
        >
          Sectors
        </button>
        <button 
          onClick={() => handleNavigate('/contact')} 
          className={`font-serif text-4xl md:text-6xl text-white hover:text-brand-accent transition-all duration-500 interactive ${isMenuOpen ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-5'}`}
        >
          Contact Us
        </button>
        
        <div className={`mt-12 pt-12 border-t border-white/10 flex flex-col items-center transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-y-0 delay-600' : 'opacity-0 translate-y-5'}`}>
          <button 
            onClick={() => handleNavigate('/tickets')} 
            className="bg-brand-accent text-white px-8 py-4 text-sm font-bold tracking-widest hover:bg-white hover:text-brand-dark transition-all duration-300 uppercase interactive"
          >
            Get Tickets Now
          </button>
        </div>
      </nav>
    </div>
  );
};

export default FullscreenMenu;

