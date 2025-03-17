package com.galaxyvision.galaxyvisiondynamics.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable; // Import Serializable
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class Room implements Serializable { 
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private Double price;
    private Integer capacity;
    private String description;
    private Boolean isAvailable;

    @ElementCollection
    @CollectionTable(name = "room_images", joinColumns = @JoinColumn(name = "room_id")) // Table to store image URLs
    @Column(name = "image_url") 
    private List<String> imageUrls;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}