package com.galaxyvision.galaxyvisiondynamics.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.galaxyvision.galaxyvisiondynamics.entity.LoyaltyTransaction;

public interface LoyaltyTransactionRepository extends JpaRepository<LoyaltyTransaction, Long> {
}
