import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGlobal } from '../../context/GlobalContext';

const Header = ({ logoColor = 'text-white' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isMenuOpen, toggleMenu, closeMenu } = useGlobal();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    closeMenu();
    window.scrollTo(0, 0);
  };

  // Determine if header should have a dark text based on scroll or background
  const isDarkText = (isScrolled && !isMenuOpen);
  const displayLogoColor = isMenuOpen ? 'text-white' : (isDarkText ? 'text-brand-dark' : logoColor);
  const displayMenuColor = isMenuOpen ? 'text-white' : (isDarkText ? 'text-brand-dark' : logoColor);

  return (
    <header 
      id="mainHeader"
      className={`fixed w-full top-0 z-[60] transition-all duration-500 ${
        isScrolled && !isMenuOpen
          ? 'bg-white/85 backdrop-blur-md border-b border-black/5 h-20' 
          : 'bg-transparent border-b border-transparent h-24'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer interactive z-[70]" 
            onClick={() => handleNavigate('/')}
          >
            <h1 className={`font-serif text-2xl font-bold tracking-widest uppercase transition-colors duration-300 ${displayLogoColor}`}>
              IndiGlobal<span className="font-sans font-light opacity-70 text-xl ml-1">Expo</span>
            </h1>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-6 z-[70]">
            {user && !isMenuOpen && (
              <div className="hidden md:flex items-center gap-4 mr-4 animate-fade-in">
                <div 
                  onClick={() => handleNavigate(user.roles?.includes('ROLE_ADMIN') ? '/admin' : '/profile')}
                  className={`flex items-center gap-2 cursor-pointer interactive group ${isDarkText ? 'text-brand-dark' : logoColor}`}
                >
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Welcome</p>
                    <p className="text-xs font-bold">{user.firstName}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center border border-brand-accent/20 group-hover:bg-brand-accent group-hover:text-white transition-all">
                    <i className={`ph ${user.roles?.includes('ROLE_ADMIN') ? 'ph-shield-check' : 'ph-user'} text-xl`}></i>
                  </div>
                </div>
              </div>
            )}

            {/* Menu Toggle */}
            <button 
              onClick={toggleMenu}
              className={`transition-colors focus:outline-none p-2 interactive flex items-center gap-3 group ${displayMenuColor}`}
            >
              <span className="text-xs font-bold uppercase tracking-widest hidden sm:block">
                {isMenuOpen ? 'Close' : 'Menu'}
              </span>
              <div className="w-8 flex flex-col gap-1.5 items-end">
                <span className={`h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'w-full translate-y-2 rotate-45' : 'w-full'}`}></span>
                <span className={`h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'w-3/4 group-hover:w-full'}`}></span>
                <span className={`h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'w-full -translate-y-2 -rotate-45' : 'w-1/2 group-hover:w-full'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

