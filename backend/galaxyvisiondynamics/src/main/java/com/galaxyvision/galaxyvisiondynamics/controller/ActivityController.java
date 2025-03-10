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
import org.springframework.web.bind.annotation.RestController;

import com.galaxyvision.galaxyvisiondynamics.entity.Activity;
import com.galaxyvision.galaxyvisiondynamics.service.ActivityService;

@RestController
@RequestMapping("/galaxyvision/admin/activities")
public class ActivityController {
    @Autowired
    private ActivityService service;

    @GetMapping
    public List<Activity> getAllActivities() {
        return service.getAllActivities();
    }

    @PostMapping
    public ResponseEntity<Activity> addActivity(@RequestBody Activity activity) {
        Activity savedActivity = service.addActivity(activity);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedActivity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Activity> updateActivity(@PathVariable Long id, 
                                                @RequestBody Activity activity) {
        Activity updatedActivity = service.updateActivity(id, activity);
        return ResponseEntity.ok(updatedActivity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteActivity(@PathVariable Long id) {
        service.deleteActivity(id);
        return ResponseEntity.noContent().build();
    }
}
