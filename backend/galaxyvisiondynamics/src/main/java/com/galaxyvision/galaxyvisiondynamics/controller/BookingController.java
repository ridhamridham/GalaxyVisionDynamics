package com.galaxyvision.galaxyvisiondynamics.controller;

import org.springframework.web.bind.annotation.*;

import com.galaxyvision.galaxyvisiondynamics.entity.Booking;
import com.galaxyvision.galaxyvisiondynamics.model.BookingRequestDto;
import com.galaxyvision.galaxyvisiondynamics.service.BookingService;

import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/galaxyvision/users/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // Create a new booking
    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody BookingRequestDto bookingRq) {
        Booking savedBooking = bookingService.createBooking(bookingRq);
        return ResponseEntity.ok(savedBooking);
    }

    @GetMapping("/history/{userId}")
    public ResponseEntity<List<Booking>> getBookingHistory(@PathVariable Long userId) {
        List<Booking> bookings = bookingService.getBookingHistory(userId);
        return ResponseEntity.ok(bookings);
    }

    @PostMapping("/cancel/{bookingId}")
    public ResponseEntity<String> cancelBooking(@PathVariable Long bookingId) {
        try {
            String message = bookingService.cancelBooking(bookingId);
            return ResponseEntity.ok(message);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}