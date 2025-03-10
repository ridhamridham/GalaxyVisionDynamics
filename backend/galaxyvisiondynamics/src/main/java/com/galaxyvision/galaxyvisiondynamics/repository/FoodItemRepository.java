package com.galaxyvision.galaxyvisiondynamics.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.galaxyvision.galaxyvisiondynamics.entity.FoodItem;

public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {
    List<FoodItem> findByFoodType(String foodType);
}
