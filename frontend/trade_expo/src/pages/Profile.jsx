import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Ticket, EnvelopeSimple, Buildings, PencilLine, CheckCircle, SignOut, Calendar, MapPin, Receipt, ArrowRight, ListChecks, ClockCounterClockwise, Phone, Briefcase, Globe } from '@phosphor-icons/react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageLoader from '../components/layout/PageLoader';
import CustomCursor from '../components/ui/CustomCursor';
import TicketWidget from '../components/ui/TicketWidget';
import { useGlobal } from '../context/GlobalContext';
import { userService } from '../services/userService';
import { getErrorMessage } from '../utils/errorHelper';

const Profile = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout, updateUser } = useGlobal();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    mobileNumber: '',
    designation: '',
    country: ''
  });
  const [saveStatus, setSaveStatus] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/tickets');
    } else if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        company: user.company || '',
        mobileNumber: user.mobileNumber || user.mobile || '',
        designation: user.designation || '',
        country: user.country || ''
      });
    }
  }, [isLoggedIn, user, navigate]);

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

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus(null);
    
    try {
      await userService.updateProfile(profileData);
      updateUser(profileData);
      setIsEditing(false);
      setSaveStatus('Profile updated successfully in database!');
    } catch (error) {
      console.error('Failed to update profile', error);
      setSaveStatus(getErrorMessage(error, 'Error updating profile. Please try again.'));
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'auth': return <User weight="bold" />;
      case 'ticket': return <Ticket weight="bold" />;
      case 'profile': return <PencilLine weight="bold" />;
      default: return <ListChecks weight="bold" />;
    }
  };

  if (!isLoggedIn || !user) return null;

  return (
    <>
      <PageLoader title="User<span class='font-sans font-light text-brand-accent text-3xl ml-1'>Profile</span>" />
      <CustomCursor />
      <Header logoColor="text-brand-dark" />
      <TicketWidget />
      
      <main className="min-h-screen pt-32 pb-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Sidebar: Profile Card */}
            <div className="lg:w-1/3 space-y-8">
              <div className="bg-brand-dark text-white rounded-sm shadow-2xl p-10 relative overflow-hidden reveal-up">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent opacity-5 -mr-16 -mt-16 rounded-full"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 border border-brand-accent/30 relative group">
                    <User size={48} weight="fill" className="text-brand-accent" />
                  </div>
                  <h2 className="font-serif text-3xl mb-1">{user.firstName} {user.lastName}</h2>
                  <p className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-6">Verified Member</p>
                  
                  <div className="w-full space-y-4 pt-8 border-t border-white/10 text-left">
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <EnvelopeSimple size={18} className="text-brand-accent" />
                      <span>{user.email}</span>
                    </div>
                    {user.mobile && (
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <Phone size={18} className="text-brand-accent" />
                        <span>{user.mobile}</span>
                      </div>
                    )}
                    {user.company && (
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <Buildings size={18} className="text-brand-accent" />
                        <span>{user.company}</span>
                      </div>
                    )}
                    {user.designation && (
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <Briefcase size={18} className="text-brand-accent" />
                        <span>{user.designation}</span>
                      </div>
                    )}
                    {user.country && (
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <Globe size={18} className="text-brand-accent" />
                        <span>{user.country}</span>
                      </div>
                    )}
                  </div>
                  
                  <button 
                    onClick={handleLogout}
                    className="mt-10 w-full py-4 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-accent hover:border-brand-accent transition-all duration-300 interactive flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <SignOut size={18} /> Logout
                  </button>
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="bg-white border border-gray-100 rounded-sm shadow-xl p-8 reveal-up delay-100">
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-dark mb-6 border-b border-gray-100 pb-4 flex items-center gap-2">
                  <ClockCounterClockwise size={18} weight="bold" /> Recent Activity
                </h4>
                <div className="space-y-6">
                  {user.activities && user.activities.length > 0 ? (
                    user.activities.slice(0, 5).map((activity, index) => (
                      <div key={index} className="flex gap-4 relative">
                        {index !== user.activities.length - 1 && index < 4 && (
                          <div className="absolute left-[11px] top-8 bottom-[-24px] w-px bg-gray-100"></div>
                        )}
                        <div className="w-6 h-6 rounded-full bg-brand-light flex items-center justify-center text-brand-accent text-[10px] flex-shrink-0 z-10">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div>
                          <p className="text-sm text-brand-dark font-medium leading-tight mb-1">{activity.message}</p>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest">{activity.date}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 font-light italic text-center py-4">No recent activity found.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Main Content */}
            <div className="lg:w-2/3 space-y-8">
              
              {/* Account Settings */}
              <div className="bg-white rounded-sm shadow-xl border border-gray-100 p-10 reveal-up">
                <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
                  <h3 className="font-serif text-3xl text-brand-dark">Account Details</h3>
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 text-brand-accent hover:text-brand-dark transition-colors font-bold text-xs uppercase tracking-widest interactive cursor-pointer"
                  >
                    {isEditing ? 'Cancel' : <><PencilLine size={18} /> Edit Profile</>}
                  </button>
                </div>
                
                {saveStatus && (
                  <div className="mb-6 p-4 bg-green-50 text-green-700 text-sm border border-green-100 rounded-sm flex items-center gap-3 animate-fade-up">
                    <CheckCircle size={20} weight="fill" />
                    {saveStatus}
                  </div>
                )}

                <form onSubmit={handleUpdateProfile} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">First Name</label>
                      <input 
                        type="text" 
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full bg-transparent border-b py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors ${!isEditing ? 'border-transparent text-gray-500' : 'border-gray-200'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Last Name</label>
                      <input 
                        type="text" 
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full bg-transparent border-b py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors ${!isEditing ? 'border-transparent text-gray-500' : 'border-gray-200'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full bg-transparent border-b py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors ${!isEditing ? 'border-transparent text-gray-500' : 'border-gray-200'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Mobile Number</label>
                      <input 
                        type="tel" 
                        name="mobileNumber"
                        value={profileData.mobileNumber}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full bg-transparent border-b py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors ${!isEditing ? 'border-transparent text-gray-500' : 'border-gray-200'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Company Name</label>
                      <input 
                        type="text" 
                        name="company"
                        value={profileData.company}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full bg-transparent border-b py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors ${!isEditing ? 'border-transparent text-gray-500' : 'border-gray-200'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Designation</label>
                      <input 
                        type="text" 
                        name="designation"
                        value={profileData.designation}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full bg-transparent border-b py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors ${!isEditing ? 'border-transparent text-gray-500' : 'border-gray-200'}`}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Country</label>
                      <input 
                        type="text" 
                        name="country"
                        value={profileData.country}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full bg-transparent border-b py-3 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors ${!isEditing ? 'border-transparent text-gray-500' : 'border-gray-200'}`}
                      />
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="pt-4 animate-fade-up">
                      <button 
                        type="submit"
                        className="bg-brand-dark text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors interactive cursor-pointer"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </form>
              </div>

              {/* Ticket History */}
              <div className="bg-white rounded-sm shadow-xl border border-gray-100 p-10 reveal-up delay-200">
                <h3 className="font-serif text-3xl text-brand-dark mb-8 border-b border-gray-100 pb-6">My Bookings</h3>
                
                {user.tickets && user.tickets.length > 0 ? (
                  <div className="space-y-6">
                    {user.tickets.map((t, i) => (
                      <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-brand-light rounded-sm border border-gray-100 hover:border-brand-accent/30 transition-colors group">
                        <div className="flex items-center gap-6">
                          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-brand-accent border border-gray-100 shadow-sm group-hover:bg-brand-accent group-hover:text-white transition-all">
                            <Ticket size={28} />
                          </div>
                          <div>
                            <p className="font-serif text-xl text-brand-dark">{t.type}</p>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-brand-accent">{t.role} Pass</p>
                          </div>
                        </div>
                        <div className="flex flex-row md:flex-col items-center md:items-end justify-between mt-6 md:mt-0 gap-2">
                          <p className="text-sm font-bold text-brand-dark">€{t.price.toLocaleString()}</p>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest">{t.date}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-6 md:mt-0 md:ml-8 pt-4 md:pt-0 border-t md:border-t-0 border-gray-200">
                           <button className="text-[10px] uppercase font-bold tracking-widest text-gray-400 hover:text-brand-accent transition-colors flex items-center gap-1 cursor-pointer">
                             <Receipt size={16} /> Receipt
                           </button>
                           <span className="text-gray-200">|</span>
                           <p className="text-[10px] uppercase font-bold tracking-widest text-brand-dark">{t.bookingId}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-brand-light/50 rounded-sm border border-dashed border-gray-200">
                    <Ticket size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-light mb-6">You haven't purchased any tickets yet.</p>
                    <button 
                      onClick={() => navigate('/tickets')}
                      className="bg-brand-dark text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors interactive flex items-center gap-2 mx-auto cursor-pointer"
                    >
                      Browse Passes <ArrowRight size={16} />
                    </button>
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

export default Profile;
