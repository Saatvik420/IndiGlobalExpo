import { useEffect } from 'react';
import { DownloadSimple, Train, Bed, Info } from '@phosphor-icons/react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FullscreenMenu from '../components/layout/FullscreenMenu';
import PageLoader from '../components/layout/PageLoader';
import CustomCursor from '../components/ui/CustomCursor';
import TicketWidget from '../components/ui/TicketWidget';

// Import Assets
import heroImg from '../assets/Hero poster (unsplash).jfif';

const ExhibitionLayout = () => {
  useEffect(() => {
    // Scroll reveal observer
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
    
    document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, []);

  return (
    <>
      <PageLoader title="Exhibition<span class='font-sans font-light text-brand-accent text-3xl ml-1'>Layout</span>" />
      <CustomCursor />
      <Header />
      <FullscreenMenu />
      <TicketWidget />

      <main className="min-h-screen pt-36 pb-24 px-6 md:px-12 flex flex-col items-center">
        
        <div className="text-center max-w-3xl mx-auto mb-12 reveal-up">
          <span className="text-brand-accent font-semibold tracking-widest uppercase text-sm mb-3 block">Floor Plan</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-brand-dark">Exhibition Layout</h1>
          <p className="text-gray-600 text-lg md:text-xl font-light">
            Explore the detailed master plan for the INDIGLOBAL EXPO. Navigate through our designated zones, premium exhibitor stalls, and key networking areas.
          </p>
        </div>

        <div className="w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 p-4 md:p-8 reveal-up group relative overflow-hidden">
          <img 
            src={heroImg} 
            alt="Exhibition Layout Floor Plan" 
            className="w-full h-auto object-contain rounded-xl transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-brand-dark/5 pointer-events-none rounded-2xl transition-colors duration-300"></div>
        </div>

        <div className="mt-12 reveal-up">
          <a 
            href="/assets/Factsheet business facilities - Novotel Amsterdam City-1 copy (1).pdf" 
            download 
            className="interactive inline-flex items-center gap-3 bg-brand-dark text-white px-8 py-4 rounded-full font-medium hover:bg-brand-accent transition-all duration-300"
          >
            <DownloadSimple size={24} />
            Download High-Res Layout
          </a>
        </div>

        <section className="w-full max-w-7xl mx-auto mt-24 py-24 bg-brand-light rounded-sm">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { title: 'Direct Access', icon: <Train size={32} />, desc: 'Easy accessibility from Amsterdam RAI station and Schiphol Airport.' },
                { title: 'On-site Stay', icon: <Bed size={32} />, desc: 'Luxury rooms available at the venue for exhibitors and VIPs.' },
                { title: 'Full Support', icon: <Info size={32} />, desc: 'Dedicated floor staff and support desks throughout the venue.' }
              ].map((item, i) => (
                <div key={i} className="text-center reveal-up" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="text-brand-accent mb-6 flex justify-center">{item.icon}</div>
                  <h4 className="font-serif text-2xl text-brand-dark mb-4">{item.title}</h4>
                  <p className="text-gray-500 font-light text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ExhibitionLayout;
