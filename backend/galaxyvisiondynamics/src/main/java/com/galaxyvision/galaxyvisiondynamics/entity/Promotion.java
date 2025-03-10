package com.galaxyvision.galaxyvisiondynamics.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "promotions")
public class Promotion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String targetType; // "ACTIVITY", "ROOM", "FOOD"
    private Long targetId;
    private int extraPoints;
    private boolean active;
}
