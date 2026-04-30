import { useEffect } from 'react';
import { ChartLineUp, UsersThree, Globe, GlobeStand, Handshake, Check, CheckCircle } from '@phosphor-icons/react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import PageLoader from '../../components/layout/PageLoader';
import CustomCursor from '../../components/ui/CustomCursor';

const Teams = () => {
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
      <PageLoader title="Organising Partner" />
      <CustomCursor />
      <Header logoColor="text-white" />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden bg-brand-dark">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80" 
          alt="Corporate Vision" 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark to-brand-dark/60 z-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16">
          <div className="max-w-3xl text-center md:text-left">
            <p className="text-brand-accent font-bold tracking-widest uppercase text-xs mb-4 animate-fade-up">The Visionaries Behind The Platform</p>
            <h2 className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight mb-8 animate-fade-up delay-100">
              About The <br /><span className="italic font-light text-brand-accent">Organizer.</span>
            </h2>
          </div>
        </div>
      </section>

      {/* Core Intro Section */}
      <section className="py-32 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20 reveal-up">
            <h3 className="font-serif text-4xl md:text-5xl text-brand-dark mb-6 leading-tight">Brand Vista Consulting Solutions</h3>
            <p className="text-gray-500 font-light text-lg leading-relaxed max-w-3xl mx-auto">
              A UK-based global consulting firm delivering transformative solutions in Management, Marketing, and Strategy. With a worldwide presence, we partner with organizations to drive growth, market expansion, and long-term competitiveness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            {/* Pillar 1 */}
            <div className="group reveal-up delay-100">
              <div className="relative overflow-hidden rounded-sm mb-6 aspect-[4/5] bg-gray-100">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80" alt="Global Strategy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <ChartLineUp weight="fill" className="text-3xl text-white" />
                </div>
              </div>
              <h4 className="font-serif text-2xl text-brand-dark mb-1">Global Strategy</h4>
              <p className="text-brand-accent text-xs tracking-widest uppercase font-bold mb-3">Management & Marketing</p>
              <p className="text-gray-500 font-light text-sm leading-relaxed">Adapting to rapid technological advancement and changing geopolitical landscapes, we provide a deep understanding of evolving business ecosystems.</p>
            </div>
            {/* Pillar 2 */}
            <div className="group reveal-up delay-200">
              <div className="relative overflow-hidden rounded-sm mb-6 aspect-[4/5] bg-gray-100">
                <img src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80" alt="Business Summits" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <UsersThree weight="fill" className="text-3xl text-white" />
                </div>
              </div>
              <h4 className="font-serif text-2xl text-brand-dark mb-1">High-Impact Summits</h4>
              <p className="text-brand-accent text-xs tracking-widest uppercase font-bold mb-3">Connecting Leaders</p>
              <p className="text-gray-500 font-light text-sm leading-relaxed">Positioned as a catalyst for collaboration, we bring together companies, investors, and policymakers through global networking platforms and conclaves.</p>
            </div>
            {/* Pillar 3 */}
            <div className="group reveal-up delay-300">
              <div className="relative overflow-hidden rounded-sm mb-6 aspect-[4/5] bg-gray-100">
                <img src="https://images.unsplash.com/photo-1475721025505-1f95305141dc?auto=format&fit=crop&w=800&q=80" alt="Trade Exhibitions" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <Globe weight="fill" className="text-3xl text-white" />
                </div>
              </div>
              <h4 className="font-serif text-2xl text-brand-dark mb-1">Trade Exhibitions</h4>
              <p className="text-brand-accent text-xs tracking-widest uppercase font-bold mb-3">Bridging Markets</p>
              <p className="text-gray-500 font-light text-sm leading-relaxed">Building on our expertise, we are expanding into international trade fairs to create stronger global business linkages between buyers and suppliers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Vision Board */}
      <section className="py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16 reveal-up text-center md:text-left flex flex-col md:flex-row justify-between items-end">
            <div>
              <h3 className="font-serif text-4xl text-brand-dark mb-4">The IndiGlobalExpo Vision</h3>
              <p className="text-gray-500 font-light max-w-2xl">Our flagship international platform created with a singular, clear vision: to present India to the world.</p>
            </div>
            <div className="hidden md:block">
              <GlobeStand size={48} className="text-brand-accent/30" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Vision 1 */}
            <div className="bg-white p-6 border border-gray-100 shadow-sm text-center rounded-sm hover:-translate-y-2 transition-transform duration-300 reveal-up delay-100">
              <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15f?auto=format&fit=crop&w=400&q=80" alt="Showcasing Excellence" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-brand-accent/20" />
              <h5 className="font-serif text-lg text-brand-dark mb-1">Showcasing Excellence</h5>
              <p className="text-[10px] uppercase tracking-widest font-bold text-brand-accent mb-3">Industrial Strength</p>
              <p className="text-xs font-light text-gray-500 leading-relaxed">A global showcase of India's innovation, quality, and entrepreneurial excellence.</p>
            </div>
            {/* Vision 2 */}
            <div className="bg-white p-6 border border-gray-100 shadow-sm text-center rounded-sm hover:-translate-y-2 transition-transform duration-300 reveal-up delay-200">
              <img src="https://images.unsplash.com/photo-1586528116311-ad8ed7c50800?auto=format&fit=crop&w=400&q=80" alt="Diverse Sectors" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-brand-accent/20" />
              <h5 className="font-serif text-lg text-brand-dark mb-1">Diverse Sectors</h5>
              <p className="text-[10px] uppercase tracking-widest font-bold text-brand-accent mb-3">Multi-Industry Platform</p>
              <p className="text-xs font-light text-gray-500 leading-relaxed">Uniting Healthcare, Food, Textiles, IT, Manufacturing, and Lifestyle under one roof.</p>
            </div>
            {/* Vision 3 */}
            <div className="bg-white p-6 border border-gray-100 shadow-sm text-center rounded-sm hover:-translate-y-2 transition-transform duration-300 reveal-up delay-300">
              <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80" alt="Global Access" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-brand-accent/20" />
              <h5 className="font-serif text-lg text-brand-dark mb-1">Global Access</h5>
              <p className="text-[10px] uppercase tracking-widest font-bold text-brand-accent mb-3">Strategic Partnerships</p>
              <p className="text-xs font-light text-gray-500 leading-relaxed">Providing direct access to international buyers, distributors, investors, and retailers.</p>
            </div>
            {/* Vision 4 */}
            <div className="bg-white p-6 border border-gray-100 shadow-sm text-center rounded-sm hover:-translate-y-2 transition-transform duration-300 reveal-up delay-400">
              <img src="https://images.unsplash.com/photo-1530435460869-d13625c69bbf?auto=format&fit=crop&w=400&q=80" alt="Made In India" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-brand-accent/20" />
              <h5 className="font-serif text-lg text-brand-dark mb-1">Made In India</h5>
              <p className="text-[10px] uppercase tracking-widest font-bold text-brand-accent mb-3">Global Competitiveness</p>
              <p className="text-xs font-light text-gray-500 leading-relaxed">Strengthening the visibility and global footprint of Made in India products globally.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Connect CTA */}
      <section className="py-24 bg-brand-dark text-white text-center">
        <div className="max-w-3xl mx-auto px-6 reveal-up">
          <Handshake weight="fill" size={48} className="text-brand-accent mb-6 inline-block" />
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Empowering Growth</h2>
          <p className="text-gray-400 font-light text-lg mb-10 leading-relaxed">
            Brand Vista Consulting Solutions continues its mission of connecting ideas, industries, and opportunities—empowering businesses to grow beyond borders and contributing to a stronger global ecosystem.
          </p>
          <button 
            onClick={() => window.location.href = '/contact'}
            className="interactive inline-flex items-center gap-3 bg-brand-accent text-white px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-brand-dark transition-colors shadow-xl cursor-pointer"
          >
            Contact Us Today
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Teams;
