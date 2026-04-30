import { useEffect } from 'react';
import { ShieldCheck, Eye, Database, ShareNetwork, LockKey } from '@phosphor-icons/react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import PageLoader from '../../components/layout/PageLoader';
import CustomCursor from '../../components/ui/CustomCursor';

const Privacy = () => {
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
      <PageLoader title="Data & Privacy" />
      <CustomCursor />
      <Header logoColor="text-white" />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark to-[#2a2a2a] z-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16">
          <div className="max-w-3xl text-center md:text-left">
            <p className="text-brand-accent font-bold tracking-widest uppercase text-xs mb-4 animate-fade-up">Your Security Matters</p>
            <h2 className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight mb-8 animate-fade-up delay-100">
              Data & <span className="italic font-light text-brand-accent">Privacy.</span>
            </h2>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 reveal-up">
          <div className="prose prose-lg text-gray-500 font-light max-w-none">
            
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck weight="fill" className="text-3xl text-brand-accent" />
                <h3 className="font-serif text-3xl text-brand-dark m-0">Introduction</h3>
              </div>
              <p className="leading-relaxed">
                At IndiGlobal Expo, we are committed to protecting your privacy and ensuring the security of your personal data. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website, register for our events, or interact with our services.
              </p>
              <p className="leading-relaxed">
                By using our website and services, you consent to the data practices described in this policy.
              </p>
            </div>

            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <Database weight="fill" className="text-3xl text-brand-accent" />
                <h3 className="font-serif text-3xl text-brand-dark m-0">Data Collection</h3>
              </div>
              <p className="leading-relaxed mb-4">
                We collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Register as a visitor or exhibitor</li>
                <li>Sign up for our newsletter</li>
                <li>Contact us with inquiries</li>
                <li>Participate in surveys or feedback sessions</li>
              </ul>
              <p className="leading-relaxed">
                This information may include your name, email address, phone number, company details, job title, and professional interests.
              </p>
            </div>

            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <Eye weight="fill" className="text-3xl text-brand-accent" />
                <h3 className="font-serif text-3xl text-brand-dark m-0">Use of Information</h3>
              </div>
              <p className="leading-relaxed mb-4">
                We use the collected information for various purposes, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Processing your event registration and ticketing</li>
                <li>Providing you with event-related updates and information</li>
                <li>Improving our website, services, and event offerings</li>
                <li>Communicating with you regarding partnerships and opportunities</li>
                <li>Complying with legal and regulatory requirements</li>
              </ul>
            </div>

            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <ShareNetwork weight="fill" className="text-3xl text-brand-accent" />
                <h3 className="font-serif text-3xl text-brand-dark m-0">Data Sharing</h3>
              </div>
              <p className="leading-relaxed">
                We do not sell or rent your personal data to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our events (e.g., ticketing platforms, venue management, security). These parties are obligated to keep your information confidential.
              </p>
              <p className="leading-relaxed">
                We may also disclose information when required by law or to protect our rights, property, or safety.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <LockKey weight="fill" className="text-3xl text-brand-accent" />
                <h3 className="font-serif text-3xl text-brand-dark m-0">Security</h3>
              </div>
              <p className="leading-relaxed">
                We implement a variety of security measures to maintain the safety of your personal information. Our website uses secure encryption (SSL) to protect data transmission, and access to personal data is restricted to authorized personnel only.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Privacy;
