import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FullscreenMenu from '../components/layout/FullscreenMenu';
import PageLoader from '../components/layout/PageLoader';
import CustomCursor from '../components/ui/CustomCursor';
import TicketWidget from '../components/ui/TicketWidget';

// Import Assets
import heroVideo from '../assets/Black and white video of people.mp4';
import healthcareImg from '../assets/Healthcare.jpg';
import itImg from '../assets/Information Tech.jpg';
import foodImg from '../assets/food and beverages.jpg';
import textilesImg from '../assets/textiles.jpg';
import gemsImg from '../assets/gems and jwelry.jpg';
import manufacturingImg from '../assets/manufacturing.jpg';
import consumerImg from '../assets/consumer goods.jpg';

// Import Unsplash Hover Assets
import healthcareHover from '../assets/Healthcare(unsplash).jfif';
import itHover from '../assets/Information tech(unsplash).jfif';
import foodHover from '../assets/Food and beverages(unsplash).jfif';
import gemsHover from '../assets/gems and jewelry(unsplash).jfif';
import heroPoster from '../assets/Hero poster (unsplash).jfif';

const Home = () => {

  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const horizontalSectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    // Target Date: December 29, 2026
    const targetDate = new Date('2026-09-29T09:00:00').getTime();

    const timerInterval = setInterval(() => {
      const now = new Date().getTime();
  const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timerInterval);
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({
          days: d < 10 ? `0${d}` : d.toString(),
          hours: h < 10 ? `0${h}` : h.toString(),
          minutes: m < 10 ? `0${m}` : m.toString(),
          seconds: s < 10 ? `0${s}` : s.toString()
        });
      }
    }, 1000);

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

    // Horizontal Scroll Logic
    const handleScroll = () => {
      if (!horizontalSectionRef.current || !trackRef.current) return;
      const rect = horizontalSectionRef.current.getBoundingClientRect();
      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        let progress = Math.abs(rect.top) / (rect.height - window.innerHeight);
        progress = Math.max(0, Math.min(1, progress));
        const maxTranslate = trackRef.current.scrollWidth - window.innerWidth + 100;
        trackRef.current.style.transform = `translate3d(${-progress * maxTranslate}px, 0, 0)`;
      } else if (rect.top > 0) {
        trackRef.current.style.transform = `translate3d(0, 0, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(timerInterval);
      revealObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavigate = (path, hash = '') => {
    navigate(path + hash);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <PageLoader />
      <CustomCursor />
      <Header />
      <FullscreenMenu />
      <TicketWidget />

      {/* Cinematic Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 hero-overlay-home z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-20">
          <div className="max-w-4xl">
            <div className="animate-fade-up overflow-hidden mb-4">
              <p className="text-brand-accent font-bold tracking-widest uppercase text-[10px]">A Premier International Trade Fair</p>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-serif text-white font-bold leading-[1.05] mb-8 animate-fade-up delay-100">
              Showcasing India <br /><span className="italic font-light text-brand-accent">to the World.</span>
            </h2>
            
            <div className="flex flex-col sm:flex-row sm:items-center text-white/90 gap-6 sm:gap-12 mb-10 animate-fade-up delay-300">
              <div className="flex items-center gap-3">
                <i className="ph ph-calendar-blank text-xl text-brand-accent"></i>
                <span className="font-light tracking-widest uppercase text-[10px]">September 29 – 30, 2026</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="ph ph-map-pin text-xl text-brand-accent"></i>
                <span className="font-light tracking-widest uppercase text-[10px]">Novotel Amsterdam Hotel, The Netherlands</span>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="flex items-center gap-4 md:gap-8 mb-12 animate-fade-up delay-500">
              <div className="text-center">
                <span className="block font-serif text-3xl md:text-4xl text-brand-accent mb-1">{timeLeft.days}</span>
                <span className="text-[8px] tracking-widest uppercase text-white/60 font-bold">Days</span>
              </div>
              <div className="text-white/20 font-serif text-2xl md:text-4xl pb-5">:</div>
              <div className="text-center">
                <span className="block font-serif text-3xl md:text-4xl text-white mb-1">{timeLeft.hours}</span>
                <span className="text-[8px] tracking-widest uppercase text-white/60 font-bold">Hours</span>
              </div>
              <div className="text-white/20 font-serif text-2xl md:text-4xl pb-5">:</div>
              <div className="text-center">
                <span className="block font-serif text-3xl md:text-4xl text-white mb-1">{timeLeft.minutes}</span>
                <span className="text-[8px] tracking-widest uppercase text-white/60 font-bold">Minutes</span>
              </div>
              <div className="text-white/20 font-serif text-2xl md:text-4xl pb-5">:</div>
              <div className="text-center">
                <span className="block font-serif text-3xl md:text-4xl text-white mb-1">{timeLeft.seconds}</span>
                <span className="text-[8px] tracking-widest uppercase text-white/60 font-bold">Seconds</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-up delay-[600ms]">
              <button 
                onClick={() => handleNavigate('/visitor')} 
                className="bg-white text-brand-dark px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-brand-accent hover:text-white transition-colors interactive"
              >
                Visitor Info
              </button>
              <button 
                onClick={() => handleNavigate('/sectors')} 
                className="text-white px-8 py-4 text-[10px] font-bold uppercase tracking-widest border border-white/30 hover:border-white transition-colors interactive"
              >
                View Sectors
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-fade-up delay-[700ms]">
          <span className="text-[8px] text-white/60 uppercase tracking-widest font-bold">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-brand-accent to-transparent"></div>
        </div>
      </section>

      {/* About & Vision Section */}
      <section id="about" className="py-24 bg-white overflow-hidden relative z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 reveal-up">
          <div className="text-center mb-16">
            <i className="ph-fill ph-globe-hemisphere-west text-4xl text-brand-light mb-6 inline-block"></i>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight text-brand-dark">
              IndiGlobalExpo is a premier international trade fair platform designed to connect Indian businesses with <span className="italic text-brand-accent">global markets.</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 text-gray-500 font-light text-base leading-relaxed">
            <div className="reveal-up delay-100">
              <p className="mb-6">Bringing together companies from diverse sectors, the expo travels across key international destinations, creating powerful opportunities for Indian brands to showcase their products, services, innovation, and capabilities on a global stage.</p>
              <p>From established enterprises to emerging brands, IndiGlobalExpo serves as a gateway for Indian industries to expand their footprint, build strategic partnerships, and explore new markets worldwide.</p>
            </div>
            <div className="border-l border-brand-accent/30 pl-8 md:pl-12 reveal-up delay-200">
              <h4 className="text-[10px] font-bold uppercase tracking-widest mb-4 text-brand-dark">Our Vision</h4>
              <p className="font-serif text-xl text-brand-dark italic leading-relaxed">
                "To position India as a global hub of innovation, quality, and excellence by enabling businesses to access international opportunities and build lasting global connections."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section id="what-we-offer" className="py-32 bg-brand-light relative z-20 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-up">
            <p className="text-brand-accent tracking-widest uppercase text-[10px] font-bold mb-4">A Dynamic Business Ecosystem</p>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-6">What We Offer</h2>
            <p className="text-gray-500 font-light text-base max-w-2xl mx-auto">IndiGlobalExpo is more than an exhibition—it fosters growth, visibility, and collaboration.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-up delay-100">
            {/* Card 1 */}
            <div className="bg-white p-10 border border-gray-100 hover:border-brand-accent hover:shadow-xl transition-all duration-500 interactive group rounded-sm transform hover:-translate-y-2">
              <i className="ph ph-globe text-3xl text-brand-dark group-hover:text-brand-accent transition-colors duration-500 mb-6"></i>
              <h4 className="font-serif text-xl text-brand-dark mb-3">Global Exposure</h4>
              <p className="text-[13px] font-light text-gray-500 leading-relaxed">Showcase your brand across multiple international markets and gain unprecedented visibility.</p>
            </div>
            {/* Card 2 */}
            <div className="bg-brand-dark p-10 border border-brand-dark hover:border-brand-accent hover:shadow-2xl transition-all duration-500 interactive group rounded-sm text-white transform hover:-translate-y-2 md:scale-105 relative z-10">
              <i className="ph ph-users-three text-3xl text-brand-accent mb-6"></i>
              <h4 className="font-serif text-xl text-white mb-3">B2B & B2C Networking</h4>
              <p className="text-[13px] font-light text-gray-400 leading-relaxed">Connect directly with leading buyers, distributors, investors, and prominent industry leaders.</p>
            </div>
            {/* Card 3 */}
            <div className="bg-white p-10 border border-gray-100 hover:border-brand-accent hover:shadow-xl transition-all duration-500 interactive group rounded-sm transform hover:-translate-y-2">
              <i className="ph ph-trend-up text-3xl text-brand-dark group-hover:text-brand-accent transition-colors duration-500 mb-6"></i>
              <h4 className="font-serif text-xl text-brand-dark mb-3">Market Expansion</h4>
              <p className="text-[13px] font-light text-gray-500 leading-relaxed">Explore new territories dynamically and unlock highly lucrative export opportunities.</p>
            </div>
            {/* Card 4 */}
            <div className="bg-white p-10 border border-gray-100 hover:border-brand-accent hover:shadow-xl transition-all duration-500 interactive group rounded-sm transform hover:-translate-y-2">
              <i className="ph ph-star text-3xl text-brand-dark group-hover:text-brand-accent transition-colors duration-500 mb-6"></i>
              <h4 className="font-serif text-xl text-brand-dark mb-3">Brand Positioning</h4>
              <p className="text-[13px] font-light text-gray-500 leading-relaxed">Strengthen your presence as a recognized global player with unmatched credibility.</p>
            </div>
            {/* Card 5 */}
            <div className="bg-white p-10 border border-gray-100 hover:border-brand-accent hover:shadow-xl transition-all duration-500 interactive group rounded-sm transform hover:-translate-y-2 lg:col-span-2 flex flex-col md:flex-row items-start md:items-center gap-6">
              <i className="ph ph-lightbulb text-3xl text-brand-dark group-hover:text-brand-accent transition-colors duration-500"></i>
              <div>
                <h4 className="font-serif text-xl text-brand-dark mb-2">Industry Insights</h4>
                <p className="text-[13px] font-light text-gray-500 leading-relaxed max-w-xl">Gain invaluable exposure to international trends, modern business practices, and innovations shaping the future of global trade.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HORIZONTAL SCROLL SECTORS */}
      <section id="sectors" ref={horizontalSectionRef} className="horizontal-section-wrapper bg-brand-dark text-white h-[400vh] relative">
        <div className="horizontal-sticky-container sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-between items-end">
            <div>
              <p className="text-brand-accent tracking-widest text-[10px] uppercase mb-4 font-bold">A wide spectrum of industries</p>
              <h2 className="font-serif text-4xl md:text-5xl">Sectors We Cover</h2>
            </div>
            <div className="hidden md:block">
              <span className="text-[10px] tracking-widest uppercase text-white/50 flex items-center gap-2">
                <i className="ph ph-arrows-left-right text-lg"></i> Scroll to explore
              </span>
            </div>
          </div>

          <div className="horizontal-track flex gap-8 px-[5vw] transition-transform duration-100 ease-out" ref={trackRef}>
            {[
              { id: 'healthcare', title: 'Healthcare', subtitle: '& Medical Devices', img: healthcareImg, hoverImg: healthcareHover, tags: ['Advanced Equipment', 'Pharmaceuticals'] },
              { id: 'it', title: 'Information Tech', subtitle: '& Digital Solutions', img: itImg, hoverImg: itHover, tags: ['Software Services', 'AI & Infrastructure'] },
              { id: 'food', title: 'Food & Beverages', subtitle: '& Agri-Products', img: foodImg, hoverImg: foodHover, tags: ['Culinary Innovations', 'Retail Ready'] },
              { id: 'textiles', title: 'Textiles', subtitle: '& Fashion Apparels', img: textilesImg, hoverImg: heroPoster, tags: ['Woven Fabrics', 'Designer Fashion'] },
              { id: 'gems', title: 'Gems & Jewelry', subtitle: '& Precious Stones', img: gemsImg, hoverImg: gemsHover, tags: ['Fine Jewelry', 'Craftsmanship'] },
              { id: 'manufacturing', title: 'Manufacturing', subtitle: '& Heavy Engineering', img: manufacturingImg, hoverImg: heroPoster, tags: ['Auto Components', 'Industrial Machinery'] },
              { id: 'consumer', title: 'Consumer Goods', subtitle: '& Handicrafts', img: consumerImg, hoverImg: heroPoster, tags: ['Home Decor', 'Lifestyle Products'] },
            ].map((sector, index) => (
              <div 
                key={index} 
                onClick={() => handleNavigate('/sectors', `#${sector.id}`)}
                className="relative w-[85vw] md:w-[45vw] h-[60vh] flex-shrink-0 group interactive overflow-hidden rounded-sm cursor-pointer"
              >
                <img src={sector.img} alt={sector.title} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700" />
                <img 
                  src={sector.hoverImg} 
                  alt={`${sector.title} Hover`}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-110 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-10 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-brand-accent font-serif text-3xl md:text-4xl mb-2">{sector.title}</h3>
                  <h3 className="text-white font-serif text-2xl md:text-3xl mb-4">{sector.subtitle}</h3>
                  <div className="text-[11px] text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-light flex flex-wrap gap-4">
                    {sector.tags.map((tag, i) => (
                      <span key={i}><i className="ph-fill ph-check-circle text-brand-accent"></i> {tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTICIPATE & GLOBAL REACH */}
      <section id="participate" className="py-24 md:py-32 bg-brand-dark text-white relative overflow-hidden z-20">
        {/* Decorative Animated Accent */}
        <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[120%] opacity-[0.03] pointer-events-none animate-spin-slow origin-center mix-blend-screen">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="0.2" fill="none" strokeDasharray="1 2"/>
            <circle cx="50" cy="50" r="35" stroke="#cfa670" strokeWidth="0.5" fill="none"/>
            <circle cx="50" cy="50" r="25" stroke="white" strokeWidth="0.2" fill="none" strokeDasharray="4 4"/>
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            {/* Why Participate */}
            <div>
              <h2 className="font-serif text-3xl md:text-4xl mb-8 text-brand-accent reveal-up">Why Participate?</h2>
              <ul className="space-y-6 font-light text-gray-300 text-base">
                {[
                  "Access high-potential international markets.",
                  "Build global partnerships and distribution networks.",
                  "Showcase \"Made in India\" excellence to a worldwide audience.",
                  "Engage directly with decision-makers and buyers.",
                  "Enhance export readiness and competitiveness."
                ].map((item, i) => (
                  <li key={i} className={`flex items-start gap-4 reveal-up delay-[${(i+1)*100}ms] hover:translate-x-3 hover:text-white transition-all duration-300 cursor-default group`}>
                    <i className="ph-fill ph-check-circle text-brand-accent text-xl mt-0.5 group-hover:scale-110 transition-transform"></i>
                    <span dangerouslySetInnerHTML={{ __html: item.replace('"Made in India"', '<span class="italic font-serif text-white">"Made in India"</span>') }}></span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Who Should Exhibit */}
            <div>
              <h2 className="font-serif text-3xl md:text-4xl mb-8 text-white reveal-up delay-[100ms]">Who Should Exhibit?</h2>
              <ul className="space-y-6 font-light text-gray-400 text-base">
                {[
                  "Manufacturers and exporters",
                  "Startups and emerging brands",
                  "SMEs and large enterprises",
                  "Industry associations and trade bodies",
                  "Technology providers and service companies"
                ].map((item, i) => (
                  <li key={i} className={`pb-4 border-b border-gray-800 reveal-up delay-[${(i+2)*100}ms] hover:text-brand-accent hover:border-brand-accent/50 hover:translate-x-3 transition-all duration-300 cursor-default ${i === 4 ? 'border-transparent' : ''}`}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Global Reach */}
          <div className="border-t border-gray-800 pt-16 mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-white/10 to-white/0 border border-white/10 p-10 rounded-sm reveal-up group interactive hover:-translate-y-2 hover:border-brand-accent/50 hover:shadow-[0_20px_50px_rgba(207,166,112,0.1)] transition-all duration-500">
              <i className="ph ph-globe-hemisphere-east text-4xl text-brand-accent mb-6 block animate-float group-hover:scale-110 transition-transform duration-500"></i>
              <h3 className="font-serif text-2xl mb-4 text-white group-hover:text-brand-accent transition-colors">Global Reach</h3>
              <p className="font-serif text-lg text-gray-300 italic leading-relaxed group-hover:text-white transition-colors">"Connecting Indian excellence with global demand across strategic markets."</p>
            </div>
            <div className="reveal-up delay-[200ms]">
              <p className="text-gray-400 font-light leading-relaxed text-base">
                IndiGlobalExpo is hosted in strategically selected international locations, ensuring maximum visibility and participation from global stakeholders. Each edition is curated to align with regional market demand, enabling exhibitors to achieve meaningful business outcomes.
              </p>
            </div>
          </div>

          {/* Join the Movement CTA */}
          <div className="mt-24 pt-16 border-t border-gray-800 text-center max-w-4xl mx-auto">
            <p className="text-brand-accent tracking-widest uppercase text-[10px] font-bold mb-4 reveal-up">Join the Movement</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-6 reveal-up delay-[100ms]">
              IndiGlobalExpo is not just an exhibition—it is a movement to take India’s innovation, craftsmanship, and entrepreneurial spirit to the world.
            </h2>
            <p className="text-gray-400 font-light mb-10 text-base reveal-up delay-[200ms]">
              Be a part of IndiGlobalExpo and unlock global possibilities. For participation, partnerships, and sponsorship opportunities, connect with us today and take your business beyond borders.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 reveal-up delay-[300ms]">
              <button 
                onClick={() => handleNavigate('/tickets')} 
                className="w-full sm:w-auto bg-brand-accent text-white px-10 py-5 text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-brand-dark transition-all duration-500 interactive items-center justify-center flex gap-3 shadow-xl group hover:-translate-y-1"
              >
                <i className="ph ph-ticket text-xl group-hover:scale-110 transition-transform"></i> Secure Your Space
              </button>
              <button 
                onClick={() => handleNavigate('/contact')} 
                className="w-full sm:w-auto border border-gray-600 text-white px-10 py-5 text-[11px] font-bold uppercase tracking-widest hover:border-white transition-all duration-500 interactive items-center justify-center flex gap-3 group hover:-translate-y-1 hover:bg-white/5"
              >
                <i className="ph ph-envelope-simple text-xl group-hover:-translate-y-1 group-hover:text-brand-accent transition-transform"></i> Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-brand-light relative z-20 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-up">
            <p className="text-brand-accent tracking-widest uppercase text-[10px] font-bold mb-4">Got Questions?</p>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-dark">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4 reveal-up delay-100">
            {[
              { q: "What is the ticket refund policy?", a: "All ticket sales are final and non-refundable. However, tickets are fully transferable to another colleague or member within your organization up to 7 days before the event starts.", icon: "ph-receipt" },
              { q: "Is there a specific dress code?", a: "The dress code is business professional or smart casual. As this is an international B2B trade fair with global executives, professional attire is highly recommended.", icon: "ph-briefcase" },
              { q: "Are there age restrictions?", a: "Yes, IndiGlobal Expo is a strictly B2B trade event. To maintain a professional environment, all attendees must be 18 years or older to enter the exhibition halls.", icon: "ph-users" },
              { q: "Do you provide Visa assistance?", a: "Yes, registered international visitors and exhibitors will receive an official invitation letter upon request to assist with their Indian Business Visa applications.", icon: "ph-passport" }
            ].map((faq, i) => (
              <div key={i} className="bg-white border border-gray-100 p-6 md:p-8 rounded-sm shadow-sm hover:border-brand-accent hover:shadow-xl transition-all duration-300">
                <h4 className="font-serif text-lg text-brand-dark mb-3 flex items-center gap-3">
                  <i className={`ph-fill ${faq.icon} text-brand-accent text-xl`}></i> {faq.q}
                </h4>
                <p className="text-gray-500 font-light text-[13px] leading-relaxed pl-8">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;

