package com.galaxyvision.galaxyvisiondynamics.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.galaxyvision.galaxyvisiondynamics.entity.Activity;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
}