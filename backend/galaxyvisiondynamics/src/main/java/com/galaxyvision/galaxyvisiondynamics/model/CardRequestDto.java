package com.galaxyvision.galaxyvisiondynamics.model;

import lombok.Data;

@Data
public class CardRequestDto {
	private Long userId;
    private String cardNumber; 
    private String expiryDate;
}
  
