import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  IdentificationBadge, Storefront, CreditCard, Check, Spinner, Ticket, 
  User as UserIcon, ArrowRight, X, SignIn, UserPlus, ArrowLeft, CheckCircle, FacebookLogo, InstagramLogo, LinkedinLogo, TwitterLogo
} from '@phosphor-icons/react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FullscreenMenu from '../components/layout/FullscreenMenu';
import PageLoader from '../components/layout/PageLoader';
import CustomCursor from '../components/ui/CustomCursor';
import { useGlobal } from '../context/GlobalContext';
import { authService } from '../services/authService';
import { getErrorMessage } from '../utils/errorHelper';

const Tickets = () => {
  const navigate = useNavigate();
  const { isLoggedIn, login, user, addTicket } = useGlobal();
  const [step, setStep] = useState(0);
  const [currentRole, setCurrentRole] = useState('');
  const [currentTicket, setCurrentTicket] = useState({ type: '', price: 0 });
  const [userDetails, setUserDetails] = useState({ firstName: '', lastName: '', email: '', company: '', mobile: '', designation: '', country: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [bookingId, setBookingId] = useState('');
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

    return () => revealObserver.disconnect();
  }, [step]);

  useEffect(() => {
    if (isLoggedIn && user) {
      setUserDetails(user);
      // Automatically move to step 2 (Select Pass) if logged in
      if (step === 0 || step === 'login' || step === 1) {
        setStep(2);
      }
    }
  }, [isLoggedIn, user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError('');
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    try {
      const response = await authService.login(email, password);
      login(response);
      setUserDetails(response);
      setStep(2);
    } catch (err) {
      setError(getErrorMessage(err, 'Login failed. Please check your credentials.'));
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError('');
    const formData = new FormData(e.target);
    const commonData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      mobileNumber: formData.get('mobile'),
      country: formData.get('country') || 'India'
    };
    
    try {
      if (currentRole === 'Exhibitor') {
        const exhibitorData = {
          ...commonData,
          companyName: formData.get('company'),
          designation: formData.get('designation') || 'Representative',
          sector: formData.get('sector') || 'Other',
          website: formData.get('website') || ''
        };
        await authService.registerExhibitor(exhibitorData);
      } else {
        const visitorData = {
          ...commonData,
          company: formData.get('company'),
          designation: formData.get('designation') || 'Visitor'
        };
        await authService.registerVisitor(visitorData);
      }

      const loginResponse = await authService.login(commonData.email, commonData.password);
      login(loginResponse);
      setUserDetails(loginResponse);
      setStep(2);
    } catch (err) {
      setError(getErrorMessage(err, 'Registration failed.'));
    } finally {
      setIsLoggingIn(false);
    }
  };

  const selectPass = (type, price) => {
    setCurrentTicket({ type, price });
    setStep(3);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      const dummyBookingId = "#IGX-" + Math.random().toString(36).substring(2, 8).toUpperCase();
      const dummyTicket = {
        id: "dummy_" + Date.now(),
        type: currentTicket.type,
        price: currentTicket.price,
        bookingId: dummyBookingId,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        role: currentRole
      };

      setBookingId(dummyBookingId);
      addTicket(dummyTicket);
      setStep(4);
      setIsProcessing(false);
    }, 1500);
  };

  const visitorTickets = [
    { type: 'Trade Visitor', price: 45, features: ['Access to all Sectors', 'Digital Event Directory', 'Public Lounges'] },
    { type: 'All-Access VIP', price: 290, features: ['Access to all Sectors', 'B2B Matchmaking App', 'VIP Lounge Access', '3-Day Premium Access'] }
  ];

  const exhibitorTickets = [
    { type: 'Standard Booth', price: 1500, features: ['9 sqm (3x3m) Shell Scheme', 'Fully built shell structure', 'Fascia name board', '2 Exhibitor Badges', 'Basic electricity & lighting'] },
    { type: 'Premium Island', price: 3500, features: ['18 sqm (6x3m) Open Space', 'Raw space for custom build', 'Prime location in sector hall', '5 Exhibitor VIP Badges', 'Website logo placement'] }
  ];

  return (
    <>
      <PageLoader title="Registration<span class='font-sans font-light text-brand-accent text-3xl ml-1'>Portal</span>" />
      <CustomCursor />
      <Header />
      <FullscreenMenu />

      {/* Cinematic Hero Section */}
      <section className="relative h-[45vh] min-h-[350px] flex items-center overflow-hidden bg-brand-dark">
        <img 
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2000&q=80" 
          alt="Expo Conference Event" 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark to-brand-dark/50 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10">
          <div className="max-w-2xl text-center md:text-left">
            <div className="reveal-up overflow-hidden mb-4">
              <p className="text-brand-accent font-bold tracking-widest uppercase text-xs">Join The Experience</p>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight mb-4 reveal-up delay-100">
              Registration <span className="italic text-brand-accent">Portal.</span>
            </h2>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-grow relative z-20 -mt-16 pb-24 px-4 sm:px-6 lg:px-8" id="checkout-area">
        <div className="w-full max-w-5xl mx-auto relative z-10">
          
          {/* Progress Stepper */}
          {step !== 0 && step !== 'login' && step !== 4 && (
            <div className="mb-12 reveal-up">
              <div className="flex items-center justify-center relative max-w-3xl mx-auto">
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[1px] bg-gray-200 z-0"></div>
                <div className="absolute left-[10%] top-1/2 transform -translate-y-1/2 h-[1px] bg-brand-accent z-0 transition-all duration-700" style={{ width: step === 1 ? '0%' : step === 2 ? '40%' : '80%' }}></div>
                
                <div className="flex w-full justify-between relative z-10">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-accent text-white flex items-center justify-center font-bold text-xs shadow-lg border-2 border-brand-light"><Check size={14} weight="bold" /></div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-brand-accent">Role</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-lg transition-colors duration-300 border-2 ${step >= 1 ? 'bg-brand-accent text-white border-brand-light' : 'bg-white text-gray-400 border-gray-200'}`}>
                      {step > 1 ? <Check size={14} weight="bold" /> : '1'}
                    </div>
                    <span className={`text-[10px] uppercase tracking-widest font-bold transition-colors duration-300 ${step >= 1 ? 'text-brand-accent' : 'text-gray-400'}`}>Register</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm transition-colors duration-300 border-2 ${step >= 2 ? 'bg-brand-accent text-white border-brand-light' : 'bg-white text-gray-400 border-gray-200'}`}>
                      {step > 2 ? <Check size={14} weight="bold" /> : '2'}
                    </div>
                    <span className={`text-[10px] uppercase tracking-widest font-bold transition-colors duration-300 ${step >= 2 ? 'text-brand-accent' : 'text-gray-400'}`}>Select Pass</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm transition-colors duration-300 border-2 ${step >= 3 ? 'bg-brand-accent text-white border-brand-light' : 'bg-white text-gray-400 border-gray-200'}`}>3</div>
                    <span className={`text-[10px] uppercase tracking-widest font-bold transition-colors duration-300 ${step >= 3 ? 'text-brand-accent' : 'text-gray-400'}`}>Payment</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 0: ROLE SELECTION */}
          {step === 0 && (
            <div className="reveal-up">
              <div className="text-center mb-12">
                <h2 className="text-5xl md:text-6xl font-serif text-brand-dark mb-4">Choose Your Path</h2>
                <p className="text-gray-500 font-light text-lg">Select how you would like to participate in IndiGlobal Expo 2026.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Visitor Choice */}
                <div className="bg-white border border-gray-100 shadow-xl p-10 md:p-14 rounded-sm hover:shadow-2xl hover:border-brand-accent transition-all duration-500 group flex flex-col items-center text-center transform hover:-translate-y-2">
                  <div className="w-24 h-24 rounded-full bg-brand-light flex items-center justify-center mb-8 group-hover:bg-brand-accent transition-colors duration-500 shadow-inner">
                    <IdentificationBadge size={48} className="text-brand-dark group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="font-serif text-3xl text-brand-dark mb-4 transition-colors duration-500">Visitor</h3>
                  <p className="text-gray-500 font-light text-sm mb-8 transition-colors duration-500">I want to attend the event, network, explore exhibits, and secure an entry pass.</p>
                  <div className="mt-auto flex flex-col sm:flex-row gap-4 w-full">
                    <button onClick={() => { setCurrentRole('Visitor'); setStep('login'); }} className="flex-1 py-4 border border-gray-200 text-gray-600 text-xs font-bold uppercase tracking-widest hover:border-brand-accent hover:text-brand-accent transition-colors interactive flex justify-center items-center gap-2">
                      <SignIn /> Log In
                    </button>
                    <button onClick={() => { setCurrentRole('Visitor'); setStep(1); }} className="flex-1 py-4 bg-brand-dark text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors interactive flex justify-center items-center gap-2">
                      <UserPlus /> Register
                    </button>
                  </div>
                </div>

                {/* Exhibitor Choice */}
                <div className="bg-white border border-gray-100 shadow-xl p-10 md:p-14 rounded-sm hover:shadow-2xl hover:border-brand-accent transition-all duration-500 group flex flex-col items-center text-center transform hover:-translate-y-2">
                  <div className="w-24 h-24 rounded-full bg-brand-light flex items-center justify-center mb-8 group-hover:bg-brand-accent transition-colors duration-500 shadow-inner">
                    <Storefront size={48} className="text-brand-dark group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="font-serif text-3xl text-brand-dark mb-4 transition-colors duration-500">Exhibitor</h3>
                  <p className="text-gray-500 font-light text-sm mb-8 transition-colors duration-500">I want to book a booth, showcase my products, and manage my company profile.</p>
                  <div className="mt-auto flex flex-col sm:flex-row gap-4 w-full">
                    <button onClick={() => { setCurrentRole('Exhibitor'); setStep('login'); }} className="flex-1 py-4 border border-gray-200 text-gray-600 text-xs font-bold uppercase tracking-widest hover:border-brand-accent hover:text-brand-accent transition-colors interactive flex justify-center items-center gap-2">
                      <SignIn /> Log In
                    </button>
                    <button onClick={() => { setCurrentRole('Exhibitor'); setStep(1); }} className="flex-1 py-4 bg-brand-dark text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors interactive flex justify-center items-center gap-2">
                      <UserPlus /> Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP LOGIN */}
          {step === 'login' && (
            <div className="reveal-up">
              <div className="bg-white p-10 md:p-16 rounded-sm shadow-2xl max-w-md mx-auto w-full border border-gray-100">
                <div className="mb-10 text-center">
                  <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                    <UserIcon size={32} weight="fill" className="text-brand-accent" />
                  </div>
                  <p className="text-brand-accent tracking-widest uppercase text-xs font-bold mb-2">Welcome Back</p>
                  <h2 className="font-serif text-4xl text-brand-dark mb-2">{currentRole} Login</h2>
                  <p className="text-gray-500 font-light text-sm">Log in to manage your bookings and access passes.</p>
                </div>
                
                <form onSubmit={handleLogin}>
                  <div className="space-y-6 mb-8">
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Email Address</label>
                      <input type="email" name="email" required className="w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors interactive font-sans font-light" placeholder="jane@company.com" />
                    </div>
                    <div>
                      <div className="flex justify-between items-end mb-1">
                        <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400">Password</label>
                        <button type="button" className="text-[10px] text-brand-accent hover:underline interactive">Forgot?</button>
                      </div>
                      <input type="password" name="password" required className="w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors interactive font-sans font-light" placeholder="••••••••" />
                    </div>
                  </div>
                  
                  {error && <p className="text-red-500 text-xs font-bold text-center mb-4">{error}</p>}
                  
                  <button type="submit" disabled={isLoggingIn} className="w-full bg-brand-dark text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors interactive flex justify-center items-center gap-2">
                    {isLoggingIn ? <Spinner size={18} className="animate-spin" /> : 'Log In'} <ArrowRight size={16} />
                  </button>
                  
                  <div className="flex flex-col items-center gap-4 mt-8 pt-8 border-t border-gray-100">
                    <button type="button" onClick={() => setStep(1)} className="text-xs font-bold uppercase tracking-widest text-brand-accent hover:text-brand-dark transition-colors interactive">
                      Create an Account Instead
                    </button>
                    <button type="button" onClick={() => setStep(0)} className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors interactive flex items-center gap-1">
                      <ArrowLeft /> Back to Role Selection
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* STEP 1: REGISTRATION */}
          {step === 1 && (
            <div className="reveal-up">
              <div className="bg-white p-10 md:p-16 rounded-sm shadow-2xl max-w-2xl mx-auto border border-gray-100">
                <div className="mb-10 text-center">
                  <p className="text-brand-accent tracking-widest uppercase text-xs font-bold mb-2">Step 1 of 3</p>
                  <h2 className="font-serif text-4xl text-brand-dark mb-2">{currentRole} Registration</h2>
                  <p className="text-gray-500 font-light text-sm">Register to secure your access to the portal.</p>
                </div>
                
                <form onSubmit={handleRegister}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">First Name *</label>
                      <input type="text" name="firstName" required className="w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors interactive font-sans font-light" placeholder="Jane" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Last Name *</label>
                      <input type="text" name="lastName" required className="w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors interactive font-sans font-light" placeholder="Doe" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Work Email Address *</label>
                      <input type="email" name="email" required className="w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors interactive font-sans font-light" placeholder="jane.doe@company.com" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Create Password *</label>
                      <input type="password" name="password" required className="w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors interactive font-sans font-light" placeholder="••••••••" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Company / Organization *</label>
                      <input type="text" name="company" required className="w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors interactive font-sans font-light" placeholder="Design Studio LLC" />
                    </div>
                  </div>
                  
                  {error && <p className="text-red-500 text-xs font-bold text-center mb-6">{error}</p>}
                  
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-100 mt-4">
                    <button type="button" onClick={() => setStep(0)} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-brand-dark transition-colors interactive flex items-center gap-2">
                      <ArrowLeft /> Change Role
                    </button>
                    <button type="submit" disabled={isLoggingIn} className="w-full sm:w-auto bg-brand-dark text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors interactive">
                      {isLoggingIn ? <Spinner size={18} className="animate-spin" /> : 'Create Account'}
                    </button>
                  </div>
                  
                  <p className="text-center text-xs text-gray-400 mt-8 pt-6 border-t border-gray-50">
                    Already have an account? 
                    <button type="button" onClick={() => setStep('login')} className="text-brand-accent hover:underline font-bold interactive ml-1">Log In Here</button>
                  </p>
                </form>
              </div>
            </div>
          )}

          {/* STEP 2: SELECT PASS */}
          {step === 2 && (
            <div className="reveal-up w-full">
              <div className="text-center mb-10">
                <p className="text-brand-accent tracking-widest uppercase text-xs font-bold mb-2">Step 2 of 3</p>
                <h2 className="font-serif text-4xl text-brand-dark mb-2">
                  {currentRole === 'Exhibitor' ? 'Select Your Booth' : 'Select Your Pass'}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {(currentRole === 'Visitor' ? visitorTickets : exhibitorTickets).map((ticket, index) => (
                  <div key={index} className={`p-10 shadow-xl hover:-translate-y-2 transition-all duration-500 rounded-sm flex flex-col interactive border ${index === 1 ? 'bg-brand-dark border-brand-accent shadow-2xl relative' : 'bg-white border-gray-100'}`}>
                    {index === 1 && <div className="absolute top-0 right-0 bg-brand-accent text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1">Recommended</div>}
                    <h3 className={`font-serif text-2xl mb-2 ${index === 1 ? 'text-white' : 'text-brand-dark'}`}>{ticket.type}</h3>
                    <p className={`text-xs tracking-widest uppercase font-bold mb-6 ${index === 1 ? 'text-brand-accent' : 'text-gray-400'}`}>
                      {currentRole === 'Exhibitor' ? (index === 0 ? '9 sqm (3x3m) Shell Scheme' : '18 sqm (6x3m) Open Space') : (index === 0 ? '1-Day Access' : '3-Day Premium Access')}
                    </p>
                    <div className={`mb-8 border-b pb-8 ${index === 1 ? 'border-gray-800' : 'border-gray-100'}`}>
                      <span className={`text-5xl font-serif ${index === 1 ? 'text-white' : 'text-brand-dark'}`}>€{ticket.price.toLocaleString()}</span>
                      {currentRole === 'Visitor' && <span className="text-gray-400 text-sm font-light">/ person</span>}
                    </div>
                    <ul className="space-y-4 mb-10 flex-1">
                      {ticket.features.map((feature, i) => (
                        <li key={i} className={`flex items-center gap-3 text-sm font-light ${index === 1 ? 'text-gray-300' : 'text-gray-600'}`}>
                          <CheckCircle weight="fill" className="text-brand-accent text-lg" /> {feature}
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => selectPass(ticket.type, ticket.price)} className={`w-full py-4 font-bold uppercase tracking-widest text-xs transition-colors interactive ${index === 1 ? 'bg-brand-accent text-white hover:bg-white hover:text-brand-dark' : 'border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white'}`}>
                      {currentRole === 'Exhibitor' ? 'Reserve Booth' : 'Select Pass'}
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-10 text-center">
                <button type="button" onClick={() => setStep(isLoggedIn ? 0 : 1)} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-brand-dark transition-colors interactive inline-flex items-center gap-2">
                  <ArrowLeft /> Go Back
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT */}
          {step === 3 && (
            <div className="reveal-up w-full">
              <div className="text-center mb-10">
                <p className="text-brand-accent tracking-widest uppercase text-xs font-bold mb-2">Step 3 of 3</p>
                <h2 className="font-serif text-4xl text-brand-dark mb-2">Checkout</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="lg:col-span-2 bg-white p-10 shadow-2xl rounded-sm border border-gray-100">
                  <h2 className="font-serif text-2xl text-brand-dark mb-6 border-b border-gray-100 pb-4">Secure Payment</h2>
                  
                  <form onSubmit={handlePayment}>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Name on Card *</label>
                        <input type="text" name="cardName" required className="w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors interactive font-sans font-light" placeholder="Jane Doe" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Card Number *</label>
                        <div className="relative">
                          <input type="text" name="cardNumber" required className="w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors interactive font-sans font-light tracking-widest" placeholder="0000 0000 0000 0000" />
                          <CreditCard size={24} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Expiry Date *</label>
                          <input type="text" name="cardExpiry" required className="w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors interactive font-sans font-light tracking-widest" placeholder="MM / YY" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">CVC *</label>
                          <input type="text" name="cardCvc" required className="w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors interactive font-sans font-light tracking-widest" placeholder="123" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 mt-6">
                      <button type="button" onClick={() => setStep(2)} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-brand-dark transition-colors interactive flex items-center gap-2">
                        <ArrowLeft /> Change Selection
                      </button>
                      <button type="submit" disabled={isProcessing} className="w-full sm:w-auto bg-brand-accent text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-dark transition-all interactive flex justify-center items-center gap-2">
                        {isProcessing ? <Spinner size={18} className="animate-spin" /> : 'Pay'} <span>€{currentTicket.price.toLocaleString()}</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Summary Sidebar */}
                <div className="bg-white p-8 shadow-sm flex flex-col justify-between h-full rounded-sm border border-gray-200">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-brand-dark mb-6 border-b border-gray-200 pb-4">Order Summary</h3>
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-serif text-lg text-brand-dark font-semibold">{currentTicket.type}</span>
                      <span className="font-light text-gray-600">x 1</span>
                    </div>
                    <ul className="space-y-2 mb-8">
                      <li className="text-xs text-gray-500 font-light flex items-center gap-2"><CheckCircle weight="fill" className="text-brand-accent" /> IndiGlobal Expo 2026</li>
                      <li className="text-xs text-gray-500 font-light flex items-center gap-2"><CheckCircle weight="fill" className="text-brand-accent" /> Role: {currentRole}</li>
                    </ul>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-light text-gray-500">Subtotal</span>
                      <span className="text-sm text-brand-dark">€{currentTicket.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-light text-gray-500">Taxes & Fees</span>
                      <span className="text-sm text-brand-dark">Included</span>
                    </div>
                    <div className="flex justify-between items-end mt-4 pt-4 border-t border-brand-accent/30">
                      <span className="text-xs font-bold uppercase tracking-widest text-brand-dark">Total</span>
                      <span className="font-serif text-3xl text-brand-dark">€{currentTicket.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 4 && (
            <div className="reveal-up w-full">
              <div className="bg-white p-10 md:p-16 rounded-sm shadow-2xl max-w-2xl mx-auto text-center relative overflow-hidden border border-gray-100">
                <div className="absolute top-0 left-0 w-full h-2 bg-brand-accent"></div>
                
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
                  <Check size={40} weight="bold" className="text-green-500" />
                </div>
                <h2 className="font-serif text-4xl text-brand-dark mb-4">Registration Complete!</h2>
                <p className="text-gray-500 font-light text-sm mb-10">Your transaction was successful. You are officially registered for IndiGlobal Expo 2026.</p>
                
                <div className="bg-brand-light p-6 border border-gray-100 rounded-sm mb-10 text-left">
                  <div className="border-b border-gray-200 pb-4 mb-4 flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Booking Reference</p>
                      <p className="font-serif text-xl text-brand-dark tracking-wider">{bookingId}</p>
                    </div>
                    <Ticket size={32} weight="fill" className="text-brand-accent opacity-50" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Account</span>
                      <span className="text-sm font-medium text-brand-dark">{userDetails.firstName} {userDetails.lastName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Role</span>
                      <span className="text-sm font-medium text-brand-dark">{currentRole}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Selection</span>
                      <span className="text-sm font-medium text-brand-dark">{currentTicket.type}</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-2">
                      <span className="text-xs uppercase tracking-widest text-brand-dark font-bold">Amount Paid</span>
                      <span className="font-serif text-2xl text-brand-accent">€{currentTicket.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="">
                  <button onClick={() => navigate('/')} className="inline-flex bg-brand-dark text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors interactive">
                    Return to Homepage
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-24 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
            <div className="md:col-span-1 reveal-up">
              <h2 className="font-serif text-2xl font-bold tracking-widest uppercase mb-6 text-brand-dark">
                IndiGlobal<span className="font-sans font-light text-gray-500 text-xl ml-1">Expo</span>
              </h2>
              <p className="text-gray-500 text-sm font-light mb-8 max-w-xs">The premier international trade fair for interiors, inspiration, and lifestyle.</p>
            </div>
            <div className="reveal-up delay-100">
              <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-brand-dark">Navigation</h4>
              <ul className="space-y-4 font-light text-gray-500 text-sm">
                <li><button onClick={() => navigate('/')} className="hover:text-brand-accent transition-colors interactive">Home</button></li>
                <li><button onClick={() => navigate('/exhibitor')} className="hover:text-brand-accent transition-colors interactive">Exhibit With Us</button></li>
                <li><button onClick={() => navigate('/tickets')} className="hover:text-brand-accent transition-colors interactive">Get Tickets</button></li>
                <li><button onClick={() => navigate('/contact')} className="hover:text-brand-accent transition-colors interactive">Contact Us</button></li>
              </ul>
            </div>
            <div className="reveal-up delay-300">
              <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-brand-dark">Contact</h4>
              <ul className="space-y-2 font-light text-gray-500 text-sm">
                <li>Brand Vista Consulting Ltd.</li>
                <li>Apartment 208, Beecham House</li>
                <li>Clayponds Lane, Brentford</li>
                <li>England, TW8 0GX</li>
                <li className="pt-4"><a href="mailto:info@brandvistaconsulting.com" className="font-medium text-brand-dark hover:text-brand-accent transition-colors interactive">info@brandvistaconsulting.com</a></li>
              </ul>
            </div>
            
            <div className="reveal-up delay-400">
              <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-brand-dark">Corporate</h4>
              <ul className="space-y-4 font-light text-gray-500 text-sm">
                <li><button onClick={() => navigate('/corporate/teams')} className="hover:text-brand-accent transition-colors interactive">Organising Partner</button></li>
                <li><button onClick={() => navigate('/corporate/press')} className="hover:text-brand-accent transition-colors interactive">Press & Media</button></li>
                <li><button onClick={() => navigate('/corporate/legal')} className="hover:text-brand-accent transition-colors interactive">Legal Notice</button></li>
                <li><button onClick={() => navigate('/corporate/privacy')} className="hover:text-brand-accent transition-colors interactive">Data & Privacy</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 uppercase tracking-widest font-bold">
            <p>&copy; 2026 IndiGlobal Expo. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <button className="text-gray-400 hover:text-brand-accent transition-colors interactive"><FacebookLogo size={24} weight="fill" /></button>
              <button className="text-gray-400 hover:text-brand-accent transition-colors interactive"><InstagramLogo size={24} weight="fill" /></button>
              <button className="text-gray-400 hover:text-brand-accent transition-colors interactive"><LinkedinLogo size={24} weight="fill" /></button>
              <button className="text-gray-400 hover:text-brand-accent transition-colors interactive"><TwitterLogo size={24} weight="fill" /></button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Tickets;
