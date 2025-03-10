package com.galaxyvision.galaxyvisiondynamics.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.galaxyvision.galaxyvisiondynamics.entity.Promotion;

public interface PromotionRepository extends JpaRepository<Promotion, Long> {
    List<Promotion> findByTargetTypeAndTargetId(String targetType, Long targetId);
}