package com.galaxyvision.galaxyvisiondynamics.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.galaxyvision.galaxyvisiondynamics.entity.FoodItem;
import com.galaxyvision.galaxyvisiondynamics.service.FoodItemService;

@RestController
@RequestMapping("/galaxyvision/admin/fooditems")
public class AdminFoodMenuController {
    @Autowired
    private FoodItemService service;

    @GetMapping
    public List<FoodItem> getItems(@RequestParam String type) {
        return service.getItemsByType(type);
    }

    @PostMapping("/add")
    public ResponseEntity<FoodItem> addItem(@RequestBody FoodItem item) {
        FoodItem savedItem = service.addItem(item);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        service.deleteItem(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<FoodItem> updateItem(@PathVariable Long id, 
                                             @RequestBody FoodItem item) {
        FoodItem updatedItem = service.updateItem(id, item);
        return ResponseEntity.ok(updatedItem);
    }
}
