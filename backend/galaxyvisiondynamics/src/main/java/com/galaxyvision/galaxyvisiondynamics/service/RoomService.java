package com.galaxyvision.galaxyvisiondynamics.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.galaxyvision.galaxyvisiondynamics.entity.Room;
import com.galaxyvision.galaxyvisiondynamics.repository.RoomRepository;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Room addRoom(Room room) {
        return roomRepository.save(room);
    }

    public Room updateRoom(Long id, Room updatedRoom) {
        Room room = roomRepository.findById(id).orElseThrow(() -> new RuntimeException("Room not found"));
        room.setType(updatedRoom.getType());
        room.setPrice(updatedRoom.getPrice());
        room.setCapacity(updatedRoom.getCapacity());
        room.setDescription(updatedRoom.getDescription());
        room.setIsAvailable(updatedRoom.getIsAvailable());
        room.setImageUrls(updatedRoom.getImageUrls());
        return roomRepository.save(room);
    }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
    
//    @Cacheable(value = "rooms", key = "{#sortBy, #minPrice, #maxPrice, #capacity}")
    public List<Room> getRooms(String sortBy, Double minPrice, Double maxPrice, Integer capacity) {
        List<Room> rooms = roomRepository.findAll();

        // Filter by price
        if (minPrice != null && maxPrice != null) {
            rooms = rooms.stream()
                    .filter(room -> room.getPrice() >= minPrice && room.getPrice() <= maxPrice)
                    .collect(Collectors.toList());
        }

        // Filter by capacity
        if (capacity != null) {
            rooms = rooms.stream()
                    .filter(room -> room.getCapacity() >= capacity)
                    .collect(Collectors.toList());
        }

        // Sort
        if (sortBy != null) {
            switch (sortBy) {
                case "price_asc":
                    rooms.sort(Comparator.comparing(Room::getPrice));
                    break;
                case "price_desc":
                    rooms.sort(Comparator.comparing(Room::getPrice).reversed());
                    break;
                case "capacity_asc":
                    rooms.sort(Comparator.comparing(Room::getCapacity));
                    break;
                case "capacity_desc":
                    rooms.sort(Comparator.comparing(Room::getCapacity).reversed());
                    break;
            }
        }

        return rooms;
    }
    
    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }
}
