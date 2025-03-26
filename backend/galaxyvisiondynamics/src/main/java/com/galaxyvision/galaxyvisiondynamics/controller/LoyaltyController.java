package com.galaxyvision.galaxyvisiondynamics.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.galaxyvision.galaxyvisiondynamics.service.LoyaltyService;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/galaxyvision/users/loyalty")
public class LoyaltyController {

    @Autowired
    private LoyaltyService loyaltyService;

    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Integer>> getLoyaltyPoints(@PathVariable Long userId) {
        int balance = loyaltyService.getLoyaltyPoints(userId);
        return ResponseEntity.ok(Collections.singletonMap("balance", balance));
    }
}