import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GlobeHemisphereEast, UsersThree, Star, ChartLineUp, LightbulbFilament, 
  RocketLaunch, Check, CheckCircle, Ticket, X, Spinner, ArrowRight 
} from '@phosphor-icons/react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FullscreenMenu from '../components/layout/FullscreenMenu';
import PageLoader from '../components/layout/PageLoader';
import CustomCursor from '../components/ui/CustomCursor';
import TicketWidget from '../components/ui/TicketWidget';
import { useGlobal } from '../context/GlobalContext';

// Import Assets
import heroImg from '../assets/Hero poster (unsplash).jfif';

const Exhibitor = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useGlobal();

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
      <PageLoader title="Exhibit With Us | INDIGLOBAL EXPO" />
      <CustomCursor />
      <Header />
      <FullscreenMenu />
      <TicketWidget />

      {/* Exhibitor Hero Section */}
      <section className="relative h-[70vh] min-h-[550px] flex items-center overflow-hidden bg-brand-dark">
        <img src={heroImg} alt="Networking at Expo" className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark to-brand-dark/60 z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16">
          <div className="max-w-3xl">
            <p className="text-brand-accent font-bold tracking-widest uppercase text-xs mb-4 animate-fade-up">Exhibit at IndiGlobalExpo</p>
            <h2 className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight mb-8 animate-fade-up delay-100">
              Take Your Business <br /><span className="italic font-light text-brand-accent">Beyond Borders.</span>
            </h2>
            <div className="flex items-center gap-6 text-white animate-fade-up delay-200">
              <button onClick={() => navigate('/tickets')} className="interactive bg-brand-accent text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-brand-dark transition-colors">
                Book Your Space
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Exhibit With Us Section */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center reveal-up">
          <i className="ph-fill ph-rocket-launch text-5xl text-brand-accent/20 mb-6 inline-block"></i>
          <h3 className="font-serif text-4xl md:text-5xl text-brand-dark mb-8 leading-tight">
            Why Exhibit With Us?
          </h3>
          <p className="text-gray-500 font-light text-lg leading-relaxed mb-6">
            IndiGlobalExpo is your gateway to the global marketplace. Designed exclusively to promote Indian industries worldwide, the expo offers a powerful platform to showcase your products, services, and innovations to an international audience across multiple countries.
          </p>
          <p className="text-gray-500 font-light text-lg leading-relaxed">
            Whether you are an established exporter or an emerging brand, IndiGlobalExpo provides the visibility, connections, and opportunities needed to grow beyond domestic markets.
          </p>
        </div>
      </section>

      {/* What You Gain (Grid) */}
      <section className="py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16 reveal-up">
            <p className="text-brand-accent tracking-widest uppercase text-xs font-bold mb-4">Unmatched Opportunities</p>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-dark">What You Gain</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 rounded-sm reveal-up delay-100">
              <i className="ph ph-globe-hemisphere-east text-4xl text-brand-accent mb-6"></i>
              <h4 className="font-serif text-xl text-brand-dark mb-3">International Market Access</h4>
              <p className="text-sm font-light text-gray-500">Reach new customers, distributors, and partners across key global markets.</p>
            </div>
            {/* Card 2 */}
            <div className="bg-brand-dark p-10 border border-brand-dark shadow-xl transition-all duration-500 rounded-sm text-white transform md:-translate-y-4 reveal-up delay-200">
              <i className="ph ph-users-three text-4xl text-brand-accent mb-6"></i>
              <h4 className="font-serif text-xl text-white mb-3">High-Value Networking</h4>
              <p className="text-sm font-light text-gray-400">Engage directly with importers, buyers, investors, and decision-makers.</p>
            </div>
            {/* Card 3 */}
            <div className="bg-white p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 rounded-sm reveal-up delay-300">
              <i className="ph ph-star text-4xl text-brand-accent mb-6"></i>
              <h4 className="font-serif text-xl text-brand-dark mb-3">Brand Globalization</h4>
              <p className="text-sm font-light text-gray-500">Position your brand seamlessly as a trusted, high-end global player.</p>
            </div>
            {/* Card 4 */}
            <div className="bg-white p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 rounded-sm reveal-up delay-100">
              <i className="ph ph-chart-line-up text-4xl text-brand-accent mb-6"></i>
              <h4 className="font-serif text-xl text-brand-dark mb-3">Lead Generation & Sales</h4>
              <p className="text-sm font-light text-gray-500">Connect directly with potential clients and convert interest into real business.</p>
            </div>
            {/* Card 5 */}
            <div className="bg-white p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 rounded-sm lg:col-span-2 flex flex-col justify-center reveal-up delay-200">
              <i className="ph ph-lightbulb-filament text-4xl text-brand-accent mb-6"></i>
              <h4 className="font-serif text-xl text-brand-dark mb-3">Market Intelligence</h4>
              <p className="text-sm font-light text-gray-500">Understand international trends, evaluate competition, and gather insights on consumer preferences straight from the source.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Marquee: Who Should Exhibit */}
      <section className="py-16 bg-white border-y border-gray-100 overflow-hidden flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-6 mb-10 text-center reveal-up">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-dark">Who Should Exhibit?</h2>
          <p className="text-gray-500 font-light mt-4">We invite companies representing a diverse range of industries.</p>
        </div>
        
        {/* Infinite Ticker */}
        <div className="flex whitespace-nowrap animate-marquee">
          {/* Set 1 */}
          <div className="flex items-center gap-12 px-6">
            <span className="font-serif text-3xl text-brand-dark/20 uppercase tracking-widest flex items-center gap-12">Healthcare & Medical Devices <i className="ph-fill ph-star text-brand-accent text-sm"></i></span>
            <span className="font-serif text-3xl text-brand-dark/20 uppercase tracking-widest flex items-center gap-12">Food & Beverages <i className="ph-fill ph-star text-brand-accent text-sm"></i></span>
            <span className="font-serif text-3xl text-brand-dark/20 uppercase tracking-widest flex items-center gap-12">Garments & Textiles <i className="ph-fill ph-star text-brand-accent text-sm"></i></span>
            <span className="font-serif text-3xl text-brand-dark/20 uppercase tracking-widest flex items-center gap-12">Gems & Jewelry <i className="ph-fill ph-star text-brand-accent text-sm"></i></span>
            <span className="font-serif text-3xl text-brand-dark/20 uppercase tracking-widest flex items-center gap-12">IT & Software Solutions <i className="ph-fill ph-star text-brand-accent text-sm"></i></span>
            <span className="font-serif text-3xl text-brand-dark/20 uppercase tracking-widest flex items-center gap-12">Manufacturing & Engineering <i className="ph-fill ph-star text-brand-accent text-sm"></i></span>
            <span className="font-serif text-3xl text-brand-dark/20 uppercase tracking-widest flex items-center gap-12">Consumer Goods & FMCG <i className="ph-fill ph-star text-brand-accent text-sm"></i></span>
            <span className="font-serif text-3xl text-brand-dark/20 uppercase tracking-widest flex items-center gap-12">Handicrafts & Lifestyle <i className="ph-fill ph-star text-brand-accent text-sm"></i></span>
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex items-center gap-12 px-6">
            <span className="font-serif text-3xl text-brand-dark/20 uppercase tracking-widest flex items-center gap-12">Healthcare & Medical Devices <i className="ph-fill ph-star text-brand-accent text-sm"></i></span>
            <span className="font-serif text-3xl text-brand-dark/20 uppercase tracking-widest flex items-center gap-12">Food & Beverages <i className="ph-fill ph-star text-brand-accent text-sm"></i></span>
            <span className="font-serif text-3xl text-brand-dark/20 uppercase tracking-widest flex items-center gap-12">Garments & Textiles <i className="ph-fill ph-star text-brand-accent text-sm"></i></span>
            <span className="font-serif text-3xl text-brand-dark/20 uppercase tracking-widest flex items-center gap-12">Gems & Jewelry <i className="ph-fill ph-star text-brand-accent text-sm"></i></span>
            <span className="font-serif text-3xl text-brand-dark/20 uppercase tracking-widest flex items-center gap-12">IT & Software Solutions <i className="ph-fill ph-star text-brand-accent text-sm"></i></span>
            <span className="font-serif text-3xl text-brand-dark/20 uppercase tracking-widest flex items-center gap-12">Manufacturing & Engineering <i className="ph-fill ph-star text-brand-accent text-sm"></i></span>
            <span className="font-serif text-3xl text-brand-dark/20 uppercase tracking-widest flex items-center gap-12">Consumer Goods & FMCG <i className="ph-fill ph-star text-brand-accent text-sm"></i></span>
            <span className="font-serif text-3xl text-brand-dark/20 uppercase tracking-widest flex items-center gap-12">Handicrafts & Lifestyle <i className="ph-fill ph-star text-brand-accent text-sm"></i></span>
          </div>
        </div>
        
        <p className="text-center text-sm font-bold tracking-widest uppercase text-brand-accent mt-12 reveal-up">If you have a product ready for the global stage, we are your platform.</p>
      </section>

      {/* Support & Ideal For Checklist */}
      <section className="py-24 bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Ideal For */}
            <div className="reveal-up">
              <h3 className="font-serif text-3xl md:text-4xl text-white mb-10">Ideal For</h3>
              <ul className="space-y-6">
                <li className="flex items-center gap-4 text-gray-300 font-light border-b border-white/10 pb-4">
                  <div className="w-6 h-6 rounded-full bg-brand-accent/20 text-brand-accent flex items-center justify-center flex-shrink-0"><i className="ph ph-check"></i></div>
                  Exporters looking to expand into new regions
                </li>
                <li className="flex items-center gap-4 text-gray-300 font-light border-b border-white/10 pb-4">
                  <div className="w-6 h-6 rounded-full bg-brand-accent/20 text-brand-accent flex items-center justify-center flex-shrink-0"><i className="ph ph-check"></i></div>
                  SMEs aiming to scale internationally
                </li>
                <li className="flex items-center gap-4 text-gray-300 font-light border-b border-white/10 pb-4">
                  <div className="w-6 h-6 rounded-full bg-brand-accent/20 text-brand-accent flex items-center justify-center flex-shrink-0"><i className="ph ph-check"></i></div>
                  Startups seeking global exposure
                </li>
                <li className="flex items-center gap-4 text-gray-300 font-light border-b border-white/10 pb-4">
                  <div className="w-6 h-6 rounded-full bg-brand-accent/20 text-brand-accent flex items-center justify-center flex-shrink-0"><i className="ph ph-check"></i></div>
                  Brands launching new products in international markets
                </li>
                <li className="flex items-center gap-4 text-gray-300 font-light">
                  <div className="w-6 h-6 rounded-full bg-brand-accent/20 text-brand-accent flex items-center justify-center flex-shrink-0"><i className="ph ph-check"></i></div>
                  Industry leaders strengthening their global presence
                </li>
              </ul>
            </div>

            {/* Exhibitor Support */}
            <div className="bg-white/5 border border-white/10 p-10 rounded-sm reveal-up delay-200">
              <h3 className="font-serif text-3xl md:text-4xl text-white mb-6">Exhibitor Support</h3>
              <p className="text-gray-400 font-light mb-8">We ensure a seamless and impactful participation experience for every brand.</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 text-white font-light">
                  <i className="ph-fill ph-check-circle text-brand-accent text-xl"></i> End-to-end event support
                </li>
                <li className="flex items-center gap-4 text-white font-light">
                  <i className="ph-fill ph-check-circle text-brand-accent text-xl"></i> Assistance with booth setup and branding
                </li>
                <li className="flex items-center gap-4 text-white font-light">
                  <i className="ph-fill ph-check-circle text-brand-accent text-xl"></i> Pre-event promotions and visibility
                </li>
                <li className="flex items-center gap-4 text-white font-light">
                  <i className="ph-fill ph-check-circle text-brand-accent text-xl"></i> B2B meeting facilitation
                </li>
                <li className="flex items-center gap-4 text-white font-light">
                  <i className="ph-fill ph-check-circle text-brand-accent text-xl"></i> On-ground coordination and assistance
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Global Destinations & CTA */}
      <section className="py-32 bg-brand-light text-center border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <i className="ph ph-globe-hemisphere-east text-5xl text-brand-accent mb-6 inline-block reveal-up"></i>
          <h3 className="font-serif text-3xl md:text-4xl text-brand-dark mb-6 reveal-up delay-100">Exhibit Across Global Destinations</h3>
          <p className="text-gray-500 font-light text-lg mb-16 leading-relaxed reveal-up delay-100">
            IndiGlobalExpo is hosted across strategically selected international locations, allowing exhibitors to tap into region-specific demand and maximize business potential. Each edition is curated to ensure relevant audience engagement and meaningful business outcomes.
          </p>

          <div className="bg-white p-12 md:p-16 border border-gray-100 shadow-xl rounded-sm reveal-up delay-200">
            <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-6">Be Part of India’s Global Growth Story</h2>
            <p className="text-gray-500 font-light mb-10 max-w-2xl mx-auto">
              IndiGlobalExpo is more than an exhibition—it’s a platform to take India’s excellence to the world. Join a growing community of forward-looking businesses that are shaping India’s global presence.
            </p>
            <div className="flex flex-col items-center justify-center">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-4">Book Your Space Today</p>
              <button onClick={() => navigate('/tickets')} className="bg-brand-dark text-white px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors interactive shadow-xl">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Exhibitor;
