import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  ShieldCheck, 
  SignOut, 
  MagnifyingGlass, 
  ChatCircleText, 
  Check, 
  Trash,
  Article,
  Plus,
  PencilSimple,
  ArrowSquareOut,
  X,
  Sparkle,
  BookmarkSimple
} from '@phosphor-icons/react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import PageLoader from '../../components/layout/PageLoader';
import CustomCursor from '../../components/ui/CustomCursor';
import { useGlobal } from '../../context/GlobalContext';
import { adminService } from '../../services/adminService';
import { contactService } from '../../services/contactService';
import blogService from '../../services/blogService';
import apiClient from '../../api/client';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useGlobal();
  const [activeTab, setActiveTab] = useState('visitors');
  const [users, setUsers] = useState([]);
  const [exhibitors, setExhibitors] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [queries, setQueries] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visitorSearch, setVisitorSearch] = useState('');
  const [exhibitorSearch, setExhibitorSearch] = useState('');
  const [blogSearch, setBlogSearch] = useState('');
  const [selectedBlogCategory, setSelectedBlogCategory] = useState('All');
  const [fetchError, setFetchError] = useState(null);

  // Blog Management State
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogFormData, setBlogFormData] = useState({
    title: '',
    category: 'Global Trade',
    excerpt: '',
    content: '',
    author: 'IndiGlobal Editorial Team',
    authorRole: 'Global Trade Analyst',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    tags: 'Exports, B2B, Logistics',
    featured: false
  });
  const [isSavingBlog, setIsSavingBlog] = useState(false);

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
      console.log("AdminDashboard: Syncing data components...");
      
      // Fetch each component individually to prevent one failure from breaking the whole dashboard
      const fetchUsers = adminService.getAllUsers().catch(err => {
        console.error("Dashboard: User fetch failed", err);
        return [];
      });
      
      const fetchExhibitors = adminService.getAllExhibitors().catch(err => {
        console.error("Dashboard: Exhibitor fetch failed", err);
        return [];
      });
      
      const fetchTickets = adminService.getAllTickets().catch(err => {
        console.error("Dashboard: Ticket fetch failed", err);
        return [];
      });
      
      const fetchQueries = contactService.getAllInquiries().catch(err => {
        console.error("Dashboard: Queries fetch failed (500 Error)", err);
        return []; // Return empty array so the UI doesn't crash
      });

      const fetchBlogs = blogService.getAllBlogs().catch(err => {
        console.error("Dashboard: Blogs fetch failed", err);
        return [];
      });

      const [usersData, exhibitorsData, ticketsData, queriesData, blogsData] = await Promise.all([
        fetchUsers, fetchExhibitors, fetchTickets, fetchQueries, fetchBlogs
      ]);
      
      setUsers(usersData || []);
      setExhibitors(exhibitorsData || []);
      setTickets(ticketsData || []);
      setQueries(queriesData || []);
      setBlogs(blogsData || []);
      
      console.log("AdminDashboard: Sync complete.");
    } catch (error) {
      console.error('AdminDashboard: Global Fetch failed', error);
      setFetchError(error.message || 'Network Error - Backend unreachable');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenCreateBlog = () => {
    setEditingBlog(null);
    setBlogFormData({
      title: '',
      category: 'Global Trade',
      excerpt: '',
      content: '',
      author: user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'IndiGlobal Editorial Team',
      authorRole: 'Editorial Team',
      readTime: '5 min read',
      coverImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
      tags: 'Exports, B2B, Trade',
      featured: false
    });
    setIsBlogModalOpen(true);
  };

  const handleOpenEditBlog = (b) => {
    setEditingBlog(b);
    setBlogFormData({
      title: b.title || '',
      category: b.category || 'Global Trade',
      excerpt: b.excerpt || '',
      content: b.content || '',
      author: b.author || 'IndiGlobal Editorial Team',
      authorRole: b.authorRole || 'Editorial Team',
      readTime: b.readTime || '5 min read',
      coverImage: b.coverImage || '',
      tags: Array.isArray(b.tags) ? b.tags.join(', ') : (b.tags || ''),
      featured: Boolean(b.featured)
    });
    setIsBlogModalOpen(true);
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    if (!blogFormData.title.trim()) {
      alert('Please enter a title for the blog post.');
      return;
    }
    if (!blogFormData.content.trim()) {
      alert('Please enter article content.');
      return;
    }
    setIsSavingBlog(true);
    try {
      const tagsArray = typeof blogFormData.tags === 'string'
        ? blogFormData.tags.split(',').map(t => t.trim()).filter(Boolean)
        : blogFormData.tags;

      const payload = {
        ...blogFormData,
        tags: tagsArray
      };

      if (editingBlog && (editingBlog.id || editingBlog.slug)) {
        await blogService.updateBlog(editingBlog.id || editingBlog.slug, payload);
      } else {
        await blogService.createBlog(payload);
      }

      setIsBlogModalOpen(false);
      const refreshed = await blogService.getAllBlogs();
      setBlogs(refreshed);
    } catch (err) {
      console.error('Failed to save blog post:', err);
      alert('Failed to save blog post: ' + err.message);
    } finally {
      setIsSavingBlog(false);
    }
  };

  const handleDeleteBlog = async (blogId, blogTitle) => {
    if (window.confirm(`Are you sure you want to delete the blog post: "${blogTitle}"? This action CANNOT be undone.`)) {
      try {
        await blogService.deleteBlog(blogId);
        const refreshed = await blogService.getAllBlogs();
        setBlogs(refreshed);
      } catch (err) {
        console.error('Failed to delete blog:', err);
        alert('Failed to delete blog: ' + err.message);
      }
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

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete user "${userName}"? This will also remove all their tickets and exhibitor data. This action CANNOT be undone.`)) {
      try {
        await adminService.deleteUser(userId);
        fetchData(); // Refresh data
      } catch (error) {
        console.error('Failed to delete user', error);
        alert('Error deleting user. Please try again.');
      }
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await contactService.markAsRead(id);
      fetchData();
    } catch (error) {
      console.error('Failed to mark as read', error);
    }
  };

  const handleDeleteQuery = async (id) => {
    if (window.confirm('Delete this inquiry?')) {
      try {
        await contactService.deleteInquiry(id);
        fetchData();
      } catch (error) {
        console.error('Failed to delete query', error);
      }
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

  const filteredBlogs = (blogs || []).filter(b => {
    const s = (blogSearch || '').toLowerCase();
    const matchesSearch = !s || 
      (b.title || '').toLowerCase().includes(s) || 
      (b.author || '').toLowerCase().includes(s) ||
      (b.category || '').toLowerCase().includes(s);
    const matchesCat = selectedBlogCategory === 'All' || 
      (b.category && b.category.toLowerCase() === selectedBlogCategory.toLowerCase());
    return matchesSearch && matchesCat;
  });

  return (
    <>
      <PageLoader title="Admin<span class='font-sans font-light text-brand-accent text-3xl ml-1'>Dashboard</span>" />
      <CustomCursor />
      <Header logoColor="text-white" />

      <section className="min-h-screen bg-brand-light pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Debug Info */}
          <div className="mb-4 p-2 bg-black text-green-400 text-[10px] font-mono rounded overflow-x-auto">
            DEBUG: User Email: {user?.email} | Roles: {JSON.stringify(user?.roles)} | User Count: {users.length} | Queries: {queries.length} | Blogs: {blogs.length} | Loading: {isLoading ? 'YES' : 'NO'}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 sm:mb-12">
            <div>
              <h2 className="text-2xl sm:text-4xl font-serif text-brand-dark mb-1 sm:mb-2">Management Console</h2>
              <p className="text-gray-500 font-light text-xs sm:text-sm">Welcome back, Admin. System is running smoothly.</p>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors w-fit"
            >
              <SignOut size={20} /> Logout
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 sm:gap-4 mb-6 sm:mb-8 border-b border-gray-200 pb-px overflow-x-auto">
            {[
              { id: 'visitors', label: 'All Registered Users', icon: <User size={20} /> },
              { id: 'exhibitors_users', label: 'Exhibitors Status', icon: <ShieldCheck size={20} /> },
              { id: 'queries', label: 'User Queries', icon: <ChatCircleText size={20} /> },
              { id: 'blogs', label: 'Blog Posts', icon: <Article size={20} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${
                  activeTab === tab.id ? 'text-brand-accent' : 'text-gray-400 hover:text-brand-dark'
                }`}
              >
                {tab.icon} {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-accent" />
                )}
                {tab.id === 'queries' && queries.filter(q => !q.read).length > 0 && (
                  <span className="ml-1 bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded-full">
                    {queries.filter(q => !q.read).length}
                  </span>
                )}
                {tab.id === 'blogs' && blogs.length > 0 && (
                  <span className="ml-1 bg-brand-accent text-white text-[8px] px-1.5 py-0.5 rounded-full">
                    {blogs.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="bg-white border border-gray-100 shadow-xl p-4 sm:p-8 rounded-sm">
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
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-serif text-brand-dark">User Directory</h3>
                        <p className="text-xs text-gray-400 mt-1">Total Registered: {users.length}</p>
                      </div>
                      <div className="relative w-full sm:w-auto">
                        <MagnifyingGlass size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search email or name..."
                          value={visitorSearch}
                          onChange={(e) => setVisitorSearch(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent w-full sm:w-64"
                        />
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-gray-100">
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark">User Name (Role)</th>
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark">Payment Status</th>
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark">Mail</th>
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark">Phone Number</th>
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark">Company & Designation</th>
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark text-right">Actions</th>
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
                                        <div key={t.id} className="group relative">
                                          <span className="px-2 py-1 text-[9px] font-bold rounded-full uppercase tracking-widest bg-green-600 text-white w-fit flex items-center gap-1">
                                            <ShieldCheck size={10} weight="fill" /> PAID: {t.ticketType}
                                          </span>
                                          <p className="text-[8px] text-gray-400 mt-0.5 font-mono">{t.bookingId}</p>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <span className="px-2 py-1 text-[9px] font-bold rounded-full uppercase tracking-widest bg-gray-100 text-gray-400 border border-gray-200">
                                      NOT PURCHASED
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
                                <td className="py-4 text-right">
                                  {u.id !== user.id && (
                                    <button 
                                      onClick={() => handleDeleteUser(u.id, `${u.firstName} ${u.lastName}`)}
                                      className="text-red-500 hover:text-red-700 text-[10px] font-bold uppercase tracking-widest transition-colors"
                                    >
                                      Delete User
                                    </button>
                                  )}
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
                                <td className="py-4 text-sm font-medium text-gray-700">
                                  {u?.mobileNumber || u?.mobile || 'N/A'}
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

                {activeTab === 'payments' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-serif text-brand-dark">Transaction Ledger</h3>
                      <p className="text-xs text-gray-400">Total Sales: {tickets.length}</p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-gray-100">
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark">Booking ID</th>
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark">User Details</th>
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark">Ticket Type</th>
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark">Amount</th>
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {tickets.map((t) => {
                            const u = getUserById(t.userId);
                            return (
                              <tr key={t.id} className="hover:bg-brand-light/50 transition-colors">
                                <td className="py-4 text-sm font-bold text-brand-accent">
                                  {t.bookingId}
                                </td>
                                <td className="py-4 text-sm">
                                  <p className="font-medium text-brand-dark">{u ? `${u.firstName} ${u.lastName}` : 'Unknown'}</p>
                                  <p className="text-xs text-gray-400">{u?.email || 'N/A'}</p>
                                </td>
                                <td className="py-4 text-sm">
                                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] font-bold uppercase">
                                    {t.ticketType}
                                  </span>
                                </td>
                                <td className="py-4 text-sm font-bold">
                                  ${t.price.toLocaleString()}
                                </td>
                                <td className="py-4 text-xs text-gray-500">
                                  {new Date(t.purchaseDate).toLocaleDateString()}
                                </td>
                              </tr>
                            );
                          })}
                          {tickets.length === 0 && (
                            <tr><td colSpan="5" className="py-12 text-center text-gray-400 italic">No transactions found.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'queries' && (
                  <div>
                    <h3 className="text-2xl font-serif text-brand-dark mb-6">User Inquiries</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-gray-100">
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark">From</th>
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark">Subject & Message</th>
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark">Date</th>
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {queries.map((q) => (
                            <tr key={q.id} className={`hover:bg-brand-light/50 transition-colors ${!q.read ? 'bg-blue-50/30' : ''}`}>
                              <td className="py-4 text-sm">
                                <p className="font-medium text-brand-dark">{q.firstName} {q.lastName}</p>
                                <p className="text-xs text-gray-400">{q.email}</p>
                                <p className="text-xs text-gray-400">{q.mobile}</p>
                              </td>
                              <td className="py-4 text-sm max-w-md">
                                <p className="font-bold text-brand-accent uppercase tracking-wider text-[11px] mb-1">{q.subject}</p>
                                <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">{q.message}</p>
                              </td>
                              <td className="py-4 text-xs text-gray-500">
                                {new Date(q.createdAt).toLocaleDateString()}
                                <br />
                                {new Date(q.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </td>
                              <td className="py-4 text-right">
                                <div className="flex justify-end gap-3">
                                  {!q.read && (
                                    <button 
                                      onClick={() => handleMarkAsRead(q.id)}
                                      className="text-green-600 hover:text-green-800 transition-colors"
                                      title="Mark as Read"
                                    >
                                      <Check size={18} />
                                    </button>
                                  )}
                                  <button 
                                    onClick={() => handleDeleteQuery(q.id)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                    title="Delete"
                                  >
                                    <Trash size={18} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {queries.length === 0 && (
                            <tr>
                              <td colSpan="4" className="py-12 text-center text-gray-400 italic text-sm">
                                No inquiries found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'blogs' && (
                  <div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-serif text-brand-dark">Blog & Article Management</h3>
                        <p className="text-xs text-gray-400 mt-1">Manage editorial pieces, expo news, and industry analyses ({blogs.length} articles)</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-60">
                          <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search articles..."
                            value={blogSearch}
                            onChange={(e) => setBlogSearch(e.target.value)}
                            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent w-full"
                          />
                        </div>
                        <button
                          onClick={handleOpenCreateBlog}
                          className="bg-brand-accent hover:bg-brand-dark text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm whitespace-nowrap"
                        >
                          <Plus size={16} weight="bold" />
                          <span>Create New Blog</span>
                        </button>
                      </div>
                    </div>

                    {/* Quick Category Filter Pills */}
                    <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
                      {['All', 'Global Trade', 'Exhibition Insights', 'Industry Trends', 'Market Insights', 'Logistics'].map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSelectedBlogCategory(cat)}
                          className={`text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider font-semibold transition-all whitespace-nowrap ${
                            selectedBlogCategory === cat
                              ? 'bg-brand-dark text-brand-accent shadow-xs'
                              : 'bg-gray-100 text-gray-500 hover:text-brand-dark'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* Blog Posts Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-gray-100">
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark">Article</th>
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark">Category</th>
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark">Author & Date</th>
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark">Status</th>
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-sm">
                          {filteredBlogs.map((b) => (
                            <tr key={b.id} className="hover:bg-gray-50/80 transition-colors">
                              <td className="py-4 pr-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-14 h-14 rounded-xs overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                                    <img 
                                      src={b.coverImage || 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=200&q=80'} 
                                      alt={b.title}
                                      className="w-full h-full object-cover" 
                                    />
                                  </div>
                                  <div className="max-w-md">
                                    <p className="font-serif font-bold text-brand-dark text-sm sm:text-base line-clamp-1">{b.title}</p>
                                    <p className="text-gray-400 text-xs line-clamp-1 mt-0.5">{b.excerpt || 'No summary available'}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 pr-4">
                                <span className="bg-brand-accent/15 text-brand-dark text-xs px-2.5 py-1 rounded-full font-semibold whitespace-nowrap">
                                  {b.category}
                                </span>
                              </td>
                              <td className="py-4 pr-4 text-xs text-gray-500 whitespace-nowrap">
                                <p className="font-semibold text-brand-dark">{b.author}</p>
                                <p className="text-gray-400">{b.publishedDate} • {b.readTime || '5 min'}</p>
                              </td>
                              <td className="py-4 pr-4 whitespace-nowrap">
                                {b.featured ? (
                                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                                    <Sparkle size={10} weight="fill" /> Featured
                                  </span>
                                ) : (
                                  <span className="bg-gray-100 text-gray-600 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                                    Published
                                  </span>
                                )}
                              </td>
                              <td className="py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => window.open(`/blogs/${b.id || b.slug}`, '_blank')}
                                    className="p-2 text-gray-400 hover:text-brand-accent hover:bg-gray-100 rounded transition-colors"
                                    title="View Live Article in New Tab"
                                  >
                                    <ArrowSquareOut size={18} />
                                  </button>
                                  <button
                                    onClick={() => handleOpenEditBlog(b)}
                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                    title="Edit Article"
                                  >
                                    <PencilSimple size={18} />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteBlog(b.id, b.title)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                    title="Delete Article"
                                  >
                                    <Trash size={18} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {filteredBlogs.length === 0 && (
                            <tr>
                              <td colSpan="5" className="py-12 text-center text-gray-400 italic text-sm">
                                No blog posts found. Click "Create New Blog" to post one.
                              </td>
                            </tr>
                          )}
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

      {/* Create / Edit Blog Modal */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-sm shadow-2xl border border-gray-200 overflow-hidden my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-brand-light">
              <h3 className="font-serif text-xl text-brand-dark font-bold">
                {editingBlog ? 'Edit Blog Article' : 'Create New Blog Article'}
              </h3>
              <button 
                onClick={() => setIsBlogModalOpen(false)}
                className="text-gray-400 hover:text-brand-dark p-1 rounded transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Article Title *
                </label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Navigating Global Trade Corridors in 2027"
                  value={blogFormData.title}
                  onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent font-serif font-bold text-brand-dark"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Category *
                  </label>
                  <select 
                    value={blogFormData.category}
                    onChange={(e) => setBlogFormData({ ...blogFormData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent bg-white"
                  >
                    <option value="Global Trade">Global Trade</option>
                    <option value="Exhibition Insights">Exhibition Insights</option>
                    <option value="Industry Trends">Industry Trends</option>
                    <option value="Market Insights">Market Insights</option>
                    <option value="Logistics">Logistics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Reading Time
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. 5 min read"
                    value={blogFormData.readTime}
                    onChange={(e) => setBlogFormData({ ...blogFormData, readTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Author Name
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. IndiGlobal Editorial Team"
                    value={blogFormData.author}
                    onChange={(e) => setBlogFormData({ ...blogFormData, author: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Author Role / Title
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. Senior Trade Analyst"
                    value={blogFormData.authorRole}
                    onChange={(e) => setBlogFormData({ ...blogFormData, authorRole: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Cover Image URL
                </label>
                <input 
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={blogFormData.coverImage}
                  onChange={(e) => setBlogFormData({ ...blogFormData, coverImage: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent text-xs"
                />
                {blogFormData.coverImage && (
                  <div className="mt-2 w-full h-32 rounded-sm overflow-hidden bg-gray-100 border border-gray-200">
                    <img 
                      src={blogFormData.coverImage} 
                      alt="Cover Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Tags (comma separated)
                </label>
                <input 
                  type="text"
                  placeholder="Exports, B2B, Supply Chain, Logistics"
                  value={blogFormData.tags}
                  onChange={(e) => setBlogFormData({ ...blogFormData, tags: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Executive Excerpt / Short Summary *
                </label>
                <textarea 
                  rows={2}
                  required
                  placeholder="Brief 2-3 line summary displayed in cards and previews..."
                  value={blogFormData.excerpt}
                  onChange={(e) => setBlogFormData({ ...blogFormData, excerpt: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600">
                    Full Article Content *
                  </label>
                  <span className="text-[11px] text-gray-400">Supports paragraphs, ### Headings, and * bullets</span>
                </div>
                <textarea 
                  rows={8}
                  required
                  placeholder="Write or paste the complete article content here..."
                  value={blogFormData.content}
                  onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent font-sans leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox"
                  id="featuredCheckbox"
                  checked={blogFormData.featured}
                  onChange={(e) => setBlogFormData({ ...blogFormData, featured: e.target.checked })}
                  className="w-4 h-4 text-brand-accent border-gray-300 rounded focus:ring-brand-accent"
                />
                <label htmlFor="featuredCheckbox" className="text-xs font-bold text-brand-dark cursor-pointer flex items-center gap-1">
                  <Sparkle size={14} className="text-brand-accent" /> Mark as Featured Story (Highlights on Blog page)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button 
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-5 py-2.5 rounded-sm border border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-brand-dark hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSavingBlog}
                  className="bg-brand-accent hover:bg-brand-dark text-white px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isSavingBlog ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{editingBlog ? 'Update Article' : 'Publish Article'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default AdminDashboard;
