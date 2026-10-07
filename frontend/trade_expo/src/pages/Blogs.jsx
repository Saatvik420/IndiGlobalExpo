import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MagnifyingGlass, 
  Funnel, 
  CalendarBlank, 
  Clock, 
  User, 
  Tag, 
  ArrowSquareOut,
  Sparkle,
  BookmarkSimple,
  X
} from '@phosphor-icons/react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FullscreenMenu from '../components/layout/FullscreenMenu';
import PageLoader from '../components/layout/PageLoader';
import CustomCursor from '../components/ui/CustomCursor';
import TicketWidget from '../components/ui/TicketWidget';
import blogService, { getBlogSlug } from '../services/blogService';

const Blogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, readingTime

  const categories = useMemo(() => blogService.getCategories(), []);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const data = await blogService.getAllBlogs();
        setBlogs(data || []);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    // Scroll reveal observer
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, [blogs, selectedCategory, searchQuery]);

  // Filter and sort blogs
  const filteredBlogs = useMemo(() => {
    let result = blogs.filter(blog => {
      const matchesCategory = selectedCategory === 'All' || 
        (blog.category && blog.category.toLowerCase() === selectedCategory.toLowerCase());
      
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        blog.title?.toLowerCase().includes(query) ||
        blog.excerpt?.toLowerCase().includes(query) ||
        blog.author?.toLowerCase().includes(query) ||
        (Array.isArray(blog.tags) && blog.tags.some(t => t.toLowerCase().includes(query)));

      return matchesCategory && matchesSearch;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt || b.publishedDate) - new Date(a.createdAt || a.publishedDate);
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt || a.publishedDate) - new Date(b.createdAt || b.publishedDate);
      } else if (sortBy === 'readingTime') {
        const timeA = parseInt(a.readTime) || 0;
        const timeB = parseInt(b.readTime) || 0;
        return timeA - timeB;
      }
      return 0;
    });

    return result;
  }, [blogs, selectedCategory, searchQuery, sortBy]);

  // Featured blog (first featured or first blog)
  const featuredBlog = useMemo(() => {
    return blogs.find(b => b.featured) || blogs[0] || null;
  }, [blogs]);

  const handleReadBlog = (blog, openInNewTab = false) => {
    const slug = getBlogSlug(blog);
    const path = `/blogs/${slug}`;
    if (openInNewTab) {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <PageLoader title="IndiGlobal<span class='font-sans font-light text-brand-accent text-3xl ml-1'>Articles</span>" />
      <CustomCursor />
      <Header />
      <FullscreenMenu />
      <TicketWidget />

      {/* Hero Banner */}
      <section className="relative min-h-[420px] sm:min-h-[500px] flex items-center overflow-hidden bg-brand-dark pt-28 pb-16">
        <img 
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=2000&q=80" 
          alt="IndiGlobal Trade Insights" 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-25 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-brand-dark/40 z-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center md:text-left">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/20 border border-brand-accent/40 rounded-full text-brand-accent text-xs uppercase tracking-widest font-bold mb-4">
              <Sparkle size={14} weight="fill" />
              <span>Insights, Strategy & Intelligence</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white font-bold leading-tight mb-4 sm:mb-6">
              Global Trade <span className="italic font-light text-brand-accent">& Expo Chronicles.</span>
            </h1>
            <p className="text-gray-300 font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
              Deep dives, sector analyses, policy briefings, and behind-the-scenes insights curated for international trade leaders, manufacturers, and exhibitors.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Blog Highlight (shown if not actively searching/filtering) */}
      {featuredBlog && selectedCategory === 'All' && !searchQuery && (
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-8 h-px bg-brand-accent"></span>
              <p className="text-xs uppercase font-bold tracking-widest text-brand-accent">Editor's Spotlight</p>
            </div>
            
            <div className="bg-brand-light/40 border border-gray-200/70 hover:border-brand-accent/60 transition-all duration-500 rounded-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 group">
              <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[380px] overflow-hidden">
                <img 
                  src={featuredBlog.coverImage} 
                  alt={featuredBlog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-4 left-4 bg-brand-accent text-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-sm shadow-md">
                  Featured Story
                </div>
              </div>
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="font-semibold text-brand-accent uppercase tracking-wider">{featuredBlog.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><CalendarBlank size={14} /> {featuredBlog.publishedDate}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {featuredBlog.readTime}</span>
                  </div>
                  
                  <h2 
                    onClick={() => handleReadBlog(featuredBlog)}
                    className="font-serif text-2xl sm:text-3xl lg:text-4xl text-brand-dark group-hover:text-brand-accent transition-colors cursor-pointer leading-tight mb-4"
                  >
                    {featuredBlog.title}
                  </h2>
                  <p className="text-gray-600 font-light text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
                    {featuredBlog.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                    <div className="w-8 h-8 rounded-full bg-brand-accent/15 text-brand-dark font-serif font-bold flex items-center justify-center">
                      {featuredBlog.author?.charAt(0) || 'I'}
                    </div>
                    <div>
                      <p className="font-bold text-brand-dark">{featuredBlog.author}</p>
                      <p className="text-[10px] text-gray-400">{featuredBlog.authorRole || 'Contributor'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleReadBlog(featuredBlog, true)}
                      title="Open in new tab"
                      className="p-2.5 rounded-sm border border-gray-200 text-gray-600 hover:text-brand-accent hover:border-brand-accent transition-colors"
                    >
                      <ArrowSquareOut size={16} />
                    </button>
                    <button 
                      onClick={() => handleReadBlog(featuredBlog)}
                      className="bg-brand-dark hover:bg-brand-accent text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 group-hover:gap-3"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Filter & Blog Grid Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-brand-light min-h-[600px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Controls: Search, Categories, Sort */}
          <div className="bg-white p-6 sm:p-8 rounded-sm border border-gray-200/80 shadow-sm mb-12">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center pb-6 border-b border-gray-100">
              
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <MagnifyingGlass size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search articles, keywords, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent focus:bg-white transition-all"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-dark"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Sorting and Count */}
              <div className="flex items-center gap-4 justify-between md:justify-end">
                <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                  Showing <strong className="text-brand-dark">{filteredBlogs.length}</strong> {filteredBlogs.length === 1 ? 'article' : 'articles'}
                </span>
                
                <div className="flex items-center gap-2">
                  <label htmlFor="sortSelect" className="text-xs text-gray-400 uppercase tracking-wider font-bold hidden sm:inline">Sort:</label>
                  <select 
                    id="sortSelect"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-50 border border-gray-200 text-xs font-semibold text-brand-dark py-2 px-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-brand-accent cursor-pointer"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="readingTime">Quick Reads</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="pt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mr-2 flex items-center gap-1.5 whitespace-nowrap">
                <Funnel size={14} /> Filters:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-300 uppercase whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-brand-dark text-brand-accent shadow-sm'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-brand-dark'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Blogs Grid */}
          {isLoading ? (
            <div className="py-24 text-center">
              <div className="w-10 h-10 border-2 border-brand-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Curating Articles & Insights...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="bg-white p-12 sm:p-16 text-center border border-gray-200 rounded-sm">
              <BookmarkSimple size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="font-serif text-2xl text-brand-dark mb-2">No Articles Found</h3>
              <p className="text-gray-500 text-sm font-light max-w-md mx-auto mb-6">
                We couldn't find any articles matching your search criteria or filter. Try clearing filters or using different keywords.
              </p>
              <button 
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="bg-brand-accent text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-brand-dark transition-colors rounded-sm"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {filteredBlogs.map((blog, idx) => (
                <article 
                  key={blog.id || idx}
                  className="bg-white border border-gray-200/80 hover:border-brand-accent/50 shadow-sm hover:shadow-xl transition-all duration-500 rounded-sm overflow-hidden flex flex-col justify-between group"
                >
                  {/* Image Header */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <img 
                      src={blog.coverImage || 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80'} 
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute top-3 left-3 bg-brand-dark/90 backdrop-blur-sm text-brand-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-xs">
                      {blog.category}
                    </div>
                    <div className="absolute top-3 right-3 flex gap-1">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReadBlog(blog, true);
                        }}
                        title="Open in separate tab"
                        className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 hover:text-brand-accent hover:bg-white flex items-center justify-center transition-all shadow"
                      >
                        <ArrowSquareOut size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Meta info */}
                      <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-3">
                        <span className="flex items-center gap-1 font-medium"><CalendarBlank size={13} /> {blog.publishedDate}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-medium"><Clock size={13} /> {blog.readTime || '4 min read'}</span>
                      </div>

                      {/* Title */}
                      <h3 
                        onClick={() => handleReadBlog(blog)}
                        className="font-serif text-xl sm:text-2xl text-brand-dark group-hover:text-brand-accent transition-colors duration-300 leading-snug mb-3 cursor-pointer line-clamp-2"
                      >
                        {blog.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-500 font-light text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                        {blog.excerpt}
                      </p>
                    </div>

                    {/* Footer with Author and CTA */}
                    <div className="pt-4 border-t border-gray-100 mt-4">
                      {/* Tags */}
                      {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {blog.tags.slice(0, 3).map((tag, tIdx) => (
                            <span 
                              key={tIdx} 
                              className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-brand-accent/20 text-brand-dark font-serif text-xs font-bold flex items-center justify-center">
                            {blog.author?.charAt(0) || 'A'}
                          </div>
                          <span className="text-xs font-semibold text-gray-700 truncate max-w-[120px]">
                            {blog.author}
                          </span>
                        </div>

                        <button 
                          onClick={() => handleReadBlog(blog)}
                          className="interactive text-brand-dark text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:text-brand-accent transition-colors group-hover:translate-x-1"
                        >
                          <span>Read</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Bottom Newsletter & Event Callout */}
          <div className="mt-16 sm:mt-24 bg-brand-dark text-white p-8 sm:p-12 md:p-16 rounded-sm relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-3 block">Stay Informed</span>
              <h3 className="font-serif text-2xl sm:text-4xl text-white mb-4">
                Be First to Receive Global Sourcing & Export Intelligence
              </h3>
              <p className="text-gray-300 font-light text-sm sm:text-base mb-8">
                Subscribe for exclusive market analysis, international buyer itineraries, and priority booth registration updates for IndiGlobal Expo 2027.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your corporate email address"
                  className="bg-white/10 border border-white/20 text-white placeholder-gray-400 px-4 py-3 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent flex-1"
                />
                <button 
                  onClick={() => alert('Thank you for subscribing to IndiGlobal Trade Insights!')}
                  className="bg-brand-accent text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-brand-dark transition-all duration-300 whitespace-nowrap rounded-sm"
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default Blogs;
