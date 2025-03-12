package com.galaxyvision.galaxyvisiondynamics.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galaxyvision.galaxyvisiondynamics.entity.LoyaltySettings;
import com.galaxyvision.galaxyvisiondynamics.repository.LoyaltySettingsRepository;

import jakarta.transaction.Transactional;

@Service
public class LoyaltySettingsService {
    @Autowired
    private LoyaltySettingsRepository repo;

    @Transactional
    public LoyaltySettings getSettings() {
        return repo.findById(1L).orElseGet(() -> {
            LoyaltySettings defaultSettings = new LoyaltySettings();
            defaultSettings.setId(1L);
            defaultSettings.setPointsPerDollar(10.0);
            return repo.save(defaultSettings);
        });
    }

    public LoyaltySettings updateSettings(double pointsPerDollar) {
        LoyaltySettings settings = getSettings();
        settings.setPointsPerDollar(pointsPerDollar);
        return repo.save(settings);
    }
}
