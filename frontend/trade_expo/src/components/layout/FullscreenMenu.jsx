import { useNavigate } from 'react-router-dom';
import { FacebookLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react';
import { useGlobal } from '../../context/GlobalContext';
import logoWhiteImg from '../../assets/IndiGlobal Expo Logo White.png';

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
      className={`fixed inset-0 bg-brand-dark z-[50] flex flex-col justify-center items-center overflow-y-auto px-4 py-12 transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
        isMenuOpen ? 'clip-circle-open' : 'clip-circle-closed'
      }`}
      style={{
        clipPath: isMenuOpen ? 'circle(150% at top right)' : 'circle(0px at top right)'
      }}
    >
      <div className={`mb-6 sm:mb-8 md:mb-10 transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 -translate-y-4'}`}>
        <img 
          src={logoWhiteImg} 
          alt="IndiGlobal Expo" 
          className="h-10 sm:h-12 md:h-16 w-auto object-contain cursor-pointer hover:scale-105 transition-transform"
          onClick={() => handleNavigate('/')}
        />
      </div>

      <nav className="flex flex-col items-center space-y-4 sm:space-y-6 md:space-y-8 text-center my-auto">
        <button 
          onClick={() => handleNavigate('/')} 
          className={`font-serif text-3xl sm:text-4xl md:text-6xl text-white hover:text-brand-accent transition-all duration-500 interactive ${isMenuOpen ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 translate-y-5'}`}
        >
          Home
        </button>
        <button 
          onClick={() => handleNavigate('/visitor')} 
          className={`font-serif text-3xl sm:text-4xl md:text-6xl text-white hover:text-brand-accent transition-all duration-500 interactive ${isMenuOpen ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-5'}`}
        >
          Visitor Info
        </button>
        <button 
          onClick={() => handleNavigate('/exhibitor')} 
          className={`font-serif text-3xl sm:text-4xl md:text-6xl text-white hover:text-brand-accent transition-all duration-500 interactive ${isMenuOpen ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-5'}`}
        >
          Exhibit With Us
        </button>
        <button 
          onClick={() => handleNavigate('/sectors')} 
          className={`font-serif text-3xl sm:text-4xl md:text-6xl text-white hover:text-brand-accent transition-all duration-500 interactive ${isMenuOpen ? 'opacity-100 translate-y-0 delay-400' : 'opacity-0 translate-y-5'}`}
        >
          Sectors
        </button>
        <button 
          onClick={() => handleNavigate('/contact')} 
          className={`font-serif text-3xl sm:text-4xl md:text-6xl text-white hover:text-brand-accent transition-all duration-500 interactive ${isMenuOpen ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-5'}`}
        >
          Contact Us
        </button>
        <a 
          href="/blogs" 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={() => closeMenu()} 
          className={`font-serif text-3xl sm:text-4xl md:text-6xl text-white hover:text-brand-accent transition-all duration-500 interactive ${isMenuOpen ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-5'}`}
        >
          Blogs & Insights
        </a>
        
        <div className={`mt-6 sm:mt-10 md:mt-12 pt-6 sm:pt-8 md:pt-12 border-t border-white/10 flex flex-col items-center gap-3 transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-y-0 delay-600' : 'opacity-0 translate-y-5'}`}>
          <button 
            onClick={() => handleNavigate('/tickets')} 
            className="bg-brand-accent text-white px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold tracking-widest hover:bg-white hover:text-brand-dark transition-all duration-300 uppercase interactive shadow-lg"
          >
            Get Tickets Now
          </button>
          <button 
            onClick={() => handleNavigate('/login')} 
            className="text-xs uppercase tracking-widest text-white/60 hover:text-brand-accent transition-colors font-bold pt-1 interactive"
          >
            Sign In / Admin Console
          </button>

          {/* Social Media Links */}
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/10">
            <a 
              href="https://www.facebook.com/profile.php?id=61593776497418" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/60 hover:text-brand-accent transition-colors interactive p-1"
              aria-label="Facebook"
            >
              <FacebookLogo weight="fill" size={24} className="hover:scale-110 transition-transform" />
            </a>
            <a 
              href="https://www.instagram.com/indiglobalexpo?obrf=cDY3aWE0dTRxZmUx" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/60 hover:text-brand-accent transition-colors interactive p-1"
              aria-label="Instagram"
            >
              <InstagramLogo weight="fill" size={24} className="hover:scale-110 transition-transform" />
            </a>
            <a 
              href="https://www.linkedin.com/company/indiglobal-expo" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/60 hover:text-brand-accent transition-colors interactive p-1"
              aria-label="LinkedIn"
            >
              <LinkedinLogo weight="fill" size={24} className="hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default FullscreenMenu;

