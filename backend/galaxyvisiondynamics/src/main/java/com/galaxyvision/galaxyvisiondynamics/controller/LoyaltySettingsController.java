package com.galaxyvision.galaxyvisiondynamics.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.galaxyvision.galaxyvisiondynamics.entity.LoyaltySettings;
import com.galaxyvision.galaxyvisiondynamics.service.LoyaltySettingsService;

@RestController
@RequestMapping("/galaxyvision/admin/loyalty")
public class LoyaltySettingsController {
    @Autowired
    private LoyaltySettingsService service;

    @GetMapping("/settings")
    public ResponseEntity<LoyaltySettings> getSettings() {
        return ResponseEntity.ok(service.getSettings());
    }

    @PutMapping("/settings")
    public ResponseEntity<LoyaltySettings> updateSettings(
            @RequestParam double pointsPerDollar) {
        service.updateSettings(pointsPerDollar);
        return ResponseEntity.ok(service.getSettings());
    }
}
