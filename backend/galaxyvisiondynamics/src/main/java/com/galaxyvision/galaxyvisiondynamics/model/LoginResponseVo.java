package com.galaxyvision.galaxyvisiondynamics.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseVo {
    private Long id;
    private String name;
    private String email;
    private String role;
    private String token;
}
