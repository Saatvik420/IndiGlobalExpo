import { useEffect, useState } from 'react';
import logoWhiteImg from '../../assets/IndiGlobal Expo Logo White.png';

const PageLoader = ({ title }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`fixed inset-0 bg-brand-dark z-[99999] flex flex-col items-center justify-center transition-transform duration-[800ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${loaded ? '-translate-y-full' : ''}`}
    >
      <div className="overflow-hidden px-4 text-center flex flex-col items-center">
        <img 
          src={logoWhiteImg} 
          alt="IndiGlobal Expo" 
          className="h-16 md:h-20 w-auto object-contain animate-[slideUpLogo_0.9s_cubic-bezier(0.77,0,0.175,1)_forwards]"
          style={{ transform: 'translateY(100%)' }}
        />
        {title && (
          <p 
            className="text-xs uppercase tracking-widest text-brand-accent font-bold mt-4 animate-fade-in"
            dangerouslySetInnerHTML={{ __html: title.replace(/<[^>]*>?/gm, ' ') }}
          />
        )}
      </div>
      <div className="w-[220px] h-[2px] bg-white/10 mt-8 relative overflow-hidden rounded-full">
        <div 
          className="absolute inset-0 bg-brand-accent animate-[progressLine_1.5s_cubic-bezier(0.77,0,0.175,1)_forwards]"
          style={{ transform: 'translateX(-100%)' }}
        />
      </div>
    </div>
  );
};

export default PageLoader;
