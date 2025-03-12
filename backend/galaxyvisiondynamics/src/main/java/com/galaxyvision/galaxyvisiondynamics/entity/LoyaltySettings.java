package com.galaxyvision.galaxyvisiondynamics.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "loyalty_settings")
public class LoyaltySettings {
    @Id
    private Long id = 1L; // Single settings entry
    private double pointsPerDollar = 10.0;

}
