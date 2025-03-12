package com.galaxyvision.galaxyvisiondynamics.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galaxyvision.galaxyvisiondynamics.entity.Promotion;
import com.galaxyvision.galaxyvisiondynamics.repository.PromotionRepository;

@Service
public class PromotionService {
    @Autowired
    private PromotionRepository repo;

    public List<Promotion> getAllPromotions() {
        return repo.findAll();
    }

    public Promotion addPromotion(Promotion promotion) {
        return repo.save(promotion);
    }

    public Promotion updatePromotion(Long id, Promotion promotion) {
        promotion.setId(id);
        return repo.save(promotion);
    }

    public void deletePromotion(Long id) {
        repo.deleteById(id);
    }

    public List<Promotion> getActivePromotionsByTarget(String type, Long targetId) {
        return repo.findByTargetTypeAndTargetId(type, targetId);
    }
}
