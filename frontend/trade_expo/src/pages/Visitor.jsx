import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FullscreenMenu from '../components/layout/FullscreenMenu';
import PageLoader from '../components/layout/PageLoader';
import CustomCursor from '../components/ui/CustomCursor';
import TicketWidget from '../components/ui/TicketWidget';

// Import Assets
import heroImg from '../assets/Hero poster (unsplash).jfif';
import factsheetPdf from '../assets/Factsheet business facilities - Novotel Amsterdam City-1 copy (1).pdf';

const Visitor = () => {
  const navigate = useNavigate();

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

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <PageLoader title="Visitor<span class='font-sans font-light opacity-70 text-3xl ml-1'>Information</span>" />
      <CustomCursor />
      <Header />
      <FullscreenMenu />
      <TicketWidget />

      {/* Visitor Hero Section */}
      <section className="relative h-[65vh] min-h-[500px] flex items-center overflow-hidden bg-brand-dark">
        <img src={heroImg} alt="Exhibition Hall" className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark to-brand-dark/50 z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16">
          <div className="max-w-3xl">
            <p className="text-brand-accent font-bold tracking-widest uppercase text-xs mb-4 animate-fade-up">Plan Your Experience</p>
            <h2 className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight mb-6 animate-fade-up delay-100">
              Visitor <br /><span className="italic font-light text-brand-accent">Information.</span>
            </h2>
            <p className="text-gray-300 font-light text-lg mb-8 max-w-xl animate-fade-up delay-200">
              Experience India’s Innovation, Craftsmanship & Excellence at IndiGlobal Expo.
            </p>
            <div className="flex items-center gap-6 text-white animate-fade-up delay-200">
              <button onClick={() => handleNavigate('/tickets')} className="interactive bg-brand-accent text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-brand-dark transition-colors">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Venue Context & Stats */}
      <section className="py-24 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-up">
              <p className="text-brand-accent font-bold tracking-widest uppercase text-xs mb-4">Visit IndiGlobalExpo</p>
              <h3 className="font-serif text-4xl md:text-5xl text-brand-dark mb-6 leading-snug">
                Discover the Best of India – <span className="italic text-brand-accent">All in One Place.</span>
              </h3>
              <div className="space-y-6 text-gray-500 font-light leading-relaxed">
                <p>IndiGlobalExpo is not just an exhibition—it is a movement to take India’s innovation, craftsmanship, and entrepreneurial spirit to the world. We offer a unique opportunity for businesses to access high-potential international markets, build global partnerships, and showcase "Made in India" excellence.</p>
                <p>Whether you are a buyer, investor, or an industry enthusiast, IndiGlobalExpo provides a platform to engage directly with decision-makers and explore cutting-edge solutions across 15+ high-growth sectors.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mt-12 border-t border-gray-100 pt-10">
                <div>
                  <h4 className="font-serif text-3xl text-brand-dark mb-1">20k+</h4>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Attendees</p>
                </div>
                <div>
                  <h4 className="font-serif text-3xl text-brand-dark mb-1">500+</h4>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Exhibitors</p>
                </div>
                <div>
                  <h4 className="font-serif text-3xl text-brand-dark mb-1">15+</h4>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Sectors</p>
                </div>
              </div>
            </div>

            <div className="relative reveal-up delay-200">
              <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80" alt="Networking" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 hover:scale-105" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-brand-accent p-8 text-white hidden md:block">
                <p className="font-serif text-2xl italic">"A Global stage for Indian excellence."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY VISIT SECTION */}
      <section className="py-24 bg-brand-light relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 reveal-up">
            <h2 className="font-serif text-5xl text-brand-dark mb-4">Why Visit?</h2>
            <div className="w-24 h-1 bg-brand-accent mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Global Exposure', icon: 'ph-globe', desc: 'Experience the latest trends and innovations from various Indian industries under one roof.' },
              { title: 'B2B Networking', icon: 'ph-users-three', desc: 'Connect directly with manufacturers, suppliers, and distributors for strategic partnerships.' },
              { title: 'Market Expansion', icon: 'ph-trend-up', desc: 'Identify new business opportunities and explore high-potential export ready products.' },
              { title: 'Brand Positioning', icon: 'ph-star', desc: 'Engage with top-tier Indian brands and understand their global value proposition.' },
              { title: 'Industry Insights', icon: 'ph-lightbulb', desc: 'Attend summits and seminars featuring industry leaders and market experts.' },
              { title: 'Cultural Experience', icon: 'ph-mask-happy', desc: 'Witness the rich heritage and contemporary craftsmanship of India in Amsterdam.' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 border border-gray-100 hover:border-brand-accent transition-all duration-500 reveal-up group">
                <i className={`ph ${item.icon} text-4xl text-brand-dark group-hover:text-brand-accent mb-6 block transition-colors`}></i>
                <h4 className="font-serif text-2xl text-brand-dark mb-3">{item.title}</h4>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRAVEL & LOGISTICS */}
      <section className="py-24 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-1px bg-gray-100 border border-gray-100 reveal-up">
            {/* Logistic 1 */}
            <div className="bg-white p-12 hover:bg-brand-dark group transition-colors duration-500">
              <i className="ph ph-map-pin text-4xl text-brand-accent mb-8"></i>
              <h4 className="font-serif text-3xl text-brand-dark group-hover:text-white mb-6 transition-colors">The Venue</h4>
              <p className="text-gray-500 group-hover:text-gray-400 font-light leading-relaxed mb-8">Novotel Amsterdam City Hotel <br />Europaboulevard 10, 1083 AD Amsterdam, Netherlands.</p>
              <div className="flex flex-col gap-4 items-start">
                <a href="https://maps.app.goo.gl/9ZpZ" target="_blank" rel="noreferrer" className="text-xs font-bold uppercase tracking-widest text-brand-accent border-b border-brand-accent pb-2">View on Maps</a>
                <a href={factsheetPdf} download className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-white/60 hover:text-brand-accent transition-colors">Download Factsheet</a>
              </div>
            </div>
            {/* Logistic 2 */}
            <div className="bg-white p-12 hover:bg-brand-dark group transition-colors duration-500">
              <i className="ph ph-calendar-blank text-4xl text-brand-accent mb-8"></i>
              <h4 className="font-serif text-3xl text-brand-dark group-hover:text-white mb-6 transition-colors">Date & Time</h4>
              <p className="text-gray-500 group-hover:text-gray-400 font-light leading-relaxed mb-8">December 29 – 30, 2026 <br />09:00 AM – 06:00 PM (CET)</p>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-accent border-b border-brand-accent pb-2">Save to Calendar</span>
            </div>
            {/* Logistic 3 */}
            <div className="bg-white p-12 hover:bg-brand-dark group transition-colors duration-500">
              <i className="ph ph-airplane-tilt text-4xl text-brand-accent mb-8"></i>
              <h4 className="font-serif text-3xl text-brand-dark group-hover:text-white mb-6 transition-colors">Accommodation</h4>
              <p className="text-gray-500 group-hover:text-gray-400 font-light leading-relaxed mb-8">Exclusive rates available at Novotel and partner hotels for registered attendees.</p>
              <button onClick={() => handleNavigate('/contact')} className="text-xs font-bold uppercase tracking-widest text-brand-accent border-b border-brand-accent pb-2">Inquire Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* SCHEDULE PREVIEW */}
      <section className="py-24 bg-brand-dark text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 reveal-up">
            <p className="text-brand-accent tracking-widest uppercase text-xs font-bold mb-4">What to Expect</p>
            <h2 className="font-serif text-5xl mb-6">Event Schedule</h2>
          </div>

          <div className="space-y-12">
            {/* Day 1 */}
            <div className="border-l-2 border-brand-accent/30 pl-8 relative reveal-up">
              <div className="absolute w-4 h-4 bg-brand-accent rounded-full -left-[9px] top-2"></div>
              <h4 className="font-serif text-3xl text-brand-accent mb-2">Day 1: Opening & Networking</h4>
              <p className="text-gray-400 mb-6 uppercase tracking-widest text-xs font-bold">Dec 29, 2026</p>
              <ul className="space-y-4 text-gray-300 font-light">
                <li className="flex gap-4">
                  <span className="text-white font-bold min-w-[80px]">09:00 AM</span>
                  <span>Inauguration & VIP Keynote Speeches</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-white font-bold min-w-[80px]">11:00 AM</span>
                  <span>Exhibition Hall Open & B2B Meetings Begin</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-white font-bold min-w-[80px]">02:00 PM</span>
                  <span>Sector-specific Innovation Summits</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-white font-bold min-w-[80px]">07:00 PM</span>
                  <span>Networking Dinner (Exhibitors & VIPs)</span>
                </li>
              </ul>
            </div>

            {/* Day 2 */}
            <div className="border-l-2 border-brand-accent/30 pl-8 relative reveal-up delay-200">
              <div className="absolute w-4 h-4 bg-brand-accent rounded-full -left-[9px] top-2"></div>
              <h4 className="font-serif text-3xl text-brand-accent mb-2">Day 2: Trade & Closing</h4>
              <p className="text-gray-400 mb-6 uppercase tracking-widest text-xs font-bold">Dec 30, 2026</p>
              <ul className="space-y-4 text-gray-300 font-light">
                <li className="flex gap-4">
                  <span className="text-white font-bold min-w-[80px]">10:00 AM</span>
                  <span>Global Investors & Buyers Round-table</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-white font-bold min-w-[80px]">01:00 PM</span>
                  <span>Workshops on Market Entry Strategies</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-white font-bold min-w-[80px]">04:00 PM</span>
                  <span>Closing Ceremony & Excellence Awards</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 reveal-up">
          <h2 className="font-serif text-5xl text-brand-dark leading-tight mb-8">Ready to join the premier <br /><span className="italic text-brand-accent">Trade Experience?</span></h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button onClick={() => handleNavigate('/tickets')} className="w-full sm:w-auto bg-brand-dark text-white px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-brand-accent transition-all duration-500 interactive">
              Get Your Tickets
            </button>
            <button onClick={() => handleNavigate('/contact')} className="w-full sm:w-auto border border-gray-200 text-brand-dark px-10 py-5 text-sm font-bold uppercase tracking-widest hover:border-brand-dark transition-all duration-500 interactive">
              Contact for Group Visits
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Visitor;
