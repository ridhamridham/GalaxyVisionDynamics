package com.galaxyvision.galaxyvisiondynamics.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.galaxyvision.galaxyvisiondynamics.entity.Role;
import com.galaxyvision.galaxyvisiondynamics.model.LoginRequestVo;
import com.galaxyvision.galaxyvisiondynamics.model.LoginResponseVo;
import com.galaxyvision.galaxyvisiondynamics.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/galaxyvision/admin")
public class AdminController {

    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestVo loginRequest) {
        try {
        	System.out.println("Inside admin login");
            logger.info("Admin login attempt for email: {}", loginRequest.getEmail());

            LoginResponseVo loginResponse = userService.loginUser(loginRequest);

            logger.info("User role: {}", loginResponse.getRole());

            if (Role.admin.toString().equals(loginResponse.getRole())) {
                return ResponseEntity.ok(loginResponse);
            } else {
                return ResponseEntity.status(403).body("Access denied. Only admins can log in.");
            }
        } catch (RuntimeException e) {
            logger.error("Error during admin login: {}", e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}