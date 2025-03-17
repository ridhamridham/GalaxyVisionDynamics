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

import com.galaxyvision.galaxyvisiondynamics.entity.Activity;
import com.galaxyvision.galaxyvisiondynamics.service.ActivityService;

@RestController
@RequestMapping("/galaxyvision/users/activities")
public class UserActivityController {

    @Autowired
    private ActivityService activityService;

    @GetMapping("/getactivities")
    public ResponseEntity<List<Activity>> getActivities(
            @RequestParam(required = false) String sortBy) {
        List<Activity> activities = activityService.getActivities(sortBy);
        return ResponseEntity.ok(activities);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Activity>> getActivityById(@PathVariable Long id) {
        Optional<Activity> activity = activityService.getActivityById(id);
        return ResponseEntity.ok(activity);
    }
}
