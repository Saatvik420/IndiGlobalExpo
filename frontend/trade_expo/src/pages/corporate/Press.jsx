import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Link, Megaphone, EnvelopeSimple, Phone, FolderOpen, FileZip } from '@phosphor-icons/react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import FullscreenMenu from '../../components/layout/FullscreenMenu';
import PageLoader from '../../components/layout/PageLoader';
import CustomCursor from '../../components/ui/CustomCursor';
import TicketWidget from '../../components/ui/TicketWidget';

const Press = () => {
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
      <PageLoader title="Press" />
      <CustomCursor />
      <Header />
      <FullscreenMenu />
      <TicketWidget />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden bg-brand-dark">
        <img 
          src="https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&w=2000&q=80" 
          alt="Media Event" 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark to-brand-dark/60 z-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16">
          <div className="max-w-3xl">
            <p className="text-brand-accent font-bold tracking-widest uppercase text-xs mb-4 reveal-up">News & Resources</p>
            <h2 className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight mb-8 reveal-up delay-100">
              Press & <span className="italic font-light text-brand-accent">Media.</span>
            </h2>
          </div>
        </div>
      </section>

      {/* Press Releases Section */}
      <section className="py-24 bg-brand-light border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h3 className="font-serif text-4xl text-brand-dark mb-12 reveal-up">Latest Announcements</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* PR 1 */}
            <div className="bg-white p-8 md:p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-accent/50 transition-all duration-500 rounded-sm reveal-up delay-100 group flex flex-col justify-between h-full">
              <div>
                <p className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-3">Press Release • March 15, 2026</p>
                <h4 className="font-serif text-2xl text-brand-dark mb-4 group-hover:text-brand-accent transition-colors">IndiGlobal Expo 2026 Announces Expanded Tech Pavilion</h4>
                <p className="text-gray-500 font-light text-sm mb-6 leading-relaxed">Due to overwhelming international demand, the upcoming expo will feature a newly expanded pavilion dedicated entirely to India's booming IT and SaaS startup sectors.</p>
              </div>
              <button className="interactive text-brand-dark font-medium text-sm flex items-center gap-2 hover:text-brand-accent transition-colors group-hover:translate-x-2 w-fit"><ArrowRight size={16} /> Read Full Story</button>
            </div>
            
            {/* PR 2 */}
            <div className="bg-white p-8 md:p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-accent/50 transition-all duration-500 rounded-sm reveal-up delay-200 group flex flex-col justify-between h-full">
              <div>
                <p className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-3">Media Advisory • January 10, 2026</p>
                <h4 className="font-serif text-2xl text-brand-dark mb-4 group-hover:text-brand-accent transition-colors">Media Accreditation Opens for Delhi Edition</h4>
                <p className="text-gray-500 font-light text-sm mb-6 leading-relaxed">Journalists and media personnel are now invited to apply for press credentials for the main event taking place at Yashobhoomi Convention Centre this July.</p>
              </div>
              <button className="interactive text-brand-dark font-medium text-sm flex items-center gap-2 hover:text-brand-accent transition-colors group-hover:translate-x-2 w-fit"><Link size={16} /> Apply for Credentials</button>
            </div>

            {/* PR 3 */}
            <div className="bg-white p-8 md:p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-accent/50 transition-all duration-500 rounded-sm reveal-up delay-300 group flex flex-col justify-between h-full">
              <div>
                <p className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-3">Partnership • November 22, 2025</p>
                <h4 className="font-serif text-2xl text-brand-dark mb-4 group-hover:text-brand-accent transition-colors">Strategic Partnership Signed with European Trade Council</h4>
                <p className="text-gray-500 font-light text-sm mb-6 leading-relaxed">IndiGlobal Expo has officially signed an MoU to increase European buyer presence by 40% in the upcoming fiscal year, bolstering export channels.</p>
              </div>
              <button className="interactive text-brand-dark font-medium text-sm flex items-center gap-2 hover:text-brand-accent transition-colors group-hover:translate-x-2 w-fit"><ArrowRight size={16} /> Read Full Story</button>
            </div>
          </div>
        </div>
      </section>

      {/* Media Coverage Section */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h3 className="font-serif text-4xl text-brand-dark mb-12 reveal-up">Media Coverage</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Group 1: Next Economy Forum */}
            <div className="reveal-up bg-brand-light p-8 rounded-sm border border-gray-100 hover:border-brand-accent/50 transition-all">
              <h4 className="font-serif text-2xl text-brand-dark mb-6 border-b border-brand-accent/20 pb-4">The Next Economy Forum 2025</h4>
              <ul className="space-y-4">
                <li>
                  <a href="https://www.britishnewsnetwork.com/news/the-next-economy-forum-2025-concludes-with-landmark-success-at-the-house-of-lords-oxford-university20251115161419/" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 text-gray-600 hover:text-brand-accent transition-colors">
                    <Link size={18} className="mt-1 flex-shrink-0 text-brand-accent" />
                    <span className="text-sm font-light leading-snug">Landmark Success at House of Lords & Oxford - <span className="font-medium">British News Network</span></span>
                  </a>
                </li>
                <li>
                  <a href="https://www.worldnewsnetwork.net/news/the-next-economy-forum-2025-concludes-with-landmark-success-at-the-house-of-lords-oxford-university20251115161419/" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 text-gray-600 hover:text-brand-accent transition-colors">
                    <Link size={18} className="mt-1 flex-shrink-0 text-brand-accent" />
                    <span className="text-sm font-light leading-snug">Global Economic Impact Report - <span className="font-medium">World News Network</span></span>
                  </a>
                </li>
                <li>
                  <a href="https://www.londonchannelnews.com/news/the-next-economy-forum-2025-concludes-with-landmark-success-at-the-house-of-lords-oxford-university20251115161419/" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 text-gray-600 hover:text-brand-accent transition-colors">
                    <Link size={18} className="mt-1 flex-shrink-0 text-brand-accent" />
                    <span className="text-sm font-light leading-snug">Strategic Insights from House of Lords - <span className="font-medium">London Channel News</span></span>
                  </a>
                </li>
                <li>
                  <a href="https://www.europeansuntimes.com/news/the-next-economy-forum-2025-concludes-with-landmark-success-at-the-house-of-lords-oxford-university20251115161419/" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 text-gray-600 hover:text-brand-accent transition-colors">
                    <Link size={18} className="mt-1 flex-shrink-0 text-brand-accent" />
                    <span className="text-sm font-light leading-snug">European Perspectives on Future Economy - <span className="font-medium">European Sun Times</span></span>
                  </a>
                </li>
                <li>
                  <a href="https://www.aninews.in/news/business/the-next-economy-forum-2025-concludes-with-landmark-success-at-the-house-of-lords-amp-oxford-university20251115161426/" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 text-gray-600 hover:text-brand-accent transition-colors">
                    <Link size={18} className="mt-1 flex-shrink-0 text-brand-accent" />
                    <span className="text-sm font-light leading-snug">Global Leaders Convene in UK - <span className="font-medium">ANI News</span></span>
                  </a>
                </li>
                <li>
                  <a href="https://www.tribuneindia.com/news/business/the-next-economy-forum-2025-concludes-with-landmark-success-at-the-house-of-lords-oxford-university/" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 text-gray-600 hover:text-brand-accent transition-colors">
                    <Link size={18} className="mt-1 flex-shrink-0 text-brand-accent" />
                    <span className="text-sm font-light leading-snug">Economic Forum 2025 Highlights - <span className="font-medium">Tribune India</span></span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Group 2: Unity for Growth */}
            <div className="reveal-up delay-100 bg-brand-light p-8 rounded-sm border border-gray-100 hover:border-brand-accent/50 transition-all">
              <h4 className="font-serif text-2xl text-brand-dark mb-6 border-b border-brand-accent/20 pb-4">Unity for Growth</h4>
              <ul className="space-y-4">
                <li>
                  <a href="https://www.aninews.in/news/business/unity-for-growth-leaders-unite-for-a-developed-india-vision20250705173604/" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 text-gray-600 hover:text-brand-accent transition-colors">
                    <Link size={18} className="mt-1 flex-shrink-0 text-brand-accent" />
                    <span className="text-sm font-light leading-snug">Leaders Unite for Developed India - <span className="font-medium">ANI News</span></span>
                  </a>
                </li>
                <li>
                  <a href="https://www.business-standard.com/content/press-releases-ani/unity-for-growth-leaders-unite-for-a-developed-india-vision-125070500591_1.html" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 text-gray-600 hover:text-brand-accent transition-colors">
                    <Link size={18} className="mt-1 flex-shrink-0 text-brand-accent" />
                    <span className="text-sm font-light leading-snug">Viksit Bharat Vision 2047 - <span className="font-medium">Business Standard</span></span>
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/Outlookbusiness/posts/pfbid03ggiRT8q874o3Hkr21HB7xV4hkSYYkJBdPfHrCrxux131e45nRN8aTDvmHnX6vKwlrdid=f6SpfdunHCvD6AgI#" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 text-gray-600 hover:text-brand-accent transition-colors">
                    <Link size={18} className="mt-1 flex-shrink-0 text-brand-accent" />
                    <span className="text-sm font-light leading-snug">Leadership Summit Features - <span className="font-medium">Outlook Business</span></span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Group 3: Industry & Education */}
            <div className="reveal-up delay-200 bg-brand-light p-8 rounded-sm border border-gray-100 hover:border-brand-accent/50 transition-all">
              <h4 className="font-serif text-2xl text-brand-dark mb-6 border-b border-brand-accent/20 pb-4">Industry & Education</h4>
              <ul className="space-y-4">
                <li>
                  <a href="https://www.business-standard.com/content/press-releases-ani/national-education-conference-and-awards-2025-paving-the-path-to-a-viksit-bharat-2047-by-guidance-forever-124120601076_1.html" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 text-gray-600 hover:text-brand-accent transition-colors">
                    <Link size={18} className="mt-1 flex-shrink-0 text-brand-accent" />
                    <span className="text-sm font-light leading-snug">National Education Awards 2025 - <span className="font-medium">Business Standard</span></span>
                  </a>
                </li>
                <li>
                  <a href="https://english.dainikjagranmpcg.com/education/birla-open-minds-redefining-education-with-vision-and-scale-led/article-3944" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 text-gray-600 hover:text-brand-accent transition-colors">
                    <Link size={18} className="mt-1 flex-shrink-0 text-brand-accent" />
                    <span className="text-sm font-light leading-snug">Birla Open Minds: Redefining Scale - <span className="font-medium">Dainik Jagran</span></span>
                  </a>
                </li>
                <li>
                  <a href="https://focusdelhi.in/birla-open-minds-redefining-education-with-vision-and-scale/" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 text-gray-600 hover:text-brand-accent transition-colors">
                    <Link size={18} className="mt-1 flex-shrink-0 text-brand-accent" />
                    <span className="text-sm font-light leading-snug">Educational Innovation Spotlight - <span className="font-medium">Focus Delhi</span></span>
                  </a>
                </li>
                <li>
                  <a href="https://english.dainikjagranmpcg.com/business/shriram-pistons-rings-ltd-sprl-driving-innovation-and-sustainability/article-4020" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 text-gray-600 hover:text-brand-accent transition-colors">
                    <Link size={18} className="mt-1 flex-shrink-0 text-brand-accent" />
                    <span className="text-sm font-light leading-snug">Shriram Pistons: Driving Sustainability - <span className="font-medium">Dainik Jagran</span></span>
                  </a>
                </li>
              </ul>
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
              <button className="interactive inline-flex items-center justify-center gap-3 bg-brand-dark text-white px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors shadow-xl w-full sm:w-auto">
                <FileZip size={20} /> Download Kit (45MB)
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Press;
