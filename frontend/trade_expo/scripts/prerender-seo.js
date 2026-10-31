import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const BASE_HTML_PATH = path.join(DIST_DIR, 'index.html');
const BLOG_SERVICE_PATH = path.resolve(__dirname, '../src/services/blogService.js');
const BASE_URL = 'https://indiglobalexpo.com';

if (!fs.existsSync(BASE_HTML_PATH)) {
  console.error('[prerender-seo] Error: dist/index.html not found! Run vite build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(BASE_HTML_PATH, 'utf8');

// Helper to escape HTML attributes
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Function to generate customized HTML
function generatePageHtml(options) {
  const { title, description, url, image, type = 'article' } = options;
  let html = baseHtml;

  const finalTitle = escapeHtml(title || 'IndiGlobal Expo | Connect • Collaborate • Grow');
  const finalDesc = escapeHtml(description || 'IndiGlobal Expo - Connect • Collaborate • Grow. A Premier International Trade Fair Showcasing Asia to the World.');
  const finalUrl = escapeHtml(url || BASE_URL);
  const finalImage = escapeHtml(image || `${BASE_URL}/indiglobal_expo_logo.png`);

  // Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${finalTitle}</title>`);

  // Replace or add <meta name="description">
  if (/<meta\s+name=["']description["'][^>]*>/i.test(html)) {
    html = html.replace(/<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${finalDesc}" />`);
  } else {
    html = html.replace(/<\/head>/i, `  <meta name="description" content="${finalDesc}" />\n</head>`);
  }

  // Replace or add OpenGraph tags
  const ogTitleTag = `<meta property="og:title" content="${finalTitle}" />`;
  const ogDescTag = `<meta property="og:description" content="${finalDesc}" />`;
  const ogUrlTag = `<meta property="og:url" content="${finalUrl}" />`;
  const ogImageTag = `<meta property="og:image" content="${finalImage}" />`;
  const ogTypeTag = `<meta property="og:type" content="${type}" />`;

  const twitterCardTag = `<meta name="twitter:card" content="summary_large_image" />`;
  const twitterTitleTag = `<meta name="twitter:title" content="${finalTitle}" />`;
  const twitterDescTag = `<meta name="twitter:description" content="${finalDesc}" />`;
  const twitterImageTag = `<meta name="twitter:image" content="${finalImage}" />`;
  const canonicalTag = `<link rel="canonical" href="${finalUrl}" />`;

  if (/<meta\s+property=["']og:title["'][^>]*>/i.test(html)) {
    html = html.replace(/<meta\s+property=["']og:title["'][^>]*>/i, ogTitleTag);
  } else {
    html = html.replace(/<\/head>/i, `  ${ogTitleTag}\n</head>`);
  }

  if (/<meta\s+property=["']og:description["'][^>]*>/i.test(html)) {
    html = html.replace(/<meta\s+property=["']og:description["'][^>]*>/i, ogDescTag);
  } else {
    html = html.replace(/<\/head>/i, `  ${ogDescTag}\n</head>`);
  }

  if (/<meta\s+property=["']og:image["'][^>]*>/i.test(html)) {
    html = html.replace(/<meta\s+property=["']og:image["'][^>]*>/i, ogImageTag);
  } else {
    html = html.replace(/<\/head>/i, `  ${ogImageTag}\n</head>`);
  }

  // Inject additional tags before </head>
  const extraTags = [
    ogUrlTag,
    ogTypeTag,
    twitterCardTag,
    twitterTitleTag,
    twitterDescTag,
    twitterImageTag,
    canonicalTag
  ].join('\n    ');

  html = html.replace(/<\/head>/i, `    ${extraTags}\n  </head>`);

  return html;
}

// 1. Static Pages Meta
const staticPages = [
  {
    path: 'visitor',
    title: 'Visitor Registration | IndiGlobal Expo 2027',
    description: 'Register as a visitor for IndiGlobal Expo 2027 on 21–22 January 2027 in Bangkok, Thailand. Explore international suppliers, B2B trade, and conferences.',
    url: `${BASE_URL}/visitor`
  },
  {
    path: 'exhibitor',
    title: 'Exhibitor Booth Booking | IndiGlobal Expo 2027',
    description: 'Book your exhibition booth at IndiGlobal Expo 2027 in Bangkok, Thailand. Connect with verified buyers, trade delegates, and ASEAN importers.',
    url: `${BASE_URL}/exhibitor`
  },
  {
    path: 'sectors',
    title: 'Industry Focus Sectors | IndiGlobal Expo 2027',
    description: 'Explore 12+ industry sectors including healthcare, tech, manufacturing, renewable energy, and textiles at IndiGlobal Expo 2027.',
    url: `${BASE_URL}/sectors`
  },
  {
    path: 'contact',
    title: 'Contact Us | IndiGlobal Expo 2027',
    description: 'Contact the IndiGlobal Expo organizing team for sponsorship, booth booking, visitor passes, and partnership inquiries.',
    url: `${BASE_URL}/contact`
  },
  {
    path: 'blogs',
    title: 'Latest Insights & Global Trade Articles | IndiGlobal Expo',
    description: 'Read the latest international trade insights, Southeast Asian market entry strategies, and export opportunities for Indian businesses.',
    url: `${BASE_URL}/blogs`
  }
];

// Write static pages
staticPages.forEach(page => {
  const targetDir = path.join(DIST_DIR, page.path);
  fs.mkdirSync(targetDir, { recursive: true });
  const html = generatePageHtml({
    title: page.title,
    description: page.description,
    url: page.url,
    type: 'website'
  });
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
  console.log(`[prerender-seo] Generated static page: /${page.path}/index.html`);
});

// 2. Extract Blogs from blogService.js
let blogs = [];
try {
  const content = fs.readFileSync(BLOG_SERVICE_PATH, 'utf8');
  const normalized = content.replace(/\r\n/g, '\n');
  const startIdx = normalized.indexOf('export const INITIAL_BLOGS = [');
  const endIdx = normalized.indexOf('];\n\n// Helper to get local stored blogs');
  if (startIdx !== -1 && endIdx !== -1) {
    const jsonPart = normalized.slice(startIdx + 'export const INITIAL_BLOGS = '.length, endIdx + 1).trim();
    blogs = JSON.parse(jsonPart);
  }
} catch (err) {
  console.error('[prerender-seo] Warning: Failed to extract INITIAL_BLOGS from blogService.js:', err.message);
}

console.log(`[prerender-seo] Processing ${blogs.length} blogs for pre-rendered SEO pages...`);

blogs.forEach(b => {
  const slug = b.slug || b.id;
  if (!slug) return;

  const targetDir = path.join(DIST_DIR, 'blogs', slug);
  fs.mkdirSync(targetDir, { recursive: true });

  const title = (b.tabTitle || b.titleOG || b.ogTitle || b.metaTitle || b.title || '').trim();
  const description = (b.tabDescription || b.descriptionOG || b.ogDescription || b.metaDescription || b.titleDescription || b.excerpt || '').trim();
  const url = `${BASE_URL}/blogs/${slug}`;
  const image = b.coverImage || `${BASE_URL}/indiglobal_expo_logo.png`;

  const html = generatePageHtml({
    title,
    description,
    url,
    image,
    type: 'article'
  });

  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
  console.log(`[prerender-seo] Generated blog SEO page: /blogs/${slug}/index.html`);
  console.log(`               Title: "${title}"`);
});

console.log('[prerender-seo] All static SEO pages generated successfully!');
