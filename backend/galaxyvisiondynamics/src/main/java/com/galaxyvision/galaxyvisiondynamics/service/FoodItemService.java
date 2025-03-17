package com.galaxyvision.galaxyvisiondynamics.service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.galaxyvision.galaxyvisiondynamics.entity.FoodItem;
import com.galaxyvision.galaxyvisiondynamics.repository.FoodItemRepository;

@Service
public class FoodItemService {
    @Autowired
    private FoodItemRepository repository;

    public List<FoodItem> getItemsByType(String type) {
        return repository.findByFoodType(type);
    }

    public FoodItem addItem(FoodItem item) {
        return repository.save(item);
    }

    public void deleteItem(Long id) {
        repository.deleteById(id);
    }

    public FoodItem updateItem(Long id, FoodItem item) {
        item.setId(id);
        return repository.save(item);
    }
    
//    @Cacheable(value = "foodItems", key = "{#sortBy, #foodType}")
    public List<FoodItem> getFoodItems(String sortBy, String foodType) {
        List<FoodItem> foodItems = repository.findAll();

        // Filter by food type
        if (foodType != null && !foodType.equals("all")) {
            foodItems = foodItems.stream()
                    .filter(item -> item.getFoodType().equals(foodType))
                    .collect(Collectors.toList());
        }

        // Sort food items
        if (sortBy != null) {
            switch (sortBy) {
                case "price_asc":
                    foodItems.sort(Comparator.comparing(FoodItem::getPrice));
                    break;
                case "price_desc":
                    foodItems.sort(Comparator.comparing(FoodItem::getPrice).reversed());
                    break;
            }
        }

        return foodItems;
    }
    public Optional<FoodItem> getFoodItemById(Long id) {
        return repository.findById(id);
    }
}