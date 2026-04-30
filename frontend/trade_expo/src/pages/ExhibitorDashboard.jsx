import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Ticket, Storefront, ShieldCheck, SignOut, ClockCounterClockwise, ArrowRight, Spinner, CheckCircle, XCircle } from '@phosphor-icons/react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageLoader from '../components/layout/PageLoader';
import CustomCursor from '../components/ui/CustomCursor';
import { useGlobal } from '../context/GlobalContext';
import { exhibitorService } from '../services/exhibitorService';
import { ticketService } from '../services/ticketService';

const ExhibitorDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, isLoggedIn } = useGlobal();
  const [application, setApplication] = useState(null);
  const [myTickets, setMyTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/tickets');
      return;
    }
    fetchData();
  }, [isLoggedIn]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [appData, ticketsData] = await Promise.all([
        exhibitorService.getMyApplication(),
        ticketService.getHistory()
      ]);
      setApplication(appData);
      setMyTickets(ticketsData);
    } catch (error) {
      console.error('Failed to fetch exhibitor data', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <>
      <PageLoader title="Exhibitor<span class='font-sans font-light text-brand-accent text-3xl ml-1'>Dashboard</span>" />
      <CustomCursor />
      <Header logoColor="text-brand-dark" />

      <main className="min-h-screen pt-32 pb-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar */}
            <div className="lg:w-1/3 space-y-8">
              <div className="bg-brand-dark text-white rounded-sm shadow-2xl p-10 relative overflow-hidden">
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 border border-brand-accent/30">
                    <Storefront size={48} weight="fill" className="text-brand-accent" />
                  </div>
                  <h2 className="font-serif text-3xl mb-1">{user.firstName} {user.lastName}</h2>
                  <p className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-6">Exhibitor Account</p>
                  
                  <div className="w-full pt-6 border-t border-white/10 text-left space-y-4">
                    <p className="text-sm text-gray-400 flex items-center gap-2">
                      <ShieldCheck size={16} className="text-brand-accent" /> Verified Business
                    </p>
                    <p className="text-sm text-gray-400 flex items-center gap-2 text-wrap break-all">
                      <User size={16} className="text-brand-accent flex-shrink-0" /> {user.email}
                    </p>
                  </div>

                  <button 
                    onClick={handleLogout}
                    className="mt-10 w-full py-4 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-accent hover:border-brand-accent transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <SignOut size={18} /> Logout
                  </button>
                </div>
              </div>

              <div className="bg-white p-8 border border-gray-100 rounded-sm shadow-xl">
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-dark mb-6 flex items-center gap-2">
                  <ClockCounterClockwise size={18} weight="bold" /> Quick Links
                </h4>
                <div className="space-y-4">
                  <button onClick={() => navigate('/tickets')} className="w-full text-left text-sm text-gray-600 hover:text-brand-accent transition-colors flex items-center justify-between group">
                    Exhibitor Passes <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <button onClick={() => navigate('/exhibitor')} className="w-full text-left text-sm text-gray-600 hover:text-brand-accent transition-colors flex items-center justify-between group">
                    Application Info <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <button onClick={() => navigate('/profile')} className="w-full text-left text-sm text-gray-600 hover:text-brand-accent transition-colors flex items-center justify-between group">
                    Edit Profile <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-2/3 space-y-8">
              {/* Application Status */}
              <div className="bg-white rounded-sm shadow-xl border border-gray-100 p-10">
                <h3 className="font-serif text-3xl text-brand-dark mb-8 border-b border-gray-100 pb-6">Application Status</h3>
                
                {isLoading ? (
                  <div className="py-8 text-center text-gray-400 animate-pulse">Syncing data...</div>
                ) : application ? (
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Company</span>
                        <p className="font-serif text-xl text-brand-dark">{application.companyName}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Sector</span>
                        <p className="text-sm font-medium">{application.sector}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center md:items-end gap-4">
                      <div className={`px-6 py-3 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${
                        application.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 
                        application.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {application.status === 'APPROVED' && <CheckCircle weight="fill" />}
                        {application.status === 'REJECTED' && <XCircle weight="fill" />}
                        {application.status === 'PENDING' && <Spinner className="animate-spin" />}
                        {application.status}
                      </div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">Submitted on {new Date(application.registrationDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 font-light mb-6">You haven't applied as an exhibitor yet.</p>
                    <button 
                      onClick={() => navigate('/exhibitor')}
                      className="bg-brand-accent text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-dark transition-colors"
                    >
                      Apply Now
                    </button>
                  </div>
                )}
              </div>

              {/* Exhibitor Specific Content (only if approved) */}
              {application?.status === 'APPROVED' && (
                <div className="bg-white rounded-sm shadow-xl border border-gray-100 p-10 animate-fade-up">
                  <h3 className="font-serif text-3xl text-brand-dark mb-8 border-b border-gray-100 pb-6">Exhibitor Management</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 bg-brand-light border border-gray-100 rounded-sm">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-brand-dark mb-2">Booth Allocation</h4>
                      <p className="text-sm text-gray-500 font-light mb-4">You are now eligible to select your booth space and layout.</p>
                      <button 
                        onClick={() => navigate('/tickets')}
                        className="text-xs font-bold uppercase tracking-widest text-brand-accent hover:underline flex items-center gap-2"
                      >
                        Browse Booth Options <ArrowRight size={14} />
                      </button>
                    </div>
                    <div className="p-6 bg-brand-light border border-gray-100 rounded-sm">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-brand-dark mb-2">Technical Manual</h4>
                      <p className="text-sm text-gray-500 font-light mb-4">Download the technical guidelines for booth setup and logistics.</p>
                      <button className="text-xs font-bold uppercase tracking-widest text-brand-accent hover:underline flex items-center gap-2">
                        Download PDF <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Exhibitor Tickets */}
              <div className="bg-white rounded-sm shadow-xl border border-gray-100 p-10">
                <h3 className="font-serif text-3xl text-brand-dark mb-8 border-b border-gray-100 pb-6">Booth & Staff Passes</h3>
                
                {myTickets.length > 0 ? (
                  <div className="space-y-6">
                    {myTickets.map((t, i) => (
                      <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-brand-light rounded-sm border border-gray-100 hover:border-brand-accent/30 transition-colors group">
                        <div className="flex items-center gap-6">
                          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-brand-accent border border-gray-100 shadow-sm group-hover:bg-brand-accent group-hover:text-white transition-all">
                            <Ticket size={28} />
                          </div>
                          <div>
                            <p className="font-serif text-xl text-brand-dark">{t.ticketType}</p>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-brand-accent">Booking ID: {t.bookingId}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 mt-4 md:mt-0">
                          <span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest ${
                            t.paymentStatus === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {t.paymentStatus}
                          </span>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest">{new Date(t.purchaseDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 font-light">No booth or staff passes found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ExhibitorDashboard;
