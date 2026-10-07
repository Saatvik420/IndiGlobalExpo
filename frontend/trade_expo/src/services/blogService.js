import apiClient from '../api/client';

const STORAGE_KEY = 'indiglobal_blogs_cache';

export const INITIAL_BLOGS = [
  {
    id: 'blog-1',
    title: 'Navigating Global Trade Corridors: Opportunities for Indian Exporters in 2026-2027',
    slug: 'navigating-global-trade-corridors-opportunities-indian-exporters',
    category: 'Global Trade',
    author: 'IndiGlobal Editorial Team',
    authorRole: 'Global Trade Analyst',
    coverImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    readTime: '5 min read',
    publishedDate: 'March 28, 2026',
    featured: true,
    excerpt: 'Explore emerging cross-border economic corridors, bilateral trade pacts, and high-growth sectors positioning India as the nexus of global commerce.',
    content: `The global trade landscape is undergoing a structural paradigm shift. With bilateral pacts reshaping commerce between South Asia, ASEAN, Europe, and the Middle East, Indian enterprises find themselves at a pivotal juncture.

From advanced precision engineering to sustainable textiles and organic agribusiness, international procurement officers are actively diversifying their sourcing hubs to build resilience against geopolitical vulnerabilities. The upcoming IndiGlobal Expo 2027 serves as an authoritative nexus to connect visionary exporters directly with institutional decision-makers across 40+ countries.

### Strategic Economic Corridors Taking Center Stage

Three monumental international trade corridors are redefining export logistics:

1. **The India-Middle East-Europe Economic Corridor (IMEC):** Facilitating multimodality that cuts maritime transit times by up to 40% while slashing freight expenditures.
2. **Upgraded India-ASEAN Comprehensive Partnership:** Lowering tariff barriers across high-value consumer goods, pharmaceuticals, and specialized engineering products.
3. **Bilateral Free Trade Agreements (FTAs) with European & Commonwealth Markets:** Creating preferential zero-duty regimes for verified Indian manufacturing units.

### Best Practices for Exporters

To leverage these international conduits effectively, enterprises must adapt their strategic playbooks:

* **Embrace Automated Customs Compliance:** Digital bills of lading and e-certificates of origin prevent border bottlenecks.
* **Standardize Quality Certifications:** Meeting CE mark, ISO, and ESG metrics early accelerates vendor approval from tier-one international buyers.
* **Capitalize on In-Person B2B Expos:** Face-to-face trust building remains irreplaceable for multi-million dollar annual contracts.

IndiGlobal Expo will host exclusive bilateral roundtables and scheduled buyer-seller meets to turn these macro opportunities into executed cross-border contracts.`,
    tags: ['Exports', 'Trade Policy', 'Logistics', 'B2B', 'IMEC']
  },
  {
    id: 'blog-2',
    title: 'The Rise of Smart B2B Trade Fairs: How Technology is Transforming Exhibitions',
    slug: 'the-rise-of-smart-b2b-trade-fairs-technology-transforming-exhibitions',
    category: 'Exhibition Insights',
    author: 'Arunima Sengupta',
    authorRole: 'Head of Event Strategy',
    coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    readTime: '4 min read',
    publishedDate: 'March 20, 2026',
    featured: false,
    excerpt: 'Discover how AI matchmaking algorithms, interactive digital floorplans, and hybrid networking maximize exhibitor ROI at international trade shows.',
    content: `Gone are the days when trade shows were merely static booth displays where visitors dropped business cards into glass bowls. Today's premier business expositions are high-tech, data-driven ecosystems engineered for verified matchmaking and measurable commercial yield.

At IndiGlobal Expo, we leverage predictive interest-matching that pairs exhibitors with vetted buyers before they even step foot into the hall. Smart badge technology, instant digital brochures, and scheduled VIP roundtables ensure that every conversation translates into measurable business momentum.

### Key Innovations Transforming the Expo Floor

* **AI-Driven Delegate Matchmaking:** Pre-event algorithms analyze buyer procurement requisitions and recommend exhibitors matching exact technical specifications.
* **Interactive Floor Navigation & Digital Stalls:** Seamless QR codes allow delegates to download full product catalogues, CAD files, and pricing sheets straight to their phones.
* **Real-Time Lead Telemetry:** Exhibitors can track booth visitor engagement and prioritize high-intent leads during the exhibition days.

Whether you are an established brand or an emerging manufacturer, preparing tailored product pitches and utilizing digital layout navigators increases high-intent buyer meetings by over 65%.`,
    tags: ['Trade Shows', 'Networking', 'AI', 'Exhibitors', 'Innovation']
  },
  {
    id: 'blog-3',
    title: 'Sustainable Manufacturing & Green Supply Chains: The New Export Standard',
    slug: 'sustainable-manufacturing-green-supply-chains-new-export-standard',
    category: 'Industry Trends',
    author: 'Dr. Vikram Malhotra',
    authorRole: 'Sustainability & Supply Chain Consultant',
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    readTime: '6 min read',
    publishedDate: 'March 12, 2026',
    featured: false,
    excerpt: 'International retail giants are mandating ESG compliance. Learn what Indian manufacturers must know about carbon accounting, renewable packaging, and circular design.',
    content: `Environmental, Social, and Governance (ESG) criteria have transformed from corporate buzzwords into binding trade regulations. With European Union Carbon Border Adjustment mechanisms (CBAM) and North American supplier codes of conduct, eco-certified manufacturing has become non-negotiable.

Exhibitors at IndiGlobal Expo will showcase cutting-edge breakthroughs in zero-waste production, organic textile coloring, bio-based plastics, and energy-efficient manufacturing.

### Core Pillars of Green Export Readiness

1. **Carbon Footprint Transparency:** International buyers now require verifiable scope 1, 2, and 3 emissions tracking.
2. **Circular Material Sourcing:** Recycled polymers, organic fibers, and reusable packaging command premium purchase commitments.
3. **Ethical Labor Certification:** Transparent audits of supply chain conditions protect brand integrity in overseas retail markets.

Adopting ESG principles not only guarantees compliance but also yields a 20-30% premium among global ethical procurement officers looking for reliable long-term partners.`,
    tags: ['Sustainability', 'ESG', 'Manufacturing', 'Supply Chain', 'Green Tech']
  },
  {
    id: 'blog-4',
    title: 'India-ASEAN Business Confluence: Unlocking High-Value Bilateral Partnerships',
    slug: 'india-asean-business-confluence-unlocking-bilateral-partnerships',
    category: 'Market Insights',
    author: 'IndiGlobal Editorial Team',
    authorRole: 'Diplomatic & Trade Relations',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    readTime: '5 min read',
    publishedDate: 'February 28, 2026',
    featured: false,
    excerpt: 'A comprehensive breakdown of trade treaties, joint ventures, and capital flows shaping bilateral commerce between Indian enterprises and ASEAN nations.',
    content: `The historical and commercial links between India and ASEAN countries have entered a renaissance phase. Trade volume between the two regions has surged past USD 130 billion, driven by consumer goods, pharmaceuticals, information technology, and renewable infrastructure.

In partnership with the Global Trade & Technology Council of India (GTTCI), the IndiGlobal Expo facilitates direct bilateral delegations, enabling mid-market enterprises to negotiate high-value joint ventures and distribution agreements.

### Key Highlights for Delegates:

* Direct ministerial and commercial counselor briefings.
* Sector-specific B2B matchmaking lounges for electronics, medical equipment, and luxury lifestyle goods.
* Dedicated financing and cross-border settlement workshops addressing currency hedging and LC mechanisms.

By participating in dedicated buyer-seller delegations, companies can solidify supply chain partnerships that span across Singapore, Malaysia, Vietnam, Indonesia, and beyond.`,
    tags: ['ASEAN', 'Bilateral Trade', 'Investment', 'GTTCI', 'Partnerships']
  },
  {
    id: 'blog-5',
    title: 'The Digital Revolution in Global Freight & Cold Chain Logistics',
    slug: 'digital-revolution-global-freight-cold-chain-logistics',
    category: 'Logistics',
    author: 'Rajiv Nambiar',
    authorRole: 'Supply Chain & Cold Chain Specialist',
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    readTime: '4 min read',
    publishedDate: 'February 15, 2026',
    featured: false,
    excerpt: 'IoT sensors, automated warehousing, and blockchain tracking are revolutionizing perishable exports and high-value cargo integrity worldwide.',
    content: `Global perishable cargo and pharmaceutical exports demand flawless climate continuity. As Indian agro-food, marine exports, and biologic pharma expand internationally, end-to-end cold chains have evolved into technological marvels.

Real-time telemetry, IoT temperature monitoring, and predictive port arrival analytics have reduced transit spoilage by over 80%.

At the IndiGlobal Expo Logistics Pavilion, international freight forwarders, port authorities, and cold chain innovators will present turnkey solutions designed to propel Indian perishable and pharmaceutical products safely to international shelves.`,
    tags: ['Logistics', 'Cold Chain', 'IoT', 'Supply Chain', 'Warehousing']
  }
];

// Helper to get local stored blogs
const getLocalBlogs = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading blogs from localStorage', e);
  }
  // Initialize default
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BLOGS));
  } catch (e) {}
  return INITIAL_BLOGS;
};

// Helper to save local stored blogs
const saveLocalBlogs = (blogs) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
  } catch (e) {
    console.error('Error saving blogs to localStorage', e);
  }
};

export const getBlogSlug = (blog) => {
  if (!blog) return '';
  if (blog.slug && typeof blog.slug === 'string' && blog.slug.trim()) {
    return blog.slug.trim();
  }
  if (blog.title && typeof blog.title === 'string' && blog.title.trim()) {
    return blog.title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  return blog.id || '';
};

export const blogService = {
  getBlogSlug,

  // Get all blogs (with optional category filter)
  getAllBlogs: async (category = '') => {
    try {
      const url = category && category.toLowerCase() !== 'all' 
        ? `/blogs?category=${encodeURIComponent(category)}`
        : '/blogs';
      const response = await apiClient.get(url);
      if (response && Array.isArray(response.data)) {
        const enriched = response.data.map(b => ({
          ...b,
          slug: b.slug || getBlogSlug(b)
        }));
        if (enriched.length > 0) {
          saveLocalBlogs(enriched);
          return enriched;
        } else {
          return [];
        }
      }
    } catch (err) {
      console.warn('API blogs fetch failed, checking /admin/blogs:', err.message);
      try {
        const adminRes = await apiClient.get('/admin/blogs');
        if (adminRes && Array.isArray(adminRes.data)) {
          const enriched = adminRes.data.map(b => ({
            ...b,
            slug: b.slug || getBlogSlug(b)
          }));
          if (enriched.length > 0) {
            saveLocalBlogs(enriched);
            if (category && category.toLowerCase() !== 'all') {
              return enriched.filter(b => b.category?.toLowerCase() === category.toLowerCase());
            }
            return enriched;
          }
        }
      } catch (adminErr) {
        console.warn('Admin blogs fetch also failed, using local cache:', adminErr.message);
      }
    }
    
    // Fallback to local cache if network/server is unreachable
    const local = getLocalBlogs().map(b => ({
      ...b,
      slug: b.slug || getBlogSlug(b)
    }));
    if (category && category.toLowerCase() !== 'all') {
      return local.filter(b => b.category?.toLowerCase() === category.toLowerCase());
    }
    return local;
  },

  // Get a single blog by ID or slug
  getBlogByIdOrSlug: async (idOrSlug) => {
    try {
      let response;
      const isHexId = /^[0-9a-fA-F]{24}$/.test(idOrSlug);
      if (isHexId) {
        try {
          response = await apiClient.get(`/blogs/${encodeURIComponent(idOrSlug)}`);
        } catch (e1) {
          response = await apiClient.get(`/blogs/slug/${encodeURIComponent(idOrSlug)}`);
        }
      } else {
        try {
          response = await apiClient.get(`/blogs/slug/${encodeURIComponent(idOrSlug)}`);
        } catch (e1) {
          response = await apiClient.get(`/blogs/${encodeURIComponent(idOrSlug)}`);
        }
      }
      if (response && response.data) {
        const blog = response.data;
        if (!blog.slug) blog.slug = getBlogSlug(blog);
        return blog;
      }
    } catch (err) {
      console.warn('API blog fetch failed, searching local fallback:', err.message);
    }

    const local = getLocalBlogs();
    const found = local.find(b => b.slug === idOrSlug || b.id === idOrSlug || getBlogSlug(b) === idOrSlug);
    if (found) {
      if (!found.slug) found.slug = getBlogSlug(found);
      return found;
    }
    throw new Error('Blog post not found');
  },

  // Create blog (Admin)
  createBlog: async (blogData) => {
    const slug = blogData.slug || blogData.title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    const newBlog = {
      ...blogData,
      slug,
      publishedDate: blogData.publishedDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    if (!newBlog.id || String(newBlog.id).startsWith('blog-')) {
      delete newBlog.id;
    }

    let created = null;
    let lastError = null;

    try {
      try {
        const response = await apiClient.post('/admin/blogs', newBlog);
        if (response && response.data) {
          created = response.data;
        }
      } catch (err1) {
        console.warn('/admin/blogs failed, trying /blogs:', err1.message);
        const response = await apiClient.post('/blogs', newBlog);
        if (response && response.data) {
          created = response.data;
        }
      }
    } catch (err) {
      lastError = err;
      console.error('Backend blog creation failed:', err);
    }

    if (created) {
      const local = getLocalBlogs();
      saveLocalBlogs([created, ...local.filter(b => b.id !== created.id && b.slug !== created.slug)]);
      return created;
    }

    const errorMsg = lastError?.response?.data?.message || lastError?.message || 'Failed to save blog to backend server';
    throw new Error(errorMsg);
  },

  // Update blog (Admin)
  updateBlog: async (id, blogData) => {
    const updatedData = {
      ...blogData,
      updatedAt: new Date().toISOString()
    };

    let updated = null;
    let lastError = null;

    try {
      try {
        const response = await apiClient.put(`/admin/blogs/${id}`, updatedData);
        if (response && response.data) {
          updated = response.data;
        }
      } catch (err1) {
        console.warn(`/admin/blogs/${id} failed, trying /blogs/${id}:`, err1.message);
        const response = await apiClient.put(`/blogs/${id}`, updatedData);
        if (response && response.data) {
          updated = response.data;
        }
      }
    } catch (err) {
      lastError = err;
      console.error('Backend blog update failed:', err);
    }

    if (updated) {
      const local = getLocalBlogs();
      saveLocalBlogs(local.map(b => (b.id === id || b.slug === id) ? updated : b));
      return updated;
    }

    const errorMsg = lastError?.response?.data?.message || lastError?.message || 'Failed to update blog on backend server';
    throw new Error(errorMsg);
  },

  // Delete blog (Admin)
  deleteBlog: async (id) => {
    let lastError = null;
    let success = false;

    try {
      try {
        await apiClient.delete(`/admin/blogs/${id}`);
        success = true;
      } catch (err1) {
        console.warn(`/admin/blogs/${id} failed, trying /blogs/${id}:`, err1.message);
        await apiClient.delete(`/blogs/${id}`);
        success = true;
      }
    } catch (err) {
      lastError = err;
      console.error('Backend blog delete failed:', err);
    }

    if (success) {
      const local = getLocalBlogs();
      const filtered = local.filter(b => b.id !== id && b.slug !== id);
      saveLocalBlogs(filtered);
      return true;
    }

    const errorMsg = lastError?.response?.data?.message || lastError?.message || 'Failed to delete blog from backend server';
    throw new Error(errorMsg);
  },

  // Available categories
  getCategories: () => [
    'All',
    'Global Trade',
    'Exhibition Insights',
    'Industry Trends',
    'Market Insights',
    'Logistics'
  ]
};

export default blogService;
