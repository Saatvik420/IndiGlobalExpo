import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, SignOut, ShieldCheck } from '@phosphor-icons/react';
import { useGlobal } from '../../context/GlobalContext';

const Header = ({ logoColor = 'text-white' }) => {
  const [scrolled, setScrolled] = useState(false);
  const { isMenuOpen, toggleMenu, closeMenu, isLoggedIn, user, logout } = useGlobal();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    closeMenu();
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/');
  };

  const headerClass = scrolled 
    ? 'bg-white/85 backdrop-blur-[12px] border-b border-black/5' 
    : 'bg-transparent border-b border-transparent';

  const logoClass = scrolled || isMenuOpen ? 'text-brand-dark' : logoColor;
  const menuBtnClass = scrolled || isMenuOpen ? 'text-brand-dark' : logoColor;

  return (
    <>
      <header 
        id="mainHeader"
        className={`fixed w-full top-0 z-[60] transition-all duration-500 ${headerClass}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <button 
              onClick={() => handleNavigate('/')}
              className="flex-shrink-0 flex items-center interactive z-[70] cursor-pointer"
            >
              <h1 className={`font-serif text-2xl font-bold tracking-widest uppercase transition-colors duration-300 logo-text ${logoClass}`}>
                IndiGlobal<span className="font-sans font-light opacity-70 text-xl ml-1">Expo</span>
              </h1>
            </button>
            
            <div className="flex items-center gap-6 z-[70]">
              {isLoggedIn ? (
                <div className="hidden md:flex items-center gap-4 text-xs font-bold uppercase tracking-widest group">
                  {user.roles && user.roles.includes('ROLE_ADMIN') && (
                    <button 
                      onClick={() => handleNavigate('/admin')}
                      className="text-brand-accent hover:text-brand-dark transition-colors flex items-center gap-1 cursor-pointer mr-2"
                    >
                      <ShieldCheck size={18} weight="bold" />
                      <span>Admin Panel</span>
                    </button>
                  )}
                  <button 
                    onClick={() => handleNavigate('/profile')}
                    className={`flex items-center gap-2 hover:text-brand-accent transition-colors ${menuBtnClass}`}
                  >
                    <User size={20} weight="bold" />
                    <span>Hi, {user.firstName}</span>
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="text-brand-accent hover:text-brand-dark transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <SignOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => handleNavigate('/tickets')}
                  className={`hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-brand-accent transition-colors ${menuBtnClass}`}
                >
                  <User size={20} />
                  <span>Login</span>
                </button>
              )}

              <button 
                onClick={toggleMenu}
                className={`${menuBtnClass} hover:text-brand-accent transition-colors focus:outline-none p-2 interactive flex items-center gap-3 group`}
              >
                <span className="text-xs font-bold uppercase tracking-widest hidden sm:block menu-text transition-colors">
                  {isMenuOpen ? 'CLOSE' : 'Menu'}
                </span>
                <div className="w-8 flex flex-col gap-1.5 items-end">
                  <span 
                    className="w-full h-0.5 bg-current transition-all duration-300 line-1"
                    style={{
                      transform: isMenuOpen ? 'translateY(4px) rotate(45deg)' : 'none'
                    }}
                  />
                  <span 
                    className="h-0.5 bg-current transition-all duration-300 line-2"
                    style={{
                      width: isMenuOpen ? '100%' : '75%',
                      transform: isMenuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none'
                    }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Menu Panel */}
      <div 
        id="fullscreenMenu"
        className={`fixed inset-0 bg-brand-dark z-[50] flex flex-col justify-center items-center fullscreen-menu-clip ${
          isMenuOpen ? 'menu-open opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center space-y-8 text-center">
          {isLoggedIn && (
            <button 
              onClick={() => handleNavigate('/profile')}
              className="menu-link font-serif text-4xl md:text-6xl text-brand-accent hover:text-white transition-colors interactive cursor-pointer"
              style={{
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: isMenuOpen ? '50ms' : '0ms'
              }}
            >
              My Profile
            </button>
          )}
          <button 
            onClick={() => handleNavigate('/')}
            className="menu-link font-serif text-4xl md:text-6xl text-white hover:text-brand-accent transition-colors interactive cursor-pointer"
            style={{
              opacity: isMenuOpen ? 1 : 0,
              transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: isMenuOpen ? '100ms' : '0ms'
            }}
          >
            Home
          </button>
          <button 
            onClick={() => handleNavigate('/visitor')}
            className="menu-link font-serif text-4xl md:text-6xl text-white hover:text-brand-accent transition-colors interactive cursor-pointer"
            style={{
              opacity: isMenuOpen ? 1 : 0,
              transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: isMenuOpen ? '200ms' : '0ms'
            }}
          >
            Visitor Info
          </button>
          <button 
            onClick={() => handleNavigate('/exhibitor')}
            className="menu-link font-serif text-4xl md:text-6xl text-white hover:text-brand-accent transition-colors interactive cursor-pointer"
            style={{
              opacity: isMenuOpen ? 1 : 0,
              transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: isMenuOpen ? '300ms' : '0ms'
            }}
          >
            Exhibit With Us
          </button>
          <button 
            onClick={() => handleNavigate('/sectors')}
            className="menu-link font-serif text-4xl md:text-6xl text-white hover:text-brand-accent transition-colors interactive cursor-pointer"
            style={{
              opacity: isMenuOpen ? 1 : 0,
              transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: isMenuOpen ? '400ms' : '0ms'
            }}
          >
            Sectors
          </button>
          <button 
            onClick={() => handleNavigate('/contact')}
            className="menu-link font-serif text-4xl md:text-6xl text-white hover:text-brand-accent transition-colors interactive cursor-pointer"
            style={{
              opacity: isMenuOpen ? 1 : 0,
              transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: isMenuOpen ? '500ms' : '0ms'
            }}
          >
            Contact Us
          </button>
          <div 
            className="menu-link mt-12 pt-12 border-t border-white/10 flex flex-col items-center"
            style={{
              opacity: isMenuOpen ? 1 : 0,
              transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: isMenuOpen ? '600ms' : '0ms'
            }}
          >
            <button 
              onClick={() => handleNavigate('/tickets')}
              className="bg-brand-accent text-white px-8 py-4 text-sm font-bold tracking-widest hover:bg-white hover:text-brand-dark transition-all duration-300 uppercase interactive cursor-pointer"
            >
              Get Tickets Now
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
