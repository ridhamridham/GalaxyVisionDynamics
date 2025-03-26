package com.galaxyvision.galaxyvisiondynamics.model;

import java.time.LocalDate;

import lombok.Data;

@Data
public class BookingRequestDto {
    private Long userId;
    private Long roomId;
    private Long foodItemId;
    private Long activityId;
    private LocalDate checkInDate; 
    private LocalDate checkOutDate;
    private Double totalPrice;
}
