package com.galaxyvision.galaxyvisiondynamics.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "Cards")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "card_number_hash", nullable = false)
    private String cardNumberHash;

    @Column(name = "last_four_digits", nullable = false)
    private String lastFourDigits;

    @Column(name = "expiry_date", nullable = false)
    private String expiryDate;

    @Column(name = "payment_token")
    private String paymentToken;

    @Column(name = "salt", nullable = false)
    private String salt;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
