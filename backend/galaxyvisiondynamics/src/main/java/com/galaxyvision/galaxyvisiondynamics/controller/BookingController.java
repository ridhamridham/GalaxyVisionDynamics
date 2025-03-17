package com.galaxyvision.galaxyvisiondynamics.controller;

import org.springframework.web.bind.annotation.*;

import com.galaxyvision.galaxyvisiondynamics.entity.Booking;
import com.galaxyvision.galaxyvisiondynamics.service.BookingService;

import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/galaxyvision/users/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // Create a new booking
    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        Booking savedBooking = bookingService.createBooking(booking);
        return ResponseEntity.ok(savedBooking);
    }
}
