package com.galaxyvision.galaxyvisiondynamics.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.galaxyvision.galaxyvisiondynamics.entity.LoyaltyTransaction;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoyaltyTransactionRepository extends JpaRepository<LoyaltyTransaction, Long> {

    // Find all loyalty transactions by user ID
    List<LoyaltyTransaction> findByUserId(Long userId);

    // Find all loyalty transactions by booking ID
    List<LoyaltyTransaction> findByBookingId(Long bookingId);

    // Find all loyalty transactions by promotion ID
    List<LoyaltyTransaction> findByPromotionId(Long promotionId);
}