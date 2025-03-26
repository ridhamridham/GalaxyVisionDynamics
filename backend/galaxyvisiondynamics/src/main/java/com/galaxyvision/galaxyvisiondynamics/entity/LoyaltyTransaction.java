package com.galaxyvision.galaxyvisiondynamics.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "loyalty_transactions")
public class LoyaltyTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "balance_after_transaction", nullable = false)
    private int balanceAfterTransaction;

    @Column(name = "points_earned", nullable = false)
    private int pointsEarned;

    @Column(name = "points_used", nullable = false)
    private int pointsUsed;

    @Column(name = "reason")
    private String reason;

    @Column(name = "booking_id")
    private Long bookingId;

    @Column(name = "promotion_id")
    private Long promotionId;

    @Column(name = "user_id")
    private Long userId;
}
