package com.india_trade_expo.ind_trade_expo.service;

import com.india_trade_expo.ind_trade_expo.model.Blog;
import com.india_trade_expo.ind_trade_expo.repository.BlogRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    public List<Blog> getAllBlogs() {
        return blogRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<Blog> getBlogsByCategory(String category) {
        if (category == null || category.equalsIgnoreCase("All")) {
            return getAllBlogs();
        }
        return blogRepository.findByCategoryIgnoreCase(category);
    }

    public Optional<Blog> getBlogById(String id) {
        return blogRepository.findById(id);
    }

    public Optional<Blog> getBlogBySlug(String slug) {
        return blogRepository.findBySlug(slug);
    }

    public Blog createBlog(Blog blog) {
        String now = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        if (blog.getCreatedAt() == null || blog.getCreatedAt().isEmpty()) {
            blog.setCreatedAt(now);
        }
        blog.setUpdatedAt(now);
        if (blog.getSlug() == null || blog.getSlug().isEmpty()) {
            blog.setSlug(generateSlug(blog.getTitle()));
        }
        if (blog.getPublishedDate() == null || blog.getPublishedDate().isEmpty()) {
            blog.setPublishedDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("MMMM d, yyyy")));
        }
        return blogRepository.save(blog);
    }

    public Blog updateBlog(String id, Blog updatedData) {
        Blog existingBlog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog post not found with id: " + id));

        existingBlog.setTitle(updatedData.getTitle());
        if (updatedData.getSlug() != null && !updatedData.getSlug().isEmpty()) {
            existingBlog.setSlug(updatedData.getSlug());
        }
        existingBlog.setExcerpt(updatedData.getExcerpt());
        existingBlog.setContent(updatedData.getContent());
        existingBlog.setCategory(updatedData.getCategory());
        existingBlog.setTags(updatedData.getTags());
        existingBlog.setAuthor(updatedData.getAuthor());
        existingBlog.setAuthorRole(updatedData.getAuthorRole());
        existingBlog.setCoverImage(updatedData.getCoverImage());
        existingBlog.setReadTime(updatedData.getReadTime());
        existingBlog.setFeatured(updatedData.isFeatured());
        if (updatedData.getPublishedDate() != null) {
            existingBlog.setPublishedDate(updatedData.getPublishedDate());
        }
        existingBlog.setUpdatedAt(LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));

        return blogRepository.save(existingBlog);
    }

    public void deleteBlog(String id) {
        if (!blogRepository.existsById(id)) {
            throw new RuntimeException("Blog post not found with id: " + id);
        }
        blogRepository.deleteById(id);
    }

    private String generateSlug(String title) {
        if (title == null) return "blog-" + System.currentTimeMillis();
        return title.toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-")
                .trim();
    }

    @PostConstruct
    public void seedInitialBlogs() {
        try {
            if (blogRepository.count() == 0) {
                String now = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
                
                Blog b1 = Blog.builder()
                        .title("Navigating Global Trade Corridors: Opportunities for Indian Exporters in 2026-2027")
                        .slug("navigating-global-trade-corridors-opportunities-indian-exporters")
                        .category("Global Trade")
                        .author("IndiGlobal Editorial Team")
                        .authorRole("Global Trade Analyst")
                        .coverImage("https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80")
                        .readTime("5 min read")
                        .publishedDate("March 28, 2026")
                        .featured(true)
                        .excerpt("Explore emerging cross-border economic corridors, bilateral trade agreements, and high-growth sectors positioning India as the nexus of global commerce.")
                        .content("The global trade landscape is undergoing a structural paradigm shift. With bilateral pacts reshaping commerce between South Asia, ASEAN, Europe, and the Middle East, Indian enterprises find themselves at a pivotal juncture.\n\nFrom advanced manufacturing to sustainable textiles, international buyers are increasingly diversifying their sourcing hubs. The upcoming IndiGlobal Expo 2027 provides a strategic platform to connect visionary exporters directly with institutional decision-makers across 40+ countries.\n\nKey growth corridors include:\n1. The India-Middle East-Europe Economic Corridor (IMEC) logistics evolution.\n2. Upgraded ASEAN comprehensive partnership networks.\n3. High-technology and electronics bilateral trade frameworks.\n\nBy staying ahead of regulatory changes and embracing digital trade documentation, manufacturers can expand their export footprints while de-risking operational supply chains.")
                        .tags(Arrays.asList("Exports", "Trade Policy", "Logistics", "B2B"))
                        .createdAt(now)
                        .updatedAt(now)
                        .build();

                Blog b2 = Blog.builder()
                        .title("The Rise of Smart B2B Trade Fairs: How Technology is Transforming Exhibitions")
                        .slug("the-rise-of-smart-b2b-trade-fairs-technology-transforming-exhibitions")
                        .category("Exhibition Insights")
                        .author("Arunima Sengupta")
                        .authorRole("Head of Event Strategy")
                        .coverImage("https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80")
                        .readTime("4 min read")
                        .publishedDate("March 20, 2026")
                        .featured(false)
                        .excerpt("Discover how AI matching algorithms, interactive digital floorplans, and seamless hybrid networking maximize exhibitor ROI at international trade shows.")
                        .content("Gone are the days when trade shows were merely static booth displays. Modern B2B exhibitions are intelligent, data-driven ecosystems engineered for verified matchmaking.\n\nAt IndiGlobal Expo, we leverage predictive interest-matching that pairs exhibitors with vetted buyers before they even step foot into the hall. Smart badge technology, instant digital brochures, and scheduled VIP roundtables ensure that every conversation translates into measurable business momentum.\n\nWhether you are an established brand or an emerging manufacturer, preparing tailored product pitches and utilizing digital layout navigators increases high-intent buyer meetings by over 65%.")
                        .tags(Arrays.asList("Trade Shows", "Networking", "AI", "Exhibitors"))
                        .createdAt(now)
                        .updatedAt(now)
                        .build();

                Blog b3 = Blog.builder()
                        .title("Sustainable Manufacturing & Green Supply Chains: The New Export Standard")
                        .slug("sustainable-manufacturing-green-supply-chains-new-export-standard")
                        .category("Industry Trends")
                        .author("Dr. Vikram Malhotra")
                        .authorRole("Sustainability & Supply Chain Consultant")
                        .coverImage("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80")
                        .readTime("6 min read")
                        .publishedDate("March 12, 2026")
                        .featured(false)
                        .excerpt("International retail giants are mandating ESG compliance. Learn what Indian manufacturers must know about carbon accounting, renewable packaging, and circular design.")
                        .content("Environmental, Social, and Governance (ESG) criteria have transformed from corporate buzzwords into binding trade regulations. With European Union Carbon Border Adjustment mechanisms and North American supplier codes of conduct, eco-certified manufacturing has become non-negotiable.\n\nExhibitors at IndiGlobal Expo will showcase cutting-edge breakthroughs in zero-waste production, organic textile coloring, bio-based plastics, and energy-efficient manufacturing.\n\nAdopting ESG principles not only guarantees compliance but also yields a 20-30% premium among global ethical procurement officers looking for reliable long-term partners.")
                        .tags(Arrays.asList("Sustainability", "ESG", "Manufacturing", "Supply Chain"))
                        .createdAt(now)
                        .updatedAt(now)
                        .build();

                Blog b4 = Blog.builder()
                        .title("India-ASEAN Business Confluence: Unlocking High-Value Bilateral Partnerships")
                        .slug("india-asean-business-confluence-unlocking-bilateral-partnerships")
                        .category("Market Insights")
                        .author("IndiGlobal Editorial Team")
                        .authorRole("Diplomatic & Trade Relations")
                        .coverImage("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80")
                        .readTime("5 min read")
                        .publishedDate("February 28, 2026")
                        .featured(false)
                        .excerpt("A comprehensive breakdown of trade treaties, joint ventures, and capital flows shaping bilateral commerce between Indian enterprises and ASEAN nations.")
                        .content("The historical and commercial links between India and ASEAN countries have entered a renaissance phase. Trade volume between the two regions has surged past USD 130 billion, driven by consumer goods, pharmaceuticals, information technology, and renewable infrastructure.\n\nIn partnership with the Global Trade & Technology Council of India (GTTCI), the IndiGlobal Expo facilitates direct bilateral delegations, enabling mid-market enterprises to negotiate high-value joint ventures and distribution agreements.\n\nThis article outlines essential legal structuring, customs duties, and tariff advantages available under current regional cooperation frameworks.")
                        .tags(Arrays.asList("ASEAN", "Bilateral Trade", "Investment", "GTTCI"))
                        .createdAt(now)
                        .updatedAt(now)
                        .build();

                blogRepository.saveAll(Arrays.asList(b1, b2, b3, b4));
            }
        } catch (Exception e) {
            // Log exception without blocking boot
            System.err.println("Notice: Blog repository initial seed check completed: " + e.getMessage());
        }
    }
}
