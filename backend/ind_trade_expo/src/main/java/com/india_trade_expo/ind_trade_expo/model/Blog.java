package com.india_trade_expo.ind_trade_expo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "blogs")
public class Blog {
    @Id
    private String id;
    private String title;
    private String slug;
    private String excerpt;
    private String content;
    private String category;
    private List<String> tags = new ArrayList<>();
    private String author;
    private String authorRole;
    private String coverImage;
    private String readTime;
    private String publishedDate;
    private boolean featured;
    private String createdAt;
    private String updatedAt;

    public Blog() {}

    public Blog(String id, String title, String slug, String excerpt, String content, String category,
                List<String> tags, String author, String authorRole, String coverImage,
                String readTime, String publishedDate, boolean featured, String createdAt, String updatedAt) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.excerpt = excerpt;
        this.content = content;
        this.category = category;
        this.tags = tags != null ? tags : new ArrayList<>();
        this.author = author;
        this.authorRole = authorRole;
        this.coverImage = coverImage;
        this.readTime = readTime;
        this.publishedDate = publishedDate;
        this.featured = featured;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static BlogBuilder builder() {
        return new BlogBuilder();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getExcerpt() { return excerpt; }
    public void setExcerpt(String excerpt) { this.excerpt = excerpt; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getAuthorRole() { return authorRole; }
    public void setAuthorRole(String authorRole) { this.authorRole = authorRole; }

    public String getCoverImage() { return coverImage; }
    public void setCoverImage(String coverImage) { this.coverImage = coverImage; }

    public String getReadTime() { return readTime; }
    public void setReadTime(String readTime) { this.readTime = readTime; }

    public String getPublishedDate() { return publishedDate; }
    public void setPublishedDate(String publishedDate) { this.publishedDate = publishedDate; }

    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

    public String getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }

    public static class BlogBuilder {
        private String id;
        private String title;
        private String slug;
        private String excerpt;
        private String content;
        private String category;
        private List<String> tags = new ArrayList<>();
        private String author;
        private String authorRole;
        private String coverImage;
        private String readTime;
        private String publishedDate;
        private boolean featured;
        private String createdAt;
        private String updatedAt;

        public BlogBuilder id(String id) { this.id = id; return this; }
        public BlogBuilder title(String title) { this.title = title; return this; }
        public BlogBuilder slug(String slug) { this.slug = slug; return this; }
        public BlogBuilder excerpt(String excerpt) { this.excerpt = excerpt; return this; }
        public BlogBuilder content(String content) { this.content = content; return this; }
        public BlogBuilder category(String category) { this.category = category; return this; }
        public BlogBuilder tags(List<String> tags) { this.tags = tags; return this; }
        public BlogBuilder author(String author) { this.author = author; return this; }
        public BlogBuilder authorRole(String authorRole) { this.authorRole = authorRole; return this; }
        public BlogBuilder coverImage(String coverImage) { this.coverImage = coverImage; return this; }
        public BlogBuilder readTime(String readTime) { this.readTime = readTime; return this; }
        public BlogBuilder publishedDate(String publishedDate) { this.publishedDate = publishedDate; return this; }
        public BlogBuilder featured(boolean featured) { this.featured = featured; return this; }
        public BlogBuilder createdAt(String createdAt) { this.createdAt = createdAt; return this; }
        public BlogBuilder updatedAt(String updatedAt) { this.updatedAt = updatedAt; return this; }

        public Blog build() {
            return new Blog(id, title, slug, excerpt, content, category, tags, author, authorRole,
                    coverImage, readTime, publishedDate, featured, createdAt, updatedAt);
        }
    }
}
