import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShieldCheck, SignOut, MagnifyingGlass } from '@phosphor-icons/react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import PageLoader from '../../components/layout/PageLoader';
import CustomCursor from '../../components/ui/CustomCursor';
import { useGlobal } from '../../context/GlobalContext';
import { adminService } from '../../services/adminService';
import apiClient from '../../api/client';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useGlobal();
  const [activeTab, setActiveTab] = useState('visitors');
  const [users, setUsers] = useState([]);
  const [exhibitors, setExhibitors] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visitorSearch, setVisitorSearch] = useState('');
  const [exhibitorSearch, setExhibitorSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);

  // Helper functions - Using function keyword for hoisting safety
  function getUserById(userId) {
    return users.find(u => u.id === userId);
  }

  function getUserTickets(userId) {
    return tickets.filter(t => t.userId === userId);
  }

  const fetchData = async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      console.log("AdminDashboard: Fetching data...");
      const [usersData, exhibitorsData, ticketsData] = await Promise.all([
        adminService.getAllUsers(),
        adminService.getAllExhibitors(),
        adminService.getAllTickets()
      ]);
      
      setUsers(usersData || []);
      setExhibitors(exhibitorsData || []);
      setTickets(ticketsData || []);
      console.log("AdminDashboard: Sync complete. Users found:", usersData?.length);
    } catch (error) {
      console.error('AdminDashboard: Fetch failed', error);
      setFetchError(error.message || 'Network Error - Backend unreachable');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.roles?.includes('ROLE_ADMIN')) {
      fetchData();
    } else if (user) {
      console.warn("User is not an admin, redirecting...");
      navigate('/');
    }
  }, [user, navigate]);

  const handleUpdateStatus = async (id, status) => {
    try {
      await adminService.updateExhibitorStatus(id, status);
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredExhibitors = (exhibitors || []).filter(e => {
    const u = getUserById(e.userId);
    const searchStr = (exhibitorSearch || '').toLowerCase();
    return (
      (e.companyName || '').toLowerCase().includes(searchStr) ||
      (e.sector || '').toLowerCase().includes(searchStr) ||
      (u && (
        (u.firstName || '').toLowerCase().includes(searchStr) ||
        (u.lastName || '').toLowerCase().includes(searchStr) ||
        (u.email || '').toLowerCase().includes(searchStr)
      ))
    );
  });

  const visitorUsers = users.filter(u => {
    const s = (visitorSearch || '').toLowerCase();
    return !s || 
      (u.firstName || '').toLowerCase().includes(s) || 
      (u.lastName || '').toLowerCase().includes(s) || 
      (u.email || '').toLowerCase().includes(s) ||
      (u.company || '').toLowerCase().includes(s);
  });

  return (
    <>
      <PageLoader title="Admin<span class='font-sans font-light text-brand-accent text-3xl ml-1'>Dashboard</span>" />
      <CustomCursor />
      <Header logoColor="text-white" />

      <section className="min-h-screen bg-brand-light pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Debug Info */}
          <div className="mb-4 p-2 bg-black text-green-400 text-[10px] font-mono rounded">
            DEBUG: User Email: {user?.email} | Roles: {JSON.stringify(user?.roles)} | User Count: {users.length} | Loading: {isLoading ? 'YES' : 'NO'}
          </div>
          
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-serif text-brand-dark mb-2">Management Console</h2>
              <p className="text-gray-500 font-light">Welcome back, Admin. System is running smoothly.</p>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors"
            >
              <SignOut size={20} /> Logout
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-gray-200 pb-px overflow-x-auto">
            {[
              { id: 'visitors', label: 'All Registered Users', icon: <User size={20} /> },
              { id: 'exhibitors_users', label: 'Exhibitors Status', icon: <ShieldCheck size={20} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${
                  activeTab === tab.id ? 'text-brand-accent' : 'text-gray-400 hover:text-brand-dark'
                }`}
              >
                {tab.icon} {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-accent" />
                )}
              </button>
            ))}
          </div>

          <div className="bg-white border border-gray-100 shadow-xl p-8 rounded-sm">
            {fetchError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded">
                <p className="font-bold uppercase tracking-widest text-[10px] mb-1">System Error:</p>
                <p className="text-sm">{fetchError}</p>
                <button onClick={fetchData} className="mt-4 text-[10px] font-bold uppercase tracking-widest bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition-colors">Retry Sync</button>
              </div>
            )}
            
            {isLoading ? (
              <div className="py-24 text-center">
                <p className="text-gray-400 animate-pulse uppercase tracking-widest text-xs font-bold">Synchronizing Data...</p>
              </div>
            ) : (
              <>
                {activeTab === 'visitors' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-serif text-brand-dark">User Directory</h3>
                        <p className="text-xs text-gray-400 mt-1">Total Registered: {users.length}</p>
                      </div>
                      <div className="relative">
                        <MagnifyingGlass size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search email or name..."
                          value={visitorSearch}
                          onChange={(e) => setVisitorSearch(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent w-64"
                        />
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-gray-100">
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark">User Name (Role)</th>
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark">Payment & Ticket</th>
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark">Mail</th>
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark">Phone Number</th>
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark">Company & Designation</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {visitorUsers.map((u) => {
                            const userTickets = getUserTickets(u.id);
                            return (
                              <tr key={u.id} className="hover:bg-brand-light/50 transition-colors">
                                <td className="py-4 text-sm">
                                  <p className="font-medium text-brand-dark">{u.firstName} {u.lastName}</p>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {u.roles?.map(role => (
                                      <span key={role} className={`px-2 py-0.5 text-[8px] font-bold rounded-full uppercase tracking-widest ${
                                        role === 'ROLE_ADMIN' ? 'bg-red-100 text-red-700' : 
                                        role === 'ROLE_EXHIBITOR' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                      }`}>
                                        {role.replace('ROLE_', '')}
                                      </span>
                                    ))}
                                  </div>
                                </td>
                                <td className="py-4">
                                  {userTickets.length > 0 ? (
                                    <div className="flex flex-col gap-1">
                                      {userTickets.map(t => (
                                        <span key={t.id} className="px-2 py-1 text-[9px] font-bold rounded-full uppercase tracking-widest bg-green-100 text-green-700 w-fit">
                                          {t.ticketType} - PAID
                                        </span>
                                      ))}
                                    </div>
                                  ) : (
                                    <span className="px-2 py-1 text-[9px] font-bold rounded-full uppercase tracking-widest bg-yellow-100 text-yellow-700">
                                      PENDING PAYMENT
                                    </span>
                                  )}
                                </td>
                                <td className="py-4 text-sm text-gray-600">
                                  {u.email}
                                </td>
                                <td className="py-4 text-sm text-gray-600">
                                  {u.mobileNumber || u.mobile || 'N/A'}
                                </td>
                                <td className="py-4 text-sm">
                                  <p className="font-bold text-brand-accent uppercase tracking-wider text-[11px]">{u.company || 'N/A'}</p>
                                  <p className="text-xs text-gray-500 italic">{u.designation || 'N/A'}</p>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'exhibitors_users' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-serif text-brand-dark">Registered Exhibitors</h3>
                      <div className="relative">
                        <MagnifyingGlass size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search exhibitors..."
                          value={exhibitorSearch}
                          onChange={(e) => setExhibitorSearch(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
                        />
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-gray-100">
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark">Exhibitor Details</th>
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark">Professional & Contact</th>
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark">Booth & Tickets</th>
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark">Status & Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {filteredExhibitors.map((ex) => {
                            const u = getUserById(ex.userId);
                            const userTickets = u ? getUserTickets(u.id) : [];
                            return (
                              <tr key={ex.id} className="hover:bg-brand-light/50 transition-colors">
                                <td className="py-4 text-sm">
                                  <p className="font-medium text-brand-dark">{u ? `${u.firstName} ${u.lastName}` : 'Unknown'}</p>
                                  <p className="text-xs text-gray-400">{u?.email}</p>
                                  <p className="text-xs font-bold text-brand-accent mt-1">{ex.companyName}</p>
                                </td>
                                <td className="py-4 text-sm">
                                  <p className="text-brand-dark">{u?.mobileNumber || 'N/A'}</p>
                                  <p className="text-xs text-gray-400">{u?.designation || 'N/A'} @ {u?.company || 'N/A'}</p>
                                  <p className="text-xs text-gray-500">{u?.country || 'N/A'}</p>
                                </td>
                                <td className="py-4 text-sm">
                                  <p className="font-bold text-brand-accent">{ex.sector}</p>
                                  {userTickets.length > 0 ? (
                                    <div className="flex flex-col gap-1 mt-1">
                                      {userTickets.map(t => (
                                        <span key={t.id} className={`px-2 py-1 text-[9px] font-bold rounded-full uppercase tracking-widest bg-blue-100 text-blue-700 w-fit`}>
                                          {t.ticketType}
                                        </span>
                                      ))}
                                    </div>
                                  ) : (
                                    <span className="text-[10px] text-yellow-600 font-bold uppercase">No Booth Selected</span>
                                  )}
                                </td>
                                <td className="py-4">
                                  <div className="mb-2">
                                    <span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest ${
                                      ex.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 
                                      ex.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                      {ex.status}
                                    </span>
                                  </div>
                                  <div className="flex gap-2">
                                    {ex.status !== 'APPROVED' && (
                                      <button 
                                        onClick={() => handleUpdateStatus(ex.id, 'APPROVED')}
                                        className="px-3 py-1 bg-green-500 text-white text-[10px] font-bold rounded uppercase tracking-widest hover:bg-green-600 transition-colors"
                                      >
                                        Approve
                                      </button>
                                    )}
                                    {ex.status !== 'REJECTED' && (
                                      <button 
                                        onClick={() => handleUpdateStatus(ex.id, 'REJECTED')}
                                        className="px-3 py-1 bg-red-500 text-white text-[10px] font-bold rounded uppercase tracking-widest hover:bg-red-600 transition-colors"
                                      >
                                        Reject
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AdminDashboard;
