package com.galaxyvision.galaxyvisiondynamics.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.galaxyvision.galaxyvisiondynamics.entity.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {}
