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

import com.galaxyvision.galaxyvisiondynamics.entity.Room;
import com.galaxyvision.galaxyvisiondynamics.service.RoomService;

@RestController
@RequestMapping("/galaxyvision/users/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @GetMapping("/getrooms")
    public ResponseEntity<List<Room>> getRooms(
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Integer capacity) {
        List<Room> rooms = roomService.getRooms(sortBy, minPrice, maxPrice, capacity);
        return ResponseEntity.ok(rooms);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Room>> getRoomById(@PathVariable Long id) {
        Optional<Room> room = roomService.getRoomById(id);
        return ResponseEntity.ok(room);
    }
}