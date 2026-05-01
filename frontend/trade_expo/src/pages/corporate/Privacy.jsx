import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Eye, UserGear, CheckCircle } from '@phosphor-icons/react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import FullscreenMenu from '../../components/layout/FullscreenMenu';
import PageLoader from '../../components/layout/PageLoader';
import CustomCursor from '../../components/ui/CustomCursor';
import TicketWidget from '../../components/ui/TicketWidget';

const Privacy = () => {
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

  return (
    <>
      <PageLoader title="Privacy Policy" />
      <CustomCursor />
      <Header />
      <FullscreenMenu />
      <TicketWidget />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark to-[#2a2a2a] z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16 text-center md:text-left">
          <div className="max-w-3xl">
            <p className="text-brand-accent font-bold tracking-widest uppercase text-xs mb-4 reveal-up">Corporate Information</p>
            <h2 className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight mb-8 reveal-up delay-100">
              Data & <span className="italic font-light text-brand-accent">Privacy.</span>
            </h2>
          </div>
        </div>
      </section>

      {/* Privacy Highlights Cards */}
      <section className="pt-24 pb-12 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-40">
            {/* Highlight 1 */}
            <div className="bg-white p-8 border border-gray-100 shadow-xl rounded-sm reveal-up">
              <ShieldCheck weight="fill" className="text-4xl text-brand-accent mb-4" />
              <h4 className="font-serif text-xl text-brand-dark mb-2">Secure Protection</h4>
              <p className="text-sm font-light text-gray-500">Your data is secured using advanced encryption protocols to prevent unauthorized access.</p>
            </div>
            {/* Highlight 2 */}
            <div className="bg-white p-8 border border-gray-100 shadow-xl rounded-sm reveal-up delay-100">
              <Eye weight="fill" className="text-4xl text-brand-accent mb-4" />
              <h4 className="font-serif text-xl text-brand-dark mb-2">Total Transparency</h4>
              <p className="text-sm font-light text-gray-500">We clearly outline exactly what information we collect and exactly how it is used.</p>
            </div>
            {/* Highlight 3 */}
            <div className="bg-white p-8 border border-gray-100 shadow-xl rounded-sm reveal-up delay-200">
              <UserGear weight="fill" className="text-4xl text-brand-accent mb-4" />
              <h4 className="font-serif text-xl text-brand-dark mb-2">You're in Control</h4>
              <p className="text-sm font-light text-gray-500">Easily manage your cookie preferences and unsubscribe from communications at any time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-24 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 reveal-up">
          <div className="prose prose-lg text-gray-500 font-light max-w-none">
            <p className="mb-12 text-xl font-medium text-brand-dark">IndiGlobal Expo is committed to protecting your personal data and respecting your privacy rights across all interactions with our platform.</p>
            
            <h3 className="font-serif text-2xl text-brand-dark mb-4">1. Data Collection</h3>
            <p className="mb-8">
              We collect personal information when you register for an event, sign up for our newsletter, or fill out a contact form. The information collected may include your name, job title, company name, email address, phone number, and billing details.
            </p>

            <h3 className="font-serif text-2xl text-brand-dark mb-4">2. Use of Information</h3>
            <p className="mb-4">Any information we collect from you may be used to:</p>
            <ul className="list-none pl-0 mb-8 space-y-3">
              <li className="flex items-center gap-3"><CheckCircle weight="fill" className="text-brand-accent" /> Process event registrations and ticket purchases.</li>
              <li className="flex items-center gap-3"><CheckCircle weight="fill" className="text-brand-accent" /> Send periodic emails and critical event updates.</li>
              <li className="flex items-center gap-3"><CheckCircle weight="fill" className="text-brand-accent" /> Improve our website and customer service experience.</li>
              <li className="flex items-center gap-3"><CheckCircle weight="fill" className="text-brand-accent" /> Administer B2B matchmaking connections during the expo.</li>
            </ul>

            <h3 className="font-serif text-2xl text-brand-dark mb-4">3. Data Protection</h3>
            <p className="mb-8">
              We implement a variety of rigorous security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information. We use advanced encryption (SSL) and strict physical and digital access protocols to protect your data from unauthorized access.
            </p>

            <h3 className="font-serif text-2xl text-brand-dark mb-4">4. Use of Cookies</h3>
            <p className="mb-8">
              Our website uses cookies to enhance user experience. Cookies are small files transferred to your computer's hard drive through your Web browser (if you allow) that enable the site's systems to recognize your browser and capture and remember certain information. You can choose to turn off all cookies via your browser settings, though some website features may not function properly as a result.
            </p>
            
            <h3 className="font-serif text-2xl text-brand-dark mb-4">5. Third-Party Disclosure</h3>
            <p className="mb-8">
              We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties legally agree to keep this information confidential and secure.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Privacy;
