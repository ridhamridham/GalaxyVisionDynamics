package com.galaxyvision.galaxyvisiondynamics.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
}
