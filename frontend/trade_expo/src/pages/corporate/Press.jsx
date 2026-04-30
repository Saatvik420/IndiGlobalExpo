import { useEffect } from 'react';
import { ArrowRight, Link, Megaphone, EnvelopeSimple, Phone, FolderOpen, FileZip } from '@phosphor-icons/react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import PageLoader from '../../components/layout/PageLoader';
import CustomCursor from '../../components/ui/CustomCursor';

const Press = () => {
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
      <PageLoader title="Press" />
      <CustomCursor />
      <Header logoColor="text-white" />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden bg-brand-dark">
        <img 
          src="https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&w=2000&q=80" 
          alt="Media Event" 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark to-brand-dark/60 z-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16">
          <div className="max-w-3xl text-center md:text-left">
            <p className="text-brand-accent font-bold tracking-widest uppercase text-xs mb-4 animate-fade-up">News & Resources</p>
            <h2 className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight mb-8 animate-fade-up delay-100">
              Press & <span className="italic font-light text-brand-accent">Media.</span>
            </h2>
          </div>
        </div>
      </section>

      {/* Press Releases Section */}
      <section className="py-24 bg-brand-light border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h3 className="font-serif text-4xl text-brand-dark mb-12 reveal-up">Latest Announcements</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* PR 1: Next Economy Forum */}
            <div className="bg-white p-8 md:p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-accent/50 transition-all duration-500 rounded-sm reveal-up delay-100 group flex flex-col justify-between h-full">
              <div>
                <p className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-3">Global Forum • Nov 15, 2025</p>
                <h4 className="font-serif text-2xl text-brand-dark mb-4 group-hover:text-brand-accent transition-colors">The Next Economy Forum 2025 Concludes with Landmark Success</h4>
                <p className="text-gray-500 font-light text-sm mb-6 leading-relaxed">Brand Vista Consulting hosted a global leadership gathering at the House of Lords and Oxford University to discuss building a sustainable, inclusive, and tech-driven global economy.</p>
              </div>
              <a href="https://www.britishnewsnetwork.com/news/the-next-economy-forum-2025-concludes-with-landmark-success-at-the-house-of-lords-oxford-university20251115161419/" target="_blank" rel="noopener noreferrer" className="interactive text-brand-dark font-medium text-sm flex items-center gap-2 hover:text-brand-accent transition-colors group-hover:translate-x-2 w-fit"><ArrowRight size={16} /> Read Full Story</a>
            </div>
            
            {/* PR 2: Unity for Growth */}
            <div className="bg-white p-8 md:p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-accent/50 transition-all duration-500 rounded-sm reveal-up delay-200 group flex flex-col justify-between h-full">
              <div>
                <p className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-3">Conference • July 05, 2025</p>
                <h4 className="font-serif text-2xl text-brand-dark mb-4 group-hover:text-brand-accent transition-colors">Unity for Growth: Leaders Unite for a Developed India Vision</h4>
                <p className="text-gray-500 font-light text-sm mb-6 leading-relaxed">The National Conference at Bharat Mandapam reinforced a shared vision for a developed India by 2047, featuring prominent policymakers and business leaders from across the country.</p>
              </div>
              <a href="https://www.aninews.in/news/business/unity-for-growth-leaders-unite-for-a-developed-india-vision20250705173604/" target="_blank" rel="noopener noreferrer" className="interactive text-brand-dark font-medium text-sm flex items-center gap-2 hover:text-brand-accent transition-colors group-hover:translate-x-2 w-fit"><Link size={16} /> View Press Release</a>
            </div>

            {/* PR 3: National Education Conference */}
            <div className="bg-white p-8 md:p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-accent/50 transition-all duration-500 rounded-sm reveal-up delay-300 group flex flex-col justify-between h-full">
              <div>
                <p className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-3">Education • Dec 06, 2024</p>
                <h4 className="font-serif text-2xl text-brand-dark mb-4 group-hover:text-brand-accent transition-colors">National Education Conference and Awards 2025</h4>
                <p className="text-gray-500 font-light text-sm mb-6 leading-relaxed">Guidance Forever hosted the National Education Conference in New Delhi, focusing on technology integration and policy reforms to achieve a "Viksit Bharat" by 2047.</p>
              </div>
              <a href="https://www.business-standard.com/content/press-releases-ani/national-education-conference-and-awards-2025-paving-the-path-to-a-viksit-bharat-2047-by-guidance-forever-124120601076_1.html" target="_blank" rel="noopener noreferrer" className="interactive text-brand-dark font-medium text-sm flex items-center gap-2 hover:text-brand-accent transition-colors group-hover:translate-x-2 w-fit"><ArrowRight size={16} /> Read Full Story</a>
            </div>

            {/* PR 4: Birla Open Minds */}
            <div className="bg-white p-8 md:p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-accent/50 transition-all duration-500 rounded-sm reveal-up delay-100 group flex flex-col justify-between h-full lg:mt-8">
              <div>
                <p className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-3">Academic Excellence • Aug 18, 2025</p>
                <h4 className="font-serif text-2xl text-brand-dark mb-4 group-hover:text-brand-accent transition-colors">Birla Open Minds: Redefining Education with Vision and Scale</h4>
                <p className="text-gray-500 font-light text-sm mb-6 leading-relaxed">Nirvaan Birla's Birla Open Minds is expanding its network to over 260 schools, integrating "Soul Science" and drone technology for future-ready education.</p>
              </div>
              <a href="https://english.dainikjagranmpcg.com/education/birla-open-minds-redefining-education-with-vision-and-scale-led/article-3944" target="_blank" rel="noopener noreferrer" className="interactive text-brand-dark font-medium text-sm flex items-center gap-2 hover:text-brand-accent transition-colors group-hover:translate-x-2 w-fit"><ArrowRight size={16} /> Read Full Story</a>
            </div>

            {/* PR 5: Shriram Pistons & Rings Ltd */}
            <div className="bg-white p-8 md:p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-accent/50 transition-all duration-500 rounded-sm reveal-up delay-200 group flex flex-col justify-between h-full lg:mt-8">
              <div>
                <p className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-3">Innovation • Aug 20, 2025</p>
                <h4 className="font-serif text-2xl text-brand-dark mb-4 group-hover:text-brand-accent transition-colors">SPRL Driving Innovation and Sustainability in Automotive Sector</h4>
                <p className="text-gray-500 font-light text-sm mb-6 leading-relaxed">Shriram Pistons & Rings Ltd (SPRL) is leading the charge in automotive components, diversifying into e-mobility and precision engineering for a self-reliant India.</p>
              </div>
              <a href="https://english.dainikjagranmpcg.com/business/shriram-pistons-rings-ltd-sprl-driving-innovation-and-sustainability/article-4020" target="_blank" rel="noopener noreferrer" className="interactive text-brand-dark font-medium text-sm flex items-center gap-2 hover:text-brand-accent transition-colors group-hover:translate-x-2 w-fit"><ArrowRight size={16} /> Read Full Story</a>
            </div>
          </div>
        </div>
      </section>

      {/* Media Contacts & Kit */}
      <section className="py-24 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Contact Card */}
            <div className="bg-brand-light p-12 border border-gray-100 shadow-sm rounded-sm reveal-up">
              <Megaphone weight="fill" size={48} className="text-brand-accent mb-6 inline-block" />
              <h3 className="font-serif text-3xl text-brand-dark mb-4">Media Inquiries</h3>
              <p className="text-gray-500 font-light mb-8">For interview requests, high-res images, or general media inquiries, please reach out to our dedicated communications desk.</p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-brand-dark">Sarah Jenkins</p>
                  <p className="text-sm text-gray-500 font-light">Director of Global Communications</p>
                </div>
                <a href="mailto:press@indiglobalexpo.com" className="flex items-center gap-3 text-brand-accent hover:text-brand-dark transition-colors interactive w-fit">
                  <EnvelopeSimple weight="fill" size={20} /> press@indiglobalexpo.com
                </a>
                <a href="tel:+911123456789" className="flex items-center gap-3 text-brand-accent hover:text-brand-dark transition-colors interactive w-fit">
                  <Phone weight="fill" size={20} /> +91 11 2345 6789
                </a>
              </div>
            </div>

            {/* Media Kit Download */}
            <div className="text-center md:text-left reveal-up delay-100 p-6">
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-brand-accent/30 rounded-full animate-pulse-slow scale-150"></div>
                <FolderOpen weight="fill" size={60} className="text-brand-accent relative z-10" />
              </div>
              <h3 className="font-serif text-4xl text-brand-dark mb-6">Official Media Kit</h3>
              <p className="text-gray-500 font-light text-lg mb-10 leading-relaxed">
                Need assets for a story? Download our official media kit, which includes high-resolution logos, executive headshots, previous event B-roll video, and strict brand guidelines.
              </p>
              <a href="#" className="interactive inline-flex items-center justify-center gap-3 bg-brand-dark text-white px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors shadow-xl w-full sm:w-auto">
                <FileZip size={20} /> Download Kit (45MB)
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Press;
