import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  CalendarBlank, 
  Clock, 
  User, 
  ShareNetwork, 
  Check, 
  ArrowSquareOut,
  Tag,
  BookmarkSimple,
  CaretRight,
  Sparkle
} from '@phosphor-icons/react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FullscreenMenu from '../components/layout/FullscreenMenu';
import PageLoader from '../components/layout/PageLoader';
import CustomCursor from '../components/ui/CustomCursor';
import TicketWidget from '../components/ui/TicketWidget';
import blogService from '../services/blogService';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const fetchBlogData = async () => {
      setIsLoading(true);
      try {
        const currentBlog = await blogService.getBlogByIdOrSlug(id);
        setBlog(currentBlog);

        // Fetch related blogs
        const allBlogs = await blogService.getAllBlogs();
        const related = allBlogs
          .filter(b => b.id !== currentBlog.id && b.slug !== currentBlog.slug)
          .slice(0, 3);
        setRelatedBlogs(related);
      } catch (err) {
        console.error('Error loading blog post:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(blog?.title || 'IndiGlobal Expo Blog');

    let shareUrl = '';
    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    } else if (platform === 'whatsapp') {
      shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const handleOpenExternal = () => {
    window.open(window.location.href, '_blank', 'noopener,noreferrer');
  };

  // Render paragraphs and headers safely
  const renderFormattedContent = (content) => {
    if (!content) return null;

    const sections = content.split('\n\n');
    return sections.map((section, idx) => {
      const trimmed = section.trim();
      
      // Header 3: ### Heading
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="font-serif text-2xl sm:text-3xl text-brand-dark font-bold mt-8 mb-4">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      
      // Header 2: ## Heading
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="font-serif text-3xl sm:text-4xl text-brand-dark font-bold mt-10 mb-5">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }

      // Numbered List item or bullet list block
      if (trimmed.includes('\n1.') || trimmed.startsWith('1.') || trimmed.includes('\n*') || trimmed.startsWith('*')) {
        const lines = trimmed.split('\n');
        return (
          <div key={idx} className="my-6 space-y-3 pl-2 sm:pl-4 border-l-2 border-brand-accent/40">
            {lines.map((line, lIdx) => {
              const cleanLine = line.replace(/^\d+\.\s*/, '').replace(/^\*\s*/, '');
              // Check for bold prefix e.g. **Title:**
              const parts = cleanLine.split('**');
              return (
                <div key={lIdx} className="text-gray-700 leading-relaxed text-base sm:text-lg flex items-start gap-2">
                  <span className="text-brand-accent font-bold mt-1 text-sm">•</span>
                  <span>
                    {parts.length >= 3 ? (
                      <>
                        <strong className="text-brand-dark font-semibold">{parts[1]}</strong>
                        {parts.slice(2).join('')}
                      </>
                    ) : (
                      cleanLine
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        );
      }

      // Standard paragraph
      return (
        <p key={idx} className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 font-light">
          {trimmed}
        </p>
      );
    });
  };

  if (isLoading) {
    return (
      <>
        <PageLoader title="Loading<span class='font-sans font-light text-brand-accent text-3xl ml-1'>Article...</span>" />
        <Header />
        <div className="min-h-screen bg-brand-light flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-3 border-brand-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Opening Full Article...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-brand-light flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white p-8 sm:p-10 text-center rounded-sm border border-gray-200 shadow-md">
            <BookmarkSimple size={48} className="text-gray-300 mx-auto mb-4" />
            <h2 className="font-serif text-2xl text-brand-dark mb-2">Article Not Found</h2>
            <p className="text-gray-500 text-sm mb-6">
              The article you are searching for might have been archived or moved.
            </p>
            <button 
              onClick={() => navigate('/blogs')}
              className="bg-brand-dark text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors"
            >
              Back to All Articles
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <PageLoader title="IndiGlobal<span class='font-sans font-light text-brand-accent text-3xl ml-1'>Chronicles</span>" />
      <CustomCursor />
      <Header logoColor="text-brand-dark" />
      <FullscreenMenu />
      <TicketWidget />

      <main className="bg-brand-light min-h-screen pt-24 sm:pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Navigation Bar: Breadcrumbs & External Page Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200/80">
            <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
              <Link to="/" className="hover:text-brand-accent transition-colors font-medium">Home</Link>
              <CaretRight size={12} className="text-gray-400" />
              <Link to="/blogs" className="hover:text-brand-accent transition-colors font-medium">Blogs & Articles</Link>
              <CaretRight size={12} className="text-gray-400" />
              <span className="text-brand-accent font-semibold truncate max-w-[200px] sm:max-w-xs">{blog.category}</span>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/blogs')}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-brand-dark transition-colors py-1.5 px-3 rounded-sm bg-white border border-gray-200 shadow-2xs"
              >
                <ArrowLeft size={14} />
                <span>All Articles</span>
              </button>

              <button 
                onClick={handleOpenExternal}
                title="Open in separate tab"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-accent hover:text-white hover:bg-brand-accent transition-all py-1.5 px-3 rounded-sm bg-brand-accent/10 border border-brand-accent/30 shadow-2xs"
              >
                <ArrowSquareOut size={14} />
                <span className="hidden sm:inline">Separate Tab</span>
              </button>
            </div>
          </div>

          {/* Article Header Card */}
          <header className="mb-10">
            <div className="inline-block bg-brand-accent text-white px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-xs mb-4 shadow-xs">
              {blog.category}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-dark font-bold leading-tight mb-6">
              {blog.title}
            </h1>

            {/* Meta details bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gray-200 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-brand-accent text-white font-serif font-bold text-base flex items-center justify-center shadow-xs">
                  {blog.author?.charAt(0) || 'I'}
                </div>
                <div>
                  <p className="font-bold text-brand-dark">{blog.author}</p>
                  <p className="text-xs text-gray-400">{blog.authorRole || 'IndiGlobal Contributor'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-medium">
                <span className="flex items-center gap-1.5">
                  <CalendarBlank size={16} className="text-brand-accent" />
                  {blog.publishedDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock size={16} className="text-brand-accent" />
                  {blog.readTime || '5 min read'}
                </span>
              </div>
            </div>
          </header>

          {/* Featured Cover Image */}
          <div className="mb-12 rounded-sm overflow-hidden border border-gray-200/80 shadow-md">
            <img 
              src={blog.coverImage || 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80'} 
              alt={blog.title}
              className="w-full h-auto max-h-[520px] object-cover" 
            />
          </div>

          {/* Executive Summary Callout */}
          {blog.excerpt && (
            <div className="mb-10 p-6 sm:p-8 bg-brand-dark text-white rounded-sm border-l-4 border-brand-accent shadow-md">
              <div className="flex items-center gap-2 text-brand-accent text-xs font-bold uppercase tracking-widest mb-2">
                <Sparkle size={14} weight="fill" />
                <span>Executive Summary</span>
              </div>
              <p className="text-gray-200 font-light text-base sm:text-lg leading-relaxed italic">
                "{blog.excerpt}"
              </p>
            </div>
          )}

          {/* Main Article Content */}
          <article className="bg-white p-6 sm:p-12 rounded-sm border border-gray-200/80 shadow-sm mb-12">
            <div className="prose prose-lg max-w-none">
              {renderFormattedContent(blog.content)}
            </div>

            {/* Tags section */}
            {Array.isArray(blog.tags) && blog.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-100">
                <p className="text-xs uppercase font-bold tracking-widest text-gray-400 mb-3 flex items-center gap-1.5">
                  <Tag size={14} /> Key Topics & Tags:
                </p>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx}
                      className="bg-brand-light text-brand-dark px-3 py-1 rounded-xs text-xs font-medium border border-gray-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share and Bookmark Bar */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-dark flex items-center gap-2">
                <ShareNetwork size={16} /> Share This Article
              </span>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleShare('twitter')}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-black hover:text-white rounded-xs text-xs font-bold transition-colors"
                >
                  X / Twitter
                </button>
                <button 
                  onClick={() => handleShare('linkedin')}
                  className="px-3 py-1.5 bg-[#0077b5]/10 text-[#0077b5] hover:bg-[#0077b5] hover:text-white rounded-xs text-xs font-bold transition-colors"
                >
                  LinkedIn
                </button>
                <button 
                  onClick={() => handleShare('whatsapp')}
                  className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-xs text-xs font-bold transition-colors"
                >
                  WhatsApp
                </button>
                <button 
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-brand-accent hover:text-white rounded-xs text-xs font-bold transition-colors flex items-center gap-1"
                >
                  {copySuccess ? <Check size={14} className="text-green-600" /> : null}
                  <span>{copySuccess ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>
          </article>

          {/* Author Box */}
          <div className="bg-white p-6 sm:p-8 rounded-sm border border-gray-200/80 shadow-sm mb-16 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-16 h-16 rounded-full bg-brand-dark text-brand-accent font-serif font-bold text-2xl flex items-center justify-center flex-shrink-0">
              {blog.author?.charAt(0) || 'I'}
            </div>
            <div className="text-center sm:text-left">
              <h4 className="font-serif text-xl text-brand-dark font-bold mb-1">{blog.author}</h4>
              <p className="text-xs uppercase tracking-widest text-brand-accent font-semibold mb-3">
                {blog.authorRole || 'IndiGlobal Expo Contributor'}
              </p>
              <p className="text-gray-500 font-light text-sm leading-relaxed">
                Contributing insights on cross-border trade agreements, industrial innovations, and strategic B2B market trends shaping the future of Indian and global commerce.
              </p>
            </div>
          </div>

          {/* Related Articles Section */}
          {relatedBlogs.length > 0 && (
            <section className="mt-16 pt-12 border-t border-gray-200">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-xs uppercase font-bold tracking-widest text-brand-accent mb-1">More to Explore</p>
                  <h3 className="font-serif text-2xl sm:text-3xl text-brand-dark">Related Articles</h3>
                </div>
                <Link 
                  to="/blogs" 
                  className="text-xs font-bold uppercase tracking-widest text-brand-dark hover:text-brand-accent transition-colors flex items-center gap-1"
                >
                  <span>View All</span>
                  <CaretRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogs.map((relBlog, rIdx) => (
                  <div 
                    key={relBlog.id || rIdx}
                    onClick={() => {
                      navigate(`/blogs/${relBlog.id || relBlog.slug}`);
                      window.scrollTo(0, 0);
                    }}
                    className="bg-white border border-gray-200/80 hover:border-brand-accent/50 p-5 rounded-sm shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[16/10] overflow-hidden rounded-xs mb-3 bg-gray-100">
                        <img 
                          src={relBlog.coverImage} 
                          alt={relBlog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-accent block mb-1">
                        {relBlog.category}
                      </span>
                      <h4 className="font-serif text-base text-brand-dark group-hover:text-brand-accent transition-colors font-bold line-clamp-2 leading-snug mb-2">
                        {relBlog.title}
                      </h4>
                    </div>
                    <div className="text-[11px] text-gray-400 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span>{relBlog.publishedDate}</span>
                      <span className="text-brand-dark font-semibold group-hover:text-brand-accent flex items-center gap-1">
                        Read <CaretRight size={12} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Exhibition Registration CTA Card */}
          <div className="mt-16 bg-gradient-to-r from-brand-dark to-brand-dark/95 text-white p-8 sm:p-10 rounded-sm text-center relative overflow-hidden shadow-xl">
            <h3 className="font-serif text-2xl sm:text-3xl text-white mb-3">
              Ready to Expand Your Global Footprint?
            </h3>
            <p className="text-gray-300 font-light text-sm max-w-xl mx-auto mb-6">
              Connect with 10,000+ verified trade buyers and leading international exhibitors at IndiGlobal Expo 2027.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => navigate('/exhibitor')}
                className="bg-brand-accent text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-brand-dark transition-all rounded-xs"
              >
                Exhibit With Us
              </button>
              <button 
                onClick={() => navigate('/tickets')}
                className="border border-white/40 text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-brand-dark transition-all rounded-xs"
              >
                Get Visitor Passes
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
};

export default BlogDetail;
