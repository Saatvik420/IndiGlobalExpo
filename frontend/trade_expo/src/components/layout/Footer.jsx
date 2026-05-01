import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-white py-24 border-t border-gray-200 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-1">
            <h2 className="font-serif text-2xl font-bold tracking-widest uppercase mb-6 text-brand-dark">
              IndiGlobal<span className="font-sans font-light text-gray-500 text-xl ml-1">Expo</span>
            </h2>
            <p className="text-gray-500 text-sm font-light mb-8 max-w-xs">
              The premier international trade fair for interiors, inspiration, and lifestyle.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-brand-dark">Navigation</h4>
            <ul className="space-y-4 font-light text-gray-500 text-sm">
              <li>
                <button 
                  onClick={() => handleNavigate('/')}
                  className="hover:text-brand-accent transition-colors interactive cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('/exhibitor')}
                  className="hover:text-brand-accent transition-colors interactive cursor-pointer"
                >
                  Exhibit With Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('/tickets')}
                  className="hover:text-brand-accent transition-colors interactive cursor-pointer"
                >
                  Get Tickets
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('/contact')}
                  className="hover:text-brand-accent transition-colors interactive cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('/exhibition-layout')}
                  className="hover:text-brand-accent transition-colors interactive cursor-pointer"
                >
                  Exhibition Layout
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-brand-dark">Contact</h4>
            <ul className="space-y-2 font-light text-gray-500 text-sm">
              <li>Brand Vista Consulting Ltd.</li>
              <li>Apartment 208, Beecham House</li>
              <li>Clayponds Lane, Brentford</li>
              <li>England, TW8 0GX</li>
              <li className="pt-4">
                <a 
                  href="mailto:info@brandvistaconsulting.com" 
                  className="font-medium text-brand-dark hover:text-brand-accent transition-colors interactive"
                >
                  info@brandvistaconsulting.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-brand-dark">Corporate</h4>
            <ul className="space-y-4 font-light text-gray-500 text-sm">
              <li>
                <button 
                  onClick={() => handleNavigate('/teams')}
                  className="hover:text-brand-accent transition-colors interactive cursor-pointer"
                >
                  Organising Partner
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('/press')}
                  className="hover:text-brand-accent transition-colors interactive cursor-pointer"
                >
                  Press & Media
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('/legal')}
                  className="hover:text-brand-accent transition-colors interactive cursor-pointer"
                >
                  Legal Notice
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('/privacy')}
                  className="hover:text-brand-accent transition-colors interactive cursor-pointer"
                >
                  Data & Privacy
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 uppercase tracking-widest font-bold">
          <p>&copy; 2026 IndiGlobal Expo. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a 
              href="#" 
              className="text-gray-400 hover:text-brand-accent transition-colors interactive" 
              aria-label="Facebook"
            >
              <i className="ph-fill ph-facebook-logo text-xl hover:scale-110 transition-transform"></i>
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-brand-accent transition-colors interactive" 
              aria-label="Instagram"
            >
              <i className="ph-fill ph-instagram-logo text-xl hover:scale-110 transition-transform"></i>
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-brand-accent transition-colors interactive" 
              aria-label="LinkedIn"
            >
              <i className="ph-fill ph-linkedin-logo text-xl hover:scale-110 transition-transform"></i>
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-brand-accent transition-colors interactive" 
              aria-label="Twitter"
            >
              <i className="ph-fill ph-twitter-logo text-xl hover:scale-110 transition-transform"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

