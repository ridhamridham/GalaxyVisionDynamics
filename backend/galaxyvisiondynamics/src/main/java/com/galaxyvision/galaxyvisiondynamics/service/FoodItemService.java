package com.galaxyvision.galaxyvisiondynamics.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
}