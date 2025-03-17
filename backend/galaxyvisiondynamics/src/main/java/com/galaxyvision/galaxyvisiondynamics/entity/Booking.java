package com.galaxyvision.galaxyvisiondynamics.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = true)
    private Room room;

    @ManyToOne
    @JoinColumn(name = "food_item_id", nullable = true)
    private FoodItem foodItem;

    @ManyToOne
    @JoinColumn(name = "activity_id", nullable = true)
    private Activity activity;

    private LocalDate checkInDate; // For rooms
    private LocalDate checkOutDate; // For rooms
    private Double totalPrice;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) {
            status = BookingStatus.PENDING;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum BookingStatus {
        PENDING,
        CONFIRMED,
        CANCELLED,
        COMPLETED
    }
}