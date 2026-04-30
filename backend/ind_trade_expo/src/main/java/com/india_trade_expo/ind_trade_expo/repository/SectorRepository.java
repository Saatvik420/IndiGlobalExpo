package com.india_trade_expo.ind_trade_expo.repository;

import com.india_trade_expo.ind_trade_expo.model.Sector;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SectorRepository extends MongoRepository<Sector, String> {
}
