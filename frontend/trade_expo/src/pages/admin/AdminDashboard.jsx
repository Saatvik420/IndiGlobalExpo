import { useEffect, useState, useRef } from 'react';
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
  BookmarkSimple,
  TextB,
  TextItalic,
  TextUnderline,
  TextAlignLeft,
  TextAlignCenter,
  TextAlignRight,
  TextAlignJustify,
  TextHTwo,
  TextHThree,
  ListBullets,
  ListNumbers,
  Quotes,
  LinkSimple,
  Eye,
  Key,
  ArrowsClockwise,
  CircleNotch
} from '@phosphor-icons/react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import PageLoader from '../../components/layout/PageLoader';
import CustomCursor from '../../components/ui/CustomCursor';
import { useGlobal } from '../../context/GlobalContext';
import { adminService } from '../../services/adminService';
import { contactService } from '../../services/contactService';
import blogService, { getBlogSlug } from '../../services/blogService';
import FormattedArticleContent from '../../components/blog/FormattedArticleContent';
import { authService } from '../../services/authService';
import apiClient from '../../api/client';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, login, logout } = useGlobal();

  useEffect(() => {
    document.title = 'Admin Management Console | IndiGlobal Expo';
  }, []);
  const [activeTab, setActiveTab] = useState('visitors');
  const [users, setUsers] = useState(() => adminService.getCachedUsers());
  const [exhibitors, setExhibitors] = useState(() => adminService.getCachedExhibitors());
  const [tickets, setTickets] = useState(() => adminService.getCachedTickets());
  const [queries, setQueries] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visitorSearch, setVisitorSearch] = useState('');
  const [exhibitorSearch, setExhibitorSearch] = useState('');
  const [blogSearch, setBlogSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [isReauthenticating, setIsReauthenticating] = useState(false);
  const [reauthPassword, setReauthPassword] = useState('');
  const [reauthError, setReauthError] = useState(null);
  const [showReauthModal, setShowReauthModal] = useState(false);

  // Blog Management State
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogFormData, setBlogFormData] = useState({
    title: '',
    titleDescription: '',
    tabTitle: '',
    tabDescription: '',
    excerpt: '',
    content: '',
    author: 'IndiGlobal Editorial Team',
    authorRole: 'Global Trade Analyst',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    tags: 'Exports, B2B, Logistics',
    featured: false,
    textAlign: 'left'
  });
  const [isSavingBlog, setIsSavingBlog] = useState(false);
  const [editorTab, setEditorTab] = useState('write'); // 'write' or 'preview'
  const contentTextareaRef = useRef(null);

  // Hyperlink Modal state
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkModalData, setLinkModalData] = useState({ text: '', url: '' });
  const linkUrlInputRef = useRef(null);

  const handleOpenLinkModal = () => {
    const textarea = contentTextareaRef.current;
    let selected = '';
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      if (start !== end) {
        selected = (blogFormData.content || '').substring(start, end);
      }
    }
    setLinkModalData({
      text: selected,
      url: ''
    });
    setIsLinkModalOpen(true);
    setTimeout(() => {
      if (linkUrlInputRef.current) {
        linkUrlInputRef.current.focus();
      }
    }, 100);
  };

  const handleInsertLink = (e) => {
    if (e) e.preventDefault();
    const text = (linkModalData.text || '').trim() || 'Link Text';
    let url = (linkModalData.url || '').trim();
    if (!url) {
      alert('Please enter a destination URL.');
      return;
    }

    if (!/^(https?:\/\/|mailto:|tel:|\/|#)/i.test(url)) {
      url = `https://${url}`;
    }

    const linkMarkdown = `[${text}](${url})`;

    const textarea = contentTextareaRef.current;
    if (!textarea) {
      setBlogFormData(prev => ({
        ...prev,
        content: (prev.content || '') + linkMarkdown
      }));
      setIsLinkModalOpen(false);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const oldText = blogFormData.content || '';
    const newText = oldText.substring(0, start) + linkMarkdown + oldText.substring(end);
    const newCursor = start + linkMarkdown.length;

    setBlogFormData(prev => ({ ...prev, content: newText }));
    setIsLinkModalOpen(false);

    requestAnimationFrame(() => {
      if (contentTextareaRef.current) {
        contentTextareaRef.current.focus();
        contentTextareaRef.current.setSelectionRange(newCursor, newCursor);
      }
    });
  };

  const handleSetAlignment = (alignment) => {
    const textarea = contentTextareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      if (start !== end) {
        applyFormat(`[align=${alignment}]\n`, `\n[/align]`, `${alignment} aligned block`);
        return;
      }
    }
    setBlogFormData(prev => ({ ...prev, textAlign: alignment }));
  };

  const applyFormat = (prefix, suffix = prefix, placeholder = 'text') => {
    const textarea = contentTextareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const oldText = blogFormData.content || '';
    const selectedText = oldText.substring(start, end);

    let newText;
    let newCursorStart;
    let newCursorEnd;

    if (selectedText.length > 0) {
      if (selectedText.startsWith(prefix) && selectedText.endsWith(suffix) && selectedText.length >= prefix.length + suffix.length) {
        // Toggle off if already wrapped
        const unwrapped = selectedText.slice(prefix.length, -suffix.length);
        newText = oldText.substring(0, start) + unwrapped + oldText.substring(end);
        newCursorStart = start;
        newCursorEnd = start + unwrapped.length;
      } else {
        newText = oldText.substring(0, start) + prefix + selectedText + suffix + oldText.substring(end);
        newCursorStart = start + prefix.length;
        newCursorEnd = end + prefix.length;
      }
    } else {
      newText = oldText.substring(0, start) + prefix + placeholder + suffix + oldText.substring(end);
      newCursorStart = start + prefix.length;
      newCursorEnd = newCursorStart + placeholder.length;
    }

    setBlogFormData(prev => ({ ...prev, content: newText }));

    requestAnimationFrame(() => {
      if (contentTextareaRef.current) {
        contentTextareaRef.current.focus();
        contentTextareaRef.current.setSelectionRange(newCursorStart, newCursorEnd);
      }
    });
  };

  const applyLinePrefix = (prefix) => {
    const textarea = contentTextareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const oldText = blogFormData.content || '';

    const lineStart = oldText.lastIndexOf('\n', start - 1) + 1;
    let lineEnd = oldText.indexOf('\n', end);
    if (lineEnd === -1) lineEnd = oldText.length;

    const affectedText = oldText.substring(lineStart, lineEnd);
    const lines = affectedText.split('\n');

    const allHavePrefix = lines.every(l => l.startsWith(prefix));
    const newLines = lines.map(line => allHavePrefix ? line.slice(prefix.length) : prefix + line);
    const replacement = newLines.join('\n');
    const newText = oldText.substring(0, lineStart) + replacement + oldText.substring(lineEnd);

    setBlogFormData(prev => ({ ...prev, content: newText }));

    requestAnimationFrame(() => {
      if (contentTextareaRef.current) {
        contentTextareaRef.current.focus();
        contentTextareaRef.current.setSelectionRange(lineStart, lineStart + replacement.length);
      }
    });
  };

  const handleEditorKeyDown = (e) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'b' || e.key === 'B') {
        e.preventDefault();
        applyFormat('**', '**', 'bold text');
      } else if (e.key === 'i' || e.key === 'I') {
        e.preventDefault();
        applyFormat('*', '*', 'italic text');
      } else if (e.key === 'u' || e.key === 'U') {
        e.preventDefault();
        applyFormat('<u>', '</u>', 'underlined text');
      } else if (e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        handleOpenLinkModal();
      }
    }
  };

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
    let hadAuthError = false;

    try {
      console.log("AdminDashboard: Syncing data components...");
      
      // Fetch each component individually to prevent one failure from breaking the whole dashboard
      const fetchUsers = adminService.getAllUsers().catch(err => {
        console.error("Dashboard: User fetch failed", err);
        if (err.response?.status === 401 || err.response?.status === 403) hadAuthError = true;
        return adminService.getCachedUsers();
      });
      
      const fetchExhibitors = adminService.getAllExhibitors().catch(err => {
        console.error("Dashboard: Exhibitor fetch failed", err);
        if (err.response?.status === 401 || err.response?.status === 403) hadAuthError = true;
        return adminService.getCachedExhibitors();
      });
      
      const fetchTickets = adminService.getAllTickets().catch(err => {
        console.error("Dashboard: Ticket fetch failed", err);
        if (err.response?.status === 401 || err.response?.status === 403) hadAuthError = true;
        return adminService.getCachedTickets();
      });
      
      const fetchQueries = contactService.getAllInquiries().catch(err => {
        console.error("Dashboard: Queries fetch failed", err);
        if (err.response?.status === 401 || err.response?.status === 403) hadAuthError = true;
        return [];
      });

      const fetchBlogs = blogService.getAllBlogs().catch(err => {
        console.error("Dashboard: Blogs fetch failed", err);
        return [];
      });

      const [usersData, exhibitorsData, ticketsData, queriesData, blogsData] = await Promise.all([
        fetchUsers, fetchExhibitors, fetchTickets, fetchQueries, fetchBlogs
      ]);
      
      if (usersData?._error?.response?.status === 401 || 
          exhibitorsData?._error?.response?.status === 401 || 
          ticketsData?._error?.response?.status === 401 || 
          hadAuthError) {
        setSessionExpired(true);
        setFetchError('Your admin security session has expired. Displaying cached records. Please re-authenticate below to sync live updates.');
      } else {
        setSessionExpired(false);
      }

      setUsers(usersData && usersData.length > 0 ? usersData : adminService.getCachedUsers());
      setExhibitors(exhibitorsData && exhibitorsData.length > 0 ? exhibitorsData : adminService.getCachedExhibitors());
      setTickets(ticketsData && ticketsData.length > 0 ? ticketsData : adminService.getCachedTickets());
      setQueries(queriesData || []);
      setBlogs(blogsData || []);
      
      console.log("AdminDashboard: Sync complete. Users:", usersData?.length, "Exhibitors:", exhibitorsData?.length);
    } catch (error) {
      console.error('AdminDashboard: Global Fetch failed', error);
      setFetchError(error.message || 'Network Error - Backend unreachable');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReauth = async (e) => {
    e.preventDefault();
    setIsReauthenticating(true);
    setReauthError(null);
    try {
      const email = user?.email || 'admin@indiatradeexpo.com';
      const data = await authService.login(email, reauthPassword);
      if (data && data.token) {
        const updatedUser = {
          ...user,
          ...data
        };
        login(updatedUser);
        setSessionExpired(false);
        setReauthPassword('');
        setFetchError(null);
        await fetchData();
      } else {
        throw new Error('Authentication succeeded but no token received.');
      }
    } catch (err) {
      console.error('Re-authentication failed:', err);
      setReauthError(err.response?.data?.message || err.response?.data || err.message || 'Invalid password.');
    } finally {
      setIsReauthenticating(false);
    }
  };

  const getTargetBlogIdentifier = (b) => {
    if (!b) return '';
    if (b.id && /^[0-9a-fA-F]{24}$/.test(String(b.id))) {
      return String(b.id);
    }
    if (b.slug && typeof b.slug === 'string' && b.slug.trim()) {
      return b.slug.trim();
    }
    if (b.title && typeof b.title === 'string' && b.title.trim()) {
      return blogService.getBlogSlug(b);
    }
    return b.id || '';
  };

  const handleOpenCreateBlog = () => {
    setEditingBlog(null);
    setBlogFormData({
      title: '',
      titleDescription: '',
      tabTitle: '',
      tabDescription: '',
      excerpt: '',
      content: '',
      author: user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'IndiGlobal Editorial Team',
      authorRole: 'Editorial Team',
      readTime: '5 min read',
      coverImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
      tags: 'Exports, B2B, Trade',
      featured: false,
      textAlign: 'left'
    });
    setEditorTab('write');
    setIsBlogModalOpen(true);
  };

  const handleOpenEditBlog = (b) => {
    setEditingBlog(b);
    setBlogFormData({
      title: b.title || '',
      titleDescription: b.titleDescription || '',
      tabTitle: b.tabTitle || b.metaTitle || '',
      tabDescription: b.tabDescription || b.metaDescription || '',
      excerpt: b.excerpt || '',
      content: b.content || '',
      author: b.author || 'IndiGlobal Editorial Team',
      authorRole: b.authorRole || 'Editorial Team',
      readTime: b.readTime || '5 min read',
      coverImage: b.coverImage || '',
      tags: Array.isArray(b.tags) ? b.tags.join(', ') : (b.tags || ''),
      featured: Boolean(b.featured),
      textAlign: b.textAlign || 'left'
    });
    setEditorTab('write');
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

      const targetId = getTargetBlogIdentifier(editingBlog);
      if (editingBlog && targetId) {
        await blogService.updateBlog(targetId, payload);
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
    const isAdmin = user?.roles?.includes('ROLE_ADMIN') || 
                    user?.roles?.includes('ADMIN') || 
                    user?.email === 'admin@indiatradeexpo.com' ||
                    user?.email === 'admin@indiglobalexpo.com';

    if (user && isAdmin) {
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
    return !s || 
      (b.title || '').toLowerCase().includes(s) || 
      (b.titleDescription || '').toLowerCase().includes(s) || 
      (b.tabTitle || '').toLowerCase().includes(s) || 
      (b.author || '').toLowerCase().includes(s) ||
      (b.excerpt || '').toLowerCase().includes(s);
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
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowReauthModal(prev => !prev)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-200 hover:border-brand-accent text-brand-dark hover:text-brand-accent text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-xs cursor-pointer interactive"
                title="Re-enter Admin Password to refresh session or sync live data"
              >
                <Key size={16} /> Re-enter Password / Live Sync
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors w-fit"
              >
                <SignOut size={20} /> Logout
              </button>
            </div>
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
            {(sessionExpired || showReauthModal) ? (
              <div className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-900 rounded-sm shadow-xs animate-fade-in">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <p className="font-bold uppercase tracking-widest text-xs flex items-center gap-1.5 text-amber-900">
                      <ShieldCheck size={18} className="text-brand-accent" weight="bold" /> Admin Session Authentication / Live MongoDB Sync
                    </p>
                    <p className="text-xs text-amber-700 mt-1">
                      {sessionExpired 
                        ? 'Your session has expired. Displaying cached records. Re-enter password to sync live MongoDB data.' 
                        : 'Re-authenticate with admin password to refresh session token and sync live MongoDB records.'}
                    </p>
                    <p className="text-[11px] text-gray-500 font-mono mt-1">
                      Admin Email: <span className="font-bold text-brand-dark">{user?.email || 'admin@indiatradeexpo.com'}</span> | Default: <span className="font-bold text-brand-dark">Admin@123456</span>
                    </p>
                  </div>
                  <form onSubmit={handleQuickReauth} className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    <input
                      type="password"
                      placeholder="Admin Password (Admin@123456)"
                      value={reauthPassword}
                      onChange={(e) => setReauthPassword(e.target.value)}
                      required
                      autoFocus
                      className="px-3 py-2 bg-white border border-amber-300 rounded-sm text-xs focus:outline-none focus:ring-2 focus:ring-brand-accent text-brand-dark min-w-[220px]"
                    />
                    <button
                      type="submit"
                      disabled={isReauthenticating}
                      className="px-4 py-2 bg-brand-dark text-white hover:bg-brand-accent text-xs font-bold uppercase tracking-wider rounded-sm transition-colors whitespace-nowrap disabled:opacity-50 flex items-center gap-1.5 cursor-pointer interactive"
                    >
                      {isReauthenticating ? <CircleNotch size={14} className="animate-spin" /> : <ArrowsClockwise size={14} />}
                      {isReauthenticating ? 'Verifying...' : 'Re-Authenticate Live'}
                    </button>
                    {showReauthModal && !sessionExpired && (
                      <button
                        type="button"
                        onClick={() => setShowReauthModal(false)}
                        className="px-3 py-2 text-xs font-bold text-gray-400 hover:text-brand-dark transition-colors cursor-pointer"
                      >
                        Close
                      </button>
                    )}
                  </form>
                </div>
                {reauthError && (
                  <p className="text-xs text-red-600 font-semibold mt-2">{reauthError}</p>
                )}
              </div>
            ) : fetchError ? (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded">
                <p className="font-bold uppercase tracking-widest text-[10px] mb-1">System Error:</p>
                <p className="text-sm">{fetchError}</p>
                <button onClick={fetchData} className="mt-4 text-[10px] font-bold uppercase tracking-widest bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition-colors">Retry Sync</button>
              </div>
            ) : null}
            
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

                    {/* Blog Posts Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-gray-100">
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-brand-dark">Article</th>
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
                                    {b.titleDescription && (
                                      <p className="text-brand-accent text-xs line-clamp-1 mt-0.5 font-medium">{b.titleDescription}</p>
                                    )}
                                    <p className="text-gray-400 text-xs line-clamp-1 mt-0.5">{b.excerpt || 'No summary available'}</p>
                                    {b.tabTitle && (
                                      <p className="text-[10px] text-gray-500 line-clamp-1 mt-0.5">
                                        <span className="font-semibold text-brand-accent">Tab Title:</span> {b.tabTitle}
                                      </p>
                                    )}
                                  </div>
                                </div>
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
                                    onClick={() => window.open(`/blogs/${getBlogSlug(b)}`, '_blank')}
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
          <div className="bg-white w-full max-w-4xl rounded-sm shadow-2xl border border-gray-200 overflow-hidden my-8">
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

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Title Description / Subtitle
                </label>
                <input 
                  type="text"
                  placeholder="e.g. Unlocking high-growth bilateral trade corridors and tariff optimizations for Indian global exporters"
                  value={blogFormData.titleDescription}
                  onChange={(e) => setBlogFormData({ ...blogFormData, titleDescription: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent text-gray-800"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  Secondary title description or tagline displayed below the headline.
                </p>
              </div>

              {/* Browser Tab Authority Section */}
              <div className="bg-brand-light/70 p-4 rounded-sm border border-brand-accent/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
                    <label className="text-xs font-bold uppercase tracking-wider text-brand-dark">
                      Browser Tab Authority (Tab Title & Tab Description)
                    </label>
                  </div>
                  <span className="text-[10px] text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
                    Controls the browser tab name and Google preview
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                      Browser Tab Title
                    </label>
                    <span className="text-[10px] text-gray-400">
                      {(blogFormData.tabTitle || '').length}/70 chars
                    </span>
                  </div>
                  <input 
                    type="text"
                    placeholder={blogFormData.title ? `${blogFormData.title} | IndiGlobal Expo` : 'e.g. Global Trade Insights 2027 | IndiGlobal Expo'}
                    value={blogFormData.tabTitle}
                    onChange={(e) => setBlogFormData({ ...blogFormData, tabTitle: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent text-brand-dark font-medium"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">
                    When visitors open this blog, this exact title will appear on their browser window/tab. Defaults to "{blogFormData.title || 'Article Title'} | IndiGlobal Expo" if left empty.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                      Browser Tab Description (Meta Description)
                    </label>
                    <span className="text-[10px] text-gray-400">
                      {(blogFormData.tabDescription || '').length}/160 chars
                    </span>
                  </div>
                  <textarea 
                    rows={2}
                    placeholder={blogFormData.titleDescription || blogFormData.excerpt || 'Brief description shown in browser link previews and search engines...'}
                    value={blogFormData.tabDescription}
                    onChange={(e) => setBlogFormData({ ...blogFormData, tabDescription: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent text-gray-700"
                  />
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Meta description shown when sharing link or appearing in search results. Defaults to Title Description or Excerpt if left empty.
                  </p>
                </div>

                {/* Live Tab Preview Box */}
                <div className="pt-2 border-t border-brand-accent/15">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-1.5">Live Browser Tab Preview:</span>
                  <div className="inline-flex items-center gap-2 bg-white border border-gray-300 rounded-t-md px-3 py-1.5 shadow-2xs max-w-full">
                    <div className="w-3.5 h-3.5 rounded-full bg-brand-dark flex items-center justify-center text-[8px] text-white font-bold">i</div>
                    <span className="text-xs font-semibold text-gray-800 truncate max-w-[280px] sm:max-w-md">
                      {blogFormData.tabTitle || (blogFormData.title ? `${blogFormData.title} | IndiGlobal Expo` : 'IndiGlobal Expo | New Article')}
                    </span>
                    <span className="text-gray-400 text-xs ml-1 font-bold">×</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Estimated Reading Time
                </label>
                <input 
                  type="text"
                  placeholder="e.g. 5 min read"
                  value={blogFormData.readTime}
                  onChange={(e) => setBlogFormData({ ...blogFormData, readTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent"
                />
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

              {/* Content & Rich Formatting Section */}
              <div className="pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark">
                      Article Content & Formatting *
                    </label>
                    <span className="text-[11px] text-gray-400 font-normal hidden sm:inline">
                      (Bold, Italic, Underline & Alignment supported)
                    </span>
                  </div>

                  {/* Mode Tabs: Edit vs Live Preview */}
                  <div className="flex items-center bg-gray-100 p-0.5 rounded-sm self-start sm:self-auto border border-gray-200">
                    <button
                      type="button"
                      onClick={() => setEditorTab('write')}
                      className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors ${
                        editorTab === 'write'
                          ? 'bg-white text-brand-dark shadow-2xs'
                          : 'text-gray-500 hover:text-brand-dark'
                      }`}
                    >
                      <PencilSimple size={13} weight="bold" />
                      <span>Write / Format</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorTab('preview')}
                      className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors ${
                        editorTab === 'preview'
                          ? 'bg-white text-brand-accent shadow-2xs'
                          : 'text-gray-500 hover:text-brand-accent'
                      }`}
                    >
                      <Eye size={13} weight="bold" />
                      <span>Live Preview</span>
                    </button>
                  </div>
                </div>

                {editorTab === 'write' ? (
                  <div className="border border-gray-200 rounded-sm overflow-hidden focus-within:ring-1 focus-within:ring-brand-accent focus-within:border-brand-accent transition-all bg-white">
                    {/* Rich Formatting Toolbar */}
                    <div className="flex flex-wrap items-center gap-1.5 p-2 bg-gray-50 border-b border-gray-200 text-gray-700">
                      
                      {/* Font Styles: Bold, Italic, Underline */}
                      <div className="flex items-center gap-0.5 bg-white p-0.5 rounded-xs border border-gray-200 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => applyFormat('**', '**', 'bold text')}
                          title="Bold (Ctrl+B)"
                          className="p-1.5 rounded-xs hover:bg-gray-100 hover:text-brand-accent text-gray-700 transition-colors"
                        >
                          <TextB size={16} weight="bold" />
                        </button>
                        <button
                          type="button"
                          onClick={() => applyFormat('*', '*', 'italic text')}
                          title="Italic (Ctrl+I)"
                          className="p-1.5 rounded-xs hover:bg-gray-100 hover:text-brand-accent text-gray-700 transition-colors"
                        >
                          <TextItalic size={16} weight="bold" />
                        </button>
                        <button
                          type="button"
                          onClick={() => applyFormat('<u>', '</u>', 'underlined text')}
                          title="Underline (Ctrl+U)"
                          className="p-1.5 rounded-xs hover:bg-gray-100 hover:text-brand-accent text-gray-700 transition-colors"
                        >
                          <TextUnderline size={16} weight="bold" />
                        </button>
                      </div>

                      <div className="w-px h-5 bg-gray-300 mx-0.5 hidden sm:block" />

                      {/* Headings */}
                      <div className="flex items-center gap-0.5 bg-white p-0.5 rounded-xs border border-gray-200 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => applyLinePrefix('## ')}
                          title="Heading 2 (## Heading)"
                          className="px-2 py-1 text-xs font-serif font-bold hover:bg-gray-100 hover:text-brand-accent text-gray-700 rounded-xs transition-colors"
                        >
                          H2
                        </button>
                        <button
                          type="button"
                          onClick={() => applyLinePrefix('### ')}
                          title="Heading 3 (### Heading)"
                          className="px-2 py-1 text-xs font-serif font-bold hover:bg-gray-100 hover:text-brand-accent text-gray-700 rounded-xs transition-colors"
                        >
                          H3
                        </button>
                      </div>

                      <div className="w-px h-5 bg-gray-300 mx-0.5 hidden sm:block" />

                      {/* Lists and Quotes */}
                      <div className="flex items-center gap-0.5 bg-white p-0.5 rounded-xs border border-gray-200 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => applyLinePrefix('* ')}
                          title="Bullet List (* Item)"
                          className="p-1.5 rounded-xs hover:bg-gray-100 hover:text-brand-accent text-gray-700 transition-colors"
                        >
                          <ListBullets size={16} weight="bold" />
                        </button>
                        <button
                          type="button"
                          onClick={() => applyLinePrefix('1. ')}
                          title="Numbered List (1. Item)"
                          className="p-1.5 rounded-xs hover:bg-gray-100 hover:text-brand-accent text-gray-700 transition-colors"
                        >
                          <ListNumbers size={16} weight="bold" />
                        </button>
                        <button
                          type="button"
                          onClick={() => applyLinePrefix('> ')}
                          title="Quote Block (> Quote)"
                          className="p-1.5 rounded-xs hover:bg-gray-100 hover:text-brand-accent text-gray-700 transition-colors"
                        >
                          <Quotes size={16} weight="bold" />
                        </button>
                      </div>

                      <div className="w-px h-5 bg-gray-300 mx-0.5 hidden sm:block" />

                      {/* Hyperlink */}
                      <div className="flex items-center gap-0.5 bg-white p-0.5 rounded-xs border border-gray-200 shadow-2xs">
                        <button
                          type="button"
                          onClick={handleOpenLinkModal}
                          title="Insert Hyperlink (Ctrl+K)"
                          className="px-2 py-1.5 rounded-xs hover:bg-gray-100 hover:text-brand-accent text-gray-700 transition-colors flex items-center gap-1.5"
                        >
                          <LinkSimple size={16} weight="bold" />
                          <span className="text-xs font-semibold">Link</span>
                        </button>
                      </div>

                      <div className="w-px h-5 bg-gray-300 mx-0.5 hidden sm:block" />

                      {/* Text Alignment */}
                      <div className="flex items-center gap-0.5 bg-white p-0.5 rounded-xs border border-gray-200 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => handleSetAlignment('left')}
                          title="Align Left (Sets default or wraps selected text in [align=left])"
                          className={`p-1.5 rounded-xs transition-colors ${
                            (blogFormData.textAlign || 'left') === 'left'
                              ? 'bg-brand-accent text-white shadow-2xs'
                              : 'text-gray-600 hover:bg-gray-100 hover:text-brand-dark'
                          }`}
                        >
                          <TextAlignLeft size={16} weight="bold" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSetAlignment('center')}
                          title="Align Center (Sets default or wraps selected text in [align=center])"
                          className={`p-1.5 rounded-xs transition-colors ${
                            blogFormData.textAlign === 'center'
                              ? 'bg-brand-accent text-white shadow-2xs'
                              : 'text-gray-600 hover:bg-gray-100 hover:text-brand-dark'
                          }`}
                        >
                          <TextAlignCenter size={16} weight="bold" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSetAlignment('right')}
                          title="Align Right (Sets default or wraps selected text in [align=right])"
                          className={`p-1.5 rounded-xs transition-colors ${
                            blogFormData.textAlign === 'right'
                              ? 'bg-brand-accent text-white shadow-2xs'
                              : 'text-gray-600 hover:bg-gray-100 hover:text-brand-dark'
                          }`}
                        >
                          <TextAlignRight size={16} weight="bold" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSetAlignment('justify')}
                          title="Align Justify (Sets default or wraps selected text in [align=justify])"
                          className={`p-1.5 rounded-xs transition-colors ${
                            blogFormData.textAlign === 'justify'
                              ? 'bg-brand-accent text-white shadow-2xs'
                              : 'text-gray-600 hover:bg-gray-100 hover:text-brand-dark'
                          }`}
                        >
                          <TextAlignJustify size={16} weight="bold" />
                        </button>
                      </div>

                      {/* Keyboard shortcuts label */}
                      <span className="hidden lg:inline ml-auto text-[10px] text-gray-400 font-mono">
                        Shortcuts: Ctrl+B (Bold) • Ctrl+I (Italic) • Ctrl+U (Underline) • Ctrl+K (Link)
                      </span>
                    </div>

                    {/* Writing Textarea */}
                    <textarea 
                      ref={contentTextareaRef}
                      rows={10}
                      required
                      placeholder="Write your article here...&#10;&#10;Use the toolbar above or shortcuts:&#10;• Ctrl+K to add Hyperlinks [Link Text](https://url)&#10;• Ctrl+B for **bold**, Ctrl+I for *italic*, Ctrl+U for <u>underline</u>&#10;• Align Justify button or [align=justify]text[/align] for justified text&#10;• ## for Heading 2, ### for Heading 3&#10;• * or - for bullet lists, 1. for numbered lists"
                      value={blogFormData.content}
                      onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })}
                      onKeyDown={handleEditorKeyDown}
                      style={{ 
                        textAlign: blogFormData.textAlign || 'left',
                        textJustify: blogFormData.textAlign === 'justify' ? 'inter-word' : undefined 
                      }}
                      className="w-full px-4 py-3 border-none rounded-none text-sm focus:outline-none font-sans leading-relaxed text-gray-800 bg-white resize-y"
                    />

                    {/* Editor footer status bar */}
                    <div className="flex flex-wrap items-center justify-between px-3 py-1.5 bg-gray-50 border-t border-gray-100 text-[11px] text-gray-500">
                      <div className="flex items-center gap-3">
                        <span>
                          Alignment: <strong className="uppercase text-brand-dark font-semibold">{blogFormData.textAlign || 'left'}</strong>
                          {blogFormData.textAlign === 'justify' && (
                            <span className="ml-1.5 text-[10px] text-brand-accent font-medium">(View in 'Live Preview' tab for justified layout)</span>
                          )}
                        </span>
                        <span>•</span>
                        <span>Words: <strong>{blogFormData.content ? blogFormData.content.trim().split(/\s+/).filter(Boolean).length : 0}</strong></span>
                        <span>•</span>
                        <span>Characters: <strong>{blogFormData.content?.length || 0}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 sm:mt-0">
                        <span className="text-[10px] text-gray-400">Quick blocks:</span>
                        <button
                          type="button"
                          onClick={handleOpenLinkModal}
                          className="text-[10px] bg-white border border-gray-200 px-1.5 py-0.5 rounded-xs hover:border-brand-accent hover:text-brand-accent transition-colors flex items-center gap-1 font-medium"
                        >
                          <LinkSimple size={12} weight="bold" /> Add Link
                        </button>
                        <button
                          type="button"
                          onClick={() => applyFormat('[align=justify]\n', '\n[/align]', 'Justified paragraph block')}
                          className="text-[10px] bg-white border border-gray-200 px-1.5 py-0.5 rounded-xs hover:border-brand-accent hover:text-brand-accent transition-colors font-medium"
                        >
                          Justify Block
                        </button>
                        <button
                          type="button"
                          onClick={() => applyFormat('[align=center]\n', '\n[/align]', 'Centered paragraph block')}
                          className="text-[10px] bg-white border border-gray-200 px-1.5 py-0.5 rounded-xs hover:border-brand-accent hover:text-brand-accent transition-colors"
                        >
                          Center Block
                        </button>
                        <button
                          type="button"
                          onClick={() => applyFormat('[align=right]\n', '\n[/align]', 'Right-aligned paragraph block')}
                          className="text-[10px] bg-white border border-gray-200 px-1.5 py-0.5 rounded-xs hover:border-brand-accent hover:text-brand-accent transition-colors"
                        >
                          Right Block
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Live Preview Box */
                  <div className="border border-gray-200 rounded-sm bg-gray-50/50 p-4 sm:p-6 max-h-[420px] overflow-y-auto">
                    <div className="bg-white p-6 sm:p-8 rounded-sm border border-gray-200/80 shadow-2xs">
                      <div className="pb-4 mb-6 border-b border-gray-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                            Live Article Preview
                          </span>
                          <h4 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark mt-1">
                            {blogFormData.title || 'Untitled Article'}
                          </h4>
                          {blogFormData.titleDescription && (
                            <p className="text-sm text-brand-accent font-medium mt-1">
                              {blogFormData.titleDescription}
                            </p>
                          )}
                          <p className="text-xs text-gray-400 mt-1">
                            By {blogFormData.author || 'Author'} • {blogFormData.readTime || '5 min read'} • Text Align: {blogFormData.textAlign || 'left'}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditorTab('write')}
                          className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-brand-light text-brand-dark hover:bg-brand-accent hover:text-white rounded-xs transition-colors flex items-center gap-1"
                        >
                          <PencilSimple size={14} /> Back to Edit
                        </button>
                      </div>

                      {blogFormData.excerpt && (
                        <div className="mb-6 p-4 bg-brand-dark text-white rounded-xs border-l-4 border-brand-accent text-sm italic">
                          "{blogFormData.excerpt}"
                        </div>
                      )}

                      {blogFormData.content ? (
                        <FormattedArticleContent 
                          content={blogFormData.content} 
                          textAlign={blogFormData.textAlign || 'left'} 
                        />
                      ) : (
                        <p className="text-gray-400 italic text-sm text-center py-8">
                          No content written yet. Switch to "Write / Format" to compose your article.
                        </p>
                      )}
                    </div>
                  </div>
                )}
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

      {/* Insert Hyperlink Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs animate-fade-in">
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 max-w-md w-full p-6 relative">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <div className="flex items-center gap-2 text-brand-dark font-serif font-bold text-lg">
                <LinkSimple size={20} className="text-brand-accent" weight="bold" />
                <span>Insert Hyperlink</span>
              </div>
              <button
                type="button"
                onClick={() => setIsLinkModalOpen(false)}
                className="p-1 text-gray-400 hover:text-brand-dark transition-colors rounded-xs"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleInsertLink} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Display Text (Anchor)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Visit Our Official Portal"
                  value={linkModalData.text}
                  onChange={(e) => setLinkModalData({ ...linkModalData, text: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-brand-accent"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Destination URL *
                </label>
                <input
                  ref={linkUrlInputRef}
                  type="text"
                  required
                  placeholder="https://indiglobalexpo.com or /tickets"
                  value={linkModalData.url}
                  onChange={(e) => setLinkModalData({ ...linkModalData, url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-brand-accent"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  Enter full web URL (e.g. https://...), email (mailto:...), or site path.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsLinkModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-600 hover:bg-gray-50 rounded-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-accent hover:bg-brand-dark text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-sm"
                >
                  Insert Link
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
