package com.galaxyvision.galaxyvisiondynamics.service;

import com.galaxyvision.galaxyvisiondynamics.entity.*;
import com.galaxyvision.galaxyvisiondynamics.model.BookingRequestDto;
import com.galaxyvision.galaxyvisiondynamics.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

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

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PaymentRepository paymentRepository;

    // Create a new booking
    public Booking createBooking(BookingRequestDto bookingRq) {
        System.out.println("User ID in booking is " + bookingRq.toString());

        Booking booking = new Booking();

        // Set user
        Optional<User> userdb = userRepo.findById(bookingRq.getUserId());
        User user = userdb.orElseThrow(() -> new RuntimeException("User not found"));
        booking.setUser(user);

        // Set room (if applicable)
        if (bookingRq.getRoomId() != null) {
            Optional<Room> roomdb = roomRepository.findById(bookingRq.getRoomId());
            Room room = roomdb.orElseThrow(() -> new RuntimeException("Room not found"));
            booking.setRoom(room);
        }

        // Set food item (if applicable)
        if (bookingRq.getFoodItemId() != null) {
            Optional<FoodItem> foodItemdb = foodItemRepository.findById(bookingRq.getFoodItemId());
            FoodItem foodItem = foodItemdb.orElseThrow(() -> new RuntimeException("Food item not found"));
            booking.setFoodItem(foodItem);
        }

        // Set activity (if applicable)
        if (bookingRq.getActivityId() != null) {
            Optional<Activity> activitydb = activityRepository.findById(bookingRq.getActivityId());
            Activity activity = activitydb.orElseThrow(() -> new RuntimeException("Activity not found"));
            booking.setActivity(activity);
        }

        // Set other fields
        booking.setCheckInDate(bookingRq.getCheckInDate());
        booking.setCheckOutDate(bookingRq.getCheckOutDate());
        booking.setTotalPrice(bookingRq.getTotalPrice());
        booking.setStatus(Booking.BookingStatus.PENDING);

        System.out.println("The check-in date is " + bookingRq.getCheckInDate());
        System.out.println("The check-out date is " + bookingRq.getCheckOutDate());

        return bookingRepository.save(booking);
    }

    // Confirm a booking
    public void confirmBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(Booking.BookingStatus.CONFIRMED);
        bookingRepository.save(booking);
    }

    public List<Booking> getBookingHistory(Long userId) {
        List<Booking> bookings = bookingRepository.findByUserIdAndStatusIn(
            userId,
            List.of(Booking.BookingStatus.CONFIRMED, Booking.BookingStatus.COMPLETED,Booking.BookingStatus.CANCELLED )
        );

       bookings.sort((b1, b2) -> {
            LocalDate checkInDate1 = b1.getCheckInDate();
            LocalDate checkInDate2 = b2.getCheckInDate();

            if (checkInDate1 == null && checkInDate2 == null) {
                return 0;
            } else if (checkInDate1 == null) {
                return 1; 
            } else if (checkInDate2 == null) {
                return -1;
            }

            if (b1.getStatus() == Booking.BookingStatus.CONFIRMED && 
                b2.getStatus() == Booking.BookingStatus.COMPLETED) {
                return -1;
            } else if (b1.getStatus() == Booking.BookingStatus.COMPLETED && 
                       b2.getStatus() == Booking.BookingStatus.CONFIRMED) {
                return 1;
            } else {
                
                return checkInDate1.compareTo(checkInDate2);
            }
        });

        return bookings;
    }

    public String cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        LocalDate today = LocalDate.now();
        LocalDate checkInDate = booking.getCheckInDate();
        long daysBeforeCheckIn = ChronoUnit.DAYS.between(today, checkInDate);

        if (daysBeforeCheckIn < 4) {
            throw new RuntimeException("Cancellation is not allowed within 4 days of check-in.");
        }

        List<Payment> payments = paymentRepository.findByBookingId(bookingId);
        if (payments.isEmpty()) {
            throw new RuntimeException("Payment not found for this booking.");
        }

        Payment payment = payments.get(0);

        double refundAmount = 0;
        if (daysBeforeCheckIn >= 14) {
            refundAmount = payment.getAmount(); // Full refund
        } else if (daysBeforeCheckIn >= 7) {
            refundAmount = payment.getAmount() * 0.7; // 70% refund
        } else if (daysBeforeCheckIn >= 4) {
            refundAmount = payment.getAmount() * 0.5; // 50% refund
        }

        // Update booking status to CANCELLED
        booking.setStatus(Booking.BookingStatus.CANCELLED);
        bookingRepository.save(booking);

        return String.format("Booking cancelled successfully. Refund amount: $%.2f", refundAmount);
    }
}