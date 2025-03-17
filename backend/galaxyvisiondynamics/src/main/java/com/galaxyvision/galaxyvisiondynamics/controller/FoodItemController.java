package com.galaxyvision.galaxyvisiondynamics.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.galaxyvision.galaxyvisiondynamics.entity.FoodItem;
import com.galaxyvision.galaxyvisiondynamics.service.FoodItemService;

@RestController
@RequestMapping("/galaxyvision/users/food")
public class FoodItemController {

    @Autowired
    private FoodItemService foodItemService;

    @GetMapping("/getFoodItems")
    public ResponseEntity<List<FoodItem>> getFoodItems(
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String foodType) {
        List<FoodItem> foodItems = foodItemService.getFoodItems(sortBy, foodType);
        return ResponseEntity.ok(foodItems);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Optional<FoodItem>> getFoodItemById(@PathVariable Long id) {
        Optional<FoodItem> foodItem = foodItemService.getFoodItemById(id);
        return ResponseEntity.ok(foodItem);
    }
}
