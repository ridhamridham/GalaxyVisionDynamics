package com.galaxyvision.galaxyvisiondynamics.service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.galaxyvision.galaxyvisiondynamics.entity.Activity;
import com.galaxyvision.galaxyvisiondynamics.repository.ActivityRepository;

@Service
public class ActivityService {
    @Autowired
    private ActivityRepository repository;

    public List<Activity> getAllActivities() {
        return repository.findAll();
    }

    public Activity addActivity(Activity activity) {
        return repository.save(activity);
    }

    public Activity updateActivity(Long id, Activity activity) {
        activity.setId(id);
        return repository.save(activity);
    }

    public void deleteActivity(Long id) {
        repository.deleteById(id);
    }
    
//    @Cacheable(value = "activities", key = "#sortBy")
    public List<Activity> getActivities(String sortBy) {
        List<Activity> activities = repository.findAll();

        // Sort activities
        if (sortBy != null) {
            switch (sortBy) {
                case "price_asc":
                    activities.sort(Comparator.comparing(Activity::getPrice));
                    break;
                case "price_desc":
                    activities.sort(Comparator.comparing(Activity::getPrice).reversed());
                    break;
            }
        }

        return activities;
    }
    public Optional<Activity> getActivityById(Long id) {
        return repository.findById(id);
    }
}
