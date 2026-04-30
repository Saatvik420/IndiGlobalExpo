import { useEffect, useState } from 'react';
import { Buildings, MapPin, EnvelopeSimple, Phone, FacebookLogo, InstagramLogo, LinkedinLogo, TwitterLogo, PaperPlaneTilt, Headset, CheckCircle } from '@phosphor-icons/react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageLoader from '../components/layout/PageLoader';
import CustomCursor from '../components/ui/CustomCursor';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    inquiryType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        inquiryType: '',
        message: ''
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <>
      <PageLoader title="Contact<span class='font-sans font-light text-brand-accent text-3xl ml-1'>Us</span>" />
      <CustomCursor />
      <Header logoColor="text-white" />
      
      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[450px] flex items-center overflow-hidden bg-brand-dark">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80" 
          alt="Office building" 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark to-brand-dark/50 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10">
          <div className="max-w-2xl text-center md:text-left">
            <div className="animate-fade-up overflow-hidden mb-4">
              <p className="text-brand-accent font-bold tracking-widest uppercase text-xs">We are here to help</p>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight mb-4 animate-fade-up delay-100">
              Get In <span className="italic text-brand-accent">Touch.</span>
            </h2>
            <p className="text-gray-300 font-light text-lg animate-fade-up delay-200">Have questions about exhibiting, visiting, or partnering? Reach out to our dedicated support team.</p>
          </div>
        </div>
      </section>

      {/* Main Content: Contact Form & Info */}
      <main className="flex-grow relative z-20 -mt-20 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="bg-white rounded-sm shadow-2xl flex flex-col lg:flex-row overflow-hidden border border-gray-100 animate-fade-up delay-300">
            
            {/* Left: Contact Info */}
            <div className="lg:w-2/5 bg-brand-dark p-12 md:p-16 text-white flex flex-col justify-between relative overflow-hidden">
              <Headset size={250} weight="fill" className="absolute -bottom-10 -right-10 text-white/5 pointer-events-none transform -rotate-12" />
              
              <div className="relative z-10">
                <h3 className="font-serif text-3xl mb-10">Contact Information</h3>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <Buildings size={24} className="text-brand-accent mt-1" />
                    <div>
                      <h4 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Corporate Office</h4>
                      <p className="font-light text-gray-300 leading-relaxed">Brand Vista Consulting Ltd.<br />Apartment 208, Beecham House,<br />Clayponds Lane, Brentford,<br />England, TW8 0GX</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5">
                    <MapPin size={24} className="text-brand-accent mt-1" />
                    <div>
                      <h4 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Venue Address</h4>
                      <p className="font-light text-gray-300 leading-relaxed">Novotel Amsterdam Hotel<br />Europaboulevard 10, 1083 AD Amsterdam,<br />The Netherlands</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5">
                    <EnvelopeSimple size={24} className="text-brand-accent mt-1" />
                    <div>
                      <h4 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Email Us</h4>
                      <a href="mailto:info@indiglobalexpo.com" className="font-light text-gray-300 hover:text-brand-accent transition-colors interactive">info@indiglobalexpo.com</a><br />
                      <a href="mailto:support@indiglobalexpo.com" className="font-light text-gray-300 hover:text-brand-accent transition-colors interactive">support@indiglobalexpo.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5">
                    <Phone size={24} className="text-brand-accent mt-1" />
                    <div>
                      <h4 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Call Us</h4>
                      <p className="font-light text-gray-300">+91 (11) 4567 8900<br />Mon-Fri, 9:00 AM - 6:00 PM (IST)</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
                <h4 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-4">Follow Us</h4>
                <div className="flex items-center gap-6">
                  <a href="#" className="text-white hover:text-brand-accent transition-colors interactive" aria-label="Facebook"><FacebookLogo size={24} weight="fill" className="hover:scale-110 transition-transform" /></a>
                  <a href="#" className="text-white hover:text-brand-accent transition-colors interactive" aria-label="Instagram"><InstagramLogo size={24} weight="fill" className="hover:scale-110 transition-transform" /></a>
                  <a href="#" className="text-white hover:text-brand-accent transition-colors interactive" aria-label="LinkedIn"><LinkedinLogo size={24} weight="fill" className="hover:scale-110 transition-transform" /></a>
                  <a href="#" className="text-white hover:text-brand-accent transition-colors interactive" aria-label="Twitter"><TwitterLogo size={24} weight="fill" className="hover:scale-110 transition-transform" /></a>
                </div>
              </div>
            </div>
            
            {/* Right: Contact Form */}
            <div className="lg:w-3/5 p-12 md:p-16 bg-white">
              <h3 className="font-serif text-3xl text-brand-dark mb-2">Send us a message</h3>
              <p className="text-gray-500 font-light text-sm mb-10">Fill out the form below and we will get back to you within 24 hours.</p>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">First Name *</label>
                    <input 
                      type="text" 
                      name="firstName" 
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required 
                      className="w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors interactive" 
                      placeholder="Jane" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Last Name *</label>
                    <input 
                      type="text" 
                      name="lastName" 
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required 
                      className="w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors interactive" 
                      placeholder="Doe" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                      className="w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors interactive" 
                      placeholder="jane.doe@example.com" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Subject / Inquiry Type *</label>
                    <select 
                      name="inquiryType" 
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      required 
                      className="w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors interactive bg-white"
                    >
                      <option value="" disabled>Select an option</option>
                      <option value="exhibiting">Exhibiting Inquiry</option>
                      <option value="visiting">Visitor & Tickets Support</option>
                      <option value="sponsorship">Sponsorship & Partnerships</option>
                      <option value="media">Press & Media</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Your Message *</label>
                    <textarea 
                      name="message" 
                      value={formData.message}
                      onChange={handleInputChange}
                      required 
                      rows="4" 
                      className="w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors interactive resize-none" 
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                </div>
                
                <div className="mt-10">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-brand-dark text-white px-12 py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors interactive flex justify-center items-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'} <PaperPlaneTilt size={18} />
                  </button>
                </div>
                
                {submitted && (
                  <div className="mt-6 p-4 bg-green-50 text-green-700 text-sm border border-green-100 rounded-sm flex items-center gap-3">
                    <CheckCircle size={20} weight="fill" />
                    Your message has been sent successfully. We will be in touch shortly!
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Global Maps Section */}
      <section className="py-12 bg-white reveal-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-[400px] w-full bg-gray-200 rounded-sm border border-gray-100 overflow-hidden relative interactive group">
            <iframe 
              src="https://maps.google.com/maps?q=Novotel%20Amsterdam%20Hotel,%20Europaboulevard%2010,%20Amsterdam&t=&z=14&ie=UTF8&iwloc=&output=embed" 
              className="absolute inset-0 w-full h-full grayscale opacity-80 group-hover:grayscale-0 transition-all duration-700" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Venue Map"
            ></iframe>
            
            <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors duration-700 pointer-events-none"></div>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center bg-white p-6 shadow-xl rounded-sm pointer-events-none group-hover:opacity-0 transition-opacity duration-700">
              <MapPin size={40} weight="fill" className="text-brand-accent mb-2 animate-bounce" />
              <p className="font-serif text-lg text-brand-dark font-bold">Novotel Amsterdam Hotel</p>
              <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mt-1">Amsterdam</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
