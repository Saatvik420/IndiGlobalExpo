package com.india_trade_expo.ind_trade_expo.controller;

import com.india_trade_expo.ind_trade_expo.model.Blog;
import com.india_trade_expo.ind_trade_expo.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @GetMapping
    public ResponseEntity<List<Blog>> getAllBlogs(@RequestParam(required = false) String category) {
        if (category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("all")) {
            return ResponseEntity.ok(blogService.getBlogsByCategory(category));
        }
        return ResponseEntity.ok(blogService.getAllBlogs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBlogById(@PathVariable String id) {
        return blogService.getBlogById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<?> getBlogBySlug(@PathVariable String slug) {
        return blogService.getBlogBySlug(slug)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Blog> createBlog(@RequestBody Blog blog) {
        Blog created = blogService.createBlog(blog);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> updateBlog(@PathVariable String id, @RequestBody Blog blog) {
        try {
            Blog updated = blogService.updateBlog(id, blog);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> deleteBlog(@PathVariable String id) {
        try {
            blogService.deleteBlog(id);
            return ResponseEntity.ok("Blog post deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
