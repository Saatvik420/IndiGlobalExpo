import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Star, Lightbulb, Globe, TrendUp, Briefcase, Plus, ArrowRight, CheckCircle
} from '@phosphor-icons/react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FullscreenMenu from '../components/layout/FullscreenMenu';
import PageLoader from '../components/layout/PageLoader';
import CustomCursor from '../components/ui/CustomCursor';
import TicketWidget from '../components/ui/TicketWidget';

// Import Assets
import heroImg from '../assets/Hero poster (unsplash).jfif';
import healthcareImg from '../assets/Healthcare.jpg';
import itImg from '../assets/Information Tech.jpg';
import foodImg from '../assets/food and beverages.jpg';
import textilesImg from '../assets/textiles.jpg';
import gemsImg from '../assets/gems and jwelry.jpg';
import manufacturingImg from '../assets/manufacturing.jpg';
import consumerImg from '../assets/consumer goods.jpg';

const Sectors = () => {
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

    // Handle hash scrolling if coming from another page
    setTimeout(() => {
        if (window.location.hash) {
            const targetId = window.location.hash.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, 1000);

    return () => revealObserver.disconnect();
  }, []);

  return (
    <>
      <PageLoader title="Sectors" />
      <CustomCursor />
      <Header />
      <FullscreenMenu />
      <TicketWidget />

      {/* Sectors Hero Section */}
      <section className="relative h-[65vh] min-h-[500px] flex items-center overflow-hidden bg-brand-dark">
        <img src={heroImg} alt="Industry Sectors" className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark to-brand-dark/50 z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16">
          <div className="max-w-3xl">
            <p className="text-brand-accent font-bold tracking-widest uppercase text-xs mb-4 animate-fade-up">Industries & Opportunities</p>
            <h2 className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight mb-6 animate-fade-up delay-100">
              Explore Our <br /><span className="italic font-light text-brand-accent">Sectors.</span>
            </h2>
            <p className="text-gray-300 font-light text-lg mb-8 max-w-xl animate-fade-up delay-200">
              Discover the dynamic industries showcased at IndiGlobal Expo, driving innovation and expanding global trade footprints.
            </p>
          </div>
        </div>
      </section>

      {/* Sectors Content */}
      <div className="bg-brand-light">
        {/* 1. Healthcare */}
        <section id="healthcare" className="sector-section py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 reveal-up">
                <span className="text-brand-accent font-bold tracking-widest uppercase text-xs">Sector 01</span>
                <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mt-2 mb-6">Healthcare & Medical Devices</h2>
                <p className="text-gray-500 font-light text-lg leading-relaxed mb-8">
                  India is rapidly becoming a leading hub for advanced medical devices, reliable pharmaceuticals, and cutting-edge healthcare technology. This sector brings together manufacturers of hospital equipment, diagnostic tools, and wellness products connecting them with global healthcare providers.
                </p>
                <ul className="space-y-4 font-light text-gray-600">
                  <li className="flex items-center gap-3"><i className="ph-fill ph-check-circle text-brand-accent"></i> Advanced Diagnostic Equipment</li>
                  <li className="flex items-center gap-3"><i className="ph-fill ph-check-circle text-brand-accent"></i> Pharmaceuticals & Nutraceuticals</li>
                  <li className="flex items-center gap-3"><i className="ph-fill ph-check-circle text-brand-accent"></i> Telemedicine & Digital Health</li>
                </ul>
              </div>
              <div className="order-1 lg:order-2 reveal-up delay-100">
                <img src={healthcareImg} alt="Healthcare" className="w-full h-[400px] object-cover rounded-sm shadow-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* 2. IT */}
        <section id="it" className="sector-section py-20 bg-brand-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="reveal-up">
                <img src={itImg} alt="Information Technology" className="w-full h-[400px] object-cover rounded-sm shadow-xl" />
              </div>
              <div className="reveal-up delay-100">
                <span className="text-brand-accent font-bold tracking-widest uppercase text-xs">Sector 02</span>
                <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mt-2 mb-6">Information Tech & Digital Solutions</h2>
                <p className="text-gray-500 font-light text-lg leading-relaxed mb-8">
                  Showcasing India's renowned IT prowess. From disruptive startup innovations and Artificial Intelligence to enterprise software and cloud infrastructure, connect with the minds driving the global digital transformation.
                </p>
                <ul className="space-y-4 font-light text-gray-600">
                  <li className="flex items-center gap-3"><i className="ph-fill ph-check-circle text-brand-accent"></i> AI & Machine Learning</li>
                  <li className="flex items-center gap-3"><i className="ph-fill ph-check-circle text-brand-accent"></i> Enterprise Software Services</li>
                  <li className="flex items-center gap-3"><i className="ph-fill ph-check-circle text-brand-accent"></i> Cybersecurity Solutions</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Food & Beverages */}
        <section id="food" className="sector-section py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 reveal-up">
                <span className="text-brand-accent font-bold tracking-widest uppercase text-xs">Sector 03</span>
                <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mt-2 mb-6">Food & Beverages & Agri-Products</h2>
                <p className="text-gray-500 font-light text-lg leading-relaxed mb-8">
                  A global taste of India. This sector presents premium spices, organic agri-products, processed foods, and culinary innovations ready for international retail, wholesale, and hospitality distribution.
                </p>
                <ul className="space-y-4 font-light text-gray-600">
                  <li className="flex items-center gap-3"><i className="ph-fill ph-check-circle text-brand-accent"></i> Premium Spices & Organic Foods</li>
                  <li className="flex items-center gap-3"><i className="ph-fill ph-check-circle text-brand-accent"></i> Processed & Retail-Ready Goods</li>
                  <li className="flex items-center gap-3"><i class="ph-fill ph-check-circle text-brand-accent"></i> Sustainable Agri-Tech</li>
                </ul>
              </div>
              <div className="order-1 lg:order-2 reveal-up delay-100">
                <img src={foodImg} alt="Food & Beverages" className="w-full h-[400px] object-cover rounded-sm shadow-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Textiles */}
        <section id="textiles" className="sector-section py-20 bg-brand-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="reveal-up">
                <img src={textilesImg} alt="Textiles" className="w-full h-[400px] object-cover rounded-sm shadow-xl" />
              </div>
              <div className="reveal-up delay-100">
                <span className="text-brand-accent font-bold tracking-widest uppercase text-xs">Sector 04</span>
                <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mt-2 mb-6">Textiles & Fashion Apparels</h2>
                <p className="text-gray-500 font-light text-lg leading-relaxed mb-8">
                  From rich traditional weaves to contemporary modern fashion. Explore a wide array of sustainable fabrics, designer apparel, and home textiles crafted by India's finest manufacturers for the global stage.
                </p>
                <ul className="space-y-4 font-light text-gray-600">
                  <li className="flex items-center gap-3"><i className="ph-fill ph-check-circle text-brand-accent"></i> Sustainable & Woven Fabrics</li>
                  <li className="flex items-center gap-3"><i className="ph-fill ph-check-circle text-brand-accent"></i> Contemporary Designer Fashion</li>
                  <li className="flex items-center gap-3"><i className="ph-fill ph-check-circle text-brand-accent"></i> Premium Home Textiles</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Gems & Jewelry */}
        <section id="gems" className="sector-section py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 reveal-up">
                <span className="text-brand-accent font-bold tracking-widest uppercase text-xs">Sector 05</span>
                <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mt-2 mb-6">Gems & Jewelry</h2>
                <p className="text-gray-500 font-light text-lg leading-relaxed mb-8">
                  Experience unmatched craftsmanship. Discover exquisite fine jewelry, expertly cut precious stones, and bespoke diamond creations that blend India's rich heritage with modern, global design trends.
                </p>
                <ul className="space-y-4 font-light text-gray-600">
                  <li className="flex items-center gap-3"><i className="ph-fill ph-check-circle text-brand-accent"></i> Fine Diamond & Gold Jewelry</li>
                  <li className="flex items-center gap-3"><i className="ph-fill ph-check-circle text-brand-accent"></i> Cut & Polished Precious Stones</li>
                  <li className="flex items-center gap-3"><i className="ph-fill ph-check-circle text-brand-accent"></i> Handcrafted Heritage Pieces</li>
                </ul>
              </div>
              <div className="order-1 lg:order-2 reveal-up delay-100">
                <img src={gemsImg} alt="Gems & Jewelry" className="w-full h-[400px] object-cover rounded-sm shadow-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* 6. Manufacturing */}
        <section id="manufacturing" className="sector-section py-20 bg-brand-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="reveal-up">
                <img src={manufacturingImg} alt="Manufacturing" className="w-full h-[400px] object-cover rounded-sm shadow-xl" />
              </div>
              <div className="reveal-up delay-100">
                <span className="text-brand-accent font-bold tracking-widest uppercase text-xs">Sector 06</span>
                <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mt-2 mb-6">Manufacturing & Heavy Engineering</h2>
                <p className="text-gray-500 font-light text-lg leading-relaxed mb-8">
                  A display of industrial might. This sector highlights manufacturers of auto components, heavy machinery, and precision engineering tools that supply top-tier international OEMs and infrastructure projects.
                </p>
                <ul className="space-y-4 font-light text-gray-600">
                  <li className="flex items-center gap-3"><i className="ph-fill ph-check-circle text-brand-accent"></i> Precision Auto Components</li>
                  <li className="flex items-center gap-3"><i className="ph-fill ph-check-circle text-brand-accent"></i> Heavy Industrial Machinery</li>
                  <li className="flex items-center gap-3"><i className="ph-fill ph-check-circle text-brand-accent"></i> Engineering & Tooling</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Consumer Goods */}
        <section id="consumer" className="sector-section py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 reveal-up">
                <span className="text-brand-accent font-bold tracking-widest uppercase text-xs">Sector 07</span>
                <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mt-2 mb-6">Consumer Goods & Handicrafts</h2>
                <p className="text-gray-500 font-light text-lg leading-relaxed mb-8">
                  Elevate everyday living. Connecting international buyers with India's unique home decor, lifestyle products, and authentic artisan handicrafts that are in high demand across global retail markets.
                </p>
                <ul className="space-y-4 font-light text-gray-600">
                  <li className="flex items-center gap-3"><i className="ph-fill ph-check-circle text-brand-accent"></i> Premium Home Decor</li>
                  <li className="flex items-center gap-3"><i className="ph-fill ph-check-circle text-brand-accent"></i> Authentic Artisan Handicrafts</li>
                  <li className="flex items-center gap-3"><i className="ph-fill ph-check-circle text-brand-accent"></i> Everyday Lifestyle Products</li>
                </ul>
              </div>
              <div className="order-1 lg:order-2 reveal-up delay-100">
                <img src={consumerImg} alt="Consumer Goods" className="w-full h-[400px] object-cover rounded-sm shadow-xl" />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CTA */}
      <section className="py-24 bg-brand-dark text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 reveal-up">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Ready to expand your business?</h2>
          <p className="text-gray-400 font-light text-lg mb-10 reveal-up delay-100">Whether you are a buyer looking for specific goods or an exhibitor ready for the global stage, secure your pass today.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 reveal-up delay-200">
            <button onClick={() => navigate('/tickets')} className="bg-brand-accent text-white px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-brand-dark transition-all duration-300 interactive shadow-xl">
              Get Your Tickets
            </button>
            <button onClick={() => navigate('/exhibitor')} className="border border-gray-600 text-white px-10 py-5 text-sm font-bold uppercase tracking-widest hover:border-white transition-all duration-300 interactive">
              Exhibit With Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Sectors;
