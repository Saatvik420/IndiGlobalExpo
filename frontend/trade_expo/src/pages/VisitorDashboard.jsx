import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Ticket, Receipt, ArrowRight, Calendar, MapPin, ClockCounterClockwise, PencilLine, SignOut } from '@phosphor-icons/react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageLoader from '../components/layout/PageLoader';
import CustomCursor from '../components/ui/CustomCursor';
import { useGlobal } from '../context/GlobalContext';
import { ticketService } from '../services/ticketService';

const VisitorDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, isLoggedIn } = useGlobal();
  const [myTickets, setMyTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/tickets');
      return;
    }
    fetchTickets();
  }, [isLoggedIn]);

  const fetchTickets = async () => {
    try {
      const data = await ticketService.getHistory();
      setMyTickets(data);
    } catch (error) {
      console.error('Failed to fetch tickets', error);
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
      <PageLoader title="Visitor<span class='font-sans font-light text-brand-accent text-3xl ml-1'>Dashboard</span>" />
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
                    <User size={48} weight="fill" className="text-brand-accent" />
                  </div>
                  <h2 className="font-serif text-3xl mb-1">{user.firstName} {user.lastName}</h2>
                  <p className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-6">Visitor Account</p>
                  
                  <div className="w-full pt-6 border-t border-white/10 text-left space-y-4">
                    <p className="text-sm text-gray-400 flex items-center gap-2">
                      <User size={16} className="text-brand-accent" /> Standard Visitor
                    </p>
                    <p className="text-sm text-gray-400 flex items-center gap-2">
                      <Calendar size={16} className="text-brand-accent" /> Member since 2024
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
                    Buy More Tickets <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <button onClick={() => navigate('/sectors')} className="w-full text-left text-sm text-gray-600 hover:text-brand-accent transition-colors flex items-center justify-between group">
                    Explore Sectors <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <button onClick={() => navigate('/profile')} className="w-full text-left text-sm text-gray-600 hover:text-brand-accent transition-colors flex items-center justify-between group">
                    Edit Profile <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-2/3 space-y-8">
              <div className="bg-white rounded-sm shadow-xl border border-gray-100 p-10">
                <h3 className="font-serif text-3xl text-brand-dark mb-8 border-b border-gray-100 pb-6">My Access Passes</h3>
                
                {isLoading ? (
                  <div className="py-12 text-center text-gray-400 animate-pulse">Loading tickets...</div>
                ) : myTickets.length > 0 ? (
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
                  <div className="text-center py-12 bg-brand-light/50 rounded-sm border border-dashed border-gray-200">
                    <Ticket size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-light mb-6">No tickets found in your account.</p>
                    <button 
                      onClick={() => navigate('/tickets')}
                      className="bg-brand-dark text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors flex items-center gap-2 mx-auto"
                    >
                      Book Your Visit <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </div>

              {/* Event Info Card */}
              <div className="bg-brand-dark rounded-sm p-10 text-white relative overflow-hidden">
                <div className="absolute right-0 bottom-0 w-64 h-64 bg-brand-accent opacity-10 -mr-32 -mb-32 rounded-full"></div>
                <div className="relative z-10">
                  <h4 className="font-serif text-2xl mb-4">Event Reminders</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 text-brand-accent"><Calendar size={20} /></div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-1">Date</p>
                        <p className="text-sm font-light">September 29-30, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 text-brand-accent"><MapPin size={20} /></div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-1">Venue</p>
                        <p className="text-sm font-light">Novotel Amsterdam City, Netherlands</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default VisitorDashboard;
