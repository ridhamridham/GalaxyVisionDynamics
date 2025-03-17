package com.galaxyvision.galaxyvisiondynamics.service;

import org.springframework.stereotype.Service;

import com.galaxyvision.galaxyvisiondynamics.entity.Booking;
import com.galaxyvision.galaxyvisiondynamics.repository.ActivityRepository;
import com.galaxyvision.galaxyvisiondynamics.repository.BookingRepository;
import com.galaxyvision.galaxyvisiondynamics.repository.FoodItemRepository;
import com.galaxyvision.galaxyvisiondynamics.repository.RoomRepository;

import org.springframework.beans.factory.annotation.Autowired;
import java.time.LocalDate;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private FoodItemRepository foodItemRepository;

    @Autowired
    private ActivityRepository activityRepository;

    public Booking createBooking(Booking booking) {
        
    	double totalPrice = calculateTotalPrice(booking);
        booking.setTotalPrice(totalPrice);

        return bookingRepository.save(booking);
    }

    // Calculate total price with 13% tax
    private double calculateTotalPrice(Booking booking) {
        double price = 0;

        if (booking.getRoom() != null) {
            price = booking.getRoom().getPrice();
        } else if (booking.getFoodItem() != null) {
            price = booking.getFoodItem().getPrice();
        } else if (booking.getActivity() != null) {
            price = booking.getActivity().getPrice();
        }

        return price * 1.13; // Add 13% tax
    }
}
