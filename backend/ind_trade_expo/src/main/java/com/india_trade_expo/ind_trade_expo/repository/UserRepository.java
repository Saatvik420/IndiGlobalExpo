package com.india_trade_expo.ind_trade_expo.repository;

import com.india_trade_expo.ind_trade_expo.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
}
