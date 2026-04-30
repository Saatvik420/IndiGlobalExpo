import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobeHemisphereEast, UsersThree, Star, ChartLineUp, LightbulbFilament, RocketLaunch, Check, CheckCircle, Ticket, X, Spinner } from '@phosphor-icons/react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageLoader from '../components/layout/PageLoader';
import CustomCursor from '../components/ui/CustomCursor';
import { useGlobal } from '../context/GlobalContext';
import { exhibitorService } from '../services/exhibitorService';
import { getErrorMessage } from '../utils/errorHelper';
import ExhibitorDashboard from './ExhibitorDashboard';

const Exhibitor = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useGlobal();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null); // 'NONE', 'PENDING', 'APPROVED', 'REJECTED'
  const [error, setError] = useState('');

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

    // Fetch existing application status if logged in
    if (isLoggedIn) {
      checkApplicationStatus();
    }

    return () => revealObserver.disconnect();
  }, [isLoggedIn]);

  const checkApplicationStatus = async () => {
    try {
      const app = await exhibitorService.getMyApplication();
      if (app) {
        setApplicationStatus(app.status);
      } else {
        setApplicationStatus('NONE');
      }
    } catch (err) {
      console.error('Failed to fetch application status', err);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate('/tickets'); // Redirect to login/register flow
      return;
    }

    setIsSubmitting(true);
    setError('');
    const formData = new FormData(e.target);
    const data = {
      companyName: formData.get('companyName'),
      sector: formData.get('sector'),
      website: formData.get('website')
    };

    try {
      await exhibitorService.apply(data);
      setApplicationStatus('PENDING');
      setShowApplyModal(false);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to submit application. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  if (isLoggedIn) {
    return <ExhibitorDashboard />;
  }

  return (
    <>
      <PageLoader title="Exhibit With Us" />
      <CustomCursor />
      <Header logoColor="text-white" />
      
      {/* Exhibitor Hero Section */}
      <section className="relative h-[70vh] min-h-[550px] flex items-center overflow-hidden bg-brand-dark">
        <img 
          src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=2000&q=80" 
          alt="Networking at Expo" 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark to-brand-dark/60 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16 text-center md:text-left">
          <div className="max-w-3xl">
            <p className="text-brand-accent font-bold tracking-widest uppercase text-xs mb-4 animate-fade-up">Exhibit at IndiGlobalExpo</p>
            <h2 className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight mb-8 animate-fade-up delay-100">
              Take Your Business <br /><span className="italic font-light text-brand-accent">Beyond Borders.</span>
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-6 text-white animate-fade-up delay-200">
              <button 
                onClick={() => handleNavigate('/tickets')}
                className="interactive bg-brand-accent text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-brand-dark transition-colors cursor-pointer"
              >
                Book Your Space
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Exhibit With Us Section */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center reveal-up">
          <RocketLaunch size={48} weight="fill" className="text-brand-accent/20 mb-6 inline-block" />
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
            <div className="bg-white p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 rounded-sm reveal-up delay-100 interactive cursor-default">
              <GlobeHemisphereEast size={40} className="text-brand-accent mb-6" />
              <h4 className="font-serif text-xl text-brand-dark mb-3">International Market Access</h4>
              <p className="text-sm font-light text-gray-500">Reach new customers, distributors, and partners across key global markets.</p>
            </div>
            {/* Card 2 */}
            <div className="bg-brand-dark p-10 border border-brand-dark shadow-xl transition-all duration-500 rounded-sm text-white transform md:-translate-y-4 reveal-up delay-200 interactive cursor-default">
              <UsersThree size={40} className="text-brand-accent mb-6" />
              <h4 className="font-serif text-xl text-white mb-3">High-Value Networking</h4>
              <p className="text-sm font-light text-gray-400">Engage directly with importers, buyers, investors, and decision-makers.</p>
            </div>
            {/* Card 3 */}
            <div className="bg-white p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 rounded-sm reveal-up delay-300 interactive cursor-default">
              <Star size={40} className="text-brand-accent mb-6" />
              <h4 className="font-serif text-xl text-brand-dark mb-3">Brand Globalization</h4>
              <p className="text-sm font-light text-gray-500">Position your brand seamlessly as a trusted, high-end global player.</p>
            </div>
            {/* Card 4 */}
            <div className="bg-white p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 rounded-sm reveal-up delay-100 interactive cursor-default">
              <ChartLineUp size={40} className="text-brand-accent mb-6" />
              <h4 className="font-serif text-xl text-brand-dark mb-3">Lead Generation & Sales</h4>
              <p className="text-sm font-light text-gray-500">Connect directly with potential clients and convert interest into real business.</p>
            </div>
            {/* Card 5 */}
            <div className="bg-white p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 rounded-sm lg:col-span-2 flex flex-col justify-center reveal-up delay-200 interactive cursor-default">
              <LightbulbFilament size={40} className="text-brand-accent mb-6" />
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
          <div className="flex items-center gap-12 px-6">
            {[
              "Healthcare & Medical Devices", "Food & Beverages", "Garments & Textiles", "Gems & Jewelry", 
              "IT & Software Solutions", "Manufacturing & Engineering", "Consumer Goods & FMCG", "Handicrafts & Lifestyle"
            ].map((industry, i) => (
              <span key={i} className="font-serif text-3xl text-brand-dark/20 uppercase tracking-widest flex items-center gap-12">
                {industry} <Star weight="fill" className="text-brand-accent text-sm" />
              </span>
            ))}
            {/* Repeat for seamless loop */}
            {[
              "Healthcare & Medical Devices", "Food & Beverages", "Garments & Textiles", "Gems & Jewelry", 
              "IT & Software Solutions", "Manufacturing & Engineering", "Consumer Goods & FMCG", "Handicrafts & Lifestyle"
            ].map((industry, i) => (
              <span key={`dup-${i}`} className="font-serif text-3xl text-brand-dark/20 uppercase tracking-widest flex items-center gap-12">
                {industry} <Star weight="fill" className="text-brand-accent text-sm" />
              </span>
            ))}
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
                {[
                  "Exporters looking to expand into new regions",
                  "SMEs aiming to scale internationally",
                  "Startups seeking global exposure",
                  "Brands launching new products in international markets",
                  "Industry leaders strengthening their global presence"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-gray-300 font-light border-b border-white/10 pb-4">
                    <div className="w-6 h-6 rounded-full bg-brand-accent/20 text-brand-accent flex items-center justify-center flex-shrink-0"><Check /></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Exhibitor Support */}
            <div className="bg-white/5 border border-white/10 p-10 rounded-sm reveal-up delay-200">
              <h3 className="font-serif text-3xl md:text-4xl text-white mb-6">Exhibitor Support</h3>
              <p className="text-gray-400 font-light mb-8">We ensure a seamless and impactful participation experience for every brand.</p>
              <ul className="space-y-4">
                {[
                  "End-to-end event support",
                  "Assistance with booth setup and branding",
                  "Pre-event promotions and visibility",
                  "B2B meeting facilitation",
                  "On-ground coordination and assistance"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white font-light">
                    <CheckCircle weight="fill" className="text-brand-accent text-xl" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Global Destinations & CTA */}
      <section className="py-32 bg-brand-light text-center border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <GlobeHemisphereEast size={48} className="text-brand-accent mb-6 inline-block reveal-up" />
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
              {applicationStatus === 'PENDING' && (
                <div className="flex flex-col items-center gap-4">
                  <div className="px-6 py-3 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <Spinner className="animate-spin" /> Application Under Review
                  </div>
                  <p className="text-sm text-gray-500">We will notify you once your business is approved.</p>
                </div>
              )}

              {applicationStatus === 'APPROVED' && (
                <div className="flex flex-col items-center gap-4">
                  <div className="px-6 py-3 bg-green-50 border border-green-200 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle weight="fill" /> Business Approved
                  </div>
                  <button 
                    onClick={() => handleNavigate('/tickets')}
                    className="bg-brand-dark text-white px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors interactive shadow-xl cursor-pointer mt-4"
                  >
                    Select Your Booth
                  </button>
                </div>
              )}

              {(applicationStatus === 'NONE' || applicationStatus === 'REJECTED') && (
                <>
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-4">Book Your Space Today</p>
                  <button 
                    onClick={() => isLoggedIn ? setShowApplyModal(true) : handleNavigate('/tickets')}
                    className="bg-brand-dark text-white px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors interactive shadow-xl cursor-pointer"
                  >
                    Apply to Exhibit
                  </button>
                  {applicationStatus === 'REJECTED' && <p className="text-red-500 text-xs mt-4">Your previous application was not approved. You can try applying again with updated details.</p>}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm" onClick={() => setShowApplyModal(false)} />
          <div className="relative bg-white w-full max-w-lg p-10 rounded-sm shadow-2xl animate-fade-up">
            <button 
              onClick={() => setShowApplyModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-brand-dark transition-colors"
            >
              <X size={24} />
            </button>
            <h3 className="font-serif text-3xl text-brand-dark mb-2">Exhibitor Application</h3>
            <p className="text-gray-500 font-light text-sm mb-8 border-b border-gray-100 pb-4">Tell us about your business to get started.</p>

            <form onSubmit={handleApply} className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-dark mb-2">Company Name</label>
                <input 
                  name="companyName" 
                  type="text" 
                  required 
                  className="w-full bg-gray-50 border border-gray-100 px-4 py-3 text-sm focus:outline-none focus:border-brand-accent transition-colors"
                  placeholder="e.g. India Textiles Ltd"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-dark mb-2">Industry Sector</label>
                <select 
                  name="sector" 
                  required 
                  className="w-full bg-gray-50 border border-gray-100 px-4 py-3 text-sm focus:outline-none focus:border-brand-accent transition-colors appearance-none"
                >
                  <option value="">Select a sector</option>
                  <option value="Healthcare & Medical Devices">Healthcare & Medical Devices</option>
                  <option value="Food & Beverages">Food & Beverages</option>
                  <option value="Garments & Textiles">Garments & Textiles</option>
                  <option value="Gems & Jewelry">Gems & Jewelry</option>
                  <option value="IT & Software Solutions">IT & Software Solutions</option>
                  <option value="Manufacturing & Engineering">Manufacturing & Engineering</option>
                  <option value="Consumer Goods & FMCG">Consumer Goods & FMCG</option>
                  <option value="Handicrafts & Lifestyle">Handicrafts & Lifestyle</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-dark mb-2">Website</label>
                <input 
                  name="website" 
                  type="url" 
                  required 
                  className="w-full bg-gray-50 border border-gray-100 px-4 py-3 text-sm focus:outline-none focus:border-brand-accent transition-colors"
                  placeholder="https://www.yourcompany.com"
                />
              </div>

              {error && <p className="text-red-500 text-xs font-bold">{error}</p>}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-brand-accent text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-dark transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? <Spinner className="animate-spin" /> : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Exhibitor;
