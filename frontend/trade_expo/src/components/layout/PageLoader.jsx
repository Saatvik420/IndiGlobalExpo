import { useEffect, useState } from 'react';

const PageLoader = ({ title = "IndiGlobal<span class='font-sans font-light opacity-70 text-3xl ml-1'>Expo</span>" }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`fixed inset-0 bg-brand-dark z-[99999] flex flex-col items-center justify-center transition-transform duration-[800ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${loaded ? '-translate-y-full' : ''}`}
    >
      <div className="overflow-hidden">
        <h1 
          className="font-serif text-4xl font-bold tracking-widest uppercase text-white animate-[slideUpLogo_1s_cubic-bezier(0.77,0,0.175,1)_forwards]"
          style={{ transform: 'translateY(100%)' }}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>
      <div className="w-[200px] h-[1px] bg-white/10 mt-8 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-brand-accent animate-[progressLine_2s_cubic-bezier(0.77,0,0.175,1)_forwards]"
          style={{ transform: 'translateX(-100%)' }}
        />
      </div>
    </div>
  );
};

export default PageLoader;
