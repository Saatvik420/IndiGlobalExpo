import { useEffect } from 'react';
import { Buildings, Copyright, WarningCircle, Link, Scales } from '@phosphor-icons/react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import FullscreenMenu from '../../components/layout/FullscreenMenu';
import PageLoader from '../../components/layout/PageLoader';
import CustomCursor from '../../components/ui/CustomCursor';
import TicketWidget from '../../components/ui/TicketWidget';

const Legal = () => {
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
      <PageLoader title="Legal<span class='font-sans font-light text-brand-accent text-3xl ml-1'>Notice</span>" />
      <CustomCursor />
      <Header />
      <FullscreenMenu />
      <TicketWidget />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark to-[#2a2a2a] z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16">
          <div className="max-w-3xl">
            <p className="text-brand-accent font-bold tracking-widest uppercase text-xs mb-4 reveal-up">Corporate Information</p>
            <h2 className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight mb-8 reveal-up delay-100">
              Legal <span className="italic font-light text-brand-accent">Notice.</span>
            </h2>
          </div>
        </div>
      </section>

      {/* Split Content Section */}
      <section className="py-24 bg-white border-b border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16">
            
            {/* Sticky Sidebar Navigation */}
            <div className="w-full md:w-1/3 lg:w-1/4 reveal-up">
              <div className="sticky top-32 bg-brand-light p-8 border border-gray-100 rounded-sm">
                <h4 className="font-serif text-xl text-brand-dark mb-6">Contents</h4>
                <ul className="space-y-4 text-sm font-light text-gray-500">
                  <li><a href="#publisher" className="hover:text-brand-accent transition-colors interactive block">1. Publisher Information</a></li>
                  <li><a href="#intellectual" className="hover:text-brand-accent transition-colors interactive block">2. Intellectual Property</a></li>
                  <li><a href="#liability" className="hover:text-brand-accent transition-colors interactive block">3. Disclaimer of Liability</a></li>
                  <li><a href="#links" className="hover:text-brand-accent transition-colors interactive block">4. External Links</a></li>
                  <li><a href="#law" className="hover:text-brand-accent transition-colors interactive block">5. Applicable Law</a></li>
                </ul>
              </div>
            </div>

            {/* Main Legal Content */}
            <div className="w-full md:w-2/3 lg:w-3/4 reveal-up delay-100">
              <div className="prose prose-lg text-gray-500 font-light max-w-none">
                
                <div id="publisher" className="mb-16 scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <Buildings weight="fill" className="text-2xl text-brand-accent" />
                    <h3 className="font-serif text-3xl text-brand-dark m-0">1. Publisher Information</h3>
                  </div>
                  <p className="leading-relaxed">
                    IndiGlobal Expo is published, operated, and managed by <strong>IndiGlobal Exhibitions Pvt. Ltd.</strong>, a registered company under the Companies Act of India.<br /><br />
                    <strong>Registered Office:</strong><br />
                    Yashobhoomi Convention Centre Complex, Sector 25, Dwarka<br />
                    New Delhi, India 110077<br /><br />
                    <strong>Contact:</strong><br />
                    Phone: +91 11 2345 6789<br />
                    Email: <a href="mailto:legal@indiglobalexpo.com" className="text-brand-accent hover:underline interactive">legal@indiglobalexpo.com</a>
                  </p>
                </div>

                <div id="intellectual" className="mb-16 scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <Copyright weight="fill" className="text-2xl text-brand-accent" />
                    <h3 className="font-serif text-3xl text-brand-dark m-0">2. Intellectual Property Rights</h3>
                  </div>
                  <p className="leading-relaxed">
                    All content present on this website—including but not limited to text, editorial content, graphics, custom logos, high-resolution images, audio clips, digital downloads, data compilations, and software—is the exclusive property of IndiGlobal Exhibitions Pvt. Ltd. or its accredited content suppliers.
                  </p>
                  <p className="leading-relaxed">
                    This content is protected by international copyright, trademark, and intellectual property laws. Unauthorized reproduction, modification, distribution, or replication of any material without express written consent from the publisher is strictly prohibited.
                  </p>
                </div>

                <div id="liability" className="mb-16 scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <WarningCircle weight="fill" className="text-2xl text-brand-accent" />
                    <h3 className="font-serif text-3xl text-brand-dark m-0">3. Disclaimer of Liability</h3>
                  </div>
                  <p className="leading-relaxed">
                    The information provided on this website is for general informational purposes only. While we endeavor to keep the information fully up-to-date and correct, IndiGlobal Exhibitions Pvt. Ltd. makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, pricing, or related graphics contained on the website.
                  </p>
                  <p className="leading-relaxed">
                    Any reliance you place on such information is therefore strictly at your own risk. In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage arising out of, or in connection with, the use of this website.
                  </p>
                </div>

                <div id="links" className="mb-16 scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <Link weight="fill" className="text-2xl text-brand-accent" />
                    <h3 className="font-serif text-3xl text-brand-dark m-0">4. External Links</h3>
                  </div>
                  <p className="leading-relaxed">
                    Through this website, you may be able to link to other third-party websites which are not under the control of IndiGlobal Exhibitions (e.g., ticketing partners, exhibitor sites, hotel booking portals). We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
                  </p>
                </div>

                <div id="law" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <Scales weight="fill" className="text-2xl text-brand-accent" />
                    <h3 className="font-serif text-3xl text-brand-dark m-0">5. Applicable Law & Jurisdiction</h3>
                  </div>
                  <p className="leading-relaxed">
                    These terms and conditions, and your use of this website, are governed by and construed in accordance with the laws of the Republic of India. Any disputes, claims, or legal proceedings relating to these terms and conditions or the website will be subject to the exclusive jurisdiction of the competent courts located in New Delhi, India.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Legal;
