package com.india_trade_expo.ind_trade_expo.repository;

import com.india_trade_expo.ind_trade_expo.model.Blog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BlogRepository extends MongoRepository<Blog, String> {
    Optional<Blog> findBySlug(String slug);
    List<Blog> findByCategoryIgnoreCase(String category);
    List<Blog> findAllByOrderByCreatedAtDesc();
}
