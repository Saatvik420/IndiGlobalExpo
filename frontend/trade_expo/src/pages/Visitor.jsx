import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobeHemisphereEast, SquaresFour, Handshake, Package, Lightbulb, CaretRight, CheckCircle, Calendar, AirplaneLanding, LetterCircleP, Buildings, ArrowRight, Headset, Ticket } from '@phosphor-icons/react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageLoader from '../components/layout/PageLoader';
import CustomCursor from '../components/ui/CustomCursor';
import { useGlobal } from '../context/GlobalContext';
import VisitorDashboard from './VisitorDashboard';

const Visitor = () => {
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

  const handleNavigate = (path) => {
    navigate(path);
  };

  if (isLoggedIn) {
    return <VisitorDashboard />;
  }

  return (
    <>
      <PageLoader title="Visitor Info" />
      <CustomCursor />
      <Header logoColor="text-white" />
      
      {/* Visitor Hero Section */}
      <section className="relative h-[65vh] min-h-[500px] flex items-center overflow-hidden bg-brand-dark">
        <img 
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2000&q=80" 
          alt="Exhibition Hall" 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark to-brand-dark/50 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16 text-center md:text-left">
          <div className="max-w-3xl">
            <p className="text-brand-accent font-bold tracking-widest uppercase text-xs mb-4 animate-fade-up">Plan Your Experience</p>
            <h2 className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight mb-6 animate-fade-up delay-100">
              Visitor <br /><span className="italic font-light text-brand-accent">Information.</span>
            </h2>
            <p className="text-gray-300 font-light text-lg mb-8 max-w-xl animate-fade-up delay-200">
              Experience India’s Innovation, Craftsmanship & Excellence at IndiGlobal Expo.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-6 text-white animate-fade-up delay-200">
              <button 
                onClick={() => handleNavigate('/tickets')}
                className="interactive bg-brand-accent text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-brand-dark transition-colors cursor-pointer"
              >
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
                <p>
                  IndiGlobalExpo invites visitors from across the globe to explore a dynamic showcase of India’s most promising industries, products, and innovations. Hosted in key international destinations, the expo brings together leading Indian brands and emerging enterprises under one roof—offering a unique opportunity to discover high-quality products, build partnerships, and experience the diversity of India’s business landscape.
                </p>
                <p>
                  Whether you are a buyer, distributor, investor, or industry enthusiast, IndiGlobalExpo is your gateway to India.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 reveal-up delay-100">
              <div className="bg-brand-dark p-10 text-white rounded-sm flex flex-col justify-center transform hover:-translate-y-1 transition-transform cursor-default">
                <h4 className="text-5xl font-serif mb-2">10k+</h4>
                <p className="text-xs uppercase tracking-widest text-brand-accent font-bold">Daily Visitors Expected</p>
              </div>
              <div className="bg-brand-accent p-10 text-white rounded-sm flex flex-col justify-center transform hover:-translate-y-1 transition-transform cursor-default">
                <h4 className="text-5xl font-serif mb-2">2</h4>
                <p className="text-xs uppercase tracking-widest font-bold">Exciting Days</p>
              </div>
              <div className="bg-brand-light border border-gray-200 p-8 col-span-2 rounded-sm shadow-sm flex items-center gap-6 transform hover:-translate-y-1 transition-transform cursor-default">
                <GlobeHemisphereEast size={40} className="text-brand-accent" />
                <div>
                  <h4 className="font-serif text-xl text-brand-dark mb-1">A Truly Global Experience</h4>
                  <p className="text-sm text-gray-500 font-light">Hosted across international cities, ensuring accessibility for global audiences.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Visit Section */}
      <section className="py-24 bg-brand-light border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 reveal-up">
            <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-4">Why Visit IndiGlobalExpo?</h2>
            <p className="text-gray-500 font-light text-lg">Your premier platform to connect, source, and discover.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-xl rounded-sm transition-all duration-500 hover:-translate-y-2 reveal-up interactive cursor-pointer group">
              <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-accent transition-colors duration-500">
                <SquaresFour size={24} className="text-brand-accent group-hover:text-white transition-colors duration-500" />
              </div>
              <h4 className="font-serif text-xl text-brand-dark mb-3">Explore Diverse Industries</h4>
              <p className="text-gray-500 font-light text-sm leading-relaxed">Discover products and services across multiple sectors—from healthcare and technology to fashion, food, and lifestyle.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-xl rounded-sm transition-all duration-500 hover:-translate-y-2 reveal-up delay-100 interactive cursor-pointer group">
              <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-accent transition-colors duration-500">
                <Handshake size={24} className="text-brand-accent group-hover:text-white transition-colors duration-500" />
              </div>
              <h4 className="font-serif text-xl text-brand-dark mb-3">Connect with Suppliers</h4>
              <p className="text-gray-500 font-light text-sm leading-relaxed">Meet trusted, verified manufacturers, exporters, and service providers looking to expand globally.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-xl rounded-sm transition-all duration-500 hover:-translate-y-2 reveal-up delay-200 interactive cursor-pointer group">
              <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-accent transition-colors duration-500">
                <Package size={24} className="text-brand-accent group-hover:text-white transition-colors duration-500" />
              </div>
              <h4 className="font-serif text-xl text-brand-dark mb-3">Source High-Quality Products</h4>
              <p className="text-gray-500 font-light text-sm leading-relaxed">Find innovative, cost-effective, and globally competitive offerings directly from India.</p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-xl rounded-sm transition-all duration-500 hover:-translate-y-2 reveal-up interactive cursor-pointer group">
              <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-accent transition-colors duration-500">
                <Lightbulb size={24} className="text-brand-accent group-hover:text-white transition-colors duration-500" />
              </div>
              <h4 className="font-serif text-xl text-brand-dark mb-3">Discover New Trends</h4>
              <p className="text-gray-500 font-light text-sm leading-relaxed">Stay ahead with invaluable insights into emerging products, technologies, and market trends.</p>
            </div>

            {/* Card 5 */}
            <div className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-xl rounded-sm transition-all duration-500 hover:-translate-y-2 reveal-up delay-100 md:col-span-2 lg:col-span-1 interactive cursor-pointer group">
              <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-accent transition-colors duration-500">
                <GlobeHemisphereEast size={24} className="text-brand-accent group-hover:text-white transition-colors duration-500" />
              </div>
              <h4 className="font-serif text-xl text-brand-dark mb-3">Build Global Partnerships</h4>
              <p className="text-gray-500 font-light text-sm leading-relaxed">Network with business leaders, entrepreneurs, and decision-makers from India and around the world.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors & Target Audience */}
      <section className="py-24 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* What You'll Discover */}
            <div className="reveal-up">
              <h3 className="font-serif text-3xl md:text-4xl text-brand-dark mb-8">What You’ll Discover</h3>
              <p className="text-gray-500 font-light mb-8">From traditional craftsmanship to cutting-edge innovation, experience the full spectrum of <span className="italic font-serif text-brand-dark">"Made in India"</span>. We showcase a wide range of sectors, including:</p>
              
              <ul className="space-y-4">
                <li className="flex items-center gap-4 text-gray-600 font-light border-b border-gray-100 pb-3">
                  <CheckCircle weight="fill" className="text-brand-accent text-xl" /> Healthcare & Medical Equipment
                </li>
                <li className="flex items-center gap-4 text-gray-600 font-light border-b border-gray-100 pb-3">
                  <CheckCircle weight="fill" className="text-brand-accent text-xl" /> Food & Beverages
                </li>
                <li className="flex items-center gap-4 text-gray-600 font-light border-b border-gray-100 pb-3">
                  <CheckCircle weight="fill" className="text-brand-accent text-xl" /> Textiles, Garments & Fashion
                </li>
                <li className="flex items-center gap-4 text-gray-600 font-light border-b border-gray-100 pb-3">
                  <CheckCircle weight="fill" className="text-brand-accent text-xl" /> Gems & Jewelry
                </li>
                <li className="flex items-center gap-4 text-gray-600 font-light border-b border-gray-100 pb-3">
                  <CheckCircle weight="fill" className="text-brand-accent text-xl" /> IT & Digital Solutions
                </li>
                <li className="flex items-center gap-4 text-gray-600 font-light border-b border-gray-100 pb-3">
                  <CheckCircle weight="fill" className="text-brand-accent text-xl" /> Manufacturing & Engineering
                </li>
                <li className="flex items-center gap-4 text-gray-600 font-light">
                  <CheckCircle weight="fill" className="text-brand-accent text-xl" /> Consumer Goods & Lifestyle Products
                </li>
              </ul>
            </div>

            {/* Who Should Visit */}
            <div className="bg-brand-dark p-10 md:p-14 rounded-sm text-white reveal-up delay-100 shadow-2xl">
              <h3 className="font-serif text-3xl md:text-4xl text-white mb-8">Who Should Visit?</h3>
              <ul className="space-y-5 font-light text-gray-300">
                <li className="flex items-center gap-4 hover:translate-x-2 transition-transform cursor-default">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-brand-accent"><CaretRight /></div>
                  Importers & Distributors
                </li>
                <li className="flex items-center gap-4 hover:translate-x-2 transition-transform cursor-default">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-brand-accent"><CaretRight /></div>
                  Retailers & Wholesalers
                </li>
                <li className="flex items-center gap-4 hover:translate-x-2 transition-transform cursor-default">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-brand-accent"><CaretRight /></div>
                  Corporate Buyers
                </li>
                <li className="flex items-center gap-4 hover:translate-x-2 transition-transform cursor-default">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-brand-accent"><CaretRight /></div>
                  Investors & Venture Capitalists
                </li>
                <li className="flex items-center gap-4 hover:translate-x-2 transition-transform cursor-default">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-brand-accent"><CaretRight /></div>
                  Industry Professionals
                </li>
                <li className="flex items-center gap-4 hover:translate-x-2 transition-transform cursor-default">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-brand-accent"><CaretRight /></div>
                  Trade Associations & Government Delegates
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Plan Your Visit Action Plan */}
      <section className="py-24 bg-brand-light text-center border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 reveal-up">
          <p className="text-brand-accent tracking-widest uppercase text-xs font-bold mb-4">Your Itinerary</p>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-12">Plan Your Visit</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="bg-white p-6 border border-gray-100 rounded-sm shadow-sm">
              <h4 className="font-bold text-brand-dark mb-2 text-sm uppercase tracking-widest">1. Explore</h4>
              <p className="text-gray-500 font-light text-sm">Explore exhibitors and vast product categories.</p>
            </div>
            <div className="bg-white p-6 border border-gray-100 rounded-sm shadow-sm">
              <h4 className="font-bold text-brand-dark mb-2 text-sm uppercase tracking-widest">2. Schedule</h4>
              <p className="text-gray-500 font-light text-sm">Schedule key B2B meetings with verified suppliers.</p>
            </div>
            <div className="bg-white p-6 border border-gray-100 rounded-sm shadow-sm">
              <h4 className="font-bold text-brand-dark mb-2 text-sm uppercase tracking-widest">3. Attend</h4>
              <p className="text-gray-500 font-light text-sm">Attend product showcases and networking sessions.</p>
            </div>
            <div className="bg-white p-6 border border-gray-100 rounded-sm shadow-sm">
              <h4 className="font-bold text-brand-dark mb-2 text-sm uppercase tracking-widest">4. Discover</h4>
              <p className="text-gray-500 font-light text-sm">Discover entirely new sourcing opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Logistics Grid */}
      <section id="details" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 reveal-up">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-dark">Event Logistics</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Dates & Hours */}
            <div className="bg-brand-light p-10 shadow-sm rounded-sm border border-gray-100 reveal-up hover:-translate-y-2 transition-transform duration-500 interactive cursor-default group">
              <Calendar size={48} className="text-brand-accent mb-6" />
              <h4 className="font-serif text-2xl text-brand-dark mb-6">Days & Opening Hours</h4>
              <ul className="space-y-4 text-sm text-gray-500 font-light">
                <li className="flex justify-between pb-4 border-b border-gray-200">
                  <span className="font-medium text-brand-dark">Tuesday, September 29</span> 
                  <span>10:00 - 17:00</span>
                </li>
                <li className="flex justify-between pb-4 border-b border-gray-200">
                  <span className="font-medium text-brand-dark">Wednesday, September 30</span> 
                  <span>10:00 - 17:00</span>
                </li>
              </ul>
            </div>

            {/* Arrivals */}
            <div className="bg-brand-light p-10 shadow-sm rounded-sm border border-gray-100 reveal-up hover:-translate-y-2 transition-transform duration-500 delay-100 interactive cursor-default group">
              <AirplaneLanding size={48} className="text-brand-accent mb-6" />
              <h4 className="font-serif text-2xl text-brand-dark mb-6">Arrivals</h4>
              <div className="space-y-4 text-sm text-gray-500 font-light leading-relaxed">
                <p><strong className="text-brand-dark font-medium">By Air:</strong> Schiphol Airport.</p>
                <p><strong className="text-brand-dark font-medium">By Train:</strong> Amsterdam RAI Station.</p>
                <p><strong className="text-brand-dark font-medium">By car:</strong> From The Hague/Schiphol (A4): exit 109 and turn left. From Amersfoort (A1): exit 109 and turn left. Novotel is on your right side.</p>
              </div>
            </div>

            {/* Parking */}
            <div className="bg-brand-light p-10 shadow-sm rounded-sm border border-gray-100 reveal-up hover:-translate-y-2 transition-transform duration-500 delay-200 interactive cursor-default group">
              <LetterCircleP size={48} className="text-brand-accent mb-6" />
              <h4 className="font-serif text-2xl text-brand-dark mb-6">Parking</h4>
              <div className="space-y-4 text-sm text-gray-500 font-light leading-relaxed">
                <p>Ample multi-level underground parking is available across Basement 1 & 2 directly beneath the halls.</p>
                <p>EV charging stations are securely located at Entry Gate 3.</p>
                <p>Premium Valet service is available starting at the main drop-off zone for registered VIP guests.</p>
              </div>
            </div>

            {/* Accommodations */}
            <div className="bg-brand-dark p-12 shadow-2xl rounded-sm col-span-full reveal-up relative overflow-hidden group mt-8">
              <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <Buildings size={300} weight="fill" className="text-white absolute -right-10 -top-10" />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div>
                  <h4 className="font-serif text-3xl text-white mb-4">Accommodations</h4>
                  <p className="text-gray-400 font-light max-w-xl leading-relaxed">We have negotiated exclusive, discounted rates with leading luxury and business hotels near the venue for our international delegates, visitors, and exhibitors.</p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <span className="px-6 py-3 border border-white/20 text-white text-xs uppercase tracking-widest rounded-sm bg-white/5 cursor-default">5-Star Partners</span>
                  <span className="px-6 py-3 border border-white/20 text-white text-xs uppercase tracking-widest rounded-sm bg-white/5 cursor-default">Business Hotels</span>
                  <button 
                    onClick={() => handleNavigate('/tickets')}
                    className="px-6 py-3 bg-brand-accent text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-white hover:text-brand-dark transition-colors interactive shadow-lg cursor-pointer"
                  >
                    Register & Book
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-brand-light text-center border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 reveal-up">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-6">Be Part of a Global Business Movement</h2>
          <p className="text-gray-500 font-light text-lg mb-10 leading-relaxed">
            IndiGlobalExpo is more than an exhibition—it is a platform that connects the world with India’s potential. Join thousands of global visitors and experience the innovation, quality, and diversity that India has to offer.
          </p>
          <p className="text-brand-dark font-medium mb-8">Gain access to exclusive networking opportunities and discover world-class products.</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={() => handleNavigate('/tickets')}
              className="bg-brand-dark text-white px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors interactive shadow-xl cursor-pointer"
            >
              Register Now
            </button>
            <button 
              onClick={() => handleNavigate('/contact')}
              className="bg-white border border-gray-200 text-brand-dark px-10 py-5 text-sm font-bold uppercase tracking-widest hover:border-brand-dark transition-colors interactive flex items-center justify-center gap-2 cursor-pointer"
            >
              <Headset size={20} /> Need Assistance?
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Visitor;
