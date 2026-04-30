import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight } from '@phosphor-icons/react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageLoader from '../components/layout/PageLoader';
import CustomCursor from '../components/ui/CustomCursor';

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

    // Handle hash navigation
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }

    return () => revealObserver.disconnect();
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const sectors = [
    {
      id: 'healthcare',
      number: '01',
      title: 'Healthcare & Medical Devices',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
      description: "India is rapidly becoming a leading hub for advanced medical devices, reliable pharmaceuticals, and cutting-edge healthcare technology. This sector brings together manufacturers of hospital equipment, diagnostic tools, and wellness products connecting them with global healthcare providers.",
      features: ['Advanced Diagnostic Equipment', 'Pharmaceuticals & Nutraceuticals', 'Telemedicine & Digital Health']
    },
    {
      id: 'it',
      number: '02',
      title: 'Information Tech & Digital Solutions',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      description: "Showcasing India's renowned IT prowess. From disruptive startup innovations and Artificial Intelligence to enterprise software and cloud infrastructure, connect with the minds driving the global digital transformation.",
      features: ['AI & Machine Learning', 'Enterprise Software Services', 'Cybersecurity Solutions']
    },
    {
      id: 'food',
      number: '03',
      title: 'Food & Beverages & Agri-Products',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
      description: "A global taste of India. This sector presents premium spices, organic agri-products, processed foods, and culinary innovations ready for international retail, wholesale, and hospitality distribution.",
      features: ['Premium Spices & Organic Foods', 'Processed & Retail-Ready Goods', 'Sustainable Agri-Tech']
    },
    {
      id: 'textiles',
      number: '04',
      title: 'Textiles & Fashion Apparels',
      image: 'https://images.unsplash.com/photo-1618220179428-22790b46a0eb?auto=format&fit=crop&w=1200&q=80',
      description: "From rich traditional weaves to contemporary modern fashion. Explore a wide array of sustainable fabrics, designer apparel, and home textiles crafted by India's finest manufacturers for the global stage.",
      features: ['Sustainable & Woven Fabrics', 'Contemporary Designer Fashion', 'Premium Home Textiles']
    },
    {
      id: 'gems',
      number: '05',
      title: 'Gems & Jewelry',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80',
      description: "Experience unmatched craftsmanship. Discover exquisite fine jewelry, expertly cut precious stones, and bespoke diamond creations that blend India's rich heritage with modern, global design trends.",
      features: ['Fine Diamond & Gold Jewelry', 'Cut & Polished Precious Stones', 'Handcrafted Heritage Pieces']
    },
    {
      id: 'manufacturing',
      number: '06',
      title: 'Manufacturing & Heavy Engineering',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
      description: "A display of industrial might. This sector highlights manufacturers of auto components, heavy machinery, and precision engineering tools that supply top-tier international OEMs and infrastructure projects.",
      features: ['Precision Auto Components', 'Heavy Industrial Machinery', 'Engineering & Tooling']
    },
    {
      id: 'consumer',
      number: '07',
      title: 'Consumer Goods & Handicrafts',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      description: "Elevate everyday living. Connecting international buyers with India's unique home decor, lifestyle products, and authentic artisan handicrafts that are in high demand across global retail markets.",
      features: ['Premium Home Decor', 'Authentic Artisan Handicrafts', 'Everyday Lifestyle Products']
    }
  ];

  return (
    <>
      <PageLoader title="Sectors" />
      <CustomCursor />
      <Header logoColor="text-white" />
      
      {/* Sectors Hero Section */}
      <section className="relative h-[65vh] min-h-[500px] flex items-center overflow-hidden bg-brand-dark">
        <img 
          src="https://images.unsplash.com/photo-1558402529-d2638a7023e9?auto=format&fit=crop&w=2000&q=80" 
          alt="Industry Sectors" 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark to-brand-dark/50 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16 text-center md:text-left">
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
        {sectors.map((sector, index) => (
          <section 
            key={sector.id} 
            id={sector.id} 
            className={`sector-section py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-brand-light'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={`${index % 2 === 0 ? 'order-2 lg:order-1' : 'order-2 lg:order-2'} reveal-up`}>
                  <span className="text-brand-accent font-bold tracking-widest uppercase text-xs">Sector {sector.number}</span>
                  <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mt-2 mb-6">{sector.title}</h2>
                  <p className="text-gray-500 font-light text-lg leading-relaxed mb-8">
                    {sector.description}
                  </p>
                  <ul className="space-y-4 font-light text-gray-600 mb-10">
                    {sector.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle weight="fill" className="text-brand-accent text-xl" /> {feature}
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => handleNavigate('/exhibitor')}
                    className="inline-flex items-center gap-3 text-brand-dark font-bold uppercase tracking-widest text-xs border-b-2 border-brand-accent pb-1 hover:text-brand-accent transition-colors interactive group"
                  >
                    Exhibit in This Sector <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
                <div className={`${index % 2 === 0 ? 'order-1 lg:order-2' : 'order-1 lg:order-1'} reveal-up delay-100`}>
                  <div className="relative group overflow-hidden rounded-sm shadow-xl">
                    <img 
                      src={sector.image} 
                      alt={sector.title} 
                      className="w-full h-[450px] object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* CTA Section */}
      <section className="py-24 bg-brand-dark text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 reveal-up">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Ready to expand your business?</h2>
          <p className="text-gray-400 font-light text-lg mb-10 reveal-up delay-100">Whether you are a buyer looking for specific goods or an exhibitor ready for the global stage, secure your pass today.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 reveal-up delay-200">
            <button 
              onClick={() => handleNavigate('/tickets')}
              className="bg-brand-accent text-white px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-brand-dark transition-all duration-300 interactive shadow-xl cursor-pointer"
            >
              Get Your Tickets
            </button>
            <button 
              onClick={() => handleNavigate('/exhibitor')}
              className="border border-gray-600 text-white px-10 py-5 text-sm font-bold uppercase tracking-widest hover:border-white transition-all duration-300 interactive cursor-pointer"
            >
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
