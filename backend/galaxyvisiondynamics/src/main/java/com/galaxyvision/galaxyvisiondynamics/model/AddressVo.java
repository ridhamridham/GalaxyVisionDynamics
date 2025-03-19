package com.galaxyvision.galaxyvisiondynamics.model;

import lombok.Data;

@Data
public class AddressVo {
    private Long userId;
    private String addressLine1;
    private String addressLine2;
    private String city;
    private String state;
    private String zipCode;
    private String country;
}
