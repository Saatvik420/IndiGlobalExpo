import { useEffect } from 'react';
import { DownloadSimple, MapTrifold, Info, SquaresFour, MagnifyingGlassPlus, Bed, Users, ArrowsOut, Train } from '@phosphor-icons/react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageLoader from '../components/layout/PageLoader';
import CustomCursor from '../components/ui/CustomCursor';
import venueFactsheet from '../assets/Factsheet business facilities - Novotel Amsterdam City-1 copy (1).pdf';

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
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));
    
    return () => {
      revealObserver.disconnect();
    };
  }, []);

  return (
    <>
      <PageLoader title="Exhibition<span class='font-sans font-light text-brand-accent text-3xl ml-1'>Layout</span>" />
      <CustomCursor />
      <Header logoColor="text-white" />
      
      {/* Vibrant Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden bg-brand-dark">
        <img 
          src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=2000&q=80" 
          alt="Exhibition Floor Plan" 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark to-brand-dark/50 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16 text-center md:text-left">
          <div className="max-w-3xl">
            <p className="text-brand-accent font-bold tracking-widest uppercase text-xs mb-4 animate-fade-up">Navigate the Expo</p>
            <h2 className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight mb-6 animate-fade-up delay-100">
              Interactive <br /><span className="italic font-light text-brand-accent">Floor Plan.</span>
            </h2>
            <p className="text-gray-300 font-light text-lg mb-8 max-w-xl animate-fade-up delay-200">
              Strategically designed to maximize engagement, visibility, and flow across all industry sectors.
            </p>
          </div>
        </div>
      </section>

      <main className="bg-brand-light pb-16">
        {/* Info Grid */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-12 relative z-20 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 shadow-xl rounded-sm border border-gray-100 reveal-up hover:-translate-y-2 transition-all duration-300 group cursor-default">
              <MapTrifold size={32} className="text-brand-accent mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" />
              <h4 className="font-serif text-xl text-brand-dark mb-2">Smart Zoning</h4>
              <p className="text-gray-500 font-light text-sm">Our layout is divided into high-impact zones, grouping similar industries to facilitate targeted business matchmaking.</p>
            </div>
            <div className="bg-white p-8 shadow-xl rounded-sm border border-gray-100 reveal-up delay-100 hover:-translate-y-2 transition-all duration-300 group cursor-default">
              <SquaresFour size={32} className="text-brand-accent mb-4 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300" />
              <h4 className="font-serif text-xl text-brand-dark mb-2">Premium Booths</h4>
              <p className="text-gray-500 font-light text-sm">Discover island stalls and corner plots designed for 360-degree brand visibility and high-density visitor traffic.</p>
            </div>
            <div className="bg-white p-8 shadow-xl rounded-sm border border-gray-100 reveal-up delay-200 hover:-translate-y-2 transition-all duration-300 group cursor-default">
              <Info size={32} className="text-brand-accent mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" />
              <h4 className="font-serif text-xl text-brand-dark mb-2">Facility Access</h4>
              <p className="text-gray-500 font-light text-sm">Quick access to VIP lounges, registration desks, media centers, and catering areas from any point on the floor.</p>
            </div>
          </div>
        </div>
        
        {/* The Venue Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10 reveal-up">
            <h3 className="font-serif text-4xl md:text-5xl text-brand-dark mb-4">Venue & Facilities</h3>
            <p className="text-gray-500 font-light text-lg max-w-3xl mx-auto">
              IndiGlobal Expo 2026 is hosted at the prestigious Novotel Amsterdam City, a venue renowned for its world-class business infrastructure and strategic location.
            </p>
          </div>

          {/* Venue Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="bg-white p-10 shadow-xl rounded-sm border-t-4 border-brand-accent reveal-up hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group cursor-default">
              <Bed size={32} className="text-brand-accent mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="font-serif text-2xl text-brand-dark mb-2">610</h4>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Premium Rooms</p>
              <p className="mt-4 text-gray-400 text-sm font-light group-hover:text-gray-600 transition-colors">Spacious, modern accommodation for international delegates.</p>
            </div>
            <div className="bg-white p-10 shadow-xl rounded-sm border-t-4 border-brand-dark reveal-up delay-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group cursor-default">
              <Users size={32} className="text-brand-dark mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="font-serif text-2xl text-brand-dark mb-2">20+</h4>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Meeting Rooms</p>
              <p className="mt-4 text-gray-400 text-sm font-light group-hover:text-gray-600 transition-colors">Versatile spaces equipped with the latest B2B tech.</p>
            </div>
            <div className="bg-white p-10 shadow-xl rounded-sm border-t-4 border-brand-accent reveal-up delay-200 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group cursor-default">
              <ArrowsOut size={32} className="text-brand-accent mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="font-serif text-2xl text-brand-dark mb-2">5m</h4>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">High Ceilings</p>
              <p className="mt-4 text-gray-400 text-sm font-light group-hover:text-gray-600 transition-colors">Grand exhibition halls with abundant natural daylight.</p>
            </div>
            <div className="bg-white p-10 shadow-xl rounded-sm border-t-4 border-brand-dark reveal-up delay-300 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group cursor-default">
              <Train size={32} className="text-brand-dark mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="font-serif text-2xl text-brand-dark mb-2">Direct</h4>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Transit Links</p>
              <p className="mt-4 text-gray-400 text-sm font-light group-hover:text-gray-600 transition-colors">Minutes from Schiphol Airport and Amsterdam RAI station.</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 reveal-up bg-white p-10 rounded-sm shadow-xl border border-gray-100">
            <div className="max-w-2xl text-center">
              <h4 className="font-serif text-2xl text-brand-dark mb-3">Explore the Full Technical Specifications</h4>
              <p className="text-gray-500 font-light text-sm mb-6">
                For a detailed breakdown of stall dimensions, floor loading capacity, and technical infrastructure, please view our official venue factsheet.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a 
                href={venueFactsheet} 
                target="_blank"
                rel="noopener noreferrer"
                className="interactive flex-1 sm:flex-none inline-flex items-center justify-center gap-3 bg-brand-dark text-white px-10 py-5 font-bold uppercase tracking-widest text-xs hover:bg-brand-accent hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-xl"
              >
                <MagnifyingGlassPlus size={20} weight="bold" />
                View Full Factsheet
              </a>
              <button 
                onClick={() => window.location.href = '/contact'}
                className="interactive flex-1 sm:flex-none inline-flex items-center justify-center gap-3 bg-white border border-gray-200 text-brand-dark px-10 py-5 font-bold uppercase tracking-widest text-xs hover:border-brand-accent hover:text-brand-accent hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-md"
              >
                Floor Support
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ExhibitionLayout;
