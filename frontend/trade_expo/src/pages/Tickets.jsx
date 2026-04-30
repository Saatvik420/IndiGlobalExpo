import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IdentificationBadge, Storefront, CreditCard, Check, Spinner, Ticket, User as UserIcon, ArrowRight, X, GoogleLogo } from '@phosphor-icons/react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageLoader from '../components/layout/PageLoader';
import CustomCursor from '../components/ui/CustomCursor';
import CheckoutForm from '../components/ui/CheckoutForm';
import { useGlobal } from '../context/GlobalContext';
import { authService } from '../services/authService';
import { ticketService } from '../services/ticketService';
import { getErrorMessage } from '../utils/errorHelper';

// Load Stripe outside of component to avoid recreating Stripe object on every render
// const stripePromise = loadStripe('pk_test_51O9X...'); // Replace with actual public key

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
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');

  const handleGoogleResponse = useCallback(async (response) => {
    setIsLoggingIn(true);
    setError('');
    try {
      console.log('Google login successful, processing with backend...');
      const data = await authService.googleLogin(response.credential);
      login(data);
      setUserDetails(data);
      setStep(2);
    } catch (err) {
      console.error('Backend Google login failed:', err);
      setError(getErrorMessage(err, 'Google login failed.'));
    } finally {
      setIsLoggingIn(false);
    }
  }, [login]);

  useEffect(() => {
    const initializeGoogle = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: "722892188739-0vhusmm3efogu28v3jjur1vbs6u0d8q7.apps.googleusercontent.com",
          callback: handleGoogleResponse,
          auto_select: false
        });

        // Render standard Google button into our containers
        const signinContainer = document.getElementById('google-signin-container');
        if (signinContainer) {
          window.google.accounts.id.renderButton(signinContainer, {
            theme: 'outline',
            size: 'large',
            width: signinContainer.offsetWidth > 200 ? signinContainer.offsetWidth : 350,
            text: 'signin_with',
            shape: 'rectangular'
          });
        }

        const registerContainer = document.getElementById('google-register-container');
        if (registerContainer) {
          window.google.accounts.id.renderButton(registerContainer, {
            theme: 'outline',
            size: 'large',
            width: registerContainer.offsetWidth > 200 ? registerContainer.offsetWidth : 350,
            text: 'signup_with',
            shape: 'rectangular'
          });
        }
      }
    };

    if (window.google) {
      initializeGoogle();
    } else {
      const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (script) {
        script.onload = initializeGoogle;
      }
    }
  }, [step, handleGoogleResponse]);

  const visitorTickets = [
    { type: 'Trade Visitor', price: 45, features: ['Access to all Sectors', 'Digital Event Directory', 'Public Lounges'] },
    { type: 'All-Access VIP', price: 290, features: ['Access to all Sectors', 'B2B Matchmaking App', 'VIP Lounge Access', '3-Day Premium Access'] }
  ];

  const exhibitorTickets = [
    { type: 'Standard Booth', price: 1500, features: ['9 sqm (3x3m) Shell Scheme', 'Fully built shell structure', 'Fascia name board', '2 Exhibitor Badges', 'Basic electricity & lighting'] },
    { type: 'Premium Island', price: 3500, features: ['18 sqm (6x3m) Open Space', 'Raw space for custom build', 'Prime location in sector hall', '5 Exhibitor VIP Badges', 'Website logo placement'] }
  ];

  useEffect(() => {
    // If already logged in, we can pre-set user details
    if (isLoggedIn && user) {
      setUserDetails(user);
    }
  }, [isLoggedIn, user]);

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

  const selectRoleAction = (role, action) => {
    setCurrentRole(role);
    if (isLoggedIn) {
      setStep(2);
    } else {
      if (action === 'login') {
        setStep('login');
      } else if (action === 'register') {
        setStep(1);
      }
    }
  };

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
      country: formData.get('country')
    };
    
    try {
      if (currentRole === 'Exhibitor') {
        const exhibitorData = {
          ...commonData,
          companyName: formData.get('company'),
          designation: formData.get('designation'),
          sector: formData.get('sector'),
          website: formData.get('website')
        };
        await authService.registerExhibitor(exhibitorData);
      } else {
        const visitorData = {
          ...commonData,
          company: formData.get('company'),
          designation: formData.get('designation')
        };
        await authService.registerVisitor(visitorData);
      }

      // Auto login after register
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
    setIsProcessing(true);
    setError('');
    
    // DUMMY SYSTEM: Bypassing backend completely to show success page immediately
    setTimeout(() => {
      const dummyBookingId = "#IGX-" + Math.random().toString(36).substring(2, 8).toUpperCase();
      const dummyTicket = {
        id: "dummy_" + Date.now(),
        ticketType: type,
        price: price,
        bookingId: dummyBookingId,
        purchaseDate: new Date().toISOString(),
        paymentStatus: "PAID"
      };

      setBookingId(dummyBookingId);
      addTicket(dummyTicket); // Updates global state and local storage
      setStep(4); // Direct jump to Success step
      setIsProcessing(false);
    }, 1000); // 1 second delay for "processing" feel
  };

  const handlePaymentSuccess = (ticket) => {
    setBookingId(ticket.bookingId);
    addTicket(ticket);
    setStep(4);
  };

  const handlePaymentError = (errorMessage) => {
    setError(errorMessage);
  };

  const goBackFromSelection = () => {
    if (isLoggedIn) {
      setStep(0);
    } else {
      setStep(1);
    }
  };

  return (
    <>
      <PageLoader title="Registration<span class='font-sans font-light text-brand-accent text-3xl ml-1'>Portal</span>" />
      <CustomCursor />
      <Header logoColor="text-white" />
      
      {/* Hero Section */}
      <section className="relative h-[45vh] min-h-[350px] flex items-center overflow-hidden bg-brand-dark">
        <img 
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2000&q=80" 
          alt="Expo Conference Event" 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark to-brand-dark/50 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10 text-center md:text-left">
          <div className="reveal-up">
            <p className="text-brand-accent font-bold tracking-widest uppercase text-xs mb-4">Join The Experience</p>
            <h2 className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight mb-4 animate-fade-up delay-100">
              Registration <span className="italic text-brand-accent">Portal.</span>
            </h2>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main id="checkout-area" className="flex-grow relative z-20 -mt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl mx-auto relative z-10">
          
          {/* Progress Stepper */}
          {step !== 0 && step !== 'login' && step !== 4 && (
            <div id="stepper" className="mb-12 animate-fade-up">
              <div className="flex items-center justify-center relative max-w-3xl mx-auto">
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[1px] bg-gray-200 z-0"></div>
                <div id="progress-line" className="absolute left-[10%] top-1/2 transform -translate-y-1/2 h-[1px] bg-brand-accent z-0 transition-all duration-700" style={{ width: step === 1 ? '0%' : step === 2 ? '40%' : '80%' }}></div>
                
                {/* Steps */}
                <div className="flex w-full justify-between relative z-10">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-accent text-white flex items-center justify-center font-bold text-xs shadow-lg border-2 border-brand-light"><Check size={14} weight="bold" /></div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-brand-accent">Role</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div id="dot-1" className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-lg transition-colors duration-300 border-2 ${step >= 1 ? 'bg-brand-accent text-white border-brand-light' : 'bg-white text-gray-400 border-gray-200'}`}>
                      {step > 1 ? <Check size={14} weight="bold" /> : '1'}
                    </div>
                    <span id="text-1" className={`text-[10px] uppercase tracking-widest font-bold transition-colors duration-300 ${step >= 1 ? 'text-brand-accent' : 'text-gray-400'}`}>Register</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div id="dot-2" className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm transition-colors duration-300 border-2 ${step >= 2 ? 'bg-brand-accent text-white border-brand-light' : 'bg-white text-gray-400 border-gray-200'}`}>
                      {step > 2 ? <Check size={14} weight="bold" /> : '2'}
                    </div>
                    <span id="text-2" className={`text-[10px] uppercase tracking-widest font-bold transition-colors duration-300 ${step >= 2 ? 'text-brand-accent' : 'text-gray-400'}`}>Select Pass</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div id="dot-3" className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm transition-colors duration-300 border-2 ${step >= 3 ? 'bg-brand-accent text-white border-brand-light' : 'bg-white text-gray-400 border-gray-200'}`}>3</div>
                    <span id="text-3" className={`text-[10px] uppercase tracking-widest font-bold transition-colors duration-300 ${step >= 3 ? 'text-brand-accent' : 'text-gray-400'}`}>Payment</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 0: ROLE SELECTION */}
          {step === 0 && (
            <div id="step-0" className="checkout-step animate-fade-up">
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
                    <button 
                      onClick={() => selectRoleAction('Visitor', 'login')}
                      className="flex-1 py-4 border border-gray-200 text-gray-600 text-xs font-bold uppercase tracking-widest hover:border-brand-accent hover:text-brand-accent transition-colors interactive flex justify-center items-center gap-2 cursor-pointer"
                    >
                      Log In
                    </button>
                    <button 
                      onClick={() => selectRoleAction('Visitor', 'register')}
                      className="flex-1 py-4 bg-brand-dark text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors interactive flex justify-center items-center gap-2 cursor-pointer"
                    >
                      Register
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
                    <button 
                      onClick={() => selectRoleAction('Exhibitor', 'login')}
                      className="flex-1 py-4 border border-gray-200 text-gray-600 text-xs font-bold uppercase tracking-widest hover:border-brand-accent hover:text-brand-accent transition-colors interactive flex justify-center items-center gap-2 cursor-pointer"
                    >
                      Log In
                    </button>
                    <button 
                      onClick={() => selectRoleAction('Exhibitor', 'register')}
                      className="flex-1 py-4 bg-brand-dark text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors interactive flex justify-center items-center gap-2 cursor-pointer"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP LOGIN */}
          {step === 'login' && (
            <div id="step-login" className="checkout-step animate-fade-up">
              <div className="bg-white p-10 md:p-16 rounded-sm shadow-2xl max-w-md mx-auto w-full border border-gray-100">
                <div className="mb-10 text-center">
                  <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                    <UserIcon size={32} weight="fill" className="text-brand-accent" />
                  </div>
                  <p className="text-brand-accent tracking-widest uppercase text-xs font-bold mb-2">Welcome Back</p>
                  <h2 className="font-serif text-4xl text-brand-dark mb-2">{currentRole} Login</h2>
                  <p className="text-gray-500 font-light text-sm">Log in to manage your bookings and access passes.</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      required 
                      className="w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors interactive" 
                      placeholder="jane@company.com" 
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400">Password</label>
                      <button type="button" className="text-[10px] text-brand-accent hover:underline interactive cursor-pointer">Forgot?</button>
                    </div>
                    <input 
                      type="password" 
                      name="password"
                      required 
                      className="w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors interactive" 
                      placeholder="••••••••" 
                    />
                  </div>
                  
                  {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}
                  
                  <button 
                    type="submit" 
                    disabled={isLoggingIn}
                    className="w-full bg-brand-dark text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors interactive flex justify-center items-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isLoggingIn ? <Spinner size={18} className="animate-spin" /> : 'Log In'} <ArrowRight size={16} />
                  </button>

                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                    <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest"><span className="bg-white px-4 text-gray-400">Or Continue With</span></div>
                  </div>

                  <div id="google-signin-container" className="w-full flex justify-center min-h-[50px]"></div>
                  
                  <div className="flex flex-col items-center gap-4 mt-8 pt-8 border-t border-gray-100">
                    <button 
                      type="button" 
                      onClick={() => setStep(1)} 
                      className="text-xs font-bold uppercase tracking-widest text-brand-accent hover:text-brand-dark transition-colors interactive cursor-pointer"
                    >
                      Create an Account Instead
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setStep(0)} 
                      className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors interactive flex items-center gap-1 cursor-pointer"
                    >
                      Back to Role Selection
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* STEP 1: REGISTRATION */}
          {step === 1 && (
            <div id="step-1" className="checkout-step animate-fade-up">
              <div className="bg-white p-10 md:p-16 rounded-sm shadow-2xl max-w-2xl mx-auto border border-gray-100">
                <div className="mb-10 text-center">
                  <p className="text-brand-accent tracking-widest uppercase text-xs font-bold mb-2">Step 1 of 3</p>
                  <h2 className="font-serif text-4xl text-brand-dark mb-2">Create Account</h2>
                  <p className="text-gray-500 font-light text-sm">Register to secure your access to the portal.</p>
                </div>

                <div className="mb-10">
                  <div id="google-register-container" className="w-full flex justify-center min-h-[50px]"></div>
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                    <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest"><span className="bg-white px-4 text-gray-400">Or Fill Details Manually</span></div>
                  </div>
                </div>
                
                <form onSubmit={handleRegister}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">First Name *</label>
                      <input type="text" name="firstName" required className="w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors interactive" placeholder="Jane" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Last Name *</label>
                      <input type="text" name="lastName" required className="w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors interactive" placeholder="Doe" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Work Email Address *</label>
                      <input type="email" name="email" required className="w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors interactive" placeholder="jane.doe@company.com" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Mobile Number *</label>
                      <input type="tel" name="mobile" required className="w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors interactive" placeholder="+1 234 567 8900" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Company Name *</label>
                      <input type="text" name="company" required className="w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors interactive" placeholder="Design Studio LLC" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Designation *</label>
                      <input type="text" name="designation" required className="w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors interactive" placeholder="Creative Director" />
                    </div>
                    {currentRole === 'Exhibitor' && (
                      <>
                        <div>
                          <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Industry Sector *</label>
                          <select name="sector" required className="w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors interactive appearance-none">
                            <option value="">Select Sector</option>
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
                        <div className="md:col-span-1">
                          <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Company Website</label>
                          <input type="url" name="website" className="w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors interactive" placeholder="https://www.company.com" />
                        </div>
                      </>
                    )}
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Country *</label>
                      <input type="text" name="country" required className="w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors interactive" placeholder="Netherlands" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Create Password *</label>
                      <input type="password" name="password" required className="w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors interactive" placeholder="••••••••" />
                    </div>
                  </div>
                  
                  {error && <p className="text-red-500 text-xs font-bold text-center mb-6">{error}</p>}
                  
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-100 mt-4">
                    <button type="button" onClick={() => setStep(0)} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-brand-dark transition-colors interactive flex items-center gap-2 cursor-pointer">
                      Change Role
                    </button>
                    <button 
                      type="submit" 
                      disabled={isLoggingIn}
                      className="w-full sm:w-auto bg-brand-dark text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors interactive cursor-pointer disabled:opacity-70"
                    >
                      {isLoggingIn ? <Spinner size={18} className="animate-spin" /> : 'Create Account'}
                    </button>
                  </div>
                  <p className="text-center text-xs text-gray-400 mt-8 pt-6 border-t border-gray-50">
                    Already have an account? 
                    <button type="button" onClick={() => setStep('login')} className="text-brand-accent hover:underline font-bold interactive ml-1 cursor-pointer">Log In Here</button>
                  </p>
                </form>
              </div>
            </div>
          )}

          {/* STEP 2: SELECT PASS */}
          {step === 2 && (
            <div id="step-2" className="checkout-step animate-fade-up w-full">
              <div className="text-center mb-10">
                <p className="text-brand-accent tracking-widest uppercase text-xs font-bold mb-2">Step 2 of 3</p>
                <h2 className="font-serif text-4xl text-brand-dark mb-2">
                  {currentRole === 'Exhibitor' ? 'Select Your Booth' : 'Select Your Pass'}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {(currentRole === 'Visitor' ? visitorTickets : exhibitorTickets).map((ticket, index) => (
                  <div 
                    key={index}
                    className={`p-10 shadow-xl hover:-translate-y-2 transition-all duration-500 rounded-sm flex flex-col interactive border ${
                      index === 1 ? 'bg-brand-dark border-brand-accent shadow-2xl relative' : 'bg-white border-gray-100'
                    }`}
                  >
                    {index === 1 && (
                      <div className="absolute top-0 right-0 bg-brand-accent text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1">
                        {currentRole === 'Visitor' ? 'Recommended' : 'Premium Exposure'}
                      </div>
                    )}
                    <h3 className={`font-serif text-2xl mb-2 ${index === 1 ? 'text-white' : 'text-brand-dark'}`}>{ticket.type}</h3>
                    <p className={`text-xs tracking-widest uppercase font-bold mb-6 ${index === 1 ? 'text-brand-accent' : 'text-gray-400'}`}>
                      {currentRole === 'Visitor' ? (index === 0 ? '1-Day Access' : '3-Day Premium Access') : (index === 0 ? '9 sqm (3x3m) Shell Scheme' : '18 sqm (6x3m) Open Space')}
                    </p>
                    <div className={`mb-8 border-b pb-8 ${index === 1 ? 'border-gray-800' : 'border-gray-100'}`}>
                      <span className={`text-5xl font-serif ${index === 1 ? 'text-white' : 'text-brand-dark'}`}>€{ticket.price.toLocaleString()}</span>
                      {currentRole === 'Visitor' && <span className="text-gray-400 text-sm font-light">/ person</span>}
                    </div>
                    <ul className="space-y-4 mb-10 flex-1">
                      {ticket.features.map((feature, i) => (
                        <li key={i} className={`flex items-center gap-3 text-sm font-light ${index === 1 ? 'text-gray-300' : 'text-gray-600'}`}>
                          <Check weight="fill" className="text-brand-accent text-lg" /> {feature}
                        </li>
                      ))}
                    </ul>
                    <button 
                      onClick={() => selectPass(ticket.type, ticket.price)}
                      disabled={isProcessing}
                      className={`interactive w-full py-4 font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                        index === 1 ? 'bg-brand-accent text-white hover:bg-white hover:text-brand-dark' : 'border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white'
                      }`}
                    >
                      {isProcessing ? <Spinner className="animate-spin" /> : null}
                      {currentRole === 'Exhibitor' ? 'Reserve Booth' : 'Select Pass'}
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-10 text-center">
                <button type="button" onClick={goBackFromSelection} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-brand-dark transition-colors interactive inline-flex items-center gap-2 cursor-pointer">
                  Go Back
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT */}
          {step === 3 && (
            <div id="step-3" className="checkout-step animate-fade-up w-full">
              <div className="text-center mb-10">
                <p className="text-brand-accent tracking-widest uppercase text-xs font-bold mb-2">Step 3 of 3</p>
                <h2 className="font-serif text-4xl text-brand-dark mb-2">Checkout</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="lg:col-span-2 bg-white p-10 shadow-2xl rounded-sm border border-gray-100">
                  <h2 className="font-serif text-2xl text-brand-dark mb-6 border-b border-gray-100 pb-4">Secure Payment</h2>
                  
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-500 text-xs font-bold flex items-center justify-between">
                      <span>{error}</span>
                      <button onClick={() => setError('')}><X size={16} /></button>
                    </div>
                  )}

                  {/* DUMMY PAYMENT SYSTEM: Bypassing real Stripe components */}
                  {/* <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm 
                      clientSecret={clientSecret} 
                      ticket={currentTicket}
                      onPaymentSuccess={handlePaymentSuccess}
                      onPaymentError={handlePaymentError}
                      price={currentTicket.price}
                    />
                  </Elements> */}
                  <div className="py-12 text-center">
                    <Spinner size={32} className="animate-spin mx-auto text-brand-accent mb-4" />
                    <p className="text-gray-500 font-light italic">Simulating secure registration...</p>
                  </div>

                  <div className="mt-10 pt-6 border-t border-gray-100">
                    <button type="button" onClick={() => setStep(2)} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-brand-dark transition-colors interactive flex items-center gap-2 cursor-pointer">
                      Change Selection
                    </button>
                  </div>
                </div>

                {/* Sidebar Summary */}
                <div className="bg-brand-dark p-8 shadow-2xl flex flex-col justify-between h-full rounded-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent opacity-5 -mr-16 -mt-16 rounded-full"></div>
                  <div className="relative z-10">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-6 border-b border-white/10 pb-4">Order Summary</h3>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="font-serif text-xl text-white mb-1">{currentTicket.type}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">{currentRole} Access</p>
                      </div>
                      <span className="text-white font-serif text-lg">€{currentTicket.price.toLocaleString()}</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      <li className="text-xs text-gray-400 font-light flex items-center gap-2"><Check size={14} className="text-brand-accent" /> IndiGlobal Expo 2026</li>
                      <li className="text-xs text-gray-400 font-light flex items-center gap-2"><Check size={14} className="text-brand-accent" /> Amsterdam, NL</li>
                    </ul>
                  </div>
                  
                  <div className="relative z-10 border-t border-white/10 pt-6">
                    <div className="flex justify-between items-center mb-2 text-sm text-gray-400">
                      <span>Subtotal</span>
                      <span>€{currentTicket.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4 text-sm text-gray-400">
                      <span>Taxes & Fees</span>
                      <span>Included</span>
                    </div>
                    <div className="flex justify-between items-end mt-4 pt-4 border-t border-brand-accent/30">
                      <span className="text-xs font-bold uppercase tracking-widest text-white">Total</span>
                      <span className="font-serif text-3xl text-brand-accent">€{currentTicket.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 4 && (
            <div id="step-4" className="checkout-step animate-fade-up">
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
                    <Ticket size={32} className="text-brand-accent opacity-50" />
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
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-2">
                      <span className="text-xs uppercase tracking-widest text-brand-dark font-bold">Amount Paid</span>
                      <span className="font-serif text-2xl text-brand-accent">€{currentTicket.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => navigate('/')}
                  className="inline-flex bg-brand-dark text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors interactive cursor-pointer"
                >
                  Return to Homepage
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
};

export default Tickets;
