import { useEffect, useState } from 'react';

const PageLoader = ({ title = 'IndiGlobalExpo' }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      id="page-loader"
      className={`fixed inset-0 bg-gray-900 z-[99999] flex flex-col items-center justify-center transition-transform duration-[800ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${loaded ? '-translate-y-full' : ''}`}
    >
      <div className="overflow-hidden">
        <h1 
          className="font-serif text-4xl font-bold tracking-widest uppercase text-white loader-logo"
          style={{
            transform: loaded ? 'translateY(0)' : 'translateY(100%)',
            animation: loaded ? 'none' : 'slideUpLogo 1s cubic-bezier(0.77, 0, 0.175, 1) forwards'
          }}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>
      <div className="loader-line-container" style={{ width: '200px', height: '1px', background: 'rgba(255,255,255,0.1)', marginTop: '2rem', position: 'relative', overflow: 'hidden' }}>
        <div 
          className="loader-line"
          style={{
            position: 'absolute', top: 0, left: 0, bottom: 0,
            background: '#cfa670', width: '100%',
            transform: loaded ? 'translateX(0)' : 'translateX(-100%)',
            animation: loaded ? 'none' : 'progressLine 2s cubic-bezier(0.77, 0, 0.175, 1) forwards'
          }}
        />
      </div>
    </div>
  );
};

export default PageLoader;
