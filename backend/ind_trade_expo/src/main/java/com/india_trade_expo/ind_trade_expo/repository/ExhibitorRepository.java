package com.india_trade_expo.ind_trade_expo.repository;

import com.india_trade_expo.ind_trade_expo.model.Exhibitor;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface ExhibitorRepository extends MongoRepository<Exhibitor, String> {
    Optional<Exhibitor> findByUserId(String userId);
}
