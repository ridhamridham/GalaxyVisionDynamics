package com.galaxyvision.galaxyvisiondynamics.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PaymentRequest {
    private Long userId;
    private Long bookingId;
    private Double amount;
    private String paymentMethod;
    private Integer loyaltyPointsUsed;
    private Long targetId;
    private String targetType;
    private String userEmail;
}
